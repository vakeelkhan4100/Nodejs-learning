import {create,GetAll,GetDataByAgrigate,deleteCate} from "../controllers/category.controller.js"
import Express from "express"
export const category = Express.Router();

category.route("/category/create").post(create);
category.route("/category/list").get(GetAll);
category.route("/category/list-test").get(GetDataByAgrigate);
category.route("/category/delete").post(deleteCate);
