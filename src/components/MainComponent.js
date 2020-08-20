import React, { Component } from 'react';
import { TransitionGroup, CSSTransition} from 'react-transition-group';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import UserList from './users/UserListComponent';
import UserAdd from './users/UserAddComponent';
import RoleList from './roles/RoleListComponent';
import RoleAdd from './roles/RoleAddComponent';
import RoleEdit from './roles/RoleEditComponent';
import AppList from './applications/AppListComponent';
import AppAdd from './applications/AppAddComponent';
import AppEdit from './applications/AppEditComponent';
import Footer from './FooterComponent';


class Main extends Component {

	render() {

		const RoleEditPage = ({match}) => {
			return(
				<RoleEdit id={match.params.id} />
			);
		}

		const AppEditPage = ({match}) => {
			return(
				<AppEdit id={match.params.id} />
			);
		}

		return(
			<div>
				<Header />
				<TransitionGroup>
					<CSSTransition key={this.props.location.key} className="page" timeout={300}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/users" component={UserList} />
							<Route exact path="/users/add-new" component={UserAdd} />
							<Route exact path="/roles" component={RoleList} />
							<Route exact path="/roles/add-new" component={RoleAdd} />
							<Route exact path="/roles/:id/edit" component={RoleEditPage} />
							<Route exact path="/applications" component={AppList} />
							<Route exact path="/applications/add-new" component={AppAdd} />
							<Route exact path="/applications/:id/edit" component={AppEditPage} />
							<Redirect to="/" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
				
			</div>
		);
	}
}

export default withRouter(Main);