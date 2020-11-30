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
        const uid=req.params.id;
        const {password,google,...campos}=req.body;

        const hospitalDB= await Hospital.findById(uid);
        if (!hospitalDB){
            return res.status(404).json({ok:false,msg:"No existe hospital"});           
        }
     
        const hospitalCambio= await Hospital.findByIdAndUpdate(uid,campos,{new:true});
        return res.status(200).json({ok:true,hospital:hospitalCambio});
    }
    catch(error){
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
}





module.exports ={
    getHospitales,
    crearHospital,
    actualizarHospital
}