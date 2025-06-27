import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
// import ListarUsuario from '../Listar'; // Não está sendo usado diretamente aqui

const EditarUsuario = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [permissao, setPermissao] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const buscarUsuarios = async () => {
        const tokenLogin = localStorage.getItem('token');
        try {
            const resposta = await fetch(`http://localhost:5000/usuarios/listOne/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenLogin}`,
                }
            });

            const dados = await resposta.json();
            if (!resposta.ok) throw new Error(dados.error || "Erro ao buscar usuário"); // Melhorar mensagem de erro
            console.log(dados.data.permissao);
            setNome(dados.data.nome);
            setEmail(dados.data.email);
            setTelefone(dados.data.telefone);
            setPermissao(dados.data.permissao);
        } catch (error) {
            console.error("Erro ao buscar detalhes do usuário:", error); // Use console.error para erros
            setMensagem("Erro ao carregar dados do usuário.");
        }
    };

    useEffect(() => {
        buscarUsuarios();
    }, [id]);

    const enviarFormulario = async (e) => {
        e.preventDefault();
        if (!nome || !telefone || !permissao) {
            alert("Todos os campos (Nome, Telefone, Permissão) são de preenchimento Obrigatório."); // Mensagem mais clara
            return;
        }

        const dadosParaAtualizar = { nome, telefone, permissao }; // Renomeado para clareza
        const tokenLogin = localStorage.getItem('token');

        if (!tokenLogin) {
            alert("Token de autenticação não encontrado. Faça login novamente.");
            navigate('/login'); // Redireciona para login se não tiver token
            return;
        }

        console.log("Dados sendo enviados para PUT:", dadosParaAtualizar);
        console.log("ID sendo enviado:", id);
        console.log("Token sendo enviado:", tokenLogin);

        try {
            const response = await fetch(`http://localhost:5000/usuarios/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenLogin}`, // <-- CORRIGIDO AQUI!
                },
                body: JSON.stringify(dadosParaAtualizar)
            });

            const data = await response.json();

            if (!response.ok) {
                // Lidar com erros específicos da API
                const errorMessage = data.error || `Erro na atualização: ${response.status} ${response.statusText}`;
                console.error("Erro na resposta da API:", errorMessage);
                setMensagem(`Falha ao atualizar: ${errorMessage}`); // Mostrar erro na UI
                return; // Importante para não prosseguir com sucesso se houver erro
            }

            console.log('Resposta da API:', data);
            setMensagem("Usuário Atualizado com sucesso!!!");

        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
            setMensagem("Ocorreu um erro ao tentar atualizar o usuário.");
        }

        setTimeout(() => {
            navigate('/listarUsuarios');
        }, 2000);
    };

    return (
        <div className="editar">
            <h2>Atualizando Usuário</h2>
            <form onSubmit={enviarFormulario}>
                <div>
                    <label>Nome:</label><br />
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label><br />
                    {/* Email é disabled, então não deveria ser atualizado pelo formulário. */}
                    <input disabled type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Telefone/WhatsApp:</label><br />
                    <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </div>
                <div>
                    <label>Permissão</label><br />
                    <select value={permissao || ''} onChange={(e) => setPermissao(e.target.value)}>
                        <option value="">Selecione uma opção</option>
                        <option value="ADM">ADM</option>
                        <option value="Cliente">Cliente</option>
                    </select>
                    <p>Permissão selecionada: {permissao}</p>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button type="submit">Enviar</button>
                </div>

                {/* Mostrar mensagem de feedback */}
                {mensagem && (
                    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <p style={{ color: mensagem.includes('sucesso') ? 'green' : 'red', fontWeight: 'bold' }}>
                            {mensagem}
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default EditarUsuario;