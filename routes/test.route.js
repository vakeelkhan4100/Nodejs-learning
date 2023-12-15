import {AllData,writeFile} from "../controllers/test.controller.js"
import Express from "express"
export const test = Express.Router();

test.route("/test/all-data").get(AllData);
test.route("/test/create").post(writeFile);
//route_package.(jis url per chelana hai).method=get,post,put,delete(jis module chelana hai is route per thik h)
export default test;