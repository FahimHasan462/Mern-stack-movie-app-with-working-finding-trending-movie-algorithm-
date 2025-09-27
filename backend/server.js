import express, { json } from 'express';
import cors from 'cors';
const app=express();
const router = express.Router();
import db from "./database/db.js";
const PORT=3002;

// middlewere

app.use(cors({
  origin: "https://mern-stack-movie-app-with-working-f-five.vercel.app", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(json()); 
//endpoints



//post tranding movies
const increment =async (req,res)=>
{
  const {id,poster,title}=req.body
  console.log("===================================================");
  console.log("Movie_id:",id);
  console.log("Movie Tittle",title);
  console.log("poster Path:",poster)
  console.log("================================================");
  //cheack if any value is missing
  if (!id || !title) 
    { return res.status(400).json({ message: "Missing required fields" }); }
  //cheack if the movie already exist:
  db.query("SELECT count FROM tranding WHERE id = ?", [id],
    (err, results) =>{ 
      if (err) {return res.status(500).json({ message: "Movie Id cheacking Error"});} 
      if (results.length>0)
        {db.query("UPDATE tranding SET count = count + 1 WHERE id = ?",[id],
          (err,results)=>{
            if(err){return res.status(500).json({message:"Failed to increace countr"})}
            return res.status(200).json({message:"Old Movie count increased" })
          }
      )}
      else{
        db.query("INSERT INTO tranding (id, count,poster, title) VALUES (?, 1, ?, ?)",[id,poster,title],
          (err,results)=>{
            if(err){return res.status(500).json({message:"New Movie Insert Error"})}
            return res.status(200).json({message:"New movie add to the list" })})}})}

app.post('/api/trendingMovies',increment)

//Get trending movies

app.get("/api/trendingMovies", (req, res) => {
  db.query("SELECT * FROM `tranding` ORDER BY `count` DESC", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch movies" });
    }
    return res.status(200).json(rows);  
  });
});
//Server starts

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})