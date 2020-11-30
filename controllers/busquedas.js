const {response} = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getGeneral = async (req,res)=>{
    const busqueda=req.params.busqueda;
    const regex=new RegExp(busqueda ,'i');

    const [usuarios,hospitales,medicos]= await Promise.all([
        await Usuario.find({nombre:regex}),
        await Hospital.find({nombre:regex}),
        await Medico.find({nombre:regex})
    ])

    return res.status(200).json({ok:true,usuarios,hospitales,medicos});
}

const getEspecifico = async (req,res)=>{
    const busqueda=req.params.busqueda;
    const coleccion=req.params.tabla;
    const regex=new RegExp(busqueda ,'i');
    let data=[];
    switch(coleccion){
        case 'medicos':
            data=await Medico
                    .find({nombre:regex},'nombre img usuarioCreo')
                    .populate('usuarioCreo','nombre img')
                    .populate('hospital','nombre img');
            break;
        case 'hospitales':
            data=await Hospital
                        .find({nombre:regex},'nombre img usuarioCreo')
                        .populate('usuarioCreo','nombre img');
            break;
        case 'usuarios':
            data=await Usuario.find({nombre:regex});
                break
        default:
            res.status(200).json({ok:true,msg:"coleccion no existe"});
    }

    return res.status(200).json({ok:true,resultados:data});
}




module.exports ={
    getEspecifico,
    getGeneral
}