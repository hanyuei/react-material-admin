// dataAccess.js
// Access the database on Azure, per configuration

const config = require('./config');

// Connect to database
const CosmosClient = require("@azure/cosmos").CosmosClient;
const { endpoint, key, databaseId, containerId } = config;
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container("meetings");
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc'); // dependent on utc plugin
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

module.exports = {

    meetingAdd: async function (meeting) {
        meeting.simpleId = meeting.id;          // The meeting id seen in link
        ended = new Date(meeting.end_time);     // Zoom does not compute meeting duration
        started = new Date(meeting.start_time);
        meeting.duration = (ended - started) / 1000;
        // Double encode the meeting id so that Cosmos accepts it
        var euuid = encodeURIComponent(encodeURIComponent(meeting.uuid));
        //meeting.id = euuid;
        delete meeting.id;                      // Let Azure supply an ID

        try {
            const { resource: createdItem } = await container.items.create(meeting);
            console.log("added ", createdItem);
        }
        catch(err) {
            console.log(err.message);
        }
        //return meeting;
    },
    
    // Sample of how to query
    getAllItems: async function () {

        // Query to return all items
        const querySpec = {
            query: "SELECT * from c"
        };
        const fs = require('fs')

        // Read all items in the Items container
        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();
            
        data = new Array();

        items.forEach(item => {
            data.push(item);
            console.log(item);
        });
        try {
            fs.writeFileSync("./alldata.json", JSON.stringify(data))
        } catch (err) {
            console.error(err)
        }
    },
    


}
