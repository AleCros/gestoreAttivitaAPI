const express = require('express');
const Progetto = require('../module/progetto');

const router = express.Router();

//getAll
router.get('/',(req,res)=>{
    Progetto.find()
    .then(pro=>{res.status(200).json(pro)})
    .catch(err=>{res.status(400).json({errore: err})})    
});
//getOne
router.get('/:id',(req,res)=>{
    Progetto.findById(req.params.id)
    .then(pro=>{res.status(200).json(pro)})
    .catch(err=>{res.status(400).json({errore: err})})   
});
//addOne
router.post('/',(req,res)=>{
    let pro = {
        nomePro : req.body.nomePro,
        descPro : req.body.descPro,
        dataApPro : req.body.dataApPro,
        rifPro : req.body.rifPro,
        dataPro : req.body.dataPro,
        cliente : req.body.cliente,
        linea : req.body.linea
    }
    const progetto = new Progetto(pro);
    progetto.save()
    .then(pro=>{res.status(201).json(pro)})
    .catch(error =>{res.status(400).json({errore: error})});    
});
//updateOne
router.patch('/:id',(req,res)=>{
    Progetto.findById(req.params.id).exec()
    .then(pro=>{
        if (req.body.nomePro) {pro.nomePro = req.body.nomePro};
        if (req.body.descPro) {pro.descPro = req.body.descPro};
        if (req.body.dataApPro) {pro.dataApPro = req.body.dataApPro};
        if (req.body.dataChPro) {pro.dataChPro = req.body.dataChPro};
        if (req.body.rifPro) {pro.rifPro = req.body.rifPro};
        if (req.body.dataPro) {pro.dataPro = req.body.dataPro};
        if (req.body.cliente) {pro.cliente = req.body.cliente};
        if (req.body.linea) {pro.linea = req.body.linea};
        return pro.save()
    })
    .then(proS =>{res.status(200).json(proS)})
    .catch(err=>{res.status(400).json({errore:err})})
});
//deleteOne
router.delete('/:id',(req,res)=>{
    Progetto.findByIdAndDelete(req.params.id)
    .then(()=>{res.status(200).json({messaggio: `è stato eliminato il progetto con ID: ${req.params.id}`})})
    .catch(err=>{res.status(400).json({errore: err})});
});

module.exports = router
