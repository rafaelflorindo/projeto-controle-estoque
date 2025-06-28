import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

import { FiEdit, FiEye, FiUserPlus } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // Certifique-se de que estes são os que você quer usar


// Importar React-Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Não esqueça de importar o CSS!



const ListarUsuario = () => {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  const buscarUsuarios = async () => {
    setCarregando(true);
    const tokenLogin = localStorage.getItem('token');
    try {
      const resposta = await fetch('http://localhost:5000/usuarios/listAll', {
        headers: {
          Authorization: `Bearer ${tokenLogin}`,
        },
      });

      if (!resposta.ok) {
        throw new Error('Erro ao buscar usuários');
      }

      const resultado = await resposta.json();
      setDados(resultado.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const cadastrarUsuario = () => {
    navigate("/cadastroUsuario");
  };

  // Esta função visualizarUsuario não é mais usada diretamente, pois você usa Link
  // const visualizarUsuario = (id) => {
  //   console.log("Visualizar ID:", id);
  // };

  const ativarUsuario = async (id) => {
    const tokenLogin = localStorage.getItem('token');
    try {
      const resposta = await fetch(`http://localhost:5000/usuarios/ativar/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${tokenLogin}`,
          'Content-Type': 'application/json'
        }
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        console.error("Erro ao ativar usuário:", erro);
        // Substitua alert por toast.error
        toast.error("Erro ao ativar usuário.");
        return;
      }

      // Se a resposta for OK
      // Substitua alert por toast.success
      toast.success("Usuário ativado com sucesso!");
      await buscarUsuarios(); // Rebusca para atualizar a lista
    } catch (error) {
      console.error("Erro de conexão:", error);
      // Substitua alert por toast.error
      toast.error("Erro na comunicação com o servidor.");
    }
  };

  const inativarUsuario = async (id) => {
    const tokenLogin = localStorage.getItem('token');
    try {
      const resposta = await fetch(`http://localhost:5000/usuarios/inativar/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${tokenLogin}`,
          'Content-Type': 'application/json'
        }
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        console.error("Erro ao inativar usuário:", erro);
        // Substitua alert por toast.error
        toast.error("Erro ao inativar usuário.");
        return;
      }

      // Se a resposta for OK
      // Substitua alert por toast.success
      toast.success("Usuário inativado com sucesso!");
      await buscarUsuarios(); // Rebusca para atualizar a lista
    } catch (error) {
      console.error("Erro de conexão:", error);
      // Substitua alert por toast.error
      toast.error("Erro na comunicação com o servidor.");
    }
  };

  return (
    <div className="usuarios">
      <h2>Lista de Usuários</h2>
      <ToastContainer />
      {carregando ? (
        <p>Carregando usuários...</p>
      ) : dados && dados.length > 0 ? (
        <div>
          <button onClick={cadastrarUsuario}>
            <FiUserPlus style={{ marginRight: '6px' }} />
            Cadastrar Novo Usuário
          </button>

          <table border="1">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th className="alinhaCentral">Ativo</th>
                <th className="coluna-acoes alinhaCentral">Ações</th> {/* ADICIONADO AQUI */}
              </tr>
            </thead>
            <tbody>
              {dados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefone}</td>
                  <td className="alinhaCentral">{usuario.ativo ? 'SIM' : 'NÃO'}</td>
                  <td className="coluna-acoes alinhaCentral"> {/* ADICIONADO AQUI */}
                    <div className="acoes-container">
                      <Link to={`/visualizarUsuario/id/${usuario.id}`} title="Visualizar">
                        <FiEye size={20} color="orange" className="toggle-icon" />
                      </Link>
                      <Link to={`/editarUsuario/id/${usuario.id}`} title="Editar">
                        <FiEdit size={20} color="blue" />
                      </Link>
                      {usuario.ativo ? (
                        <button onClick={() => inativarUsuario(usuario.id)} title="Inativar">
                          {/* ÍCONE DE "X" (Inativar) */}
                          <AiOutlineCloseCircle size={20} color="red" className="toggle-icon" /> 
                        </button>
                      ) : (
                        <button onClick={() => ativarUsuario(usuario.id)} title="Ativar" >
                          {/* ÍCONE DE "CHECK" (Ativar) */}
                          <AiOutlineCheckCircle size={20} color="green" className="toggle-icon" /> 
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="usuario-contador">Há {dados.length} usuários cadastrados</p>
        </div>
      ) : (
        <p className="usuario-contador">Não há usuários cadastrados</p>
      )}
    </div>
  );
};

export default ListarUsuario;