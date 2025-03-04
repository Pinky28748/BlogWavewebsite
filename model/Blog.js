const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {type : String,required : true},
    content : {type : String , required : true},
    image_url : {type : String},
    created_At : {type : Date,default:Date.now},


})

module.exports = mongoose.model("blogs",blogSchema);