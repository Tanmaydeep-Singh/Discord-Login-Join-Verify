const express = require('express');
const routes  = require("./routes/routes");

const app = express();




app.get('/', (req,res) => {
    res.send("Hello World");
    console.log("Helo World");
})




// middleware 
app.use("/api/discord", routes)



app.listen(8080, console.log("Setver is up at port 8080"))