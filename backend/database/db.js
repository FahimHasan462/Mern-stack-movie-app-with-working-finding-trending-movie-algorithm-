import { createConnection } from 'mysql2';
import dotenv from "dotenv";

dotenv.config();
const db = createConnection({
  host: process.env.MYSQLHOST,      
  user: process.env.MYSQLUSER,      
  password: process.env.MYSQLPASSWORD, 
  database: process.env.MYSQLDATABASE,   
  port: process.env.MYSQLPORT 
});

// Connect and log status
db.connect((err) => {
    if (err) {
        console.error("Database not connected:", err.message);
    } else {
        console.log("Database connected successfully!");
    }
});

export default db;