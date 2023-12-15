import {create,GetAll} from "../controllers/product.controller.js";
import {imageUpload} from "../services/image.service.js"
import Express from "express"
export const product = Express.Router();

product.route("/product/create").post(imageUpload.array('product_image',10),create);
product.route("/product/list/:subCateId/:search").get(GetAll);
