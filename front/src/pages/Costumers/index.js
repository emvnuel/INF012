import { useState, useEffect } from 'react';
import { FiUser, FiDelete,FiEdit2 } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './costumers.css'
import axios from 'axios';
import moment from 'moment';
export default function Costumers() {

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [clientes, setClientes] = useState([]);

    useEffect(()=>{
        async function loadClientes() {
            const response = await axios.get("http://localhost:8080/clientes");
            setClientes(response.data)
        }
        loadClientes();
    },[]);

    async function handleSubmit(e){
        e.preventDefault();
        const response = await axios.post("http://localhost:8080/clientes", {nome, cnpj, endereco})
        setNome('')
        setCnpj('')
        setEndereco('')
        setClientes([...clientes, response.data])
    }

    async function exlcluir(id){
        try {

          await axios.delete(`http://localhost:8080/clientes/${id}`);
          const index = clientes.indexOf(clientes.find(cliente => cliente.id == id));
          if (index !== -1) {
            clientes.splice(index, 1);
            setClientes([...clientes])
          }
        } catch(e) {
          toast.error("Erro ao apagar: cliente associado a chamados")
        }

     }

    return (
        <div>
            <Header />

            <div className="content">
                <Title nome="Clientes">
                    <FiUser size={25} />
                </Title>


                <div className="container">
                    <form onSubmit={(e)=>{handleSubmit(e)}} className="form-profile costumers">
                        <label>Nome</label>
                        <input placeholder="Digite o Nome Fantasia" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>CNPJ</label>
                        <input placeholder="Digite o CNPJ" type="text" value={cnpj} onChange={(e) => { setCnpj(e.target.value) }} />

                        <label>Endereço</label>
                        <input placeholder="Digite o seu Endereço" type="text" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} />

                        <button className="button-costumers" type="submit">Salvar</button>
                    </form>
                </div>
                <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">CNPJ</th>
                  <th scope="col">Endereço</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                  {clientes.map((cliente)=>{
                      return(
                        <tr key={cliente.id}>
                        <td data-label="Cliente">{cliente.nome}</td>
                        <td data-label="CNPJ">{cliente.cnpj}</td>
                        <td data-label="Endereço">{cliente.endereco}</td>
                        <td data-label="Cadastrado">{moment(cliente.criadoEm).format("DD/MM/YYYY")}</td>
                        <td data-label="#">
                          <button onClick={()=>{exlcluir(cliente.id)}} className="action" style={{backgroundColor: '#3583f6' }}>
                            <FiDelete color="#FFF" size={17} />
                          </button>
                            {/* <button className="action" style={{ backgroundColor: '#F6a935' }}>
                              <FiEdit2 color="#FFF" size={17} />
                            </button> */}
                        </td>
                      </tr>
                      );
                  })}
                
              </tbody>
            </table>
            </div>
        </div>
    );
}