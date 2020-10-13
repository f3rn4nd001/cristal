import React, { Component } from 'react'
import './css/Login.css';
import Index from './Index';
import axios from 'axios';
import {  Redirect, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Modal,Button } from 'rsuite';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[], 
      backdrop:false, 
      showlogin:true, 
      showRegistro:false, 
      PrimerNombre:'', 
      SegundoNombre:'', 
      PrimerApellido:'', 
      SegundoApellido:'', 
      file:'', 
      email:'', 
      password:'', 
      password_conf:'', 
      imagen:{}, 
      Sexo:'', 
      Edad:'', 
      Telefono:''
    };
    this.closeRegis = this.closeRegis.bind(this);
    this.openRegis = this.openRegis.bind(this);
    this.closeLogin= this.closeLogin.bind(this);
    this.openLogin = this.openLogin.bind(this);
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({    
        imagePreviewUrl: reader.result
      });
    }      
    reader.readAsDataURL(file)
  }
          
  closeLogin() {
    this.setState({ showlogin:false });
    this.setState({ showRegistro:true });
  }
  openLogin() {
    this.setState({ showRegistro:false });
    this.setState({ showlogin:true });
  }
  closeRegis() {
    this.setState({ showRegistro:false });
    this.setState({ showlogin:true });
  }
  openRegis() {
    this.setState({ showlogin:false });
    this.setState({ showRegistro:true });
  }
  
  onChangePrimerNombre = (e) => { this.setState({ PrimerNombre:e.target.value })}
  onChangeSegundoNombre = (e) => { this.setState({ SegundoNombre:e.target.value })}
  onChangeimg  = (e) => { this.setState({ imagen:e.target.value })}
  onChangeEdad = (e) => { this.setState({ Edad:e.target.value })}
  onChangePrimerApellido = (e) =>{ this.setState({ PrimerApellido:e.target.value })}
  onChangeSegundoApellido = (e) =>{ this.setState({ SegundoApellido:e.target.value })}
  onChangeemail = (e) =>{ this.setState({ email:e.target.value })} 
  onChangepassword = (e) => { this.setState({ password:e.target.value })}
  onChangepassword_conf = (e) => { this.setState({ password_conf:e.target.value })}
  onChangeTelefono = (e) => { this.setState({ Telefono:e.target.value })} 
  onChangeSexo = (e) => { this.setState({ Sexo:e.target.value })}

  onSubmitLogin = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/Usuarios/Login',{
      method:'POST', headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      }, 
      body: JSON.stringify({
        email:this.state.email,
        password:this.state.password,
      })
    }).then((response)=>response.json()).then((res)=>{   
      if(res.success===true){
        alert(res.Token);
        window.location.href="PIndexReact";
      }
      else{
        alert(res.message);
       }
    })
  }
  
  onSubmit= async e => {
      e.preventDefault();
      const res = await fetch('http://localhost:3001/api/Usuarios',{
        method:'POST', headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        }, 
        body: JSON.stringify({
          PrimerNombre:this.state.PrimerNombre,
          SegundoNombre:this.state.SegundoNombre,
          PrimerApellido:this.state.PrimerApellido,
          imagen:this.state.imagePreviewUrl,
          Edad:this.state.Edad,
          SegundoApellido:this.state.SegundoApellido,
          email:this.state.email,
          password:this.state.password,
          password_conf:this.state.password_conf,     
          Telefono:this.state.Telefono,  
          Sexo:this.state.Sexo,
        })
      }).then((response)=>response.json()).then((res)=>{        
      if(res.success===true){
        alert(res.message);
      }
      else{
        alert(res.message);
      }
    })
  }
  
  render() {
    const { backdrop, showRegistro,showlogin } = this.state;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if ( imagePreviewUrl  ){
      $imagePreview = ( <img src={imagePreviewUrl} />);
    } 
    else{
    $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return(
      <div> 
        <Modal backdrop={backdrop} show={this.state.showlogin} onHide={this.openLogin}>
          <div className="login-wrap1">
            <div className="login-html">    
              <center><label htmlFor="PrimerNombre">Login</label></center>               
              <div className="login-form">      
                <form  onSubmit={this.onSubmitLogin}>
                  <div className="group">
                    <label htmlFor="email" className="label">email</label>
                    <input placeholder="email@gmail.com" id="email" name="email" onChange={this.onChangeemail} type="text" className="input"/>
                  </div>
                  <div className="group">
                    <label htmlFor="password" className="label">password</label>
                    <input placeholder="tiene que tener minimo 4 caracteres" id="password" name="password" onChange={this.onChangepassword} type="password" className="input"/>
                  </div>
                  <br></br>
                  <ul class="list-group list-group-horizontal">
                    <li class="col-8"> <button  type="submit">Entrar</button></li>
                    <li class="col-6"> <Button onClick={this.openRegis} appearance="primary">Registro</Button></li>
                  </ul>
                </form> 
              </div>
            </div>
          </div>
        </Modal>
        <Modal backdrop={backdrop} show={this.state.showRegistro} >
          <div className="login-wrap">
            <div className="login-html">  
              <center><label htmlFor="PrimerNombre">Registro</label></center>
              <div className="login-form">
                <Button onClick={this.closeRegis} appearance="primary">login</Button>
                <form  onSubmit={this.onSubmit}>
                  <div className="group">
                    <label htmlFor="PrimerNombre" className="label">Primer Nombre</label>
                    <input placeholder="PRIMER NOMBRE"  id="PrimerNombre" name="PrimerNombre" onChange={this.onChangePrimerNombre} type="text" className="input"/>
                  </div>
                  <div className='group'>
                    <label htmlFor="SegundoNombre" className="label">Segundo Nombre</label>
                    <input placeholder="SEGUNDO NOMBRE" id="SegundoNombre" name="SegundoNombre" onChange={this.onChangeSegundoNombre} type="text" className="input"/>
                  </div>
                  <div className="group">
                    <label htmlFor="PrimerApellido" className="label">Primer Apellido</label>
                    <input placeholder="PRIMER APELLIDO" id="PrimerApellido" name="PrimerApellido" onChange={this.onChangePrimerApellido} type="text" className="input"/>
                  </div>
                  <div className="group">
                    <label htmlFor=" SegundoApellido" className="label"> Segundo Apellido</label>
                    <input placeholder="SEGUNDO APELLIDO" id=" SegundoApellido" name=" SegundoApellido" onChange={this.onChangeSegundoApellido} type="text" className="input"/>
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="label">email</label>
                    <input placeholder="email@gmail.com" id="email" name="email" onChange={this.onChangeemail} type="text" className="input"/>
                  </div>
                  <div className="group">
                    <label htmlFor="password" className="label">password</label>
                    <input placeholder="tiene que tener minimo 4 caracteres" id="password" name="password" onChange={this.onChangepassword} type="password" className="input"/>
                  </div>
                  <div className="group">
                    <label htmlFor="password_conf" className="label">password_conf</label>
                    <input  placeholder="tiene que tener minimo 4 caracteres"  id="password_conf" name="password_conf" onChange={this.onChangepassword_conf} type="password" className="input"/>
                  </div>
                  <div className="group">
                    <label htmlFor="sexo" className="label">Sexo</label>
                    <select name="Sexo" id="Sexo" className="input" onChange={this.onChangeSexo}>
                      <option style={{color:'black'}} >Sexo</option>
                      <option style={{color:'black'}} value="Hombre">Hombre</option>
                      <option style={{color:'black'}} value="Mujer">Mujer</option>
                    </select>                   
                  </div>
                  <div className="group">
                    <label htmlFor="Telefono" className="label">Telefono</label>
                    <input id="Telefono" name="Telefono" onChange={this.onChangeTelefono} type="number" className="input"/>
                  </div>
                  <div className="group">
                    <label htmlFor="Edad" className="label">Año de nacimiento</label>
                    <input type="date" id="Edad" name="Edad" onChange={this.onChangeEdad} className="input"  min="1900-01-01" max="2025-12-31"/>
                  </div>
                  <div className="group">
                  <div >
                    <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />  
                    <div className="imgPreview">
                    {$imagePreview}
                    </div>
                  </div>
                  </div>
                  <button className="button" type="submit"  >Guardar</button>
                </form> 
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}