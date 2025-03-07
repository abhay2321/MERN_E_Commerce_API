import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;

  let userAddress = await Address.create({
    userId: req.user,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  });
  res.json({ message: "Address Added", userAddress, success:true });
};

//! Get Address 
export const getAddress = async (req,res) => {
  let address = await Address.find({userId:req.user}).sort({createdAt:-1})

  res.json({ message: "Address", userAddress:address[0]});
}
