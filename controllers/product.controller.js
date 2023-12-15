import Product from "../models/product.model.js";
// import ProductImages from "../models/product.images.model.js";
export const create = async(req,res) => {
    try{
        var allImages = [];
        req.files.forEach(image => {
           var imageType = '';
            if(image.mimetype == 'image/png'){
                imageType = 'png';
            }else if(image.mimetype == 'image/jpg' || image.mimetype == 'image/jpeg'){
                imageType = 'jpg';
            }
            let imageData = {
                path:image.filename,
                fullpath:"localhost:3002/"+image.path,
                type:imageType,
            }
               allImages.push(imageData)
        });
        req.body.images = allImages
    const createProd = await Product.create(req.body);
    if(createProd){
        
    }
    res.send(createProd);
}catch(err){
    res.send({
        status:false,
        msg:"Something wrong with request.",
        data:err
    });
}
} 


export const GetAll = async(req,res) =>{
    try{
        var where = {status:"Active",sub_cate_id:req.params.subCateId}
        // if(req.query.search){
        //     where.name = req.query.search;
        // }
    const data = await Product.find(where).sort({'_id': -1});
    if(data.length > 0){
       res.send({
          status:true,
          msg:"Data fetch successsfiully.",
          data:data
       })
    }else{
       res.send({
          status:false,
          msg:"Product not found.",
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