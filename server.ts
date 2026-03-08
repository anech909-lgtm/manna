import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/order", async (req, res) => {
    try {
      const orderData = req.body;
      
      // Configure nodemailer
      // In a real app, you would use real credentials from process.env
      // For this demo, we'll use a test account or just log if no credentials are provided
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Format order details based on order type
      let orderDetailsText = "";
      if (orderData.orderType === 'cinnamon-rolls') {
        orderDetailsText = `
Flavor: ${orderData.flavorSelection}
Quantity: ${orderData.quantity}
        `;
      } else if (orderData.orderType === 'salad-bowls') {
        orderDetailsText = `
Base: ${orderData.base}
Protein: ${Array.isArray(orderData.protein) ? orderData.protein.join(', ') : orderData.protein}
Toppings: ${Array.isArray(orderData.toppings) ? orderData.toppings.join(', ') : orderData.toppings}
Dressing: ${orderData.dressing}
Quantity: ${orderData.quantity}
        `;
      } else if (orderData.orderType === 'sweet-potatoes') {
        orderDetailsText = `
Meat: ${orderData.meat}
Toppings: ${Array.isArray(orderData.toppings) ? orderData.toppings.join(', ') : orderData.toppings}
Quantity: ${orderData.quantity}
        `;
      }

      const mailOptions = {
        from: process.env.SMTP_FROM || '"Manna Cart Orders" <orders@mannacart.com>',
        to: process.env.ORDER_EMAIL_TO || "orders@mannacart.com",
        subject: `New Pre-Order: ${orderData.orderType} from ${orderData.customerName}`,
        text: `
New Pre-Order Received!

Customer Information:
---------------------
Name: ${orderData.customerName}
Phone: ${orderData.fullPhoneNumber || orderData.phoneNumber}
Delivery Address: ${orderData.deliveryAddress}
Delivery Date: ${orderData.deliveryDate}

Order Details:
--------------
Type: ${orderData.orderType}
${orderDetailsText}

Special Instructions:
---------------------
${orderData.specialInstructions || 'None'}
        `,
      };

      // Only attempt to send if we have SMTP credentials configured, otherwise just log it
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } else {
        console.log("Email would be sent with the following details (configure SMTP in .env to actually send):");
        console.log(mailOptions.text);
      }

      res.json({ success: true, message: "Your preorder has been received. We will contact you soon." });
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).json({ success: false, message: "Failed to process order." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files
    app.use(express.static("dist"));
  }

  // Catch-all route to serve index.html for SPA routing
  app.use('*', async (req, res, next) => {
    try {
      if (process.env.NODE_ENV !== "production") {
        // In dev, let Vite handle it. If it falls through to here, it might be a 404.
        // But actually, Vite's middleware handles index.html for appType: 'spa'.
        // Just in case, we can send a 404 or let it be.
        res.status(404).send('Not Found');
      } else {
        res.sendFile('index.html', { root: 'dist' });
      }
    } catch (e) {
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
