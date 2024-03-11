import slugify from "slugify";
import { catchError } from "../../middelware/catchError.js";
import { productModel } from "../../../databases/models/product.model.js";
import { deleteOne, getAllDocuments } from "../handler/handler.js";
import { json } from "express";
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = new productModel(req.body);
  await product.save();
  res.json({ message: "success", product });
});

const getAllProducts = catchError(async (req, res) => {
  
  let apiFeatures = new ApiFeatures(productModel.find(),req.query)
  .sort().fields().filteration().pagination().search()

  let products = await apiFeatures.mongooseQuery;
  
  res.json({ massage: "successs",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, products });

});


const getSingleProduct = catchError(async (req, res) => {
  let product = await productModel.findById(req.params.id);
  !product && res.status(404).json({ message: "product not found" });
  product && res.json({ message: "success", product });
});

const updateProduct = catchError(async (req, res) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((img) => img.filename);
  let product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !product && res.status(404).json({ message: "product not found" });
  product && res.json({ message: "success", product });
});

const deleteProduct = deleteOne(productModel);

export {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
