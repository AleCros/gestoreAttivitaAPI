const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
    tipoAtt : {type: String, required : true},
    linea : {type: String, required : true},
    nomeClie : {type: String},
    dataInAtt: {type: Date, required : true},
    dataFnAtt: {type: Date},
    noteAtt: {type: String},
    _idProgetti:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Progetto'
    }
});

const Attivita = mongoose.model('Activity',activitySchema);


module.exports = Attivita;
