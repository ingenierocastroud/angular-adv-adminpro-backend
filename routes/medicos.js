/*
 ruta: api/medicos
*/

const {Router}=require('express');
const {check}=require('express-validator');
const {validarCampos} =require('../middlewares/validar-campos');
const {validarJWT} =require('../middlewares/validar-jwt');
const router=Router();

const {getMedicos,crearMedico,actualizarMedico,getMedico}=require('../controllers/medicos');

//rutas
router.get('/',[validarJWT],getMedicos);

router.get('/:id',[validarJWT],getMedico);

router.post('/',
[       validarJWT,
        check('nombre','Nombre es obligatrio').not().isEmpty(),
        check('hospital','Hospital es obligatrio').isMongoId(),
        validarCampos,
],
crearMedico);

router.put('/:id',
[
    validarJWT,
    check('nombre','Nombre es obligatrio').not().isEmpty(),
    check('hospital','Hospital es obligatrio').isMongoId(),
    validarCampos,
]
,actualizarMedico);


module.exports =router;