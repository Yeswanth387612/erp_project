import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://admin:admin@cluster0.ybu6mae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "users";
const client = new MongoClient(url);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", async (req, res) => {
    res.status(200).json({ message: "Hello World from Express JS" });
});

app.post("/signup", async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);

        const existingUser = await db.collection("users").findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).json({ success: false, message: "Email already registered" });
        }

        await db.collection("users").insertOne(req.body);
        res.status(200).json({ success: true, message: "Registered Successfully" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ success: false, message: "Server error during signup" });
    } finally {
        await client.close();
    }
});

app.post("/login", async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);

        const user = await db.collection("users").findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (!user) {
            return res.status(200).json("301::Invalid Credentials!");
        }

        res.status(200).json("300::Login Success");
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json("302::Server error during login");
    } finally {
        await client.close();
    }
});

// FETCH USER'S FULL NAME
app.post("/getfullname", async (req, res) => {
    try {
        await client.connect(); // Establish connection with MongoDB
        const db = client.db(dbName); // Connect to the DB

        const user = await db.collection("users").findOne({ email: req.body.email });
        if (!user)
            return res.status(200).json("301::Invalid User!");

        res.status(200).json(user);
    } catch (err) {
        console.log("Error fetching full name:", err);
        res.status(500).json("302::Server error during fetch fullname");
    } finally {
        await client.close(); // Close the connection
    }
});
