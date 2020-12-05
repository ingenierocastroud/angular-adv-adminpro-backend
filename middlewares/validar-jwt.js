const {response}=require('express');
const jwt=require('jsonwebtoken');
const Usuario=require('../models/usuario')


const validarJWT = (req,res=response,next)=>{
    console.log('validar token');
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {

        return res.status(401).json({
            ok:false,
            msg:"No se pudo autenticar"
            })   
    }

    try{        
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const token = bearerToken;
        console.log('validar token');
        console.log(token);
        const{uid}=jwt.verify(token,process.env.JWT_SECRET);
        req.uid=uid;
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg:"No se pudo autenticar"
        })
    }

}

const validarAdminRole= async(req,res=response,next)=>{
    const uid=req.uid;
        try {
            const usuarioDB= await Usuario.findById(uid);
            if (!usuarioDB){
                return res.status(404).json({
                    ok:false,
                    msg:"Usuario no existe"
                })
            }

            if (usuarioDB.role!=="ADMIN_ROLE"){
                return res.status(403).json({
                    ok:false,
                    msg:"Usuario no autorizado"
                })
            }

            next();
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                ok:false,
                msg:"No se pudo validar el rol"
            })
        }
}

const validarAdminRoleoMismoUsuario= async(req,res=response,next)=>{
    const uid=req.uid;
    const idreq=req.params.id;
        try {
            const usuarioDB= await Usuario.findById(uid);
            if (!usuarioDB){
                return res.status(404).json({
                    ok:false,
                    msg:"Usuario no existe"
                })
            }

            if (usuarioDB.role!=="ADMIN_ROLE" && idreq!==uid){
                return res.status(403).json({
                    ok:false,
                    msg:"Usuario no autorizado"
                })
            }

            next();
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                ok:false,
                msg:"No se pudo validar el rol"
            })
        }
}

module.exports={
    validarJWT,
    validarAdminRole,
    validarAdminRoleoMismoUsuario
}