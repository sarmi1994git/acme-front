import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

/*------------------------USERS-----------------------------*/
export const fetchUsers = (page, size) => (dispatch) => {
	dispatch(usersLoading(true));
	return fetch(baseUrl + '/users?page=' + page + '&size=' + size)
		.then(response => {
			if (response.ok) {
				return response;
			} else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		}, error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(users => dispatch(addUsers(users)))
		.catch(error => dispatch(usersFailed(error.message)));
}

export const usersLoading = () => ({
	type: ActionTypes.USERS_LOADING
});

export const usersFailed = (errmess) => ({
	type: ActionTypes.USERS_FAILED,
	payload: errmess
});

export const addUsers = (users) => ({
	type: ActionTypes.ADD_USERS,
	payload: users
});

//------------------------ROLES-----------------------------

export const fetchRoles = (page, size) => (dispatch) => {
	dispatch(rolesLoading(true));
	return fetch(baseUrl + '/roles?page=' + page + '&size=' + size)
		.then(response => {
			if (response.ok) {
				return response;
			} else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		}, error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(roles => dispatch(addRoles(roles)))
		.catch(error => dispatch(rolesFailed(error.message)));
}

export const rolesLoading = () => ({
	type: ActionTypes.ROLES_LOADING
});

export const rolesFailed = (errmess) => ({
	type: ActionTypes.ROLES_FAILED,
	payload: errmess
});

export const addRoles = (roles) => ({
	type: ActionTypes.ADD_ROLES,
	payload: roles
});

/*-------------------ROLE DETAIL PARA EDICIÓN-------------*/
export const fetchRoleDetail = (id) => (dispatch) => {
	dispatch(roleDetailLoading());
	return fetch(baseUrl + '/roles/' + id)
	.then(response => {
		if (response.ok) {
			return response;
		} else {
			var error = new Error('Error ' + response.status + ': ' + response.statusText);
			error.response = response;
			throw error;
		}
	}, error => {
		var errmess = new Error(error.message);
		throw errmess;
	})
	.then(response => response.json())
	.then(role => dispatch(addRoleDetail(role)))
	.catch(error => dispatch(roleDetailFailed(error.message)));
}

export const roleDetailLoading = () => ({
	type: ActionTypes.ROLE_LOADING
});

export const roleDetailFailed = (errmess) => ({
	type: ActionTypes.ROLE_FAILED,
	payload: errmess
});

export const addRoleDetail = (role) => ({
	type: ActionTypes.ADD_ROLE,
	payload: role
});
/*------------------------------------------------------------*/

//------------------------APPLICATIONS-----------------------------

export const fetchApps = (page, size) => (dispatch) => {
	dispatch(appsLoading(true));
	return fetch(baseUrl + '/applications?page=' + page + '&size=' + size)
		.then(response => {
			if (response.ok) {
				return response;
			} else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		}, error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(applications => dispatch(addApps(applications)))
		.catch(error => dispatch(appsFailed(error.message)));
}

export const appsLoading = () => ({
	type: ActionTypes.APPLICATIONS_LOADING
});

export const appsFailed = (errmess) => ({
	type: ActionTypes.APPLICATIONS_FAILED,
	payload: errmess
});

export const addApps = (applications) => ({
	type: ActionTypes.ADD_APPLICATIONS,
	payload: applications
});

/*-------------------APPLICATION DETAIL PARA EDICIÓN-------------*/
export const fetchAppDetail = (id) => (dispatch) => {
	dispatch(appDetailLoading());
	return fetch(baseUrl + '/applications/' + id)
	.then(response => {
		if (response.ok) {
			return response;
		} else {
			var error = new Error('Error ' + response.status + ': ' + response.statusText);
			error.response = response;
			throw error;
		}
	}, error => {
		var errmess = new Error(error.message);
		throw errmess;
	})
	.then(response => response.json())
	.then(application => dispatch(addAppDetail(application)))
	.catch(error => dispatch(appDetailFailed(error.message)));
}

export const appDetailLoading = () => ({
	type: ActionTypes.APPLICATION_LOADING
});

export const appDetailFailed = (errmess) => ({
	type: ActionTypes.APPLICATION_FAILED,
	payload: errmess
});

export const addAppDetail = (application) => ({
	type: ActionTypes.ADD_APPLICATION,
	payload: application
});
/*------------------------------------------------------------*/
