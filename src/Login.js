import React, { useState } from 'react';
import { Routes,Route,BrowserRouter,useNavigate,useLocation   } from "react-router-dom";
import { Dashboard } from "./Dashboard"
import './Login.css'


function useAuth(username) {
  console.log(username);
  if(username === "admin"){
    return true;
  }
  return false;
  
  
}

const Private = () => <FormComponent />;

function PrivateOutlet() {
  const location = useLocation();
  const username = location.state?.username || ''; 
  const auth = useAuth(username);
  console.log("inside private")
  return auth ? <Dashboard /> : <FormComponent /> ;
}

function FormComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(username);
    console.log("inside");
    navigate('/Dashboard', { state: { username } });
      
  };
  return (
    <div className='Desktop1_login'>
      <div className='rect1'>
        <div className='rect2'>
          <p className='Login'>Login</p>
          <form onSubmit={handleSubmit}>
              <input type="text" className='UserName' name="name" value={username} onChange={handleUsernameChange} />
              <input type="password" className='Password' name="email" value={password} onChange={handlePasswordChange} />
            <button className='Submit' type="submit">Submit</button>
          </form>
        </div>
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<FormComponent />} />
        <Route path="/Dashboard" element={<PrivateOutlet/>}>
          <Route path="" element={<Private />} />
        </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
