import { createConnection } from 'mysql2';

const db = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movieapp"
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