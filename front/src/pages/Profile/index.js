
import { useState, useContext, useEffect } from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { FiSettings, FiUpload } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Profile(){
  const { user, signOut, setUser, setLocalUser} = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [imageAvatar, setImageAvatar]=useState(null);
  const history=useNavigate();


  useEffect(()=> {
    async function buscar() {
      const response = await axios.get(`http://localhost:8080/usuarios/${user.uid}`);
      const data = response.data;
      setNome(data.nome)
      setAvatarUrl(data.foto)
    }

    buscar()
    
  }, []);


function handleFile(e){
  if (e.target.files[0]) {
    console.log("picture: ", e.target.files);
    setAvatarUrl(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setAvatarUrl(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  }
}

async function handleSignout() {
  try {
    await signOut()
    history("/");
  }
  catch(e) {
    toast.error("Erro ao sair");
  }
}

 async function handleSave(e){
    e.preventDefault();
    await axios.put(`http://localhost:8080/usuarios/${user.uid}`, {nome: nome, foto: avatarUrl}); 
    toast.success("Editado com sucesso")
  }

  async function handleUpload(){
   
  }
  return(
    <div>
      <Header/>

      <div className="content">
        <Title nome="Meu perfil">
          <FiSettings size={25} />
        </Title>


        <div className="container">
          <form onSubmit={(e)=>handleSave(e)} className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#000" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile}/><br/>
              { avatarUrl === null ? 
                <img src={avatar} width="250" height="250" alt="Foto de perfil do usuario" />
                :
                <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuario" />
              }
            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={ (e) => setNome(e.target.value) } />

            <label>Email</label>
            <input type="text" value={email} disabled={true} />     

            <button type="submit">Salvar</button>       

          </form>
        </div>

        <div className="container">
            <button className="logout-btn" onClick={ () => handleSignout() } >
               Sair
            </button>
        </div>

      </div>
    </div>
  )
}