const express = require('express');
const mongoose = require('mongoose');
const Activity = require('../module/activity');

const router = express.Router();

//getAll
router.get('/',(req,res)=>{
    
    Activity.aggregate([{
        $lookup : {
            from : 'progettos',
            localField: '_idProgetti',
            foreignField:'_id',
            as : 'progetti'
        }
    }]).exec()
    .then(act=>{res.status(200).json(act)})
    .catch(err =>{res.status(400).json({errore:err})});  
    
    /*Activity.find()
    .then(act=>{res.status(200).json(act)})
    .catch(err =>{res.status(400).json({errore:err})});*/    
})
//getOne
router.get('/:id',(req,res)=>{

    Activity.aggregate([
        {
            $match : {_id : new mongoose.Types.ObjectId(req.params.id)}
        },
        {
            $lookup : {
            from : 'progettos',
            localField: '_idProgetti',
            foreignField:'_id',
            as : 'progetti'
            }
        }
    ]).exec()
    .then(act=>{res.status(200).json(act)})
    .catch(err=>{res.status(400).json({errore:err})});  

    /*Activity.findById(req.params.id)
    .then(act=>{res.status(200).json(act)})
    .catch(err=>{res.status(400).json({errore:err})});*/    
});
//addOne
router.post('/',(req,res)=>{
    let actData; 
    if(req.body._idProgetti){
        actData = {
            tipoAtt : req.body.tipoAtt,
            linea: req.body.linea,
            nomeClie: req.body.nomeClie,
            dataInAtt : req.body.dataInAtt,
            // dataFnAtt : req.body.dataFnAtt,
            noteAtt : req.body.noteAtt,
            _idProgetti : req.body._idProgetti
        }
    }else{
        actData = {
            tipoAtt : req.body.tipoAtt,
            linea: req.body.linea,
            nomeClie: req.body.nomeClie,
            dataInAtt : req.body.dataInAtt,
            // dataFnAtt : req.body.dataFnAtt,
            noteAtt : req.body.noteAtt
        }; 
    }     
    const activity = new Activity(actData);
    activity.save()
    .then(act=>{res.status(201).json(act)})
    .catch((Error)=>{res.status(400).json({errore:Error})});    
});
//updateOne
router.patch('/:id',(req,res)=>{
    Activity.findById(req.params.id).exec()
    .then(act=>{
        if(req.body.tipoAtt) act.tipoAtt = req.body.tipoAtt;
        if(req.body.linea) act.linea = req.body.linea;
        if(req.body.nomeClie) act.nomeClie = req.body.nomeClie;
        if(req.body.dataInAtt) act.dataInAtt = req.body.dataInAtt;
        if(req.body.dataFnAtt) act.dataFnAtt = req.body.dataFnAtt;
        if(req.body.noteAtt) act.noteAtt = req.body.noteAtt;
        if(req.body._idProgetti) act._idProgetti = req.body._idProgetti;
        return act.save();
    })
    .then(actSalvata=>{res.status(200).json(actSalvata)})
    .catch((Error)=>{res.status(400).json({errore:Error})})
});
//deleteOne
router.delete('/:id',(req,res)=>{
    Activity.findById(req.params.id).exec()
    .then(act=>{return act.deleteOne();})
    .then(()=>{res.status(200).json({messaggio:`l'attività id: ${req.params.id} è stata eliminata!`})})
    .catch((Error)=>{res.status(400).json({errore:Error})});
});

module.exports = router;