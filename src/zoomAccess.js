// zoom_wrapper.js
const rp = require('request-promise');
const config = require('./config');
const dataAccess = require('./dataAccess');
const reports = require('./reports');

//dataAccess.getAllItems();

// Generate a JWT token to authenticate and make Zoom API calls 
const jwt = require('jsonwebtoken');
const payload = {
    iss: config.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.ZOOM_API_SECRET);


function participantsGet(meeting) {

    // Using the uuid of the meeting ensures we get the exact instance when a personal
    // meeting ID is used to start the meeting.
    //var uuid = meeting.id;  // 
    meetingFetched = meeting.id; // uuid; // Save for handling response

    //Double encode the uuid for validation in case it contains slashes
    //var euuid = encodeURIComponent(encodeURIComponent(uuid));

    var options = {
        uri: "https://api.zoom.us/v2/report/meetings/" + meeting.id + "/participants?page_size=300",
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json',
        },
        json: true
    };
    console.log("Getting participants for " + meeting.id + " / " + meeting.uuid);

    rp(options)
        .then(function (response) {
            console.log("getparticipants", response);
            meeting.participants = response.participants;
            
            dataAccess.meetingAdd(meeting);         // Add meeting to database on Azure Cosmos DB
            reports.zoomAttendance(meeting);
            //return response.participants;
        })

        .catch(function (err) {
            // API call failed...
            // todo handle 3001 error for instant meetings
            // API call failed for 98399082887, error: 404 - {"code":3001,"message":"Meeting does not exist: 98399082887."
            console.log('API call failed for ' + meetingFetched + ', error: ' + err.message);
            return null;
        });
}

    module.exports = {participantsGet};

