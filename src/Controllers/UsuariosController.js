const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../Model/UsuariosModel');
const UsuarioController ={}


UsuarioController.GetUsuarios=async (req,res)=>{
    return res.json( await UsuarioModel.find());
}

UsuarioController.PostUsuarios=async(req,res)=>{
    const {PrimerNombre,SegundoNombre,PrimerApellido,SegundoApellido,email,password,password_conf,imagen,Sexo,Edad,Telefono}=(req.body);
    console.log( {PrimerNombre,SegundoNombre,PrimerApellido,SegundoApellido,email,password,password_conf,imagen,Sexo,Edad,Telefono});
    const errors = [];
    const guardado = [];

    if(!Edad){
        res.send({message:'El campo Edad  no puede estar vacio','success':false});
        errors.push({ text: 'El campo Edad no puede estar vacio','success':false});
    }
    if(!PrimerApellido){
        res.send({message: 'El campo Primer Apellido  no puede estar vacio','success':false,});
        errors.push({ text: 'El campo Primer Primer Apellido no puede estar vacio'});
    }
    if(!PrimerNombre){
        res.send({message: 'El campo Primer Nombre no puede estar vacio','success':false,});
        errors.push({ text: 'El campo Primer Nombre no puede estar vacio','success':false});
    }
    if(password != password_conf){
        res.send({message:' la contraseña no coinide' ,'success':false});
        errors.push({ text: ' la contraseña no coinide','success':false});
    }
    if(!password_conf){
        res.send({message: 'El campo password no puede estar vacio','success':false,});
        errors.push({ text: 'El campo password no puede estar vacio','success':false});
    }
    if(password_conf.length<4){
        res.send({message:'la contraseña tiene que se mayor a 4 digitos' ,'success':false,});
        errors.push({ text: 'la contraseña tiene que se mayor a 4 digitos'});        
    }
    if(password.length<4){
        res.send({message: 'la contraseña tiene que se mayor a 4 digitos','success':false,});
        errors.push({ text: 'la contraseña tiene que se mayor a 4 digitos','success':false});        
    }
    if (!password ) {
        res.send({message: 'El campo password no puede estar vacio','success':false,});
        errors.push({ text: 'El campo password no puede estar vacio','success':false});
    } 
    if (!email) {
        res.send({message: 'El campo email no puede estar vacio','success':false,});
        errors.push({ text: 'El campo email no puede estar vacio','success':false});
    } 
    if (!Telefono) {
        res.send({ message:'El campo telefono no puede estar vacio','success':false,});
        errors.push({ text: 'El campo telefono no puede estar vacio','success':false });
    }
    if (errors.length > 0) {
        console.log({errors,});
    } 
    else {
        const emailUsuario =await UsuarioModel.findOne({email:email});
        if(emailUsuario) {res.send({message:"Usuario ya registrado",'success':false});
        errors.push({message:"Usuario ya registrado",'success':false});
    } 
    else {
        res.send({message:'Datos de usuario guardados','success':true});
        guardado.push({text:'Datos de usuario guardados','success':true});
        const usuario = await new UsuarioModel({password:bcrypt.hashSync(password,10),PrimerNombre,SegundoNombre,PrimerApellido,SegundoApellido,email,imagen,Sexo,Edad,Telefono});
        res.json(await usuario.save());
        } 
    }
}

UsuarioController.GetUsuario= async (req,res)=>{
    const usuario = await UsuarioModel.findById(req.params.id)  
    if(usuario){         
        return res.json(usuario);
    }
    else{
        return res.json('Dato no encontrado');
    }
}

UsuarioController.DeleteUsuario= async (req,res)=>{  
    //const idToken= await usuarioModel.findOne({_id:req.usuarioToken});
    //if(idToken.role==='Admin'){          
    const usuario = await UsuarioModel.findById(req.params.id);                    
    if(!usuario){res.json('Usuario no encontrado');
    }
    else{
        await UsuarioModel.findByIdAndDelete(req.params.id);  
        return res.json('Usuario eliminado');
    }
    //}
}

UsuarioController.PostLoginUsuario=  async (req,res,next)=>{  
    const {email,password}=(req.body);
    const errors = [];
    if(password.length<4){
        res.send({message: 'la contraseña tiene que se mayor a 4 digitos','success':false,});
        errors.push({ text: 'la contraseña tiene que se mayor a 4 digitos','success':false});        
    }
    if (!password ) {
        res.send({message: 'El campo password no puede estar vacio','success':false,});
        errors.push({ text: 'El campo password no puede estar vacio','success':false});
    } 
    if (!email) {
        res.send({message: 'El campo email no puede estar vacio','success':false,});
        errors.push({ text: 'El campo email no puede estar vacio','success':false});
    } if (errors.length > 0) {
        console.log({errors,});
    }
    else{
        const emailUsuario =await UsuarioModel.findOne({email:email});
        if(emailUsuario) {
            if(bcrypt.compareSync(password,emailUsuario.password)){
                const token =jwt.sign({usuario:emailUsuario._id
            },'token-de-desarrollo',{expiresIn: 60*60*24});
            res.send({message:"mensaje ",'Token':token,'success':true})
        }
        else{
            res.send({message:"no entra paswor incorecto",'success':false})  
        }
    }
    else{res.send({message:"no entra email incorecto",'success':false});
    }}
}    

module.exports=UsuarioController;