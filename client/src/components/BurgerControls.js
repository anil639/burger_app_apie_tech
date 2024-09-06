import React from "react";

const BurgerControls = ({
  addSlice,
  removeSlice,
  totalPrice,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  burger,
  customerPhone,
  setCustomerPhone,
  handleOrderSubmit,
}) => {
  const sliceOptions = [
    { name: "Aloo Tikki", type: "aloo-tikki", price: 20, color: "#d2691e" },
    { name: "Cheese", type: "cheese", price: 10, color: "#f5e50a" },
    { name: "Paneer", type: "Paneer", price: 30, color: "#CBCBCB" },
  ];
  //   console.log(burger);
  return (
    <div className="burger-controls">
      <h2>Add Burger Slices</h2>
      {sliceOptions.map((slice) => (
        <button key={slice.name} onClick={() => addSlice(slice, slice.price)}>
          Add {slice.name} - ₹{slice.price}
        </button>
      ))}

      {burger.map((item, index) => (
        <button key={index} onClick={() => removeSlice(index)}>
          Remove {item.slice.name} - ₹{item.slice.price}
        </button>
      ))}

      <h2>Total Price: ₹{totalPrice}</h2>
      <h3>Quantity: {quantity}</h3>
      <button onClick={increaseQuantity}>Add Burger</button>
      <button onClick={decreaseQuantity}>Remove Burger</button>
      <div className="order-form">
        <h3>Place Your Order</h3>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />
        <button onClick={handleOrderSubmit}>Submit Order</button>
      </div>
    </div>
  );
};

export default BurgerControls;
