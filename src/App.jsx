// import * as React-Bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from './HeroSection.jsx';
import { useState, useEffect } from 'react';
import UsernameForm from './usernameForm.jsx';
import ChatRoom from './ChatRoom.jsx';
import Navigation from './Navigation.jsx';



function App() {
    const [showForm, setShowForm] = useState(false)
    const [username, setUsername] = useState('')
    const [activeView, setActiveView] = useState('home');

    const handleShowForm = () => {setShowForm(true);}
    const handleHideForm = () => {setShowForm(false);}

const handleUsernameSubmit = (name) => {
    localStorage.setItem('userInfo', JSON.stringify({ uid: idGenerator(), name: name }));
    setUsername(name);
    setShowForm(false); 
    setActiveView('chat');
}

const handleChangeView = (view) => {
    setActiveView(view);
    if (view === 'chat') {
        setShowForm(false); 
    }
}

    useEffect(() => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          if (parsedUserInfo.name && parsedUserInfo.name.trim() !== '') {
              setUsername(parsedUserInfo.name); // Update username from local storage
          }
      }
  }, []);

  const isUserInfoAvailable = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo && JSON.parse(userInfo).name && JSON.parse(userInfo).name.trim() !== '';
}

  const isLoggedIn = () => {
    return username !== ''; // Check if username is not empty
}


 return (

  <>
  {<Navigation onChangeView={handleChangeView}/>}
  {activeView === 'home' && <HeroSection onGetStarted = {handleShowForm} />}
  {showForm && <UsernameForm onClose = {handleHideForm} onSubmit = {handleUsernameSubmit} />}
  {activeView === 'chat' && isUserInfoAvailable() && <ChatRoom username = {username}/>}
  </>
 )
}

export default App

function idGenerator() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
