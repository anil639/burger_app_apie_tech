const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/order");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/burger")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

// app.get("/", (req, res) => {
//   res.send("Anil kumar nayak");
// });
app.use("/api/order", orderRoutes);

app.listen(8000, () => {
  console.log("app listening on 8000");
});
