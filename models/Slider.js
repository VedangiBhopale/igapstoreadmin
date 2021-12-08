const Database = require("../models/Database");
let fs = require("fs");

class Slider {

    query ="";
    id = 0;
    smalltitle = "";
    title = "";
    description = "";
    imagename = "";
    linktopen = 0;
    base64image = "";


    db = new Database.Database();


    constructor(){
        this.id = 0;
        this.smalltitle = "";
        this.title = "";
        this.description = "";
        this.imagename = "";
        this.linktopen = 0;
        this.base64image = "";
    }

    save = ()=>{

        if(this.base64image != "")
         {
             this.base64image = this.base64image.replace(/^data:image\/png;base64,/, "");
             this.imagename =   "sliderpics/"+ this.db.randomString(10) + ".png";
             fs.writeFile("assets/" + this.imagename, this.base64image, 'base64',function(err){
                 console.log("Error image saving-" + err);
             });
         }







         if(this.id == 0){
         this.query ="INSERT INTO sliders(smalltitle,title, description,imagename,linktopen)";
         this.query += "VALUES('" + this.smalltitle + "', '" + this.title + "' , '" + this.description + "', '" + this.imagename + "'," + this.linktopen + " )";
         
        }
        else{
         this.query = "UPDATE sliders SET smalltitle = '" + this.smalltitle + "',";
         if(this.imagename != "")
           this.query += "imagename= '" + this.imagename + "' ";
         this.query += "title= '" + this.title + "' , ";
         this.query += "description= '" + this.description + "' , ";
         this.query += "imagename= '" + this.imagename + "' , ";
         this.query += "linktopen= " + this.linktopen + " ";
         this.query += "WHERE id= " + this.id;
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
        this.query="DELETE FROM sliders WHERE id = " + this.id;
           return new Promise((resolve , reject)=>{
               this.db.query(this.query,(err,result)=>{
                  if(err)
                    reject(err);

                    resolve(result);
               });
           });
        }  


    list = ()=>{
        this.query ="SELECT * FROM sliders ORDER BY smalltitle";
          return new Promise((resolve , reject)=>{
              this.db.query(this.query,(err,result)=>{
                  if(err)
                   reject(err);
                    
                   resolve(result);
              });
          });
    }  


    get = ()=>{
        this.query ="SELECT * FROM sliders WHERE id = " + this.id;
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
    Slider:Slider
}