
import './dashboard.css';
import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export default function Dashboard(){
  const [chamados, setChamados] = useState([]);
 
  useEffect(()=> {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/chamados");
      setChamados(response.data);
    }
    fetchData()
  }, [])

  return(
    <div>
      <Header/>

      <div className="content">
        <Title nome="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
        )  : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((chamado) => {
                  return <tr key={chamado.id}>
                    <td data-label="Cliente">{chamado.nomeCliente}</td>
                    <td data-label="Assunto">{chamado.assunto}</td>
                    <td data-label="Status">
                      <span className="badge" style={{backgroundColor: '#5cb85c' }}>{chamado.status}</span>
                    </td>
                    <td data-label="Cadastrado">20/06/2021</td>
                    <td data-label="#">
                      <Link to={`/new/${chamado.id}`}>
                      <button className="action" style={{backgroundColor: '#3583f6' }}>
                        <FiSearch color="#FFF" size={17} />
                      </button>
                      </Link>
                      <button className="action" style={{backgroundColor: '#F6a935' }}>
                        <FiEdit2 color="#FFF" size={17} />
                      </button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </>
        )}

      </div>

    </div>
  )
}