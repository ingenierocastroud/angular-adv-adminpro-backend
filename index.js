const express=require('express');
require('dotenv').config();
const {dbConnection}=require('./db/config')
const cors=require('cors')

///crear el servidor express
const app = express();
//configurar cors
app.use(cors());
//conexion bd
dbConnection();
//rutas
app.get('/',(req,res)=>{
        res.status(400).json({ok:false,msg:'holamundo'});
});




app.listen(process.env.PORT,()=>{
    console.log("Server working");
});