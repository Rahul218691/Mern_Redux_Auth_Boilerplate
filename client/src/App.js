import React,{useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {refreshToken} from './redux/actions/authActions';
import Header from './components/Header';
import Alert from './components/alert/Alert';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import AdminDashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/Dashboard';
import Category from './pages/admin/Category';

const App = () => {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Alert />
      <Switch>
          <Route component={Login} path='/' exact/>
          <Route component={Register} path='/register' exact/>
          <Route component={AdminDashboard} path='/admin/dashboard' exact/>
          <Route component={Category} path='/admin/create_category' exact/>
          <Route component={UserDashboard} path='/user/dashboard' exact/>
      </Switch>
    </Router>
  );
}

export default App;
