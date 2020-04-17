import axios from 'axios';
import * as constants from './actionTypes.js';

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

export const login = (accout, password) => {
	return (dispatch) => {
		axios.get('/api/login.json?account=' + accout + '&password=' + password).then((res) => {
			const result = res.data.data;
			if (result) {
				dispatch(changeLogin())
			} else {
				alert('登陆失败')
			}
		})
	}
}

// 异步有 promsie 函数  这两种表示

