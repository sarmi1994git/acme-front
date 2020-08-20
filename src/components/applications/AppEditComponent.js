import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppDetail, fetchRoles } from '../../redux/ActionCreators';
import { Breadcrumb, BreadcrumbItem, Form, FormFeedback, Input, Row, Col, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const mapStateToProps = state => {
	return {
		application: state.application,
		roles: state.roles
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchAppDetail: (id) => dispatch(fetchAppDetail(id)),
	fetchRoles: (page, size) => dispatch(fetchRoles(page, size))
});

const maxLength = (len, val) => !(val) || (val.length <= len);
const minLength = (len, val) => (val) && (val.length >= len);

class AppEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			description: '',
			roles: [],
			options: [],
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
	
	componentDidMount() {
		this.props.fetchAppDetail(this.props.id);
		this.props.fetchRoles('', '')
		.then(response => {
			const { roles } = response.payload;
			const options = roles.map(role => {
				return { value: role.id, label: role.name };
			});
			this.setState({options});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const id = this.props.application && this.props.application.application ? this.props.application.application.id : null;
		if (id !== prevState.id) {
			if (this.props.application.application) {
				this.setState({
					id: this.props.application.application.id,
					name: this.props.application.application.name,
					description: this.props.application.application.description ? this.props.application.application.description : '',
					roles: this.props.application.application.roles
				});
			}
		}
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}
	

	handleSubmit(event) {
		const errors = this.validate(this.state.name);
		if (!errors.error) {
			/*Se procede a realizar la operación de actulizacion*/
			/*Armar request*/
			const data = {
				name: this.state.name,
				description: this.state.description,
				roles: this.state.roles
			};
			axios.put(
				baseUrl + '/applications/' + this.state.id,
				data
			)
			.then(response => {
				if (response.status === 200) {
					const data = response.data;
					if (data.code === 0) {
							Swal.fire(
							'Éxito',
							data.message,
							'success'
						);
						//Intentar redireccionar a la pagina principal
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
		if (this.props.application.isLoading) {
			return(
				<div className="container">
					<div className="row">
						<Loading />
					</div>
				</div>
			);	
		} else if (this.props.application.errMess) {
			return(
				<div className="container">
					<div className="row">
						<div className="col-12 d-flex justify-content-center">
							<h4>{this.props.application.errMess}</h4>
						</div>
					</div>
				</div>
			);
		} else if (this.props.application.application != null) {
			/*Valores por defecto*/
			const application = this.props.application.application;
			const defaultValues = application.roles.map(role => {
				return { value: role.id, label: role.name };
			});
			return(
				<div className="container">
					<div className="row">
						<Breadcrumb>
							<BreadcrumbItem><Link to="/">Inicio</Link></BreadcrumbItem>
							<BreadcrumbItem><Link to="/applications">Aplicaciones</Link></BreadcrumbItem>
							<BreadcrumbItem active>Editar</BreadcrumbItem>
						</Breadcrumb>
						<div className="col-12">
							<h3 className="heading-inline mr-3">Editar aplicacion</h3>
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
								<Row className="form-group">
									<Label md={12} for="roles">
										Seleccione los roles que tendrán acceso a esta aplicación
									</Label>
									<Col md={12}>
										<Select options={this.state.options} 
											isMulti={true}
											onChange={this.handleSelectChange}
											defaultValue={defaultValues}
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

export default connect(mapStateToProps, mapDispatchToProps)(AppEdit);