import fs from "fs";
export const AllData = (req,res) => {
    fs.readFile("user.json",(err,data) =>{
        if(err){
            var response = {
                "status":false,
                "msg":"Something wrong with request.",
                "data":err,
            }
        }else{
            var response = {
                "status":true,
                "msg":"File read successfully.",
                "data":JSON.parse(data),
            }
        }
        
        res.send(response);
    })
    console.log("Controller is working");
    
}
export const writeFile = (req,res) => {
    fs.writeFile("data.json","Hello world",(error) => {
        if(error == null){
            var data = {
                "status":true,
                "msg":"File created successfully.",
                "data":[],
            }
        }else{
            var data = {
                "status":false,
                "msg":"Something wrong with request.",
                "data":error,
            }
        }
        res.send(data);
    })
    console.log("Controller is working");
    
}
