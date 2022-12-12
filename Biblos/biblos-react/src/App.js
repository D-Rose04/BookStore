import './App.css';
import Inicio from './componentes/Inicio';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import { useFireContext } from './firebase/context/context';

function App() {
  const { currUser, SignOut } = useFireContext();
  const handleLogOut = () => {
    SignOut();
    window.location.reload();
  }

  return (

    <div id="templatemo_container">

      <div id="templatemo_menu">
        <ul>
          <li><a href="/" className="current">Inicio</a></li>
          <li><a href="">Buscar</a></li>
          <li><a href="">Libros</a></li>
          {currUser && currUser.uid ? <></> :
            <li>
              <a href="/login">Login</a>
            </li>}
          
          <li><a href="#">Contactos</a></li>
          {currUser && currUser.uid ?
            <li>
              <a type='buttom' onClick={handleLogOut}>Cerrar sesion</a>
            </li> : <></>}
        </ul>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/login' element={currUser && currUser.uid ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={currUser && currUser.uid ? <Navigate to="/" /> : <Registro />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
