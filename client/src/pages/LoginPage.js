import React,{useState,useEffect} from 'react';
import {Container,Row,Col,Card,Form,Button} from 'react-bootstrap';
import {Link,useHistory} from 'react-router-dom';
import {login} from '../redux/actions/authActions';
import {useDispatch,useSelector} from 'react-redux';

const LoginPage = () =>{

	const dispatch = useDispatch();
	const {auth} = useSelector(state=>state)
	const history = useHistory();

	const initialState = {
		email:'',
		password:''
	};

	const [userData, setUserData] = useState(initialState)
	const {email,password} = userData;

	const handleChangeInput = e =>{
		const {name,value} = e.target;
		setUserData({...userData,[name]:value})
	}

	const handleSubmit = (e) =>{
		e.preventDefault();
		dispatch(login(userData))
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
								<h4 className="text-center">Login</h4>
							</Card.Title>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
								  <Form.Group className="mb-3" controlId="emailinput">
								    <Form.Label>Email address</Form.Label>
								    <Form.Control type="email" placeholder="name@example.com" 
								    name="email"
								    value={email}
								    onChange={handleChangeInput}/>
								  </Form.Group>
								  <Form.Group className="mb-3" controlId="passwordinput">
								    <Form.Label>Password</Form.Label>
								    <Form.Control type="password" placeholder="*****" 
								    name="password"
								    value={password}
								    onChange={handleChangeInput}/>
								  </Form.Group>
									<div className="mb-1 d-flex" style={{justifyContent:'flex-end'}}>
										<Link to='/register'>Create Account</Link>
									</div>								  
									<div className="d-grid gap-2">
									  <Button type="submit" variant="primary" size="lg">
									   	Login
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