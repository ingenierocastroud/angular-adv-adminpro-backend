const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarToken} = require('../helpers/jwt');

const crearUsuario =async (req,res=response)=>{
    
    try{
        const {email,password,nombre}=req.body;
        const existeEmail=await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({ok:false,msg:"Correo ya existe"});
        }

        const usuario= new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);

        await usuario.save();
        const token =await generarToken(usuario.id);

        return res.status(200).json({ok:true,usuario,token});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
   
}

const getUsuarios = async (req,res)=>{
    const usuarios=await Usuario.find({},'nombre email rol google');
    return res.status(200).json({ok:true,usuarios});
}

const actualizarUsuario = async (req,res)=>{
    try{
        const uid=req.params.id;
        const {password,google,...campos}=req.body;

        const usuarioDB= await Usuario.findById(uid);
        if (!usuarioDB){
            return res.status(404).json({ok:false,msg:"No existe usuario"});           
        }

        if(usuarioDB.email!==campos.email){
            const existeEmail=await Usuario.findOne({email:campos.email});
            if (existeEmail){
                return res.status(400).json({ok:false,msg:"Correo ya existe"});
            }  
        }
      
        const usuarioCambio= await Usuario.findByIdAndUpdate(uid,campos,{new:true});
        return res.status(200).json({ok:true,usuario:usuarioCambio});
    }
    catch(error){
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
}





module.exports ={
    getUsuarios,
    crearUsuario,
    actualizarUsuario
}