const express = require('express');
const mongoose = require('mongoose');
const OraAtt = require('../module/oraAtt');

const router = express.Router();
//getAll
router.get('/',(req, res)=>{
    OraAtt.aggregate([
        {
            $lookup : {
                from : 'activities',
                localField : '_idAtt',
                foreignField : '_id',
                as : 'attivita'
            }
        }
    ]).exec()
    .then(oreAtt=>{res.status(200).json(oreAtt)})
    .catch(err=>{res.status(400).json({errore:err})});
});
//getOne
router.get('/:id',(req,res)=>{
    OraAtt.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup : {
                from : 'activities',
                localField : '_idAtt',
                foreignField : '_id',
                as : 'attivita'
            }
        }
    ]).exec()
    .then(oraAtt=>{res.status(200).json(oraAtt)})
    .catch(err=>{res.status(404).json({errore:err})});
});
//AddOne
router.post('/',(req,res)=>{
    const oraAtt = new OraAtt({
        dataOra : req.body.dataOra,
        ora : req.body.ora,
        nota : req.body.nota,
        _idAtt : req.body._idAtt
    })
    oraAtt.save()
    .then(ora =>{res.status(201).json(ora)})
    .catch(err =>{res.status(400).json({errore:err})})    
});
//updateOne
router.patch('/:id',(req,res)=>{
    OraAtt.findById(req.params.id).exec()
    .then(ora=>{
        if(req.body.dataOra) ora.dataOra = req.body.dataOra;
        if(req.body.ora) ora.ora = req.body.ora;
        if(req.body.nota)ora.nota = req.body.nota;
        return ora.save();
    })
    .then(oraE => {res.status(200).json(oraE)})
    .catch(err => {res.status(404).json({errore: err})})
});
//deleteOne
router.delete('/:id',(req,res)=>{
    OraAtt.findById(req.params.id).exec()
    .then(ora => {return ora.deleteOne()})
    .then(()=>{res.status(200).json({messaggio: `Elimato il rec con id: ${req.params.id}`})})
    .catch(err=>{res.status(404).json({errore : err})});
});

//getAllByIdAtt
router.get('/byIdAtt/:idAtt',(req,res)=>{
    OraAtt.find({ _idAtt: req.params.idAtt })
    .then(oreAtt => { res.status(200).json(oreAtt); })
    .catch(err => { res.status(400).json({ errore: err }); })
});

//getSumbyIdAtt
router.get('/sumByIdAtt/:idAtt',(req,res)=>{
    OraAtt.aggregate([
        {
            $match:{
                _idAtt: new mongoose.Types.ObjectId(req.params.idAtt)
            }
        },
        {
            $group:{
                _id:"$_idAtt",
                totalOra:{$sum:"$ora"}
            }
        }
    ]).exec()
    .then(result =>{
        if(result.length > 0){
            res.status(200).json({_idAtt:req.params.idAtt,totalOra:result[0].totalOra});
        }else{
            res.status(404).json({errore:`nessun recond trovato con l'_idAtt: ${req.params.idAtt}`})
        }
    })
    .catch(err=>{res.status(400).json({errore: err});});
})


module.exports = router;

