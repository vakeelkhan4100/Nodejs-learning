import ReviewRating from "../models/review.rating.model.js";

export const create = async (req, res) => {
   try{
      req.body.productId = req.body.product_id
      req.body.userId = req.body.user_id
      const IsratingExist = await ReviewRating.findOne({productId:req.body.productId,userId:req.body.userId})
      if(IsratingExist){
         res.send({
            status:false,
            msg:"Already ratted",
            data:{}
         });
         return;
      }
      const AddRating = await ReviewRating.create(req.body);
   if(AddRating){
      res.send({
         status:true,
         msg:"Rating given successfully.",
         data:AddRating
      })
      return;
   }
}catch(err){
   res.send({
      status:false,
      msg:"Something wrong with request.",
      data:err
   })
   return;
}
}

export const getRatingByProduct = async(req,res) =>{
   
   const data = await ReviewRating.find({productId:req.params.pId}).populate("userId");
   if(data.length > 0){
      res.send({
         status:true,
         msg:"Rating and reviews fetch successfully.",
         data:data
      })
   }else{
      res.send({
         status:false,
         msg:"No rating and reviews found for this product.",
         data:[]
      })
   }
}