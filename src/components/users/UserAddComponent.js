import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, FormFeedback, Input, Row, Col, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { fetchRoles } from '../../redux/ActionCreators';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';
import Select from 'react-select';
import { Loading } from '../LoadingComponent';

const maxLength = (len, val) => !(val) || (val.length <= len);
const minLength = (len, val) => (val) && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


const mapStateToProps = state => {
	return {
		roles: state.roles
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchRoles: (page, size) => dispatch(fetchRoles(page, size))
});


class UserAdd extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			identification: '',
			firstname: '',
			lastname: '',
			email: '',
			roles: [],
			touched: {
				name: false
			},
			isModalOpen: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	componentDidMount() {
		this._isMounted = true;
		this.props.fetchRoles('', '');
	}

	reset() {
		this.setState({
			identification: '',
			firstname: '',
			lastname: '',
			email: '',
			roles: [],
			touched: {
				name: false
			}
		});
	}

	handleSubmit(event) {
		const errors = this.validate(this.state.identification, this.state.firstname, this.state.lastname,
											this.state.email);
		if (!errors.error) {
			/*Se procede a realizar la operación de envio*/
			/*Armar request*/
			const data = {
				identification: this.state.identification,
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				email: this.state.email,
				roles: this.state.roles
			};
			axios.post(
				baseUrl + '/users',
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

	handleSelectChange = selectedOption => {
		const roles = selectedOption.map(option => {
			return { id: option.value, name: option.label };
		});
		this.setState({
			roles
		});
	};

	handleBlur = (field) => (event) => {
		this.setState({
			touched: { ...this.state.touched, [field]: true}
		});
	}

	validate(identification, firstname, lastname, email) {
		const errors = {
			error: false,
			identification: '',
			firstname: '',
			lastname: '',
			email: ''
		};
		/*VALIDACION DE IDENTIFICACION (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (this.state.touched.identification && identification.length === 0) {
			errors.error = true;
			errors.identification = 'Identificación es requerido';
			return errors;
		}
		if (this.state.touched.identification && !minLength(10, identification)) {
			errors.error = true;
			errors.identification = 'Identificación debe tener al menos 10 caracteres';
			return errors;
		}
		if (this.state.touched.identification && !maxLength(15, identification)) {
			errors.error = true;
			errors.identification = 'Identificación debe tener 15 caracteres o menos';
			return errors
		}

		/*VALIDACION DE FIRSTNAME (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (this.state.touched.firstname && firstname.length === 0) {
			errors.error = true;
			errors.firstname = 'Nombre es requerido';
			return errors;
		}
		if (this.state.touched.firstname && !minLength(3, firstname)) {
			errors.error = true;
			errors.firstname = 'Nombre debe tener al menos 3 caracteres';
			return errors;
		}
		if (this.state.touched.firstname && !maxLength(25, firstname)) {
			errors.error = true;
			errors.firstname = 'Nombre debe tener 25 caracteres o menos';
			return errors
		}

		/*VALIDACION DE LASTNAME (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (this.state.touched.lastname && lastname.length === 0) {
			errors.error = true;
			errors.lastname = 'Apellido es requerido';
			return errors;
		}
		if (this.state.touched.lastname && !minLength(3, lastname)) {
			errors.error = true;
			errors.lastname = 'Apellido debe tener al menos 3 caracteres';
			return errors;
		}
		if (this.state.touched.lastname && !maxLength(25, lastname)) {
			errors.error = true;
			errors.lastname = 'Apellido debe tener 25 caracteres o menos';
			return errors
		}

		/*VALIDACION DE EMAIL (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (this.state.touched.email && email.length === 0) {
			errors.error = true;
			errors.email = 'Email es requerido';
			return errors;
		}
		if (this.state.touched.email && !validEmail(email)) {
			errors.error = true;
			errors.email = 'Dirección de email inválida';
			return errors;
		}

		return errors;
	}

	render() {
		const errors = this.validate(this.state.identification, this.state.firstname, this.state.lastname,
									 this.state.email);
		if (this.props.roles.isLoading) {
			return(
	            <div className="container">
	                <div className="row">
	                    <Loading />
	                </div>
	            </div>
	        );
		} else if (this.props.roles.errMess) {
			return(
	            <div className="container">
	                <div className="row">
	                	<div className="col-12 d-flex justify-content-center">
	                		<h4>{this.props.roles.errMess}</h4>
	                	</div>
	                </div>
	            </div>
	        );
		} else if (this.props.roles.roles != null) {
			const { roles } = this.props.roles.roles;
			const options = roles.map(role => {
				return { value: role.id, label: role.name };
			});
			return(
				<div className="container">
					<div className="row">
						<Breadcrumb>
							<BreadcrumbItem><Link to="/">Inicio</Link></BreadcrumbItem>
							<BreadcrumbItem><Link to="/users">Usuarios</Link></BreadcrumbItem>
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
									<Label md={12} for="identification">Identificación</Label>
									<Col md={12}>
										<Input type="text" name="identification" id="identification"
											value={this.state.identification}
											invalid={errors.identification !== ''}
											onBlur={this.handleBlur('identification')}
											onChange={this.handleInputChange} />
										<FormFeedback>{errors.identification}</FormFeedback>
									</Col>
								</Row>
								<Row className="form-group">
									<Label md={12} for="firstname">Nombres</Label>
									<Col md={12}>
										<Input type="text" name="firstname" id="firstname"
											value={this.state.firstname}
											invalid={errors.firstname !== ''}
											onBlur={this.handleBlur('firstname')}
											onChange={this.handleInputChange} />
										<FormFeedback>{errors.firstname}</FormFeedback>
									</Col>
								</Row>
								<Row className="form-group">
									<Label md={12} for="lastname">Apellidos</Label>
									<Col md={12}>
										<Input type="text" name="lastname" id="lastname"
											value={this.state.lastname}
											invalid={errors.lastname !== ''}
											onBlur={this.handleBlur('lastname')}
											onChange={this.handleInputChange} />
										<FormFeedback>{errors.lastname}</FormFeedback>
									</Col>
								</Row>
								<Row className="form-group">
									<Label md={12} for="email">Apellidos</Label>
									<Col md={12}>
										<Input type="text" name="email" id="email"
											value={this.state.email}
											invalid={errors.email !== ''}
											onBlur={this.handleBlur('email')}
											onChange={this.handleInputChange} />
										<FormFeedback>{errors.email}</FormFeedback>
									</Col>
								</Row>
								<Row className="form-group">
									<Label md={12} for="roles">
										Seleccione los roles que tendrán acceso a esta aplicación
									</Label>
									<Col md={12}>
										<Select options={options} 
											isMulti={true}
											onChange={this.handleSelectChange}
											 />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
