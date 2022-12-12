import './App.css';
import Inicio from './componentes/Inicio';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login';
import Registro from './componentes/Registro';

function App() {
  return (

    <div id="templatemo_container">

      <div id="templatemo_menu">
        <ul>
          <li><a href="/" className="current">Inicio</a></li>
          <li><a href="">Buscar</a></li>
          <li><a href="">Libros</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="#">Contactos</a></li>
        </ul>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Registro />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
