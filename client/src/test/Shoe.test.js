import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // เพิ่มการนำเข้า BrowserRouter
import Shoe from "../Component/Shoe";
import { CartContext } from "../contexts/CartContext";

test("clicking the 'Add to Cart' button calls addToCart function with correct arguments", () => {
  const addToCart = jest.fn();

  const shoe = {
    id: 1,
    image: ["shoe1.jpg"],
    category: "Men",
    products_name: "Shoe 1",
    price: 100,
  };

  const { getByTestId } = render(
    <BrowserRouter>
      {" "}
      <CartContext.Provider value={{ addToCart }}>
        <Shoe shoe={shoe} />
      </CartContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(getByTestId("add-to-cart-button"));

  expect(addToCart).toHaveBeenCalledWith(shoe, shoe.id);
});
