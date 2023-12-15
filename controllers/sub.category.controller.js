import SubCategory from "../models/sub.category.model.js";

export const create = async (req, res) => {
   try {
      const isCateExist = await SubCategory.findOne({name:req.body.name})
      if(isCateExist){
         res.send({
            status:false,
            msg:"Sub Category already exist.",
            data:{}
         })
         return;
      }
      const create = await SubCategory.create(req.body);
      res.send(create);
   } catch (err) {
      res.send({
         status: false,
         msg: "Something wrong with request.",
         data: err
      })
   }
}

export const GetAll = async(req,res) =>{
   try{
   const data = await SubCategory.find({status:"Active"}).populate("cateId").populate("createdBy");
   if(data.length > 0){
      res.send({
         status:true,
         msg:"Data fetch successsfiully.",
         data:data
      })
   }else{
      res.send({
         status:false,
         msg:"Sub Categories not found.",
         data:[]
      })
   }
}catch(err){
   res.send({
      status:false,
      msg:"SOmething wrong with request.",
      data:err
   })
}
}

