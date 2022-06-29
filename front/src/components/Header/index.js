import './header.css'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'
import { useState, useContext, useEffect } from 'react';
import {AuthContext} from '../../contexts/auth';
import axios from 'axios';


function Header() {
    const {user}=useContext(AuthContext);
    const [avatarUrl, setAvatarUrl] = useState(null);
   
    useEffect(()=> {
        async function buscar() {
          const response = await axios.get(`http://localhost:8080/usuarios/${user.uid}`);
          const data = response.data;
          setAvatarUrl(data.foto)
        }
    
        buscar()
        
      }, []);

    return (
        <div className="sidebar">
            <div>
                <img alt="Foto Avatar" src={avatarUrl ?? avatar} />
            </div>
            <Link to="/dashboard">
                <FiHome color="#FFF" size={24} />
            Chamados
        </Link>
            <Link to="/costumers">
                <FiUser color="#FFF" size={24} />
            Clientes
        </Link>
            <Link to="/profile">
                <FiSettings color="#FFF" size={24} />
            Configurações
        </Link>

        </div>
    );
}
export default Header;