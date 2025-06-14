import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

const CadastroUsuario = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha , setSenha] = useState('');
    const [reSenha, setReSenha] = useState('');
    const [permissao, setPermissao]= useState('Cliente');
    
    const [mensagem, setMensagem] = useState('');
    const [dadosEnviar, setDadosEnviar] = useState('');
    const navigate = useNavigate();

    const enviarFormulario = async(e) => {
        e.preventDefault();

        if(!nome || !email || !telefone || !senha || !reSenha || !permissao){
            alert("Todos os campos são de preenchimento Obrigatório");
            return
        }

        if(senha !== reSenha){
            alert("As senhas são diferentes, digite novamente");
            return
        }

        const dados = { nome, email, telefone, senha, permissao};
        setDadosEnviar(dados)

        console.log('Enviando dados...', dados);
        setMensagem("Usuário cadastrado com sucesso!!!")
        try{
            const tokenLogin = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/usuarios/create/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dados)
            }, {
                headers: {
                    Authorization: `Bearer ${tokenLogin}`,
                }
            })

            const data = await response.json();

            if(!response.ok){
                console.log(data.error)
            }

        }catch(error){
            console.log(error);
        }
        setTimeout(() => {
            navigate('/listarUsuarios');
        }, 2000);
        // Limpar campos após envio
        setNome('');
        setEmail('');
        setTelefone('');
        setSenha('');
        setReSenha('');
        setPermissao('');
    };

    return (
        <div className="pagina">
            <h2>Cadastro de Usuários</h2>
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
                    <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                </div>
                <div>
                    <label>Senha:</label><br />
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <div>
                    <label>Re Senha:</label><br />
                    <input type="password" value={reSenha} onChange={(e) => setReSenha(e.target.value)} required />
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

export default CadastroUsuario;