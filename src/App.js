import React, { Component } from 'react';
import Header from './component/header';
import Nav from './component/nav';
import Welcome from './page/welcome';
import Home from './page/home';
import Login from './page/login';
import { Route } from 'react-router-dom';
import axios from 'axios'
import Qs from 'qs'

axios.interceptors.request.use((config) => {
	if(config.method === "post") {
		config.data = Qs.stringify(config.data);
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
	if(response.data.code === "401") {
		window.location.replace("/login");
	}
	return response
}, (error) => {
	return Promise.reject(error)
})
class App extends Component {
	constructor (props){
		super(props);
		this.state = {
	    	fullscreen: false
	  	}
  	}
    render() {
    	if(this.props.location.pathname !== '/login'){
    		return (
    			<div className="App">
    				<Header />
	                <Nav />
	                <div className="conent">
	                	<Route path='/home' component={Home} />
	                    <Route path='/welcome' component={Welcome} />
	                </div>
	            </div>
           	)
    	}else{
    		return (
    			<div className="App">
    				<Route path='/login' component={Login} />
    			</div>
    		)
    	}
    }
}

export default App;