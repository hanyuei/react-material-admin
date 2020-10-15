// dataAccess.js
// Access the database on Azure, per configuration

const config = require('./config');

// Connect to database
const CosmosClient = require("@azure/cosmos").CosmosClient;
const { endpoint, key, databaseId } = config;
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container("meetings");
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc'); // dependent on utc plugin
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const dataAccess = {
    // Return the meetings specified in query
    meetingsFetch: async function (query) {

        const querySpec = {
            query: query
        };
        try {
            const { resources: items } = await container.items  // meetings
              .query(querySpec)
              .fetchAll();
            return items;
        } 
        catch (err) {
            console.log(err);
            return null
        }
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
            
        var data = [];

        items.forEach(item => {
            data.push(item);
            console.log(item);
        });
        try {
            fs.writeFileSync("./alldata.json", JSON.stringify(data))
        } catch (err) {
            console.error(err)
        }
    }
}

export default dataAccess;