import * as ActionTypes from './ActionTypes';

export const Roles = (state = {
		isLoading: true,
		errMess: null,
		roles: null
	}, action) => {
	switch(action.type) {
		case ActionTypes.ADD_ROLES:
			return {...state, isLoading: false, errMess: null, roles: action.payload }
		case ActionTypes.ROLES_LOADING: 
			return {...state, isLoading: true, errMess: null, roles: null }
		case ActionTypes.ROLES_FAILED:
			return {...state, isLoading: false, errMess: action.payload, roles: null }
		default:
			return state;
	}

}