import React, { useState } from 'react';
import { Routes,Route,BrowserRouter,useNavigate,useLocation   } from "react-router-dom";
import { Dashboard } from "./Dashboard"


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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
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
