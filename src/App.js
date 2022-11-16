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
import {useEffect, useState} from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Leaderboard from './pages/Leaderboard';
import Logout from "./pages/Logout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategorieChooser from "./components/categorieChooser";
import Questions from "./pages/Questions";
import CategorieQuestions from "./pages/CategorieQuestions";
import QuestionForm from "./pages/QuestionForm";
import Categories from './pages/Categories';
import MyAccount from './pages/My-account';
import Play from './pages/Play';
import Resultat from './pages/Resultat';
import Multiplayer from "./pages/Multiplayer";

function App() {
  const [user, setUser] = useState(getLocalStorage(USER_KEY))
  const [score, setScore] = useState(null);
  const [historyReponse, sethistoryReponse] = useState([])

  contextPrototype.user = user;
  contextPrototype.setUser = setUser;

  const contextValue = {
    user: user,
    setUser: setUser
  }

  return (
    <>
    <UserContext.Provider value={contextValue}/>
    <Header score={ score }/>
    <img className='gribouillis1' src={Gribouillis1} alt='gribouillis' />
    <img className='gribouillis2' src={Gribouillis2} alt='gribouillis' />
    <img className='gribouillis3' src={Gribouillis3} alt='gribouillis' />
    <img className='gribouillis4' src={Gribouillis4} alt='gribouillis' />
      <ToastContainer hideProgressBar/>
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home setScore={ setScore } user={ user } setHistorique={sethistoryReponse} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/signout" element={ <Logout setUser={ setUser }/> }/>
        <Route path='/my-account' element={<MyAccount />}/>
        <Route path='/play/:id' element={<Play setScore={ setScore } setHistorique={ sethistoryReponse } historique={ historyReponse } />}/>
        <Route path='/resultat/:id' element={<Resultat historique={ historyReponse } setScore={ setScore } />}/>
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/wheel' element={<CategorieChooser />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/questions' element={ <Questions/> }/>
        <Route path='/categorie/:id/questions' element={ <CategorieQuestions/> }/>
        <Route path='/categorie/:id/question/form' element={ <QuestionForm/> }/>
        <Route path='/multiplayer' element={ <Multiplayer historique={ historyReponse } setHistorique={ sethistoryReponse } setScore={ setScore }/> }/>
      </Routes>
    </div>
    </>
  );
}

export default App;
