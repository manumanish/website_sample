import React from 'react';
import './Dashboard.css'
import { Link } from 'react-router-dom';

export function  Dashboard() {
  return <div className='Desktop2'>
    <div className='Group2'>
        <div className='Rectangle1'>
            <div className='Group1'>
                <p className='Home'>Home</p>
                <Link className='CreateUser' to='./UserCreation'>CreateUser</Link>
                <p className='UpdateUser'>UpdateUser</p>
            </div>
        </div>
    </div>
  </div>;
}


export default Dashboard;