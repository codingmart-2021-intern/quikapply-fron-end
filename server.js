
const express = require('express');
const path = require('path');
const app = express();

// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static("build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
};

app.listen(
    port,
    () => console.log("Server started on port 8000"));


    //     // "start": "node server.js",
