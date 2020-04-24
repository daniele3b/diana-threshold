const Joi = require('joi')
const mongoose = require('mongoose')

const agThreshold = new mongoose.Schema({
    type: {type:String, required: true}, 
    sensore: {type:String, required: true},
    value: {type:Number, required: true},
    date: {type:Date, required: true},
    lon: {type:String, required: true}, 
    lat: {type:String, required: true} 

});

const Threshold = mongoose.model('Threshold', agThreshold);

exports.Threshold = Threshold