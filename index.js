const express = require("express");
const app = express();
const hackathonRoute = require('./routes/hackathonRoute');
const internshipRoute = require('./routes/internshipRoute');
const contestRoute = require('./routes/contestRoute');

// Getting hackathons
app.use('/api/hackathon', hackathonRoute);

// Getting internships
app.use("/api/internship", internshipRoute)

// Getting contests
app.use("/api/contest", contestRoute)


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});