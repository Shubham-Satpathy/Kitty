const mongoose = require('mongoose');
const entrySchema= new mongoose.Schema({
    _id:String,
    date:String,
    username:String,
    location:String,
    title:String,
    details:String
});
const Entry=mongoose.model('Entry',entrySchema);
module.exports=Entry;