const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const medico = require('../models/medico');
const fs = require('fs');


const borrarImagen=(pathViejo)=>{
    if (fs.existsSync(pathViejo)){
        //borra la imagen
        fs.unlinkSync(pathViejo);
        return false;
    }
}


const actualizarImagen =async (tipo,id,nombrearchivo)=>{
    let pathViejo="";
    switch(tipo){
        case 'medicos':
            const medico=await Medico.findById(id);
                if (!medico){
                    console.log('medico no existe');
                    return false;
                }
                pathViejo=`./uploads/medicos/${medico.img}`;
                borrarImagen(pathViejo);
                medico.img=nombrearchivo;
                await medico.save();
                return true;

        case 'hospitales':
             const hospital=await Hospital.findById(id);
                if (!hospital){
                    console.log('hospital no existe');
                    return false;
                }
                pathViejo=`./uploads/hospitales/${hospital.img}`;
                borrarImagen(pathViejo);
                hospital.img=nombrearchivo;
                await hospital.save();
                return true;
        case 'usuarios':
            const usuario=await Usuario.findById(id);
            if (!usuario){
                console.log('usuario no existe');
                return false;
            }
            pathViejo=`./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img=nombrearchivo;
            await usuario.save();
            return true;
        default:
            res.status(200).json({ok:true,msg:"coleccion no existe"});
    }

}

module.exports={
    actualizarImagen
}