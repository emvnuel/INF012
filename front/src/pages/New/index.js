import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './new.css';
import firebase from '../../services/firebaseConnection';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function New() {

    const [clientes, setClientes] = useState([]);
    const [loadingClientes, setLoadingClientes] = useState(true);
    const [clienteSelecionado, setClienteSelecionado] = useState(0);
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');
    
    let { id } = useParams();

    useEffect(() => {

        async function loadClientes() {

            const response = await axios.get("http://localhost:8080/clientes");
            setClientes(response.data);
            if (response.data) {
                
                setClienteSelecionado(response.data[0].id)
            }
            setLoadingClientes(false);
        }
        async function loadChamado() {

            const response = await axios.get(`http://localhost:8080/chamados/${id}`);
            const data = response.data;
            console.log(data);
            setComplemento(data.complemento);
            setAssunto(data.assunto);
            setStatus(data.status);
            setClienteSelecionado(data.idCliente);
        }


        loadClientes();

        if (id) {
            loadChamado();
        }

    }, []);

    async function handleChamado(e) {
        e.preventDefault();
        try {

            await axios.post("http://localhost:8080/chamados", {clienteId: clienteSelecionado, assunto, status, complemento})
            toast.success("Chamado cadastrado com sucesso")
        }
        catch(e) {
            toast.error("ERRO")
        }
    }

    return (
        <div>
            <Header />

            <div className="content">
                {!id && <Title nome="Novo chamado">
                    <FiPlusCircle size={25} />
                </Title>}

                {id && <Title nome="Visualizar chamado">
                    <FiSearch size={25} />
                </Title>}

                <div className="container">

                    <form onSubmit={(e) => { handleChamado(e) }} className="form-profile" >
                        <label>Cliente</label>
                        {loadingClientes ?
                            <input type="text" value="Carregando..." />
                            : <select disabled={id} value={clienteSelecionado} onChange={(e) => setClienteSelecionado(e.target.value)}>
                                {clientes.map((item, index) => {
                                    return (<option key={item.id} value={item.id}>{item.nome}</option>);
                                })}
                            </select>
                        }


                        <label>Assunto</label>
                        <select disabled={id} value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                            <option value="Suporte">Suporte</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Visita">Visita</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input disabled={id}
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "Aberto"} />
                            <span>Em Aberto</span>

                            <input disabled={id}
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "Progresso"} />
                            <span>Em Progresso</span>

                            <input disabled={id}
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "Atendido"} />
                            <span>Atendido</span>
                        </div>
                        <label>Complemento</label>
                        <textarea type="text" disabled={id}
                            placeholder="Descreva seu problema aqui"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)} />

                        <button type="submit">Registrar</button>
                    </form>

                </div>

            </div>
        </div>
    );
}