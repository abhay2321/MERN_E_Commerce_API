import { Products } from "../Models/product.js";

//! Add Products
export const addProducts = async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;

  try {
    const newProduct = new Products({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
     await newProduct.save();

    res
      .status(201)
      .json({ message: "Product Added Successfully'''!", newProduct });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Server Error" });
  }
};

//! Get All Products
export const getProducts = async (req, res) => {
    let products = await Products.find().sort({createdAt:-1})
    res.json({message: "All Products",products});
}

//! Get Product By ID
export const getProductsById = async (req, res) => {
    const id = req.params.id;
    let product = await Products.findById(id)

    if(!product) return res.json({message: "Invalid Product ID", success: false});

    res.json({message: "Specific Product",product});
}

//! Update Product By ID
export const updateProductById = async (req, res) => {
    const id = req.params.id;

    let updatePro = await Products.findByIdAndUpdate(id,req.body,{new:true})
    
    if(!updatePro) return res.json({message: "Invalid Product ID", success: false});

    res.json({message: "Product has been Updated",updatePro});
}

//! Delete Product By ID
export const deleteProductById = async (req, res) => {
    const id = req.params.id;

    let delProduct = await Products.findByIdAndDelete(id)
    
    if(!delProduct) return res.json({message: "Invalid Product ID", success: false});

    res.json({message: "Product has been deleted",delProduct});
}