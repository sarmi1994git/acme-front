import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchRoles } from '../../redux/ActionCreators';
import { Loading } from '../LoadingComponent';
import Pagination from '../PaginationComponent';
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

const mapStateToProps = state => {
	return {
		roles: state.roles
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchRoles: (page, size) => dispatch(fetchRoles(page, size))
});

const size = 20;

class RoleList extends Component {
	// Inicializar variable en falso para desuscribirse luego
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1
		};
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	componentDidMount() {
		// Cuando el componente es montado, cambiar el valor a true
		this._isMounted = true;
		this.props.fetchRoles(1, size);
	}

	componentDidUpdate(prevProps, prevState) {
		const { currentPage } = this.state;
		if ( currentPage !== prevState.currentPage) {
			if (currentPage > 0 && currentPage <= this.props.roles.roles.totalPages) {
				this.props.fetchRoles(currentPage, size);
			} else if (currentPage <= 0) {
				this.setState({
					currentPage: 1
				});
			} else if (currentPage > this.props.roles.roles.totalPages) {
				this.setState({
					currentPage: prevState.currentPage
				});
			}
		}
	}

	componentWillUnmount() {
		// Cambiaar a falso cuando se desmonta el componente.
		this._isMounted = false;
	}

	increment() {
		const { currentPage } = this.state;
		this.setState({
			currentPage: currentPage + 1,
		});
	}

	decrement() {
		const { currentPage } = this.state;
		this.setState({
			currentPage: currentPage - 1
		});
	}

	delete(id) {
		/*Preguntar si realmente desea eliminar la imagen*/
		Swal.fire({
			title: '¿Estás seguro de eliminar este elemento?',
			text: "Esta acción es irreversible!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'Cancelar!',
		}).then((result) => {
			if (result.value) {
				axios.delete(
					baseUrl + '/roles/' + id
				)
				.then(response => {
					if (response.status === 204) {
						/*Actualizar store de roles*/
						this.props.fetchRoles(1, size);
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
		});
	}

	render() {
		const { currentPage } = this.state;
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
			const roles = this.props.roles.roles.roles.map((role) => {
				return(
					<tr key={role.id}>
						<td className="text-center">{role.id}</td>
						<td>{role.name}</td>
						<td>{role.description}</td>
						<td className="td-actions text-right">
							<Button className="btn-simple btn-actions" color="info" size="sm"
								onClick={() => this.props.history.push('/roles/' + role.id + '/edit')}>
								<i className="fa fa-edit"></i>
							</Button>
							<Button className="btn-simple btn-actions btn-danger-icon" size="sm"
								onClick={() => this.delete(role.id)} >
								<i className="fa fa-times"></i>
							</Button>
						</td>
					</tr>
				);
			});
			return(
				<div className="container">
					<div className="row">
						<Breadcrumb>
		                    <BreadcrumbItem><Link to="/">Inicio</Link></BreadcrumbItem>
		                    <BreadcrumbItem active>Roles</BreadcrumbItem>
		                </Breadcrumb>
		                <div className="col-12">
		                    <h3 className="heading-inline mr-3">Roles</h3>
		                    <Link className="btn btn-outline-secondary" to="/roles/add-new">Añadir nuevo</Link>
		                    <hr />
		                </div>         
					</div>
					<div className="row">
						<Table striped>
							<thead>
								<tr>
									<th className="text-center">#</th>
									<th>Nombre</th>
									<th>Descripción</th>
									<th className="text-right">Acciones</th>
								</tr>
							</thead>
							<tbody>
								{roles}
							</tbody>
						</Table>
					</div>
					<div className="row row-content-without-border d-flex justify-content-center">
						<Pagination increment={this.increment}
							decrement={this.decrement} 
							page={currentPage}
							totalPages={this.props.roles.roles.totalPages}
							data={this.props.roles.roles.roles} />
					</div>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleList);