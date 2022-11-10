import './App.css';
import Gribouillis1 from './assets/gribouillis1.png'
import Gribouillis2 from './assets/gribouillis2.png'
import Gribouillis3 from './assets/gribouillis3.png'
import Gribouillis4 from './assets/gribouillis4.png'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import { getLocalStorage, USER_KEY } from './services/localStorage.service';
import { contextPrototype, UserContext } from './services/usersContext.service'
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Leaderboard from './pages/Leaderboard';

function App() {
  const [user, setUser] = useState(getLocalStorage(USER_KEY))

  contextPrototype.user = user;
  contextPrototype.setUser = setUser;

  const contextValue = {
    user: user,
    setUser: setUser
  }
  return (
    <>
    <UserContext.Provider value={contextValue}/>
    <Header />
    <img className='gribouillis1' src={Gribouillis1} alt='gribouillis' />
    <img className='gribouillis2' src={Gribouillis2} alt='gribouillis' />
    <img className='gribouillis3' src={Gribouillis3} alt='gribouillis' />
    <img className='gribouillis4' src={Gribouillis4} alt='gribouillis' />
    <div className='container'>
    <Routes>
      {/* Route principale */}
      <Route path='/' element={<Home />} />
      {/* Routes Authentification */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      {/* Routes générales */}
      <Route path='/leaderboard' element={<Leaderboard />} />
    </Routes>
    </div>
    </>
  );
}

export default App;
