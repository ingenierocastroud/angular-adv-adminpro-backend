/*
 ruta: api/usuarios
*/

const {Router}=require('express');
const {getUsuarios,crearUsuario,actualizarUsuario}=require('../controllers/usuarios');
const {check}=require('express-validator');
const {validarCampos} =require('../middlewares/validar-campos');
const {validarJWT,validarAdminRole,validarAdminRoleoMismoUsuario} =require('../middlewares/validar-jwt');
const router=Router();

//rutas
router.get('/',[validarJWT,validarAdminRole],getUsuarios);
router.post('/',
[
        check('nombre','Nombre es obligatrio').not().isEmpty(),
        check('password','Contraseña es obligatrio').not().isEmpty(),
        check('email','Email es obligatrio').isEmail(),
        validarCampos,
],
crearUsuario);

router.put('/:id',
[
    validarJWT,
    validarAdminRoleoMismoUsuario,
    check('nombre','Nombre es obligatrio').not().isEmpty(),
    check('email','Email es obligatrio').isEmail(),
    validarCampos,
]
,actualizarUsuario);


module.exports =router;