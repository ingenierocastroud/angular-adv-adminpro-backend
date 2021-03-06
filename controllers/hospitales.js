const {response} = require('express');
const Hospital = require('../models/hospital');


const crearHospital =async (req,res=response)=>{
    
    try{
        //const {email,password,nombre}=req.body;
        const hospital= new Hospital(
                        {
             usuarioCreo:req.uid,
             ...req.body   
        });
        hospital.img="no-image"
        await hospital.save();

        return res.status(200).json({ok:true,hospital:hospital});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
   
}

const getHospitales = async (req,res)=>{
    const hospitales=await Hospital.find({},'nombre img usuarioCreo')
                                    .populate('usuarioCreo','nombre img');
    return res.status(200).json({ok:true,hospitales});
}

const actualizarHospital = async (req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        const campos={...req.body};

        const hospitalDB= await Hospital.findById(id);
        if (!hospitalDB){
            return res.status(404).json({ok:false,msg:"No existe hospital"});           
        }
     
        const hospitalCambio= await Hospital.findByIdAndUpdate(id,campos,{new:true});
        return res.status(200).json({ok:true,hospital:hospitalCambio});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
}





module.exports ={
    getHospitales,
    crearHospital,
    actualizarHospital
}