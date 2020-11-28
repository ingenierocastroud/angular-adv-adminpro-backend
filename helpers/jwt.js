const jwt = require('jsonwebtoken')

const generarToken= (uid)=>{
    return new Promise((resolve,reject)=>{
        const payload ={
            uid
        }
        jwt.sign(payload,process.env.JWT_SECRET,
            {expiresIn:'24h'},
            (err,token)=>{
                if(err){
                    console.log(err)
                    reject("Error en la generación");
                }
                resolve(token);
            }
        );
    });
   
}


module.exports={
    generarToken
}