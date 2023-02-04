import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company : {
        type : String,
        required : [true , 'Please provide company name'],
        maxlength : 50,
    },
    position :{
        type : String,
        required : [true,'Please provide postion '],
        maxlength : 100,
    },
    status :{
        type : String,
        enum : ['interview','decliend','pending'],
        default : 'pending',
    },
    jobType :{
        type : String,
        enum : ['full-time','part-time','remote','intership'],
        default : 'full-time',
    },
    joblocation :{
        type : String,
        default : 'mycity',
        required : true,
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true , "Please Provide User"]
    },
},{timestamps : true})

export default mongoose.model('Job',JobSchema)