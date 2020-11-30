/*
 ruta: api/todo
*/
const {Router}=require('express');
const {validarJWT} =require('../middlewares/validar-jwt');
const router=Router();

const {getGeneral,getEspecifico}=require('../controllers/busquedas');

router.get('/:busqueda',
[
    validarJWT,
]
,getGeneral);

router.get('/coleccion/:tabla/:busqueda',
[
    validarJWT,
]
,getEspecifico);

module.exports =router;