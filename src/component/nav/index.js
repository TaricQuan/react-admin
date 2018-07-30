import React from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';


const Nav = props => (
    <div className="navigation">
		<div className="navigation_cenent">
			<ul>
				<li>
					<NavLink to="/home" activeClassName="router-link-active">首页</NavLink>
				</li>
				<li>
					<NavLink to="/school_info" activeClassName="router-link-active">学校信息</NavLink>
				</li>
				<li>
					<NavLink to="/application" activeClassName="router-link-active">功能应用</NavLink>
				</li>
				<li>
					<NavLink to="/dataStatistics" activeClassName="router-link-active">数据统计</NavLink>
				</li>
				<li>
					<NavLink to="/systemSettings" activeClassName="router-link-active">系统设置</NavLink>
				</li>
			</ul>
		</div>
	</div>
);

export default Nav;