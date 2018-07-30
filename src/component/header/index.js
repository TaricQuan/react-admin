import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { delCookie, getCookie } from '../../const/my.ext'
import './index.scss';

class Header extends Component {
	componentDidMount() {
    }
	constructor (props){
		super(props);
  		this.state={
	    	token : getCookie("token"),
			school_name : '',
			school_id : getCookie("school_id"),
			noReadNums : false
  		}
  	}
  	logout = (obj) => {
  		delCookie("school_id");
		delCookie("user_id");
		delCookie("token");
		delCookie("user_name");
		delCookie("school_name");
		delCookie("noReadNums");
		this.$router.push('/login')
    }
	render() {
        return (
        	<ul className="nav">
		        <div className='thehead'>
					<div className='thehead_top'>
						<div className='text_left'>{this.props.schoolInfo.name}</div>
						<div className='text_right'>
							<Link to="/help-center">帮助中心</Link>
							<Link to="/msgList">系统消息</Link>
							<a>关于我们</a>
							<a>退出</a>
						</div>
					</div>
				</div>
		    </ul>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    userInfo: state.admin.userInfo,
    schoolInfo: state.admin.schoolInfo,
});
export default connect(mapStateToProps)(Header);