import { Link } from 'react-router-dom';
import './style.css'

const Footer = () => {
    return (
        <footer>
            <div className="footerNavegation">
                <ul>
                   <li><Link to="/">Início</Link></li>
        <li><Link to="/listarUsuarios">Usuários</Link></li>
        <li><Link to="/">Produtos</Link></li>
        <li><Link to="/">Estoque</Link></li>
        <li><Link to="/">Relatórios</Link></li>
        <li><Link to="/">Ajuda</Link></li>
                </ul>
            </div>

            <div className="footerSocials">
                <a href="https://github.com/seuusuario" target="_blank">GitHub</a>
                <a href="https://linkedin.com/in/seuusuario" target="_blank">LinkedIn</a>
                <a href="https://lattes.cnpq.br/..." target="_blank">Lattes</a>
            </div>

            <div className="footerCredits">
                © 2025 Seu Nome. Todos os direitos reservados. Desenvolvido com React.
            </div>
        </footer>

    )
}

export default Footer;