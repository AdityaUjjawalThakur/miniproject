const express=require("express");
const mongoose=require("mongoose")
const app=express()
const path=require("path")
const Campground=require("./models/campground");
const methodOverride=require('method-override')



app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/miniproject', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected !!!")
}).catch((e)=>{
    console.log(e)
})
//list campgrounds

app.get('/camp',async(req,res)=>{
   const campgrounds =await Campground.find({})
   res.render("campgrounds/index",{campgrounds})
})


app.get("/camp/new",(req,res)=>{
    res.render("campgrounds/new")
})
//post route
app.post("/camp",async(req,res)=>{
    const camp=new Campground(req.body.camp)
    await camp.save()
    res.redirect(`/camp/${camp._id}`)
    
})
//update route
app.get("/camp/:id/edit",async(req,res)=>{
   const camps= await Campground.findById(req.params.id);
   res.render("campgrounds/edit",{camps});

})
app.put("/camp/:id",async(req,res)=>{
    const {id}=req.params;
    
    const camp=await Campground.findByIdAndUpdate(id,{...req.body.camp})
    console.log({...req.body.camp})
  res.redirect(`/camp/${camp.id}`)
    
})
//details of camp

app.get("/camp/:id",async(req,res)=>{
    const campground=await Campground.findById(req.params.id)
    
    res.render("campgrounds/show",{campground});
});




app.listen(3000,(req,res)=>{
    console.log("live at 3000")
})