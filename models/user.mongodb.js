const mongoose = require("mongoose");

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://aniketrajsingh2005:obo3taDfn7v3Pcdt@cluster0.5wyqaju.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit process on failure
    }
};

connectDB();

// Define Schema
const userSchema = new mongoose.Schema({
    name: String,
    message: String
}, { collection: "users" });

const Lol = mongoose.model("users", userSchema);

// Insert User
const getUser = async (name, message) => {
    try {
        const newUser = new Lol({ name, message });
        await newUser.save();
        console.log("✅ User inserted successfully");
    } catch (error) {
        console.error("❌ Error inserting user:", error);
    }
};

// Fetch All Users
const getAllUsers = async () => {
    try {
        const allUsers = await Lol.find();
        return allUsers;
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        return null;
    }
};

module.exports = { getUser, getAllUsers };
