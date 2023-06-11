import React, { useState } from 'react';
import { Routes,Route,BrowserRouter,useNavigate,useLocation   } from "react-router-dom";
import { Dashboard } from "./Dashboard"
import './Login.css'
import { UserCreation } from "./Dashboard1/UserCreation"


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
  return auth ? <Dashboard /> : <FormComponent loginFailed={true} /> ;
}

function PrivateOutletUser() {
  return <UserCreation /> 
}

function FormComponent({ loginFailed }) {
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
            {loginFailed && <p className="LoginFailed">Login failed. Please try again.</p>}
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
     <Route path="" element={<Private />} />
      <Route path="/" element={<FormComponent />} />
        <Route path="/Dashboard" element={<PrivateOutlet/>} />
        <Route path="/Dashboard/UserCreation"  element={<PrivateOutletUser/>} /> 
        <Route path="/Dashboard/UserCreation"  element={<PrivateOutletUser/>} /> 
    </Routes>
    </BrowserRouter>
  );
}

export default App;
