// store the credential variables in .env file and retrieve the values here.

const dotenv = require('dotenv');
dotenv.config();
// @ts-check

module.exports= {
  ZOOM_API_KEY: process.env.APIKey,
  ZOOM_API_SECRET: process.env.APISecret,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  VERIFICATION_TOKEN: process.env.VerificationToken,
  endpoint: "https://ssd.documents.azure.com:443/",
  key: "x5WDW0rW4jGz6QWxWrwfxNLbgwig58TzJIwgBcRWvfTn1UIWGY1WiH2hH0sTVEjFOh2aEGvmMAuUNPc55AJ82w==",
  databaseId: "ssddb",
  partitionKey: { kind: "Hash", paths: ["/ssdpk"] },
  gbeStaff: [
    {name: 'Mark Murphy', grade: "N/A", meeting_id: '7708146043'},  // For testing
    {name: 'Melisa Amundson', grade: "K", meeting_id: '2775969009'},
    {name: 'Meagan Hughes', grade: "K", meeting_id: '8357546134'},
    {name: 'Tiffany Kerr', grade: "K", meeting_id: '7619200780'},
    {name: 'Patti Bowers', grade: "1", meeting_id: '4800124624'},
    {name: 'Tanya Christian', grade: "1", meeting_id: '9823336501'},
    {name: 'Phyllis Tubbs', grade: "1", meeting_id: '9994515344'},
    {name: 'Margaret Frame', grade: "2", meeting_id: '9321149699'},
    {name: 'Lindsey Haworth', grade: "ELA", course: "ELA", meeting_id: '9321149699'},
    {name: 'Milissa Jones', grade: "2", meeting_id: '9380236575'},
    {name: 'Rachel Gossett', grade: "3", meeting_id: '4273112841'},
    {name: 'Tamara McNew', grade: "3", meeting_id: '5076650048'},
    {name: 'Leslie Neville', grade: "3", meeting_id: '3798415486'},
    {name: 'Leslie Best', grade: "5", course: "ELA", meeting_id: '6887151159'},
    {name: 'Madison Berry', grade: "4", meeting_id: '9362066639'},
    {name: 'Sheryl Klennert', grade: "4", meeting_id: '9399313327'},
    {name: 'Carlene Crossman', grade: "5", course: "Science", meeting_id: '4682427828'},
    {name: 'Kimberly Skadan', grade: "5", meeting_id: '9887799526'},
    {name: 'Linda Michael', grade: "SE", meeting_id: '3740908194 '},
    {name: 'Robin Morrill-Briganti', grade: "SE", meeting_id: '2461500739'},
    {name: 'Gail Bowers', grade: "Music", meeting_id: '2225508614'},
    {name: 'David Monson', grade: "C", meeting_id: '5676717067'},
    {name: 'Alania Solada', grade: "2/3", meeting_id: '8652580903'},
    {name: 'Lisa Thebo', grade: "P", meeting_id: '8372589523'},
    {name: 'Nicole Comfort', grade: "P", meeting_id: '3610177132'},
    {name: 'Lacey Blue', grade: "P", meeting_id: '9770935917'},
    {name: 'Sandy Peers', grade: "P", meeting_id: '4854704398'},
    {name: 'Shannon Clune', grade: "P", meeting_id: '2185623350'},
    {name: 'Stormy Evans', grade: "Library", meeting_id: '3875245472'},
    {name: 'Tia LaLonde', grade: "P", meeting_id: '8704665584'},
  ],
  
  zoomTimes: [
      {
        grade: 3,
        zooms: [
            {topic: "Math", start: "08:30", minutes: 30},
            {topic: "Language Arts", start: "09:30", minutes: 30},
            {topic: "Math", start: "13:30", minutes: 30},
            {topic: "Language Arts", start: "14:30", minutes: 30},
            {topic: "Friday Office", start: "08:30", minutes: 90},
        ]
      },
      {
        grade: 4,
        zooms: [
            {topic: "Math", start: "08:30", minutes: 30},
            {topic: "Language Arts", start: "09:30", minutes: 30},
            {topic: "Math", start: "13:30", minutes: 30},
            {topic: "Math", start: "14:30", minutes: 30},
            {topic: "Friday Office", start: "08:30", minutes: 90},
        ]
      },
      {
        grade: 5,
        zooms: [
            {topic: "Reading", start: "08:30", minutes: 30},
            {topic: "Language Arts", start: "09:30", minutes: 30},
            {topic: "Math", start: "13:30", minutes: 30},
            {topic: "Math", start: "14:30", minutes: 30},
            {topic: "Friday Office", start: "08:30", minutes: 90},
        ]
  },
]
  
};
