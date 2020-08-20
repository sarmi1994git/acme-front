import React, { Component } from 'react';
import { Navbar, NavItem, NavbarToggler, Nav, NavbarBrand, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { localUrl } from '../shared/localUrl';
import '../styles/Nav.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavOpen: false
		};
		this.toggleNav = this.toggleNav.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		});
	}

	render() {
		return(
			<React.Fragment>
				<Navbar dark expand="md">
					<div className="container">
						<NavbarToggler onClick={this.toggleNav} />
						<NavbarBrand className="mr-auto brand" href="/">
			            	<img src={localUrl + 'images/acme.png'} width="200" height="50"
			            		alt="Aconel" />
			            </NavbarBrand>
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem className="mr-3">
									<NavLink className="nav-link" to="/">
										<span className="fa fa-home fa-lg"></span> Inicio
									</NavLink>
								</NavItem>
								<NavItem className="mr-3">
									<NavLink className="nav-link" to="/users">
										Usuarios
									</NavLink>
								</NavItem>
								<NavItem className="mr-3">
									<NavLink className="nav-link" to="/roles">
										Roles
									</NavLink>
								</NavItem>
								<NavItem className="mr-3">
									<NavLink className="nav-link" to="/applications">
										Aplicaciones
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
			</React.Fragment>
		);
	}
}

export default Header;