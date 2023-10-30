const express = require("express");
const route = express.Router();

const Book = require("../Model/Book.model");

route.get('/', async(req,res,next) => {
    try {
        const result = await Book.find({}, {__v:0})
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
    
})

route.post('/', async (req,res,next) => {
    try {
        const book = new Book(req.body);
        const result = await book.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
})

route.get('/:id', async(req,res,next) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        res.send(book);
    } catch (error) {
        console.log(error.message)
    }
})

route.patch('/:id',async(req,res,next) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const result = await Book.findByIdAndUpdate(id,updates);
        res.send(result);
    } catch (error) {
        console.log(error.message)
    }
})

route.delete('/:id', async(req,res,next) => {
    const id = req.params.id;
    try {
        const result = await Book.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = route;
