const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    CF: { 
        type: String,
        required: true,
        minlength: 16, 
        maxlength: 16
    },
    type: {
        type: String,
        enum: ['cittadino', 'operatore','admin'],
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    surname: {  
        type: String,
        required: true
    },
    sex: { 
        type: String,
        minlength: 1, 
        maxlength: 1,
        required: true
    },
    birthdate: {    
        type: Date,
        required: true
    },
    birthplace: {   
        type: String,
        required: true
    },
    email: {    
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    phone: {
        type: String, 
        minlength: 5,
        maxlength: 15,
        unique: true,
    },
    password: { 
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    password_changing: {
        type: Boolean,
        default: false
    }
})


const User = mongoose.model('User', userSchema)


exports.User = User