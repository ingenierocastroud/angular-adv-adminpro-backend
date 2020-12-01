const {response} = require('express');
const Medico = require('../models/medico');


const crearMedico =async (req,res=response)=>{
    
    try{
       // const {email,password,nombre}=req.body;

       const medico= new Medico(
                        {
                usuarioCreo:req.uid,
                ...req.body   
                });

        await medico.save();

        return res.status(200).json({ok:true,medico:medico});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
   
}

const getMedicos = async (req,res)=>{
    const medicos=await Medico.find({},'nombre img usuarioCreo')
    .populate('usuarioCreo','nombre img') 
    .populate('hospital','nombre img');
    return res.status(200).json({ok:true,medicos});
}

const actualizarMedico = async (req,res)=>{
    try{
        const id=req.params.id;
        const {...campos}=req.body;

        const medicoDB= await Medico.findById(id);
        if (!medicoDB){
            return res.status(404).json({ok:false,msg:"No existe medico"});           
        }
     
        const medicoCambio= await Medico.findByIdAndUpdate(id,campos,{new:true});
        return res.status(200).json({ok:true,medico:medicoCambio});
    }
    catch(error){ 
        return res.status(500).json({ok:false,msg:"ocurrio un error"});
    }
}





module.exports ={
    getMedicos,
    crearMedico,
    actualizarMedico
}