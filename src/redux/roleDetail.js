import * as ActionTypes from './ActionTypes';

export const Role = (state = {
		isLoading: true,
		errMess: null,
		role: null
	}, action) => {
	switch(action.type) {
		case ActionTypes.ADD_ROLE:
			return {...state, isLoading: false, errMess: null, role: action.payload }
		case ActionTypes.ROLE_LOADING:
			return {...state, isLoading: true, errMess: null, role: null }
		case ActionTypes.ROLE_FAILED:
			return {...state, isLoading: false, errMess: action.payload, role: null }
		default:
			return state;
	}

}