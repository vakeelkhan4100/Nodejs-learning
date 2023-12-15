import {create,getRatingByProduct} from "../controllers/review.rating.controller.js"
import Express from "express"
export const reviewrating = Express.Router();

reviewrating.route("/review-rating/create").post(create);
reviewrating.route("/review-rating/list/:pId").get(getRatingByProduct);
