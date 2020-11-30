/*
 ruta: api/uploads
*/
const {Router}=require('express');
const fileuploadexpres=require('express-fileupload');
const {validarJWT} =require('../middlewares/validar-jwt');
const router=Router();

const {fileUpload,getFile}=require('../controllers/uploads');
router.use(fileuploadexpres());

router.put('/:tipo/:id',
[
    validarJWT
]
,fileUpload);

router.get('/:tipo/:id',
[
    validarJWT
]
,getFile);



module.exports =router;