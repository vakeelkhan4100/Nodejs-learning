import {create,GetAll} from "../controllers/sub.category.controller.js"
import Express from "express"
export const subcategory = Express.Router();

subcategory.route("/sub-category/create").post(create);
subcategory.route("/sub-category/get-all").get(GetAll);
