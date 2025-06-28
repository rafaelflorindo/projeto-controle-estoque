// src/pages/VisualizarUsuario/index.js (ou VisualizarUsuario.jsx)
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEdit, FiArrowLeft } from 'react-icons/fi'; // Ícones úteis
import { toast } from 'react-toastify'; // Para notificações
import './visualizarUsuario.css'; // Crie este arquivo CSS

const VisualizarUsuario = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarDetalhesUsuario = async () => {
      setCarregando(true);
      setErro(null);
      const tokenLogin = localStorage.getItem('token');

      try {
        const resposta = await fetch(`http://localhost:5000/usuarios/listOne/${id}`, {
          headers: {
            Authorization: `Bearer ${tokenLogin}`,
          },
        });

        if (!resposta.ok) {
          if (resposta.status === 404) {
            throw new Error('Usuário não encontrado.');
          }
          throw new Error('Erro ao buscar detalhes do usuário.');
        }

        const resultado = await resposta.json();
        setUsuario(resultado.data); // Assumindo que a API retorna { data: {...} }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setErro(error.message);
        toast.error(`Erro: ${error.message}`);
      } finally {
        setCarregando(false);
      }
    };

    if (id) {
      buscarDetalhesUsuario();
    }
  }, [id]); // Dependência no ID para recarregar se o ID da URL mudar

  const handleEditar = () => {
    navigate(`/editarUsuario/id/${id}`); // Navega para a tela de edição
  };

  const handleVoltar = () => {
    navigate('/listarUsuario'); // Volta para a lista de usuários
  };

  if (carregando) {
    return <div className="visualizar-usuario-container">Carregando detalhes do usuário...</div>;
  }

  if (erro) {
    return <div className="visualizar-usuario-container erro-mensagem">{erro}</div>;
  }

  if (!usuario) {
    return <div className="visualizar-usuario-container">Nenhum usuário encontrado.</div>;
  }

  return (
    <div className="visualizar-usuario-container">
      <div className="visualizar-usuario-header">
        <button onClick={handleVoltar} className="btn-voltar">
          <FiArrowLeft style={{ marginRight: '5px' }} /> Voltar
        </button>
        <h2>Detalhes do Usuário</h2>
      </div>

      <div className="visualizar-usuario-content">
        {/* Se você tiver um campo 'fotoUrl' ou 'avatarUrl' no seu usuário */}
        
        {usuario.fotoUrl && ( // Adapte para o nome do campo da sua foto
          <div className="usuario-foto-container">
            <img src={`/imagens/usuarios/${usuario.fotoUrl}`} alt={usuario.nome} className="usuario-foto" />

          </div>
        )}
        
        <div className="usuario-detalhes">
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Telefone:</strong> {usuario.telefone}</p>
          <p><strong>Ativo:</strong> {usuario.ativo ? 'Sim' : 'Não'}</p>
          {/* Adicione outros campos que seu usuário possui */}
          <p><strong>Endereço:</strong> {usuario.endereco}</p>
          <p><strong>Data de Nascimento:</strong> {usuario.dataNascimento ? new Date(usuario.dataNascimento).toLocaleDateString() : 'N/A'}</p>
          {/* etc. */}
        </div>
      </div>

      <div className="visualizar-usuario-actions">
        <button onClick={handleEditar} className="btn-editar">
          <FiEdit style={{ marginRight: '5px' }} /> Editar Usuário
        </button>
      </div>
    </div>
  );
};

export default VisualizarUsuario;