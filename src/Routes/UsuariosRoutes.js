const express =require('express');
const router = express.Router();
//const {verificarToken} = require('../Mid/Token');
const UsuarioController=require('../Controllers/UsuariosController');
router.get('/',UsuarioController.GetUsuarios);
router.post('/',UsuarioController.PostUsuarios);
router.get('/:id',UsuarioController.GetUsuario);
//router.put('/:id',usuarioController.usuarioPut);
router.post('/Login/',UsuarioController.PostLoginUsuario);
router.delete('/:id',UsuarioController.DeleteUsuario);
module.exports = router;