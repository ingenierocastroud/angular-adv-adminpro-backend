const mongoose = require('mongoose');

const dbConnection = async()=>{
    try{
        //'mongodb+srv://cursoangular:cursoangular@cursoangular.fvv1w.mongodb.net/hospitaldb'
        await  mongoose.connect(process.env.DB_CNN, 
        {useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex:true
        });

        console.log("DB online");
    }
    catch(error){
            console.log("error en la BD");
    }

}


module.exports={
    dbConnection
}