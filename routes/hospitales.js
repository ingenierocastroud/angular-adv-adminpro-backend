/*
 ruta: api/hospitales
*/

const {Router}=require('express');
const {check}=require('express-validator');
const {validarCampos} =require('../middlewares/validar-campos');
const {validarJWT} =require('../middlewares/validar-jwt');
const router=Router();

const {getHospitales,crearHospital,actualizarHospital}=require('../controllers/hospitales');

//rutas
router.get('/',[validarJWT],getHospitales);
router.post('/',
[
        validarJWT,
        check('nombre','Nombre es obligatrio').not().isEmpty(),
        validarCampos,
],
crearHospital);

router.put('/:id',
[
    validarJWT,
    check('nombre','Nombre es obligatrio').not().isEmpty(),
    validarCampos,
]
,actualizarHospital);


module.exports =router;