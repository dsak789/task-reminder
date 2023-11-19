import React,{Fragment} from 'react';
import './App.css';
import AddTask from './controllers/AddTask';
import Tasks from './controllers/Tasks'
import UserRegister from './controllers/UserRegister';

function App() {
  return (
  
    <Fragment>
      {/* <UserRegister/> */}
      <AddTask/>
      <Tasks/>
    </Fragment>
  )
}

export default App;
