import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css'

import EditarUsuario from '../Editar';

const ListarUsuario = () => {
    const [dados, setDados] = useState([]);
    const navigate = useNavigate();

    const buscarUsuarios = async() => {
        const tokenLogin = localStorage.getItem('token');
        try{
            const resposta = await fetch('http://localhost:5000/usuarios/listAll', {
                headers: {
                    Authorization: `Bearer ${tokenLogin}`,
                }
            } 

            )          
            if(!resposta.ok){
                console.log(resposta.error)
            }
            const dados = await resposta.json(); 
            setDados(dados);
        }catch(error){
            console.log(error);
        }

    };

    useEffect(() => {
        buscarUsuarios();
    }, []);

    const cadastrarUsuario = ()=>{
        navigate("/cadastroUsuario");
    }
    const excluirUsuario = async (id) => {
        console.log(id);
 
    }
    return (
         <div className="pagina">
            <h2>Lista de Usuários</h2>
            {dados.length > 0 ? (
                <div>
                    <button onClick={cadastrarUsuario}>Cadastrar</button>
                    <p>Há {dados.length} usuários cadastrados</p>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Permissão</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefone}</td>
                                    <td>{usuario.permissao}</td>
                                    <td>
                                        {/*<Link to={`/editarUsuario/id/${usuario.id}`}>Editar</Link>*/}
                                        <button onClick={() => navigate(`/editarUsuario/id/${usuario.id}`)}>Editar</button>
                                        <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Não há usuários cadastrados</p>
            )
            }
        </div>
    );
};

export default ListarUsuario;