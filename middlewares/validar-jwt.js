const {response}=require('express');
const jwt=require('jsonwebtoken');

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
        return res.status(401).json({
            ok:false,
            msg:"No se pudo autenticar"+error
        })
    }

}

module.exports={
    validarJWT
}