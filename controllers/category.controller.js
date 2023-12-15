import Category from "../models/category.model.js";

export const create = async (req, res) => {
   try {
      const isCateExist = await Category.findOne({ name: req.body.name })
      if (isCateExist) {
         res.send({
            status: false,
            msg: "Category already exist.",
            data: {}
         })
         return;
      }
      const create = await Category.create(req.body);
      res.send(create);
   } catch (err) {
      res.send({
         status: false,
         msg: "SOmething wrong with request.",
         data: err
      })
   }
}

export const GetAll = async (req, res) => {
   try {
      const data = await Category.find({ status: "Active",deletedAt: false });
      if (data.length > 0) {
         res.send({
            status: true,
            msg: "Data fetch successsfiully.",
            data: data
         })
      } else {
         res.send({
            status: false,
            msg: "Categories not found.",
            data: []
         })
      }
   } catch (err) {
      res.send({
         status: false,
         msg: "SOmething wrong with request.",
         data: err
      })
   }
}

export const GetDataByAgrigate = async (req, res) => {
   const data = await Category.aggregate([
      // {
         // $match: {
         //    name: { $regex: req.query.search }
         // },
      // },
      {
         "$lookup": {
            "from": "subcategories",
            "localField": "_id",
            "foreignField": "cateId",
            "as": "subcategories"
         }
      },
      // {
      //    $count: "product_on_the_budget"
      //    }
      // {
      //    "$unwind": {
      //       path: "$subcategories",
      //       preserveNullAndEmptyArrays: true

      //    }
      // },
      
   //    { $limit: Number(10) },
   //    {
   //       $group:
   //  {
   //    _id: {name: "$name" },
   //    // totalEmployee: { $sum: 1 },
   //  }
   //    }
   ]);
   res.send(data)
}


export const deleteCate = async (req, res) => {
   try {
      var dataToBeUpdate = {};
      dataToBeUpdate.deletedAt = 1;
      const data = await Category.findByIdAndUpdate({ _id: req.body.id }, dataToBeUpdate)

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