/*
 ruta: api/auth
*/

const {Router}=require('express');
const {login}=require('../controllers/auth');
const {check}=require('express-validator');
const {validarCampos} =require('../middlewares/validar-campos');
const router=Router();

//rutas
router.post('/',[
        check('password','Contraseña es obligatrio').not().isEmpty(),
        check('email','Email es obligatrio').isEmail(),
        validarCampos,
],
login);


module.exports =router;