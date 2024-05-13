const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(()=>{console.log('database connesso')})
.catch(err=>{console.log(err)});

const app = express();


app.use(express.json());
app.use(cors());
const attivitaRoutes = require('./routes/activities');
const progettiRoutes = require('./routes/progetti');
const oreAttRoutes = require('./routes/oreAtt');


app.use('/attivita',attivitaRoutes);
app.use('/progetti',progettiRoutes);
app.use('/oreAtt',oreAttRoutes);

//Connesione server
const PORT = 3000;
app.listen(PORT,()=>{console.log(`server in ascolto sulla porta ${PORT}`)})

