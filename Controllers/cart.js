import { Cart } from "../Models/cart.js";

//! Add items to Cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;

  const userId = req.user;

  //find user specific id
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  //to find the index of item
  const itemIndex = cart.items.findIndex(
    (items) => items.productId.toString() === productId
  );

  // increase by 1 when item in cart otherwise push the item to cart
  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  await cart.save();

  res.json({ message: "Cart added successfully", cart });
};

//! Get User Cart
export const userCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.json({ message: "User Cart", cart });
};

//! remove product from cart
export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();

  res.json({ message: "product remove from Cart", cart });
};

//! Clear Cart
export const clearCart = async (req, res) => {
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new cart.findOne({ userId });
  } else {
    cart.items = [];
  }

  await cart.save();

  res.json({ message: "Cart cleared" });
};

//! Decrease QTY from Cart
export const decreaseProudctQty = async (req, res) => {
  const { productId, qty} = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });
 
  if (!cart) {
    cart = new Cart({ userId, items: [] });
    // return res.json({messge:'Cart not find'})
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex]

    if(item.qty > qty){
        const pricePerUnit = item.price/item.qty

        item.qty -= qty
        item.price -= pricePerUnit*qty
    }else{
        cart.items.splice(itemIndex,1)
    }

  } else {
    return res.json({messge:'invalid product Id'})
  } 

  await cart.save();
  res.json({ message: "Items qty decreased", cart });
};