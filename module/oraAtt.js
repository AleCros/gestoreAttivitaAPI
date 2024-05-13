const mongoose = require('mongoose');
const oraAttSchema = new mongoose.Schema({
    dataOra: {type:Date, required : true},
    ora:{type:Number, required : true},    
    nota:{type:String},
    _idAtt:{type:mongoose.Types.ObjectId, required:true}
});

const OraAtt = mongoose.model('OreAtt',oraAttSchema);

module.exports = OraAtt;

