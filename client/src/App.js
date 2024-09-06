import React, { useState, useEffect } from "react";
import "./App.css";
import Burger from "./components/Burger";
import BurgerControls from "./components/BurgerControls";

function App() {
  const [burger, setBurger] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nextOrderNumber, setNextOrderNumber] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNextOrderNumber();
  }, []);
  // console.log(burger);
  // console.log(nextOrderNumber);
  const handleOrderSubmit = async () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(customerPhone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    const orderDetails = {
      customerPhone,
      burgerDetails: burger.map((item) => ({
        slice: item.slice.name,
        quantity: 1,
        price: item.slice.price,
      })),
      totalPrice: totalPrice * quantity,
    };

    try {
      const response = await fetch("http://localhost:8000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      alert(`Order placed successfully! Order Number: ${data.orderNumber}`);
      fetchNextOrderNumber();
      setBurger([]);
      setQuantity(1);
      setTotalPrice(0);
      setCustomerPhone("");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const fetchNextOrderNumber = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/order/next-order-number"
      );
      const data = await response.json();
      setNextOrderNumber(data.nextOrderNumber);
    } catch (error) {
      console.error("Error fetching next order number:", error);
    }
  };

  const addSlice = (slice, price) => {
    setBurger([...burger, { slice, price }]);
    setTotalPrice(totalPrice + price);
  };

  const removeSlice = (sliceIndex) => {
    const removedSlice = burger[sliceIndex];
    if (removedSlice) {
      const updatedBurger = burger.filter((_, index) => index !== sliceIndex);
      setBurger(updatedBurger);
      setTotalPrice(totalPrice - removedSlice.price);
    }
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  return (
    <div className="App">
      <h1>Anil kumar nayak</h1>
      <Burger burger={burger} />
      <BurgerControls
        addSlice={addSlice}
        removeSlice={removeSlice}
        totalPrice={totalPrice * quantity}
        quantity={quantity}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        burger={burger}
        customerPhone={customerPhone}
        setCustomerPhone={setCustomerPhone}
        handleOrderSubmit={handleOrderSubmit}
      />
      {error && <p className="error-message">{error}</p>}
      <h3>Next Order Number: {nextOrderNumber}</h3>
    </div>
  );
}

export default App;
