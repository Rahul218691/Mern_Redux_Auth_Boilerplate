import React,{useState,useEffect} from 'react';
import {Container,Row,Col,Card,Form,Button} from 'react-bootstrap';
import {Link,useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {register} from '../redux/actions/authActions';

const LoginPage = () =>{

	const dispatch = useDispatch();
	const {alert,auth} = useSelector(state=>state);
	const history = useHistory();

	const initialState = {
		username:'',
		email:'',
		password:'',
		cf_password:''
	};

	const [userData, setUserData] = useState(initialState)
	const {email,password,username,cf_password} = userData;


	const handleChangeInput = e =>{
		const {name,value} = e.target;
		setUserData({...userData,[name]:value})
	}

	const handleSubmit = (e) =>{
		e.preventDefault();
		dispatch(register(userData))
	}	

	useEffect(()=>{
		if(auth && auth.user && auth.user.role === 0){
			history.push('/user/dashboard');
		}else if(auth && auth.user && auth.user.role === 1){
			history.push('/admin/dashboard');
		}
	},[auth,history]);	


	return(
			<Container>
				<Row className="authtop">
					<Col md={{span:6,offset:3}}>
						<Card className="p-2 authcard">
							<Card.Title className="mt-1">
								<h4 className="text-center">Register</h4>
							</Card.Title>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
								  <Form.Group className="mb-3" controlId="username">
								    <Form.Label>Username</Form.Label>
								    <Form.Control type="text" placeholder="username" autoComplete="off"
								    value={username}
								    name="username"
								    onChange={handleChangeInput}
								    style={{background:`${alert.username ? '#fd2d6a14' : ''}`}}/>
									<small className="form-text text-danger">
										{alert.username ? alert.username : ''}
									</small>													    
								  </Form.Group>								
								  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								    <Form.Label>Email address</Form.Label>
								    <Form.Control type="email" placeholder="name@example.com" 
								    value={email}
								    name="email"
								    onChange={handleChangeInput}
								    style={{background:`${alert.email ? '#fd2d6a14' : ''}`}}/>
								   	<small className="form-text text-danger">
										{alert.email ? alert.email : ''}
									</small>					
								  </Form.Group>
								  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
								    <Form.Label>Password</Form.Label>
								    <Form.Control type="password" placeholder="*****" 
								    value={password}
								    onChange={handleChangeInput}
								    name="password"
								    style={{background:`${alert.password ? '#fd2d6a14' : ''}`}}/>
										<small className="form-text text-danger">
											{alert.password ? alert.password : ''}
										</small>								    
								  </Form.Group>
								  <Form.Group className="mb-3" controlId="confirmpass">
								    <Form.Label>Confirm Password</Form.Label>
								    <Form.Control type="password" placeholder="*****" 
								    value={cf_password}
								    onChange={handleChangeInput}
								    name="cf_password"
								    style={{background:`${alert.cf_password ? '#fd2d6a14' : ''}`}}/>
								    <small className="form-text text-danger">
										{alert.cf_password ? alert.cf_password : ''}
									</small>					
								  </Form.Group>								  
									<div className="mb-1 d-flex" style={{justifyContent:'flex-end'}}>
										<Link to='/'>Already have account?</Link>
									</div>								  
									<div className="d-grid gap-2">
									  <Button type="submit" variant="primary" size="lg">
									   	Register
									  </Button>
									</div>							  
								</Form>								
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		)
}

export default LoginPage;