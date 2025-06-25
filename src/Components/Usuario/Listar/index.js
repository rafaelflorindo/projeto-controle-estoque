import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './index.css';

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
        }
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        console.error("Erro ao buscar usuários:", erro);
        setDados([]);
        return;
      }

      const respostaJson = await resposta.json();
      setDados(respostaJson.data || []);
    } catch (error) {
      console.error("Erro de conexão:", error);
      setDados([]);
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
        alert("Erro ao ativar usuário.");
        return;
      }

      const respostaJson = await resposta.json();
      setDados(respostaJson.data || []);
      alert("Usuário ativado com sucesso!");
      await buscarUsuarios();
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro na comunicação com o servidor.");
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
        alert("Erro ao inativar usuário.");
        return;
      }

      const respostaJson = await resposta.json();
      setDados(respostaJson.data || []);
      alert("Usuário inativado com sucesso!");
      await buscarUsuarios(); 
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro na comunicação com o servidor.");
    }
  };

  return (
    <div className="pagina">
      <h2>Lista de Usuários</h2>

      {carregando ? (
        <p>Carregando usuários...</p>
      ) : ( 
        dados && dados.length > 0 ? (
          <div> 
            <button onClick={cadastrarUsuario}>Cadastrar</button>
            <p>Há {dados.length} usuários cadastrados</p>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Permissão</th>
                  <th>Ativo</th>
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
                    <td className="ativo">{usuario.ativo ? 'SIM' : 'NÃO'}</td>
                    <td>
                      <div className="acao-icones">
                        <Link to={`/editarUsuario/id/${usuario.id}`} title="Editar usuário" className="icone-botao">
                          <FaEdit size={24} color="blue" />
                        </Link>

                        {usuario.ativo ? (
                          <button
                            onClick={() => inativarUsuario(usuario.id)}
                            title="Inativar usuário"
                            className="icone-botao"
                          >
                            <FaToggleOff size={28} color="red" />
                          </button>
                        ) : (
                          <button
                            onClick={() => ativarUsuario(usuario.id)}
                            title="Ativar usuário"
                            className="icone-botao"
                          >
                            <FaToggleOn size={28} color="green" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : ( 
          <p>Não há usuários cadastrados.</p>
        )
      )}
    </div>
  );
};

export default ListarUsuario;