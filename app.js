const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://cluster0.vvgcaer.mongodb.net/books',{
    dbName: 'books',
    user:'Divya11',
    pass: '2Rj1fY3RYpKUV9Se',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Mongo DB connected....");
});

app.all('/test', (req,res) => {
    console.log(req.body);
    res.send(req.body)
})


const bookRoute = require("../Book-Project/Route/Books.route");
app.use('/book', bookRoute);

app.use((req,res,next) => {
   next(createError(404, "Not Found"));
})

//error handler

app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000...")
})
