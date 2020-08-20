import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Users } from './users';
import { Roles } from './roles';
import { Role } from './roleDetail';
import { Applications } from './applications';
import { Application } from './applicationDetail';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			users: Users,
			roles: Roles,
			role: Role,
			applications: Applications,
			application: Application
		}),
		applyMiddleware(thunk, logger)
		//applyMiddleware(thunk)
	);
	return store;
}