import React,{useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {Row,Col,Form,Button,Table,InputGroup,FormControl} from 'react-bootstrap';
import { FaTrash,FaPencilAlt } from "react-icons/fa";

const Category = () =>{

	const [category,setCategory] = useState('');

	return(
			<Wrapper>	
				<h4 className="text-center">Create Category</h4>
				<Row className="mt-2">
					<Col md={4}>
						<Form>
						  <Form.Group className="mb-3" controlId="categoryname">
						    <Form.Label>Category Title</Form.Label>
						    <Form.Control type="text" placeholder="Enter category name" 
						    value={category}
						    onChange={(e)=>setCategory(e.target.value)}
						    />
						  </Form.Group>	
						  <Button variant="primary" className="btn-block">Create</Button>
						</Form>
					</Col>
					<Col md={8}>
						<div className="category_header">
						 <InputGroup className="mb-3">
						    <FormControl
						      placeholder="search category..."
						    />
						  </InputGroup>							
						</div>
						<Table striped bordered hover responsive="md" className="text-center">
						  <thead>
						    <tr>
						      <th>Title</th>
						      <th>Actions</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <td>Otto</td>
						      <td className="category_action">
						      	<span><FaTrash /></span>
						      	<span><FaPencilAlt /></span>
						      </td>
						    </tr>
						  </tbody>
						</Table>					
					</Col>
				</Row>
			</Wrapper>
		)
}

export default Category;