const mongoose=require("mongoose")
const campground=require("../models/campground")
const cities=require("./cities")
const {places,description, descriptors}=require("./seedHelpers")

//self relied javascript file connecfted with database
//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/miniproject', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected !!!")
}).catch((e)=>{
    console.log(e)
})
const sample =array => array[Math.floor((Math.random()*array.length))];
const seeDB= async ()=>{
    await campground.deleteMany({})
    for(let i=0;i<50;i++)
    {
        const random1000=Math.floor(Math.random()*1000);
        const camp=new campground({
            location:`${cities[random1000].city} ,${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
    
}
seeDB().then(()=>{
    mongoose.connection.close()
})

     
 