import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import Logo from '../images/logo.png';
import {Link,withRouter} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {logout} from '../redux/actions/authActions'

const currentTab = (history,path) =>{
	if(history.location.pathname === path){
		return "active"
	}else{
		return ""
	}
}


const Header = ({history}) =>{

	const dispatch = useDispatch();
	const {auth} = useSelector(state=>state);

	return(
		<Navbar bg="light" expand="lg" className="header_nav">
		    <Navbar.Brand href="#home">
		        <img
		          alt=""
		          src={Logo}
		          width="30"
		          className="d-inline-block align-top img-fluid"
		        />{' '}	Krishna Stores	    	
		    </Navbar.Brand>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
		      <Nav className="ml-auto">
		      	{
		      		!auth.user ? (
		      				<>
		        				<Link className={`nav-link ${currentTab(history,'/')}`} to='/'>Login</Link>
		        				<Link className={`nav-link ${currentTab(history,'/register')}`} to='/register'>Register</Link>
		      				</>
		      			):(
		      				<Link className="nav-link" to='#'  onClick={()=>dispatch(logout())}>Logout</Link>
		      			)
		      	}
		      </Nav>
		    </Navbar.Collapse>
		</Navbar>			
		)
}

export default withRouter(Header);