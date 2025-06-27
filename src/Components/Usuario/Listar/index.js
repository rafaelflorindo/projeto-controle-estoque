//https://react-icons.github.io/react-icons/icons/fi/

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css'
import ImageEditar from './editar.png';
import ImageInativar from './inativar.png'
import { FiEdit, FiCheckCircle, FiXCircle, FiToggleLeft, FiToggleRight, FiEye } from "react-icons/fi";


import EditarUsuario from '../Editar';

const ListarUsuario = () => {
    const [dados, setDados] = useState([]);
    const navigate = useNavigate();

    const buscarUsuarios = async () => {
        const tokenLogin = localStorage.getItem('token');
        console.log(tokenLogin)
        try {
            const resposta = await fetch('http://localhost:5000/usuarios/listAll', {
                headers: {
                    Authorization: `Bearer ${tokenLogin}`,
                }
            }

            )
            if (!resposta.ok) {
                console.log(resposta.error)
            }
            const dados = await resposta.json();
            setDados(dados.data);
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        buscarUsuarios();
    }, []);

    const cadastrarUsuario = () => {
        navigate("/cadastroUsuario");
    }
    const visualizarUsuario = async (id) => {
        console.log(id);
    }
    const ativarUsuario = async (id) => {
        console.log("Ativar=" + id);
    }
    const inativarUsuario = async (id) => {
        console.log("Inativar=" + id);
    }
    return (
        <div className="usuarios">
            <h2>Lista de Usuários</h2>
            {dados.length > 0 ? (
                <div>
                    <button onClick={cadastrarUsuario}>Cadastrar Novo Usuário</button>
                                       
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th className = "alinhaCentral">Ativo</th>
                                <th className = "alinhaCentral">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefone}</td>
                                    <td className = "alinhaCentral">{usuario.ativo? <p>SIM</p> : <p>NÃO</p>}</td>
                                    <td className = "alinhaCentral">
                                        <Link to={`/visualizarUsuario/id/${usuario.id}`} title="Visualizar">
                                            <FiEye size={20} color="orange" style={{ marginRight: '8px' }} />
                                        </Link>
                                        <Link to={`/editarUsuario/id/${usuario.id}`} title="Editar">
                                            <FiEdit size={20} color="blue" style={{ marginRight: '8px' }} />
                                        </Link>
                                        {usuario.ativo?
                                            <Link onClick={() => inativarUsuario(usuario.id)} title="Inativar">
                                                <FiToggleLeft  size={20} color="red" style={{ marginRight: '8px' }} />
                                            </Link> :
                                            <Link onClick={() => ativarUsuario(usuario.id)} title="Ativar">
                                                <FiToggleRight  size={20} color="green" />
                                            </Link>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="usuario-contador">Há {dados.length} usuários cadastrados</p>
                </div>
            ) : (
                <p className="usuario-contador">Não há usuários cadastrados</p>
            )
            }
        </div>
    );
};

export default ListarUsuario;