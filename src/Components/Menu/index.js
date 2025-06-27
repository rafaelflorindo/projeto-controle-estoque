import { Link } from 'react-router-dom';
import './style.css'

const Menu = () => {
  return (
    <nav>
      <ul>
      <li>
        <Link to="/">Início</Link></li>
        <li><Link to="/listarUsuarios">Usuários</Link></li>
        <li><Link to="/">Produtos</Link></li>
        <li><Link to="/">Estoque</Link></li>
        <li><Link to="/">Relatórios</Link></li>
        <li><Link to="/">Ajuda</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;