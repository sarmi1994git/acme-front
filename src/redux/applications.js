import * as ActionTypes from './ActionTypes';

export const Applications = (state = {
		isLoading: true,
		errMess: null,
		applications: null
	}, action) => {
	switch(action.type) {
		case ActionTypes.ADD_APPLICATIONS:
			return {...state, isLoading: false, errMess: null, applications: action.payload }
		case ActionTypes.APPLICATIONS_LOADING: 
			return {...state, isLoading: true, errMess: null, applications: null }
		case ActionTypes.APPLICATIONS_FAILED:
			return {...state, isLoading: false, errMess: action.payload, applications: null }
		default:
			return state;
	}

}