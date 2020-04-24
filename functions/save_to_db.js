const {Threshold} = require('../models/ag_threshold')
const Joi = require('joi')
const mongoose = require('mongoose')

async function save_to_db(object){
    
    var agThreshold = new Threshold({
        
        type: object.type,
        sensore: object.sensore,
        value: object.value,
        date: object.date,
        lon: object.lon,
        lat: object.lat
        
    });

    try{
        const result = await agThreshold.save();
    }catch(ex){
        console.log(ex);
    }
}

function validate(agThreshold) {
    const schema = {
        type: Joi.string().required(),
        sensore: Joi.string().required(),
        value:   Joi.number().required(),
        date:  Joi.date().required(),
        lon: Joi.string().required(),
        lat: Joi.string().required()
    }
    return Joi.validate(agThreshold,schema)
}

exports.save_to_db = save_to_db
exports.validate = validate





