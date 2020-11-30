/*
 ruta: api/auth
*/

const {Router}=require('express');
const {login,loginGoogle}=require('../controllers/auth');
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

router.post('/google',[
        check('token','Token es obligatrio').not().isEmpty(),
        validarCampos,
],
loginGoogle);


module.exports =router;