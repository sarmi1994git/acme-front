import * as ActionTypes from './ActionTypes';

export const Application = (state = {
		isLoading: true,
		errMess: null,
		application: null
	}, action) => {
	switch(action.type) {
		case ActionTypes.ADD_APPLICATION:
			return {...state, isLoading: false, errMess: null, application: action.payload }
		case ActionTypes.APPLICATION_LOADING:
			return {...state, isLoading: true, errMess: null, application: null }
		case ActionTypes.APPLICATION_FAILED:
			return {...state, isLoading: false, errMess: action.payload, application: null }
		default:
			return state;
	}

}