import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './components/Login';
import Gradebook from './components/Gradebook';
import Assignment from './components/Assignment';
import AssignmentList from './components/AssignmentList';
import {BrowserRouter, Switch,  Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit">
           <a href="/">Gradebook</a>
           </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
       <Switch>
        <Route exact path='/' component={Login} />
       // <Route exact path='/' component={Assignment} />
        <Route path='/gradebook' component={Gradebook} />
        <Route path='/assignments' component={AssignmentList} />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
