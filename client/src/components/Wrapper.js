import React from 'react';
import {Container,Row,Col,ListGroup} from 'react-bootstrap';
import { MdDashboard,MdAdd } from "react-icons/md";
import { BsFillBarChartFill } from "react-icons/bs";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import {withRouter,Link} from 'react-router-dom';

const currentTab = (history,path) =>{
	if(history.location.pathname === path){
		return "active"
	}else{
		return ""
	}
}

const currentTabColor = (history,path) =>{
	if(history.location.pathname === path){
		return {color:'white'}
	}else{
		return {color:'black'}
	}
}

const Wrapper = ({children,history}) => {
	return(
			<Container fluid>
				<Row className="mt-2">
					<Col md={4} className="text-center">
						<ListGroup as="ul" className="wrapper_list">
						  <ListGroup.Item as="li" className={`${currentTab(history,'/admin/dashboard')}`}>
						    <Link to='/admin/dashboard' 
						    style={currentTabColor(history,'/admin/dashboard')}><MdDashboard  className="wrapper_list_icons"/> <span>Dashboard</span></Link>
						  </ListGroup.Item>
						  <ListGroup.Item as="li" className={`${currentTab(history,'/admin/create_category')}`}>
						    <Link to='/admin/create_category' 
						    style={currentTabColor(history,'/admin/create_category')}><MdAdd  className="wrapper_list_icons"/> <span>Category</span></Link>
						  </ListGroup.Item>						  
						  <ListGroup.Item as="li">
						  	<BsFillBarChartFill className="wrapper_list_icons"/> <span>Sales</span>
						  </ListGroup.Item>
						  <ListGroup.Item as="li">
						    <RiShoppingBasket2Fill  className="wrapper_list_icons"/> <span>Stock</span>
						  </ListGroup.Item>
						</ListGroup>					
					</Col>
					<Col md={8}>
						{children}
					</Col>
				</Row>
			</Container>
		)
}

export default withRouter(Wrapper);