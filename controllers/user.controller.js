import jwt from "jsonwebtoken";
import fs from "fs";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import csv from "csvtojson";

export const signup = async (req, res) => {

   try {
      const IsEmailExist = await User.findOne({ email: req.body.email })
      const IsMobileExist = await User.findOne({ mobile: req.body.mobile })
      if (IsEmailExist) {
         res.send({
            status: false,
            msg: "Email already exist.",
            data: {}
         });
         return;
      } else if (IsMobileExist) {
         res.send({
            status: false,
            msg: "Mobile already exist.",
            data: {}
         });
         return;
      }
      else {
         var otp = Math.floor(1000 + Math.random() * 9000);

         const passwordHash = await bcrypt.hash(req.body.password, 10)
         req.body.password = passwordHash
         req.body.otp = otp
         var user = await User.create(req.body);
         if (user) {
            user.token = await jwt.sign({ time: Date(), userId: user._id }, "coaching")
            res.send({
               status: true,
               msg: "Signup Successfully.",
               data: user
            });
         }
         // user.token = token

      }
   }
   catch (err) {
      res.status(500).send({
         status: false,
         msg: "Something wrong with request.",
         data: err
      })
   }
}

export const login = async (req, res) => {
   var getUserData = await User.findOne({ email: req.body.email });
   if (getUserData) {
      let checkPass = await bcrypt.compare(req.body.password, getUserData.password)
      if (checkPass) {
         getUserData.token = await jwt.sign({ time: Date(), userId: getUserData._id }, "coaching")
         res.send({
            status: true,
            msg: "Login Succesfully",
            data: getUserData
         })
      } else {
         res.send({
            status: false,
            msg: "Invalid Password given.",
            data: {}
         })
      }
   } else {
      res.send({
         status: false,
         msg: "Email not found",
         data: {}
      })
   }
}

export const getAllUsers = async (req, res) => {
   var where = {}
   if (req.query.email) {
      where.email = req.query.email
   }
   if (req.query.username) {
      where.username = req.query.username
   }
   const data = await User.find(where,{password:0})
   if (data.length > 0) {
      res.send({
         status: true,
         msg: "User data fetch successfully.",
         data: data
      })
   } else {
      res.send({
         status: false,
         msg: "No data found",
         data: []
      })
   }
   res.send(data)
}

export const update = async (req, res) => {
   try {
      const data = await User.findByIdAndUpdate({ _id: req.body.id }, req.body)
      if (data) {
         res.send({
            status: true,
            msg: "update successfully.",
            data: {}
         })
      } else {
         res.send({
            status: false,
            msg: "data found with given id or something wrong with update",
            data: {}
         })
      }
   } catch (err) {
      res.send({
         status: false,
         msg: "data found with given id or something wrong with update",
         data: {}
      })
   }
}


export const deleteUser = async (req, res) => {
   try {
      const data = await User.findByIdAndDelete({ _id: req.body.id })
      if (data) {
         res.send({
            status: true,
            msg: "Deleted successfully.",
            data: {}
         })
      } else {
         res.send({
            status: false,
            msg: "data found with given id",
            data: {}
         })
      }
   } catch (err) {
      res.send({
         status: false,
         msg: "Something wrong with request.",
         data: {}
      })
   }
}

export const ResendOtp = async (req, res) => {
   try {
      var otp = Math.floor(1000 + Math.random() * 9000);
      req.body.otp = otp;
      const data = await User.findOneAndUpdate({ mobile: req.body.mobile_no }, req.body)
      if (data) {
         res.send({
            status: true,
            msg: "Otp resend successfully.",
            data: { otp }
         })
      } else {
         res.send({
            status: false,
            msg: "data not found with given id",
            data: {}
         })
      }
   } catch (err) {
      res.send({
         status: false,
         msg: "Something went wrong with request.",
         data: {}
      })
   }
}

export const VerifyOtp = async (req, res) => {
   const checkOtp = await User.findOne({ mobile: req.body.mobile_no, otp: req.body.otp })
   if (checkOtp) {
      var dataToBeUpdate = {};
      dataToBeUpdate.number_verified = true;
      await User.findByIdAndUpdate({ _id: checkOtp._id }, dataToBeUpdate)
      checkOtp.number_verified = true;
      res.send({
         status: true,
         msg: "Otp Verified succesfully.",
         data: checkOtp
      }); return;
   } else {
      res.send({
         status: false,
         msg: "Invalid Otp or mobile no. given.",
         data: {}
      }); return;
   }
}

export const ResetPassword = async (req, res) => {
   const checkUserExist = await User.findOne({ _id: req.body._id })
   if (checkUserExist) {
      let checkPass = await bcrypt.compare(req.body.old_pass, checkUserExist.password)
      if (checkPass) {
         var dataToBeUpdate = {};
         const passwordHash = await bcrypt.hash(req.body.new_pass, 10)
         dataToBeUpdate.password = passwordHash;
         await User.findByIdAndUpdate({ _id: checkUserExist._id }, dataToBeUpdate)
         res.send({
            status: true,
            msg: "Password Reset Succesfully",
            data: checkUserExist
         })
      } else {
         res.send({
            status: false,
            msg: "Invalid Old Password given.",
            data: {}
         })
      }
   } else {
      res.send({
         status: false,
         msg: "User not found with given ID.",
         data: {}
      }); return;
   }
}
function importUserRes(uName, email, reason, key) {
   return {
      username: uName,
      email: email,
      reason: reason,
      key: key,
   
   }
}
export const InsertBulkUsers = async (req, res) => {
   const jsonArray = await csv().fromFile(req.file.path);
   var rejected = []
   var success = 0
   jsonArray.forEach(async (value, key) => {
   
      const IsEmailExist = await User.findOne({ email: value.email })
      const IsMobileExist = await User.findOne({ mobile: value.mobile })
      if (!value.email) {
         rejected.push(importUserRes(value.username, value.email, "Email can not be blenk.", key ))
      } else if (!value.password) {
         rejected.push(importUserRes(value.username, value.email, "Password can not be blenk.", key ))
      }
      else if (!value.username) {
         rejected.push(importUserRes(value.username, value.email, "Username can not be blenk.", key ))
      }
      else if (!value.number) {
         rejected.push(importUserRes(value.username, value.email, "Mobile no. can not be blenk.", key ))

      }
     
      else if (IsEmailExist) {
         rejected.push(importUserRes(value.username, value.email, "Email already taken.", key ))
      } else if (IsMobileExist) {
         rejected.push(importUserRes(value.username, value.email, "Mobile no. already taken.", key ))
      }
      else {
         console.log("cheak-------",value);
         value.mobile=value.number
         const passwordHash = await bcrypt.hash(value.password, 10)
         value.password = passwordHash
         var user = await User.create(value);
         console.log(user);
         if (user) {
            success++;
            console.log("success----", success)
         }
      }

   });
   setTimeout(() => {
      if (success == 0) {
         res.send({
            status: false,
            msg: "No data inserted.",
            success: success,
            rejected_data: rejected,
            total:jsonArray.length
         })
      } else {
         res.send({
            status: false,
            msg: "Data inserted succefully.",
            success: success,
            rejected_data: rejected,
            total:jsonArray.length
            
         })
      }
   }, "1000")

}
export const ImageUploadUser = async (req, res) => {
   var imgBase64 = req.body.image;
   var lowerCase = imgBase64.toLowerCase();
   var extension = undefined;
   if (lowerCase.indexOf("png") == 11) {
      extension = "png"
      var base64Data = imgBase64.replace(/^data:image\/png;base64,/, "");
   }
   else if (lowerCase.indexOf("jpg") == 11 || lowerCase.indexOf("jpeg") == 11) {
      extension = "jpg"
      var base64Data = imgBase64.replace(/^data:image\/jpeg;base64,/, "");
   }
   var ImagePath = "product_upload" + "/" + Date.now() + "." + extension;
   fs.writeFile(ImagePath, base64Data, 'base64', function (err) {
      console.log("err----", err)
      if (err) {
         res.send({
            status: false,
            msg: "Invalid image uploaded.",
            data: {},
         });
         return;
      } else {
         res.send({
            status: true,
            msg: "image uploaded succesfully.",
            data: ImagePath,
         });
         return;
      }
   });
}
