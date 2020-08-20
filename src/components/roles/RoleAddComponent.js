import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, FormFeedback, Input, Row, Col, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

const maxLength = (len, val) => !(val) || (val.length <= len);
const minLength = (len, val) => (val) && (val.length >= len);

class RoleAdd extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			touched: {
				name: false
			},
			isModalOpen: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	reset() {
		this.setState({
			name: '',
			description: '',
			touched: {
				name: false
			}
		});
	}

	handleSubmit(event) {
		const errors = this.validateSubmit(this.state.name);
		if (!errors.error) {
			/*Se procede a realizar la operación de envio*/
			/*Armar request*/
			const data = {
				name: this.state.name,
				description: this.state.description,
			};
			axios.post(
				baseUrl + '/roles',
				data
			)
			.then(response => {
				if (response.status === 201) {
					const data = response.data;
					if (data.code === 0) {
							Swal.fire(
							'Éxito',
							data.message,
							'success'
						);
						//resetear formulario
						this.reset();
					}
				}
			})
			.catch(error => {
				if (error.response) {
					Swal.fire(
						'Oops...',
						error.response.data.message,
						'error'
					);
			    } else {
			    	console.log(error);
			    }
			});

		}
		event.preventDefault();
	}

	handleInputChange(event) {
		const target = event.target;
		const { name, value} = target;
		this.setState({
			[name]: value
		});
	}

	handleBlur = (field) => (event) => {
		this.setState({
			touched: { ...this.state.touched, [field]: true}
		});
	}

	validate(name) {
		const errors = {
			error: false,
			name: ''
		};
		/*VALIDACION DE NOMBRE DEL ROL (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (this.state.touched.name && name.length === 0) {
			errors.error = true;
			errors.name = 'Nombre del rol es requerido';
			return errors;
		}
		if (this.state.touched.name && !minLength(3, name)) {
			errors.error = true;
			errors.name = 'Nombre del rol debe tener al menos 3 caracteres';
			return errors;
		}
		if (this.state.touched.name && !maxLength(100, name)) {
			errors.error = true;
			errors.name = 'Nombre del rol debe tener 100 caracteres o menos';
			return errors
		}

		/*------------------------------------------------------------------*/
		return errors;
	}

	validateSubmit(name) {
		const errors = {
			error: false,
			name: ''
		};
		/*VALIDACION DE NOMBRE DEL ROL (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (name.length === 0) {
			errors.error = true;
			errors.name = 'Nombre del rol es requerido';
			this.setState({
				touched: { ...this.state.touched, name: true}
			});
			return errors;
		}
		if (!minLength(3, name)) {
			errors.error = true;
			errors.name = 'Nombre del rol debe tener al menos 3 caracteres';
			this.setState({
				touched: { ...this.state.touched, name: true}
			});
			return errors;
		}
		if (!maxLength(100, name)) {
			errors.error = true;
			errors.name = 'Nombre del producto debe tener 100 caracteres o menos';
			this.setState({
				touched: { ...this.state.touched, name: true}
			});
			return errors
		}

		/*------------------------------------------------------------------*/
		return errors;
	}

	render() {
		const errors = this.validate(this.state.name);
		
		return(
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to="/">Inicio</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/roles">Roles</Link></BreadcrumbItem>
						<BreadcrumbItem active>Añadir nuevo</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3 className="heading-inline mr-3">Añadir nuevo</h3>
						<hr />
					</div>         
				</div>
				<div className="row justify-content-center" style={{marginBottom: '150px'}}>
					<div className="col-12 col-md-8">
						<Form onSubmit={this.handleSubmit}>
							<Row className="form-group">
								<Label md={12} for="name">Nombre</Label>
								<Col md={12}>
									<Input type="text" name="name" id="name"
										value={this.state.name}
										invalid={errors.name !== ''}
										onBlur={this.handleBlur('name')}
										onChange={this.handleInputChange} />
									<FormFeedback>{errors.name}</FormFeedback>
								</Col>
							</Row>
							<Row className="form-group">
								<Label md={12} for="description">Descripción</Label>
								<Col md={12}>
									<Input type="textarea" name="description" id="description"
										rows="4"
										value={this.state.description}
										onChange={this.handleInputChange} />
									<FormFeedback>{errors.description}</FormFeedback>
								</Col>
							</Row>
							<Row className="form-group" >
								<Col md={12} className="text-center">
									<div className="col-12 col-md-6 m-auto">
										<Button type="submit" color="dark" size="lg" block>
											Guardar
										</Button>
									</div>
								</Col>
							</Row>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

export default RoleAdd;