const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarToken} = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menuFrontEnd');


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
        return res.status(200).json({ok:true,token,menu:getMenuFrontEnd(usuarioDB.role)});
    }
    catch(error){
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
}

const loginGoogle = async (req,res=response)=>{
    try{
        const {token}=req.body;
        const {name,email,picture} = await googleVerify(token);
        const usuarioDB = await Usuario.findOne({email});
        let usuario;
        if (!usuarioDB){
            usuario=new Usuario({
                    nombre:name ,
                    email,
                    img:picture,
                    password:'@@@',
                    google:true
                }                
            )
        }
        else{
            usuario=usuarioDB;
            usuario.google=true;
        }

        await usuario.save();
        //generar token
        const tokenApp =await generarToken(usuario.id);
        return res.status(200).json({ok:true,token:tokenApp,menu:getMenuFrontEnd(usuario.role)});
    }
    catch(error){
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
}

const renewToken = async (req,res=response)=>{
    try{
        const uid=req.uid;
        console.log(uid);
        const usuarioDB = await Usuario.findById(uid);
        console.log(usuarioDB);
        const token =await generarToken(uid);
        return res.status(200).json({ok:true,token,usuario:usuarioDB,menu:getMenuFrontEnd(usuarioDB.role)});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
}


module.exports ={
    login,loginGoogle,renewToken
}