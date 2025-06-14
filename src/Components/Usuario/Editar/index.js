import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css'
import ListarUsuario from '../Listar';

const EditarUsuario = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [dadosEnviar, setDadosEnviar] = useState('');
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
            })

            const dados = await resposta.json();
            if (!resposta.ok) throw new Error(dados.error || "Erro ao atualizar");
            console.log(dados.permissao)
            setNome(dados.nome)
            setEmail(dados.email)
            setTelefone(dados.telefone)
            setPermissao(dados.permissao)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        buscarUsuarios();
    }, [id]);

    const enviarFormulario = async (e) => {
        e.preventDefault();
        if (!nome || !email || !telefone || !permissao) {
            alert("Todos os campos são de preenchimento Obrigatório");
            return
        }
        const dados = { nome, email, telefone, permissao };
        setDadosEnviar(dados)

        try {
            const tokenLogin = localStorage.getItem('token');
            console.log(tokenLogin)
            const response = await fetch(`http://localhost:5000/usuarios/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            }, {
                headers: {
                    Authorization: `Bearer ${tokenLogin}`,
                }
            })

            const data = await response.json();

            if (!response.ok) {
                console.log(data.error)
            }
            console.log('Enviando dados...', dados);
            setMensagem("Usuário Atualizado com sucesso!!!")
        } catch (error) {
            console.log(error);
        }
        // Redirecionar após 2 segundos
        setTimeout(() => {
            navigate('/listarUsuarios');
        }, 2000);
        // Limpar campos após envio
        setNome('');
        setEmail('');
        setTelefone('');
    };

    return (
        <div className="pagina">
            <h2>Atualizando Usuário</h2>
            <form onSubmit={enviarFormulario}>
                <div>
                    <label>Nome:</label><br />
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label><br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Telefone/WhatsApp:</label><br />
                    <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </div>
                <div>
                    <label>Permisão</label><br />
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

                {
                    dadosEnviar && (
                        <div style={{ marginTop: '20px' }}>
                            <h4>Dados enviados:</h4>
                            <p><strong>{mensagem}</strong> </p>

                        </div>
                    )}
            </form>
        </div>
    );
};

export default EditarUsuario;