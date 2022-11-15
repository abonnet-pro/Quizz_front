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
import Protected from './components/Protected';

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
        <Route path='/login' element={<Protected isAdmin={false} isLoggedIn={user} isPageLogin={true}><Login /></Protected>} />
        <Route path='/signup' element={<Protected isAdmin={false} isLoggedIn={user} isPageLogin={true}><Signup /></Protected>} />
        <Route path="/signout" element={ <Logout setUser={ setUser }/> }/>
        <Route path='/my-account' element={<Protected isAdmin={false} isLoggedIn={user} isPageLogin={false}><MyAccount /></Protected>}/>
        <Route path='/play/:id' element={<Protected isAdmin={false} isLoggedIn={user} isPageLogin={false}><Play setScore={ setScore } setHistorique={ sethistoryReponse } historique={ historyReponse } /></Protected>}/>
        <Route path='/resultat/:id' element={<Protected isAdmin={false} isLoggedIn={user} isPageLogin={false}><Resultat historique={ historyReponse } setScore={ setScore } /></Protected>}/>
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/wheel' element={<Protected isAdmin={false} isLoggedIn={user} isPageLogin={false}><CategorieChooser /></Protected>} />
        <Route path='/categories' element={<Protected isAdmin={false} isLoggedIn={user} isPageLogin={false}><Categories /></Protected>} />
        <Route path='/questions' element={<Protected isAdmin={true} isLoggedIn={user} isPageLogin={false}><Questions/> </Protected>}/>
        <Route path='/categorie/:id/questions' element={ <Protected isAdmin={false} isLoggedIn={user} isPageLogin={false}><CategorieQuestions/></Protected> }/>
        <Route path='/categorie/:id/question/form' element={ <Protected isAdmin={false} isLoggedIn={user} isPageLogin={false}><QuestionForm/></Protected> }/>
      </Routes>
    </div>
    </>
  );
}

export default App;
