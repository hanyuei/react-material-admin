// reports.js
const config = require('./config');
const sgMail = require('@sendgrid/mail');
const e = require('express');

// TODO move get of summary back to data access
const CosmosClient = require("@azure/cosmos").CosmosClient;
const { endpoint, key, databaseId, containerId } = config;
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container("meetings");

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc') // dependent on utc plugin
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

// Summarize meeting, aggregating participants' joinings and 
// total time attended

// Access Sendgrid API key 
sgMail.setApiKey(config.SENDGRID_API_KEY);

async function simpleSend(addressee, subject, content) {
    var addressees = [];
    //addressees.push(addressee);
    addressees.push("mobitinker@gmail.com");
    var wrappedContent = "<!DOCTYPE html><HTML><body>" + content + "</body></HTML>";

    const msg = {
        to: addressees,
        from: 'mobitinker@gmail.com',
        subject: subject,
        html: wrappedContent
    }

    try {
        const promise = await sgMail.sendMultiple(msg);
        console.log("Email sent")
    }
    catch(err) {
        // API call failed...
        console.log('API call failed, reason ', err);
    }
}

// Return duration as "134 m"
function durationFormat(duration) {
    //var hours = Math.floor(duration / 3600).toString();
    //var minutes = Math.floor((duration % 3600) / 60).toString();
    //return hours+"h " + minutes + "m";
    return Math.floor((duration / 60).toString() + "m");
}
  

function GBEZoomNumber(startTimeUTC, firstReportDateUTC) {
    var result = {day: -1, zoom: -1};
    const t = dayjs(startTimeUTC).tz("America/Los_Angeles");     //Local 
    const startTime = (t.hour() * 60) + (t.minute());    // in minutes from midnight

    // ["08:30", "09:30", "13:30", "14:30"];
    const zt = [510, 570, 810, 870];  
    var diff;
    // Figure the zoom index
    for (i = 0; i < zt.length; i++) {
        diff = startTime - zt[i];
        if ( (diff >= -5) && (diff <= 15) ) { // Meeting started 5 min early to 15 min late from scheduled time
            result.zoom = i;
        }
        if (t.format("d") == 5 ) {  //special case of Friday
            if ((startTime >= 505 && (startTime <= 625 ))) // 8:25 to 10:25
            result.zoom = 4;      // it's the Friday 8:30
        }
    };
    result.day = dayjs(firstReportDateUTC).diff(startTimeUTC,"day");
    console.log(result, t.format("YYYY-MM-DDTHH:mm"));
    return result;
}


function reportGBEWeeklySummary(host, startDate, endDate, meetings) {
    console.log("reportGBEWeeklySummary");
    var content = "";               //todo add beginning shell

    // Meeting summary
    content += `<h3>Weekly Summary for ${host}</h3>`;

    var pList = new Array();
    const numDays =  1 + dayjs(endDate).diff(startDate, 'day');
    const startDateUTC = dayjs(startDate).utc().format("YYYY-MM-DD");

    // Do data transformation to show minutes spent in each available Zoom by day
    meetings.forEach((m) => {
        var pos = GBEZoomNumber(m.start_time, startDateUTC);
        console.log("pos", pos, m.start_time);
        var participants = m.participants;
        participants.forEach((p) => {
            var found;
            if (pList.length > 0) {
                found = pList.find((e) => e.name === p.name);
            }
            if (found !== undefined) {
                if (pos.zoom >= 0) {
                    found.days[pos.day].zooms[pos.zoom] += p.duration / 60;
                }
            } else {
                // Make a new paricipant with buckets for paricipation by day and Zoom number
                p.days = new Array(numDays);
               for (i=0; i<p.days.length;i++){
                    a = new Array(0, 0, 0, 0, 0); 
                    p.days[i] = {zooms: a};
                }
                pList.push(p);
            }
        });
    });
    console.log(pList);
    return null;

    // Output paricipant summary
    // todo add start, end, leave reason
    content += "<table>";
    content += "<tr>";
    content += `<td style="padding:6px"><b>Name</b></td><td style="padding:6px"><b>Joins</b></td><td style="padding:6px"><b>Time in Meeting</b></td>`;
    content += "</tr>";

    pList.forEach(p => {
        var hms = durationFormat(p.duration);
        content += `<tr><td style="padding:6px">${p.name}</td><td style="padding:6px">${p.joins}</td><td style="padding:6px">${hms}</td></tr>`;     //p.duration will be total duration
    })
    content += "</table>";

    if (isGBE) {
        var subject = `Zoom at ${startTime.tz(meeting.timezone).format("ddd, MMM DD")} ${startTime.tz(meeting.timezone).format("h:mm a")} - ${endTime.tz(meeting.timezone).format("h:mm a")} ${hms}`;
        
        simpleSend("mobitinker@gmail.com", subject, content);
        console.log("report sent sent", subject);
    }
}


module.exports = {
    zoomAttendance(meeting) {
        var utc = require('dayjs/plugin/utc') // dependent on utc plugin
        var timezone = require('dayjs/plugin/timezone')

        var content = "";               //The email to send

        // Summarize meeting, aggregating participants' joinings and 
        // total time attended
        dayjs.extend(utc)
        dayjs.extend(timezone)
        //TODO force this. Timezones are reported inconsistently
        meeting.timezone = "America/Los_Angeles";

        const startTime = dayjs.utc(meeting.start_time);
        const endTime = dayjs.utc(meeting.end_time);
        const hms = durationFormat(meeting.duration);

        // Meeting summary
        content += `<h3>${meeting.topic}</h3>`;
        content += `<p>Meeting instance ID: ${meeting.uuid}</p>`;

        var pList = new Array();

        // Aggregate participant list by name
        meeting.participants.forEach((p) => {
            p.timezone = "America/Los_Angeles"; // todo hard code time zone
            var found;
            if (pList.length > 0) {
                found = pList.find((e) => e.name === p.name);
            }
            if (found !== undefined) {
                found.duration += p.duration;
                found.joins++;
            } else {
                p.joins=1;
                pList.push(p);
            }
        });

        // Host is at position 0 before sorting. Testing: only work with GBE
        var isGBE = config.gbeStaff.find((e) =>  e.name === meeting.participants[0].name);

        // Sort the participants by name
        pList.sort((a, b) => {
            var _a = a.toLowerCase();
            var _b = b.toLowerCase();
            if (_a.name === _b.name) return 0; 
            return _a.name > _b.name ? 1 : -1;
        });

        // Output paricipant summary
        // todo add start, end, leave reason
        content += "<table>";
        content += "<tr>";
        content += `<td style="padding:6px"><b>Name</b></td><td style="padding:6px"><b>Joins</b></td><td style="padding:6px"><b>Time in Meeting</b></td>`;
        content += "</tr>";

        pList.forEach(p => {
            var hms = durationFormat(p.duration);
            content += `<tr><td style="padding:6px">${p.name}</td><td style="padding:6px">${p.joins}</td><td style="padding:6px">${hms}</td></tr>`;     //p.duration will be total duration
        })
        content += "</table>";

        if (isGBE) {
            var subject = `Zoom at ${startTime.tz(meeting.timezone).format("ddd, MMM DD")} ${startTime.tz(meeting.timezone).format("h:mm a")} - ${endTime.tz(meeting.timezone).format("h:mm a")} ${hms}`;
            
            simpleSend("mobitinker@gmail.com", subject, content);
            console.log("report sent sent", subject);
        }
    
    },

    gbeWeeklySummary: async function (host, startDate, endDate) {

        const startDateUTC = dayjs(startDate).utc().format("YYYY-MM-DDThh:mm:ss");
        const endDateUTC  = dayjs(endDate).utc().format("YYYY-MM-DDThh:mm:ss");
        const querySpec = {
            query: `SELECT * FROM meetings m WHERE m.start_time >= '${startDateUTC}' and m.end_time <= '${endDateUTC}' and startswith(m.topic, '${host}')`
        };
        console.log(querySpec.query);
        try {
            const { resources: items } = await container.items  // meetings
            .query(querySpec)
            .fetchAll();
            console.log("Done getting");
            reportGBEWeeklySummary(host, startDate, endDate, items);
        } 
        catch (err) {
            console.log(err);
            return null
        }
        
    },


}
    