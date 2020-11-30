const express=require('express');
require('dotenv').config();
const {dbConnection}=require('./db/config')
const cors=require('cors')

///crear el servidor express
const app = express();

//configurar cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//conexion bd
dbConnection();

//RUTAS
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/uploads',require('./routes/uploads'));


app.listen(process.env.PORT,()=>{
    console.log("Server working");
});