const express=require("express");
const pool=require("./db")

const app=express()
app.use(express.json())



app.get("/test",async(req,res)=>{
   const result= await pool.query("SELECT NOW()")
    res.json(result.rows)

})

app.post("/assignments",async(req,res)=>{
    try{
        const {title,deadline}=req.body;
        const result=await pool.query(
            "INSERT INTO assignments (title,deadline) VALUES ($1,$2) RETURNING*",[title,deadline]
        )
        res.status(201).json(result.rows[0])

    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });

    }
})
app.listen(3000,(req,res)=>{
    console.log("Server is Successfully Running on port 3000")
})