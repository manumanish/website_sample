import React from 'react';
import './UserCreation.css'
import { Link } from 'react-router-dom';

export function  UserCreation() {
  return <div className='desktop'>
    <div className='MainGroup'>
      <div className='SideMenu'>
        <div className='Rect2'>
          <div className='SideMenu1'>
          <p className='Home'>Home</p>
                <Link className='CreateUser' to='./'>CreateUser</Link>
                <p className='UpdateUser'>UpdateUser</p>
          </div>
        </div>
      </div>
      <div className='UserForm'>
      <p className='UserFormHeader'>User Creation</p>
        <div className='FirstBox'>
          <hr className='Line1'></hr>
          <label className='label1'>Account Name</label>
          <input type='text' className='AccountNameInput'></input>
          <label className='Account_ID'>Account ID</label>
          <input type='text' className='AccountIdInput'></input>
        </div>
        <div className='SecondBox'>
          <hr className='Line2'></hr>
          <label className='Instance_Type'>Instance Type</label>
          <input type ='text' className='InstanceTypeInput'></input>
          <label className='NumNodes'>Num Nodes</label>
          <input type ='text' className='NumNodesInput'></input>
          <label className='IsSuperUser'>Is Super User</label>
          <label className='Driver_Size'>Driver Size</label>
          <input type='text' className='IsSuperSizeInput'></input>
          <input type = 'text' className='DriverSizeInput'></input>
          <label className='VDI_Instance_Type' >VDI Instance Type</label>
          <input type = 'text' className='VDIInstanceTypeInput'></input>
          <label className='MaintenanceTime'>Maintenance Time</label>
          <input type='text' className='MaintenanceTimeInput'></input>

        </div>
        <div className='ThirdBox'>
          <hr className='Line4'></hr>
          <label className='MySQLDBName'>My SQL DB Name</label>
          <input type='text' className='MySQLDBNameInput'></input>
          <label className='MYSQLDBUserName'>MY SQL DB User Name</label>
          <input type='text' className='MySqlDBUserNameInput'></input>
          <label type='text' className='MYSQLDBPassword'>My SQLDB Password</label>
          <input type='text' className='MySQLDBPassword'></input>
          <label type='text' className='PostgresUserName'>Postgres User Name</label>
          <input type='text' className='PostUserName'></input>
          <label type='text' className='PostgresPassword'>Postgres Password</label>
          <input type='text' className='PostPassword'></input>
        </div>
        <div className='Down'>
          <p className='message'></p>
          <div className='Button'>
            <input type='submit' className='LoginButton'></input>
          </div>
        </div>
      </div>
    </div>
  </div>;
}


export default UserCreation;