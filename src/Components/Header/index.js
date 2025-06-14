import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './style.css'
import perfil from './perfilRafael.jpg'

const Header = ()=>{

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('usuario');
        if (user) {
            setUsuario(JSON.parse(user));
        }
    }, []);

    const Logout = () => {
        localStorage.removeItem('usuario');
        navigate('/auth');
    };
    return (
        <header>
            <img src={perfil} alt="Foto de perfil de Rafael" className="perfil-img" />
            <h1 className="nome">Rafael Alves Florindo</h1>
            {usuario && (
                <div style={{ position: 'absolute', top: 10, right: 20 }}>
                    <span>Olá, {usuario.data.nome}</span>
                    <button onClick={Logout} style={{ marginLeft: 10 }}>Logout</button>
                </div>
            )}
        </header>
    );
};

export default Header;