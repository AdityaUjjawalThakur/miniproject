const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const campgroundSchema=new Schema({
    title:"string",
    price:"string",
    description :"string",
    location:"string"
});
module.exports=mongoose.model("campground",campgroundSchema);