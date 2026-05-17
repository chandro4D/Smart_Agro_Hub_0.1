const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://smart-agro-hub-0-1-floc.vercel.app",
    credentials: true,
  }),
);
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
    const allPaymentHistory = database.collection("paymentHistory");
    const tempPayments = database.collection("tempPayments");
    const categoriesCollection = database.collection("categories");
    const notificationsCollection = database.collection("notifications");
    const addressCollection = database.collection("addresses");

    // verify Token
    // const verifyToken = (req, res, next) => {
    //   const authHeader = req.headers.authorization;

    //   if (!authHeader) {
    //     return res.status(401).send({ message: "Unauthorized" });
    //   }

    //   const token = authHeader.split(" ")[1];

    //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //       return res.status(403).send({ message: "Forbidden" });
    //     }

    //     req.user = decoded;
    //     next();
    //   });
    // };
    // Verify Admin
    // const verifyAdmin = async (req, res, next) => {
    //   const user = await usersCollection.findOne({
    //     _id: new ObjectId(req.user.id),
    //   });

    //   if (!user || user.role !== "admin") {
    //     return res.status(403).send({ message: "Admin only access" });
    //   }

    //   next();
    // };

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
          role,
        };

        const result = await usersCollection.insertOne(user);
        await notificationsCollection.insertOne({
          message: `New user registered: ${email}`,
          type: "user",
          createdAt: new Date(),
          read: false,
        });

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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.send({
          message: "Login successful",
          token,
          user,
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
    
    // GET SELLER PRODUCTS
    app.get("/seller-products/:email", async (req, res) => {
      try {
        const email = req.params.email;

        const result = await productsCollection
          .find({ sellerEmail: email })
          .sort({ createdAt: -1 })
          .toArray();

        res.send(result);
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to fetch seller products",
        });
      }
    });

    // GET ALL Individual PRODUCTS
    app.get("/products/:category", async (req, res) => {
      try {
        const category = req.params.category;

        const result = await productsCollection
          .find({ category: category })
          .toArray();

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
            {
              user_id: new ObjectId(user_id),
              product_id: new ObjectId(product_id),
            },
            { $inc: { quantity: quantity || 1 } },
            { upsert: true },
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

        const result = await cartCollection
          .aggregate([
            { $match: { user_id: new ObjectId(user_id) } },
            {
              $addFields: {
                product_id: { $toString: "$product_id" }, // convert ObjectId → string
              },
            },
            {
              $lookup: {
                from: "allProducts",
                localField: "product_id",
                foreignField: "_id",
                as: "productDetails",
              },
            },
            { $unwind: "$productDetails" },
          ])
          .toArray();

        res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    });

    // REMOVE CART ITEM
    app.delete("/deleteCartItem/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await cartCollection.deleteOne({
          _id: new ObjectId(id),
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
    // for show payment
    app.get("/payment-details/:trxId", async (req, res) => {
      const trxId = req.params.trxId;

      const payment = await allPaymentHistory.findOne({ transactionId: trxId });

      const products = await productsCollection
        .find({
          _id: { $in: payment.productIds.map((id) => new ObjectId(id)) },
        })
        .toArray();

      res.send({ payment, products });
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
        await notificationsCollection.insertOne({
          message: `New product added: ${product.name}`,
          type: "product",
          createdAt: new Date(),
          read: false,
        });
        res.send(result);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    // GET USER PAYMENT HISTORY
    app.get("/payment-history/:email", async (req, res) => {
      try {
        const email = req.params.email;

        const payments = await allPaymentHistory
          .find({ email })
          .sort({ date: -1 })
          .toArray();

        res.send(payments);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch payment history" });
      }
    });
    // For Payment
    /* 
        Store ID: smart69c356bc8aafe
        Store Password(API / Secret Key): smart69c356bc8aafe @ssl
        Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of 
           registration)
        Store name: testsmart9ms7
        Registered URL: www.smartagrohub_0.1.com
        Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v4/api.php
        Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
        Validation API(Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
        You may check our plugins available for multiple carts and libraries: https://github.com/sslcommerz
 */
    app.post("/ipn-success-payment", async (req, res) => {
      try {
        const ipnData = req.body; // SSLCommerz POSTs JSON
        console.log("IPN Received:", ipnData);
        // validate and save payment
        res.send("IPN Received");
      } catch (err) {
        res.status(500).send("IPN Error");
      }
    });

    app.post("/success", async (req, res) => {
      try {
        const paymentData = req.body;

        console.log("Payment Successful:", paymentData);

        const trxId = paymentData.tran_id;

        // ✅ GET STORED DATA
        const savedPayment = await tempPayments.findOne({ trxId });

        // ✅ DELETE USER CART ITEMS
        if (savedPayment?.cartIds?.length > 0) {
          const cartObjectIds = savedPayment.cartIds.map(
            (id) => new ObjectId(id),
          );

          await cartCollection.deleteMany({
            _id: { $in: cartObjectIds },
          });

          console.log("Cart items deleted:", cartObjectIds);
        } else {
          console.log("No temp payment found for trxId:", trxId);
        }

        const paymentRecord = {
          email: savedPayment?.email || paymentData.cus_email,
          transactionId: trxId,
          amount: parseFloat(paymentData.amount || 0),
          status: paymentData.status,
          date: new Date(),
          cartIds: savedPayment?.cartIds || [],
          productIds: savedPayment?.productIds || [],
        };

        // ✅ SAVE FINAL PAYMENT
        await allPaymentHistory.insertOne(paymentRecord);
        await notificationsCollection.insertOne({
          message: `New payment from ${paymentRecord.email} - ৳${paymentRecord.amount}`,
          type: "payment",
          createdAt: new Date(),
          read: false,
        });

        // ✅ OPTIONAL: DELETE TEMP DATA
        await tempPayments.deleteOne({ trxId });

        res.redirect(`http://localhost:5173/dashboard/paymentHistory`);
        // res.redirect(`http://localhost:5173/success-payment`);
      } catch (error) {
        console.error("Success payment error:", error);
        res.status(500).send("Server Error on success payment");
      }
    });

    // Payment Initiate
    app.post("/create-ssl-payment", async (req, res) => {
      try {
        const payment = req.body;

        console.log("Payment Info:", payment);

        const trxId = new ObjectId().toString();

        // ✅ SAVE DATA HERE
        await tempPayments.insertOne({
          trxId,
          cartIds: payment.cartIds,
          productIds: payment.productIds,
          email: payment.email,
          amount: payment.price,
          status: "pending",
          createdAt: new Date(),
        });
        const initiate = {
          store_id: "smart69c356bc8aafe",
          store_passwd: "smart69c356bc8aafe@ssl",

          total_amount: payment.price, // no need for template string
          currency: "BDT",
          tran_id: trxId,

          success_url: "http://localhost:5000/success",
          fail_url: "http://localhost:5000/fail",
          cancel_url: "http://localhost:3030/cancel",
          ipn_url: "http://localhost:5000/ipn-success-payment",

          shipping_method: "Courier",
          product_name: "Computer",
          product_category: "Electronic",
          product_profile: "general",

          cus_name: "Customer Name",
          cus_email: payment.email,
          cus_add1: "Dhaka",
          cus_add2: "Dhaka",
          cus_city: "Dhaka",
          cus_state: "Dhaka",
          cus_postcode: "1000",
          cus_country: "Bangladesh",
          cus_phone: "01711111111",

          ship_name: "Customer Name",
          ship_add1: "Dhaka",
          ship_add2: "Dhaka",
          ship_city: "Dhaka",
          ship_state: "Dhaka",
          ship_postcode: "1000",
          ship_country: "Bangladesh",
          value_a: trxId,
        };

        // ✅ Convert to form data
        const params = new URLSearchParams(initiate);

        // ✅ Call SSLCommerz
        const sslResponse = await fetch(
          "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
          },
        );

        // ✅ Parse JSON response
        const data = await sslResponse.json();

        console.log("SSLCommerz Response:", data);

        // ❗ Important: send gateway URL to frontend
        if (data.status === "SUCCESS") {
          return res.json({
            url: data.GatewayPageURL,
            trxId: trxId,
          });
        } else {
          return res.status(400).json({
            error: data.failedreason || "Payment initiation failed",
          });
        }
      } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ error: "Server error during payment" });
      }
    });
    // All Payments
    app.get("/all-payments", async (req, res) => {
      try {
        const result = await allPaymentHistory
          .find()
          .sort({ date: -1 })
          .toArray();

        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch payments" });
      }
    });

    // Make Admin Route
    app.patch("/users/admin/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role: "admin" } },
        );

        res.send({
          success: true,
          message: "User promoted to admin",
          result,
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to update role" });
      }
    });
    // UPDATE USER ROLE
    app.patch("/users/role/:id", async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;

      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role } },
      );

      res.send(result);
    });
    // Delete User Route
    app.delete("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await usersCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "User not found" });
        }

        res.send({
          success: true,
          message: "User deleted successfully",
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to delete user" });
      }
    });
    // DELETE PRODUCT
    app.delete("/allProducts/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await productsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount > 0) {
          res.send({
            success: true,
            message: "Product deleted successfully",
          });
        } else {
          res.status(404).send({
            success: false,
            message: "Product not found",
          });
        }
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to delete product",
        });
      }
    });

    // UPDATE PRODUCT
    app.patch("/allProducts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await productsCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              name: updatedData.name,
              category: updatedData.category,
              price: updatedData.price,
              stock: updatedData.stock,
              image: updatedData.image,
              description: updatedData.description,
            },
          },
        );

        res.send({
          success: true,
          message: "Product updated successfully",
          result,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to update product",
        });
      }
    });
    // Admin product category management
    // GET ALL CATEGORIES
    app.get("/categories", async (req, res) => {
      try {
        const result = await categoriesCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch categories" });
      }
    });

    // ADD CATEGORY
    app.post("/categories", async (req, res) => {
      try {
        const category = req.body;

        const exists = await categoriesCollection.findOne({
          slug: category.slug,
        });

        if (exists) {
          return res.status(400).send({
            success: false,
            message: "Category already exists",
          });
        }

        category.createdAt = new Date();

        const result = await categoriesCollection.insertOne(category);

        res.send({
          success: true,
          insertedId: result.insertedId,
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to add category" });
      }
    });

    // UPDATE CATEGORY
    app.patch("/categories/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updated = req.body;

        const result = await categoriesCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              name: updated.name,
              slug: updated.slug,
              image: updated.image,
              description: updated.description,
            },
          },
        );

        res.send({
          success: true,
          result,
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to update category" });
      }
    });

    // DELETE CATEGORY
    app.delete("/categories/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await categoriesCollection.deleteOne({
          _id: new ObjectId(id),
        });

        res.send({
          success: true,
          result,
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to delete category" });
      }
    });
    // UPDATE PAYMENT STATUS (ADMIN)
    app.patch("/payments/status/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { status } = req.body;

        const result = await allPaymentHistory.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } },
        );

        res.send({
          success: true,
          message: "Payment status updated",
          result,
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to update status" });
      }
    });

    app.get("/notifications", async (req, res) => {
      try {
        const result = await notificationsCollection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch notifications" });
      }
    });
    app.patch("/notifications/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await notificationsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { read: true } },
        );

        res.send({
          success: true,
          message: "Notification marked as read",
          result,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          error: "Failed to update notification",
        });
      }
    });
    // For server Settings
    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;
      const { name, PhotoURL } = req.body;

      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: { name, PhotoURL },
        },
      );

      res.send({ success: true, result });
    });
    app.patch("/change-password/:id", async (req, res) => {
      const id = req.params.id;
      const { oldPassword, newPassword } = req.body;

      const user = await usersCollection.findOne({
        _id: new ObjectId(id),
      });

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.send({ success: false, message: "Old password incorrect" });
      }

      const hashed = await bcrypt.hash(newPassword, 10);

      await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { password: hashed } },
      );

      res.send({ success: true });
    });
    // For User Dashboard Address section
    // GET user addresses
    app.get("/addresses/:userId", async (req, res) => {
      const result = await addressCollection
        .find({ userId: req.params.userId })
        .toArray();
      res.send(result);
    });

    // ADD address
    app.post("/addresses", async (req, res) => {
      const data = req.body;
      const result = await addressCollection.insertOne(data);
      res.send(result);
    });

    // UPDATE address
    app.patch("/addresses/:id", async (req, res) => {
      const id = req.params.id;
      const updated = req.body;

      const result = await addressCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updated },
      );

      res.send(result);
    });

    // DELETE address
    app.delete("/addresses/:id", async (req, res) => {
      const result = await addressCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // SELLER DASHBOARD STATS API
    app.get("/seller-stats/:email", async (req, res) => {
      try {
        const email = req.params.email;

        // Seller Products
        const products = await productsCollection
          .find({ sellerEmail: email })
          .toArray();

        const totalProducts = products.length;

        // Product IDs
        const productIds = products.map((p) => p._id.toString());

        // Seller Payments
        const payments = await allPaymentHistory.find().toArray();

        let totalRevenue = 0;
        let totalOrders = 0;

        payments.forEach((payment) => {
          const hasSellerProduct = payment.productIds?.some((id) =>
            productIds.includes(id),
          );

          if (hasSellerProduct) {
            totalRevenue += Number(payment.amount);
            totalOrders += 1;
          }
        });

        // LOW STOCK
        const lowStockProducts = products.filter(
          (product) => Number(product.stock) < 5,
        );

        res.send({
          totalProducts,
          totalRevenue,
          totalOrders,
          lowStock: lowStockProducts.length,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to load seller stats",
        });
      }
    });

    // SELLER RECENT ORDERS
    app.get("/seller-orders/:email", async (req, res) => {
      try {
        const email = req.params.email;

        const sellerProducts = await productsCollection
          .find({ sellerEmail: email })
          .toArray();

        const sellerProductIds = sellerProducts.map((p) => p._id.toString());

        const payments = await allPaymentHistory
          .find()
          .sort({ date: -1 })
          .toArray();

        const sellerOrders = payments.filter((payment) =>
          payment.productIds?.some((id) => sellerProductIds.includes(id)),
        );

        res.send(sellerOrders);
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Failed to fetch seller orders",
        });
      }
    });
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
