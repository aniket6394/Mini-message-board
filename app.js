const express = require('express');
const path = require('path');
const app = express();
const { getUser, getAllUsers } = require("./models/user.mongodb.js");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    const users = await getAllUsers() || [];
    res.render("index", { users });
});
app.post("/submit", (req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    console.log("Name:", name);
    console.log("Message:", message);
    res.redirect("/");
    getUser(name, message)
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});