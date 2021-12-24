const express = require("express");
const app = express();
const hackathonRoute = require('./routes/hackathonRoute');

// Getting hackathons
app.use('/api/hackathon', hackathonRoute);

// Getting internships
app.get("/api/internship", (req, res) => {
    res.send();
})

// Getting contests
app.get("/api/contest", (req, res) => {
    res.send();
})


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});