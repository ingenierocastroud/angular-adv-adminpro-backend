const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarToken} = require('../helpers/jwt');


const login = async (req,res=response)=>{
    try{
        const {password,email}=req.body;

        const usuarioDB= await Usuario.findOne({email});
        if (!usuarioDB){
            return res.status(400).json({ok:false,msg:"No se pudo autenticar"});           
        }

        const validPassword= bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){
             return  res.status(400).json({ok:false,msg:"No se pudo autenticar"});                
        }
        const token =await generarToken(usuarioDB.id);
        return res.status(200).json({ok:true,token});
    }
    catch(error){
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
}


module.exports ={
login
}