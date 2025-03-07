import RazorPay from "razorpay";

const razorpay = new RazorPay({
  key_id: "rzp_test_5exk6zvWI0NKJW",
  key_secret: "igGOHz8DpaT9fnR3o7dNQ9gA",
});

const testOrder = async () => {
  try {
    const options = {
      amount: 1000, // ₹10.00
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("Order Created Successfully:", order);
  } catch (error) {
    console.error("Error Creating Order:", error);
  }
};

testOrder();
