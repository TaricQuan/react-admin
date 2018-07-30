import {handleActions} from 'redux-actions';

export const admin = handleActions({
    updateUserInfo: (state, action) => ({
		...state,
      	userInfo : action.payload
    }),
    updateSchoolInfo: (state, action) => ({
    	...state,
      	schoolInfo : action.payload
    })
}, {
    userInfo:{},
    schoolInfo:{}
});