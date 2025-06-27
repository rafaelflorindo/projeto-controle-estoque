import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Auth = () => {
    const [email, setEmail] = useState('rafaelflorindo@hotmail.com');
    const [senha, setSenha] = useState('123');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuario');
        if (usuarioSalvo) {
            navigate('/');
        }
    }, [navigate]);

    const enviarFormulario = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            setMensagem("Todos os campos são de preenchimento obrigatório.");
            return;
        }
        setLoading(true);
        const dados = { email, senha };

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            const data = await response.json();

            if (!response.ok) {
                setMensagem("Erro ao autenticar: " + (data.error || 'Erro desconhecido'));
                setLoading(false)
                return;
            }

            localStorage.setItem("usuario", JSON.stringify(data));
            localStorage.setItem('token', data.token);

            //await AsyncStorage.setItem('usuario', usuario);
            setMensagem("Usuário autenticado com sucesso!");
            setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 2000);
            setTimeout(() => {
                navigate('/');
            }, 2000);

            setEmail('');
            setSenha('');
        } catch (error) {
            console.error(error);
            setMensagem("Erro na conexão com o servidor.");
            setLoading(false); // Para loader no catch
        }
    };

    return (
        <div className="componenteAuth">
            <h2>Autenticação de Usuários</h2>
            {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
            <form onSubmit={enviarFormulario}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label>Senha:</label><br />
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;
