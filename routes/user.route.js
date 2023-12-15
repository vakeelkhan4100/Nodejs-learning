import {signup,login,getAllUsers, update, deleteUser,ResendOtp,VerifyOtp,ResetPassword,InsertBulkUsers,ImageUploadUser} from "../controllers/user.controller.js";
import { authentication } from "../middleware/authentication.js";
import { ExcelUpload } from "../services/image.service.js";
import Express from "express";
export const user = Express.Router()
user.route("/user/signup").post(signup);
user.route("/user/login").post(login);
user.route("/user/get-all-users").get(getAllUsers);
user.route("/user/update").put(authentication,update);
user.route("/user/delete").delete(authentication,deleteUser);
user.route("/user/resend-otp").post(ResendOtp);
user.route("/user/verify-otp").post(VerifyOtp);
user.route("/user/reset-password").post(ResetPassword);
user.route("/user/import").post(ExcelUpload.single("excel_data"),InsertBulkUsers);
user.route("/user/image-upload",).post(ImageUploadUser);
