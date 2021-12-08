const Database = require("../models/Database");
let fs = require("fs");

class Product {

    query ="";
    id = 0;
    name = "";
    pcid = 0;
    description = "";
    specification = "";
    mrp = 0;
    price = 0;
    stock = 0;
    avilability = "";
    status = "";
    imagename = "";
    base64image = "";

    db = new Database.Database();


    constructor(){
        this.id = 0;
        this.name = "";
        this.pcid = 0;
        this.description = "";
        this.pcid = 0;
        this.description = "";
        this.specification = "";
        this.mrp = 0;
        this.price = 0;
        this.stock = 0;
        this.avilability = "";
        this.status = "";
        this.imagename = "";

    }

    save = ()=>{

         if(this.base64image != "")
         {
             this.base64image = this.base64image.replace(/^data:image\/png;base64,/, "");
             this.imagename =   "productpics/"+ this.db.randomString(10) + ".png";
             fs.writeFile("assets/" + this.imagename, this.base64image, 'base64',function(err){
                 console.log("Error image saving-" + err);
             });
         }
        
         


         if(this.id == 0){
         this.query ="INSERT INTO products(name , pcid, description,specification,mrp,price,stock,avilability,status,imagename)";
         this.query += "VALUES('" + this.name + "', " + this.pcid +",'" + this.description + "','" + this.specification + "', ";
         this.query += this.mrp +","+ this.price + "," + this.stock + ",'" + this.avilability + "','active', '" + this.imagename + "')";
        }
        else{
         this.query = "UPDATE products SET name = '" + this.name + "',";
         if(this.imagename != "")
            this.query += "imagename= '" + this.imagename + "' ";
         this.query += "pcid = " + this.pcid + " , ";
         this.query += "description= '" + this.description + "' , ";
         this.query += "specification= '" + this.specification + "' , ";
         this.query += "mrp= " + this.mrp + " , ";
         this.query += "price= " + this.price + " , ";
         this.query += "stock= " + this.stock + " , ";
         this.query += "avilability= '" + this.avilability + "' , ";
         this.query += "status= '" + this.status + "' , ";
         this.query += "imagename= '" + this.imagename + "' ";
         this.query += "WHERE id = " + this.id;
        }
        return new Promise((resolve , reject)=>{
            this.db.query(this.query, ( err , result)=>{
                if(err)
                  return reject(err);
                  resolve(result);
            });
        });
    } 
    
    delete = ()=>{
        this.query="DELETE FROM products WHERE id = " + this.id;
           return new Promise((resolve , reject)=>{
               this.db.query(this.query,(err,result)=>{
                  if(err)
                    reject(err);

                    resolve(result);
               });
           });
        }  


    list = ()=>{
        this.query ="SELECT * FROM products ORDER BY name";
          return new Promise((resolve , reject)=>{
              this.db.query(this.query,(err,result)=>{
                  if(err)
                   reject(err);
                    
                   resolve(result);
              });
          });
    }  


    get = ()=>{
        this.query ="SELECT * FROM products WHERE id = " + this.id;
        return new Promise((resolve , reject)=>{
            this.db.query(this.query,(err,result)=>{
                if(err)
                 reject(err);
                  
                 resolve(result);
            });
        });
    }
}


   






module.exports = {
    Product:Product
}