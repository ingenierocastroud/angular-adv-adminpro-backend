const {response}= require('express');
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

const fileUpload = async (req,res)=>{
    console.log('subir imagen');
    const {tipo,id}=req.params;

    const TiposValidos =['hospitales','usuarios','medicos'];

    if(!TiposValidos.includes(tipo)){

        return res.status(400).json({ok:false,msg:"tipo coleccion invalido"});
    }
    //valida existe archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ok:false,msg:'No existen archivos para subir'});
      }

    //procesar el archivo
    const file = req.files.imagen;
    const nombreCortado=file.name.split('.');
    const extensionArchivo =nombreCortado[nombreCortado.length-1];

    const ExtensionesValidas =['jpg','png','jpeg','gif'];
    if(!ExtensionesValidas.includes(extensionArchivo)){

        return res.status(400).json({ok:false,msg:"tipo archivo invalido"});
    }
    //nombre archivo
    const nombrearchivo=`${uuidv4()}.${extensionArchivo}`;

    //path 
    const rutaArchivo=`./uploads/${tipo}/${nombrearchivo}`;

    actualizarImagen(tipo,id,nombrearchivo);

    file.mv(rutaArchivo, (err)=> {
        if (err){
            console.log(err)
            return res.status(500).send({ok:false,msg:"no se pudo subir el archivo"});
        }         
    
        return res.status(200).json({ok:true,nombrearchivo,msg:"archivo subido"});
      });
}

const getFile=async (req,res)=>{
    const {tipo,id}=req.params; 

    let pathImg=path.join(__dirname,`../uploads/${tipo}/${id}`);

    //imagen por defecto
    if (!fs.existsSync(pathImg)){
        pathImg=path.join(__dirname,`../uploads/no-img.jpg`);
        console.log(pathImg);
    }

   res.sendFile(pathImg)
}

module.exports ={
    fileUpload,
    getFile
}