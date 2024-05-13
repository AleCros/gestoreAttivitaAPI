const mongoose = require('mongoose');
const progettoSchema = new mongoose.Schema({
    nomePro:{type:String, required : true},
    descPro:{type:String},
    dataApPro:{type: Date, required : true},
    dataChPro:{type: Date},
    rifPro:{type:String, required : true},
    dataPro:{type: Date, required : true},
    cliente:{type:String},
    linea:{type:String}
});
const Progetto = mongoose.model('Progetto',progettoSchema);
module.exports = Progetto;
