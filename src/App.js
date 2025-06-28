import "./App.css"

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";

/*importação de componentes da estrutura. */
import Header from './Components/Header';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import Home from './Pages/Home';

/*importação de componente da aplicação*/
import CadastroUsuario from './Components/Usuario/Cadastrar';
import Auth from './Components/Usuario/Auth';
import ListarUsuario from './Components/Usuario/Listar'; 
import EditarUsuario from './Components/Usuario/Editar';
import VisualizarUsuario from './Components/Usuario/VisualizarUsuario'

function AppContent() {
  const location = useLocation();
  const estaNaPaginaLogin = location.pathname === '/auth';
  const usuario = localStorage.getItem("usuario");

  return (
    <div className="App">
      {!estaNaPaginaLogin && <Header />}
      {!estaNaPaginaLogin && <Menu />}
      <Routes>
        <Route path="/" element={usuario ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
        <Route path="/editarUsuario" element={<EditarUsuario />} />
        <Route path="/editarUsuario/id/:id" element={<EditarUsuario />} />
        <Route path="/listarUsuarios" element={<ListarUsuario />} />
        <Route path="/visualizarUsuario/id/:id" element={<VisualizarUsuario  />} />
        
        <Route path="/auth" element={<Auth />} />
      </Routes>
      {!estaNaPaginaLogin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>

  );
}

export default App;
