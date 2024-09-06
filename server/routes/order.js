const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

let orderSerial = 0;
//add order
router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    orderSerial += 1;
    const orderNumber = `BURG-${orderSerial.toString().padStart(3, "0")}`;
    const { customerPhone, burgerDetails, totalPrice } = req.body;

    const newOrder = new Order({
      orderNumber,
      customerPhone,
      burgerDetails,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed!", orderNumber });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});
//get next order number
router.get("/next-order-number", (req, res) => {
  const nextOrderNumber = `BURG-${(orderSerial + 1)
    .toString()
    .padStart(3, "0")}`;
  res.json({ nextOrderNumber });
});

module.exports = router;
