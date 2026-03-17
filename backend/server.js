const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Agro Hub Server Running");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pirk1d4.mongodb.net/?appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {

    const database = client.db("smartAgroHub");
    const usersCollection = database.collection("users");
    const productsCollection = database.collection("allProducts");
    const cartCollection = database.collection("allCartItems");


    // SIGNUP
    app.post("/signup", async (req, res) => {
      try {
        const { name, email, password, PhotoURL, role } = req.body;

        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
          return res.status(400).send({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
          name,
          email,
          password: hashedPassword,
          PhotoURL,
          role
        };

        const result = await usersCollection.insertOne(user);

        res.send({ message: "User registered successfully", result });

      } catch (error) {
        res.status(500).send(error);
      }
    });

    // LOGIN
    app.post("/login", async (req, res) => {
      try {

        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email });

        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).send({ message: "Invalid password" });
        }

        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.send({
          message: "Login successful",
          token,
          user
        });

      } catch (error) {
        res.status(500).send(error);
      }
    });
    // GET ALL PRODUCTS
    app.get("/allProducts", async (req, res) => {
      try {
        const result = await productsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    // ADD TO CART
    app.post("/allCartItems", async (req, res) => {
      try {
        const { user_id, product_id, quantity } = req.body;

        if (!user_id || !product_id) {
          return res.status(400).json({
            success: false,
            message: "user_id and product_id required",
          });
        }

        const existingItem = await cartCollection.findOne({
          user_id: new ObjectId(user_id),
          product_id: new ObjectId(product_id),
        });

        if (existingItem) {
          const updatedQuantity = existingItem.quantity + (quantity || 1);

          await cartCollection.updateOne(
            { user_id: new ObjectId(user_id), product_id: new ObjectId(product_id) },
            { $inc: { quantity: quantity || 1 } },
            { upsert: true }
          );

          return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
          });
        }

        const cartItem = {
          user_id: new ObjectId(user_id),
          product_id: new ObjectId(product_id),
          quantity: quantity || 1,
          createdAt: new Date(),
        };

        await cartCollection.insertOne(cartItem);

        res.status(201).json({
          success: true,
          message: "Item added to cart",
        });

      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Server error",
        });
      }
    });

    // GET USER CART ITEMS
    app.get("/allCartItems/:user_id", async (req, res) => {
      try {
        const user_id = req.params.user_id;

        const result = await cartCollection.aggregate([
          { $match: { user_id: new ObjectId(user_id) } },
          {
            $lookup: {
              from: "allProducts",
              localField: "product_id",
              foreignField: "_id",
              as: "productDetails"
            }
          },
          { $unwind: "$productDetails" }
        ]).toArray();

        res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    });

    // REMOVE CART ITEM
    app.delete("/deleteCartItem/:user_id/:product_id", async (req, res) => {
      try {
        const { user_id, product_id } = req.params;
        const result = await cartCollection.deleteOne({
          user_id: new ObjectId(user_id),
          product_id: new ObjectId(product_id),
        });
        if (result.deletedCount > 0) {
          res.status(200).json({ success: true, message: "Item deleted" });
        } else {
          res.status(404).json({ success: false, message: "Item not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
      }
    });

    // GET ALL USERS
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // GET SINGLE PRODUCT
    app.get("/allProducts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await productsCollection.findOne(query);

        res.send(result);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    // ADD PRODUCT
    app.post("/allProducts", async (req, res) => {
      try {
        const product = req.body;
        const result = await productsCollection.insertOne(product);
        res.send(result);
      } catch (error) {
        res.status(500).send(error);
      }
    });


  } finally {

  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});