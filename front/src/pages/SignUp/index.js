import logo from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react';
import {AuthContext} from '../../contexts/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

function SignUp() {
    const [nome, setNome]=useState('');
    const [email, setEmail]=useState('');
    const [senha, setSenha]=useState('');
    const history=useNavigate();
    const { signUp} = useContext(AuthContext);

    
    async function handleSubmit(e){
      e.preventDefault();
      try {
        const createdUser = await signUp(email, senha);
        await axios.post("http://localhost:8080/usuarios", {uid: createdUser.uid, nome: nome})
        history("/dashboard")
      } catch(e) {
        toast.error("Erro ao criar conta")
      }

    }

    return (
      <div className="conteiner-center">
        <div className="login">
          
          <div className="login-area">
            <img src={logo} alt="Logo do Sistema"/>
          </div>
         
          <form onSubmit={handleSubmit}>
            <h1>Nova Conta</h1>
            <input type="text" value={nome} placeholder="Seu nome"  onChange={(e)=>{setNome(e.target.value)}} />
            <input type="text" value={email} placeholder="email@email.com"  onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" value={senha} placeholder="*****" onChange={(e)=>{setSenha(e.target.value)}}/>
            <button type="submit">Cadastrar</button>
          </form>
         
          <Link to="/">Já possui uma conta? Entre aqui!</Link>
       
        </div>
      </div>
    );
  }
  

  
  export default SignUp;