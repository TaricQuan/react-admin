import React, { Component } from 'react'
import * as actions from '../action/goods'
import { Button, Form, Input, Loading } from 'element-react'
import { setCookie } from '../const/my.ext'
import 'element-theme-default'
import '../assets/scss/login.scss'

class Login extends Component {
	componentDidMount() {
        this.errora();
    }
	constructor (props){
		super(props);
  		this.state={
  			userName: '',
	    	passWord: '',
	    	verificationcode: '',
	    	imagecode: '',
	    	imagepaths: '',
	    	uuid: '',
	    	
  		}
  	}
  	handleClick = () =>{
  		let _self = this;
  		if (!this.state.userName || !this.state.passWord) {
            alert("请填写用户名和密码！");
            return;
        }
        if (!this.state.verificationcode) {
            alert("请填写验证码！");
            return;
        }
        let _data = {};
        _data.login = this.state.userName;
        _data.password = this.state.passWord;
        _data.code = this.state.verificationcode;
        _data.uuid = this.state.imagecode;
        actions.postLand(_data).then(response => {
        	if(response.data.code === 0){
        		if(response.data.data.list.is_superuser === 1){
                 	this.props.history.push("/home")
                 	this.setALlCoolies(response.data);
                }
        	}else if(response.data.code === 403){
        		alert("账号或密码错误");
        		_self.errora();
        	}else{
        		alert(response.data.msg);
        		_self.errora();
        	}
    	});
  	}
  	checkAccount = (event) => {
  		this.setState({userName: event});
  	}
  	checkPass = (event) => {
  		this.setState({passWord: event});
  	}
  	checkCode = (event) => {
  		this.setState({verificationcode: event});
  	}
  	errora = () => {
        actions.getUuid().then(response => {
        	if(response.data.code === 0){
        		this.setState({imagecode: response.data.data.result.uuid});
        		this.setState({imagepaths: actions.getCheckcode + this.state.imagecode});
        	}
    	});
  	}
  	setALlCoolies = (obj) => {
        setCookie("school_id", obj.data.list.school_id);
        setCookie("user_id", obj.data.list.id);
        setCookie("user_name", obj.data.list.username);
        setCookie("school_name", obj.data.list.school_name);
        setCookie("token", obj.data.result);
    }
	render() {
        return (
            <div className="login-container">
				<div className="logo"></div>
				<Form className="login-form" autoComplete="on" label-position="left">
					<div className="title-container">
						<h3 className="title">微智校园学校管理后台</h3>
					</div>
					<Form.Item>
						<Input value={this.state.userName} type="text" placeholder="请输入账号" onChange={this.checkAccount} />
					</Form.Item>
					<Form.Item>
						<Input value={this.state.passWord} type="password" placeholder="请输入密码" onChange={this.checkPass} />
					</Form.Item>
					<Form.Item>
						<Input className="code" value={this.state.verificationcode} placeholder="请输入验证码" onChange={this.checkCode} />
						<span className="code-prompt">验证码为空</span>
						<img className="verifyImg" alt="点击刷新验证码" title="点击刷新验证码" onClick={this.errora} src={this.state.imagepaths} />
					</Form.Item>
					<Button type="primary" onClick={this.handleClick}>登陆</Button>
				</Form>
				{ this.props.isFetching && <Loading fullscreen={true} /> }
			</div>
        );
    }
}


export default Login