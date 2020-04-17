import { createStore, compose, applyMiddleware } from '../redux/index';
import reducer from './reducer';


function logger({ dispatch, getState }) {
	return function wrapDispatchToAddLogging(next) {
		return function dispatchAndLog(action) {
			console.log("loogger执行")
			console.log('中间件 1 进入')
			console.log('dispatching', action)
			let result = next(action) // actoin我这个中间件处理不了交给下个中间件
			console.log('next state', getState())
			console.log('中间件 1 退出')
			return result
		}
	}
}

function thunk({ dispatch, getState }) {
	return function wrapDispatchToThunk(next) {
		return function dispatchThunk(action) {
			console.log("thunk执行")
			if (typeof action === 'function') {
				return action(dispatch, getState);
			}
			return next(action);
		}
	}
}




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
	applyMiddleware(thunk, logger)
));
export default store;


