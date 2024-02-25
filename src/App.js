import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import NewScreen from './Pages/LoginPage/NewScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={LoginPage} />
        <Route exact path="/dashboard" Component={Dashboard} />
        <Route exact path="/newScreen" Component={NewScreen}/>
      </Routes>
    </Router>
  );
}

export default App;
