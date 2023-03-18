const express = require("express");
const cors = require("cors");

// IMPORTING LOCAL STUFF
const userRouter = require("./routes/userRoutes");

const app = express();

// IMPLEMENTING CORS SO THAT OTHER WEBSITES CAN USE OUR API
app.use(cors()); // THIS WILL WORK FOR SIMPLE REQUESTS LIKE (GET AND POST) BUT NOT FOR (PATCH, DELETE or PUT). or for cookies

// FOR NON-SIMPLE REQUEST WE USE app.options request.
app.options("*", cors()); // app.options() is just like app.get or post etc.

// app.use(express.json()); // to use data that is sent by user from front-end. limit the data to 10kb that user can sent.
// app.use(express.urlencoded({ extended: true })); // TO USE DATA COMING FROM FRONTEND BY SUBMITTING FORM

app.use(express.static(`${__dirname}/public`)); // to access files from the server. (STATIC FILES)

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    res.status(200).json({
        status: true,
        data: "Invalid URL.",
    });
});

// Making Error Handling MIddleware.
// if we pass 4 arguments express will automatically recognize it as an error handling middleware
app.use((err, req, res, next) => {
    res.status(200).json({
        status: false,
        data: err,
    });
});

module.exports = app;
