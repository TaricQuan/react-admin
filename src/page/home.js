import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../action/goods';
import { getCookie } from '../const/my.ext'
import { Layout } from 'element-react'
import { Link } from 'react-router-dom';
import '../assets/scss/home.scss'

class Home extends Component {
    constructor (props){
		super(props);
  		this.state={
  			token: '',
  			user_id: '',
  			periodoftime: '',
	    	msg_count: '',
	    	verificationcode: '',
	    	msg_list: [],
	    	app_list: [{
						name: '公告',
						img_src: require('../assets/images/admin.notice.png'),
						type: 'admin.notice',
						href: '../../html/application/notice/announcementofthelist.html?code=1',
						checkShow() {
							return false
						},
					},
					{
						name: '审批',
						img_src: require('../assets/images/admin.approve.png'),
						type: 'admin.approve',
						href: '../../html/application/approve/approveType.html',
						checkShow() {
							return false
						},
					},
					{
						name: '打卡',
						img_src: require('../assets/images/admin.playcard.png'),
						type: 'admin.playcard',
						href: '../../html/application/clockin/statistical.html',
						checkShow() {
							return false
						},
					},
					{
						name: '超级表单',
						img_src: require('../assets/images/superform.png'),
						type: 'admin.form',
						href: '../../html/application/superform/superformIndex.html',
						checkShow() {
							return false
						},
					},
					{
						name: '工资',
						img_src: require('../assets/images/admin.pay.png'),
						type: 'admin.pay',
						href: '../../html/application/wage/salarylist.html',
						checkShow() {
							return false
						},
					},
					{
						name: '社团报名',
						img_src: require('../assets/images/admin.community.png'),
						type: 'admin.community',
						href: '../../html/application/clubtosignup/courseselection.html',
						checkShow() {
							return false
						},
					},
					{
						name: '微官网',
						img_src: require('../assets/images/micronetwork.png'),
						type: 'admin.website',
						href: '../../html/thewebsite/programmanagement.html',
						checkShow() {
							return false
						},
					},
					{
						name: '成绩',
						img_src: require('../assets/images/admin.score.png'),
						type: 'admin.score',
						href: '../../html/application/score/score.html',
						checkShow() {
							return false
						},
					},
					{
						name: '沟通管理',
						img_src: require('../assets/images/admin.chat.png'),
						type: 'admin.chat',
						href: '../../html/application/talk/talk-main.html',
						checkShow() {
							return false
						},
					},
					{
						name: '教务管理',
						img_src: require('../assets/images/jwgl.png'),
						type: '_none_',
						href: "http://test-fuyao.jcweixiaoyuan.com/actr-gateways/token_auth?token=" + this.token + "&user_id=" + this.user_id,
						checkShow() {
							return false
						}, //test-weixin.jcweixiaoyuan.com   只在测试环境下显示
					},
					{
						name: '班屏管理',
						img_src: require('../assets/images/classScreenicon.png'),
						type: 'admin.eclasscard',
						href: '../../html/application/classScreen/screenInfo.html',
						checkShow() {
							return false
						},
					},
					{
						name: '学生考勤统计',
						img_src: require('../assets/images/admin.playcard.png'),
						type: 'admin.eclasscard',
						href: '../../html/application/attendance-info/attendance-info.html',
						checkShow() {
							return false
						},
					},
					{
						name: '班级评比',
						img_src: require('../assets/images/admin.classCompare.png'),
						type: 'admin.eclasscard',
						href: '../../html/application/class-compare/compare-info.html',
						checkShow() {
							return false
						},
					},
					{
						name: '学生德育',
						img_src: require('../assets/images/admin.studentMorality.png'),
						type: 'admin.eclasscard',
						href: '../../html/application/student-morality/morality-info.html',
						checkShow() {
							return false
						},
					},
					{
						name: '学生接送记录',
						img_src: require('../assets/images/admin.schoolbus.png'),
						type: 'admin.schoolbus',
						href: '../../html/application/schoolbus-record/schoolbus-record.html',
						checkShow() {
							return false
						},
					},
				],
	    	teachernumeral: 0,
	    	classnumeral: 0,
	    	studentnumeral: 0,
	    	parentnumeral: 0,
	    	bindstudentnumeral: 0
  		}
  	}
    componentDidMount() {
    	let dispatch = this.props.dispatch;
    	dispatch(actions.setUserInfo({token : getCookie("token"),user_id : getCookie("user_id")}))
    	dispatch(actions.setSchoolInfo({token : getCookie("token"),school_id : getCookie("school_id")}))
    	this.setPeriodoftime();
    	let _data = {
    		token: getCookie("token"),
    		push_port: 3
    	};
		actions.getSysmsg(_data).then(respones => {
			if(respones.data.code === 0) {
				this.setState({msg_list:respones.data.data.list})
				this.setState({msg_count:respones.data.data.count})
			}
		})
		_data.school_id = getCookie("school_id");
		actions.getConunt(_data).then(respones => {
			if(respones.data.code === 0) {
				this.setState({classnumeral: respones.data.data.list.class_count}); //班级数
				this.setState({studentnumeral: respones.data.data.list.student_count}); //学生数
				this.setState({teachernumeral: respones.data.data.list.teacher_staff_count}); //教职工
				this.setState({parentnumeral: respones.data.data.list.parent_count}); //家长数
				this.setState({bindstudentnumeral: respones.data.data.list.bind_student_count}); //绑定学生数
			}
		})
    }
    setPeriodoftime = () =>{
    	let myDate = new Date();
		let hoursdata = myDate.getHours() + 1;
		let inthemorning = [7, 8, 9, 10, 11, 12];
		let intheafternoon = [12, 13, 14, 15, 16, 17, 18, 19];
		let intheevening = [20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];

		if(inthemorning.indexOf(hoursdata) !== -1) {
			this.setState({periodoftime: '早上好'});
		}
		if(intheafternoon.indexOf(hoursdata) !== -1) {
			this.setState({periodoftime: '下午好'});
		}
		if(intheevening.indexOf(hoursdata) !== -1) {
			this.setState({periodoftime: '晚上好'});
		}
    }
    goDetial = (item) =>{
    	let _self = this;
		let _data = {
			token: getCookie("token"),
			tweet_id: item.id,
            user_id: _self.user_id,
            push_port: 3
		}
		actions.addReadCount(_data).then(respones => {
			if (item.type === 2) {
				if(item.link){
					window.location.href = item.link;
				}
            } else {
            	this.props.history.push(`/systemSettings/msgDetail/${item.id}`);
            }
		})
    }
    render() {
        return (
        	<div className="content_cencent">
				<Layout.Row>
					<Layout.Col span="19" className="content_left">
						<h5>{this.state.periodoftime}，超级管理员</h5>
						<div className="news">
							<div className="news-title">
								<h3>您有{this.state.msg_count}条消息</h3>
								<Link to="/systemSettings/msgList" className="moreMsg">更多</Link>
							</div>
							<ul>
								{
				                    this.state.msg_list.map((item, index) => {
				                    	if(index<3){
				                    		return (
				                    			<li key={index} onClick={()=>this.goDetial(item)}>
													<p>{item.title}</p>
													<i className="iconfont icon-liebiaojiantouxiangyou"></i>
												</li>
				                    		)
				                    	}else{
				                    		return false;
				                    	}
				                    })
				               	}
							</ul>
						</div>
						<div className="application">
							<h3>常用功能入口</h3>
							<ul className="commonlyused">
								{
				                    this.state.app_list.map((item, index) => (
										<li key={index}>
											<img src={item.img_src} alt="" />
											<p>{item.name}</p>
										</li>
				                    ))
				               	}
							</ul>
						</div>
					</Layout.Col>
					<Layout.Col span="5" className="content_right">
						<div className="content_cenent_con">
							<div className="content_cenent_con_a">
								<div className="img" style={{backgroundImage:"url("+ actions.host + this.props.schoolInfo.logo+")"}}></div>
								<p>{this.props.schoolInfo.name}</p>
							</div>
							<dl>
								<dd>教职工</dd>
								<dd>已加入{this.state.teachernumeral}人</dd>
							</dl>
							<dl>
								<dd>班级数</dd>
								<dd>已创建{this.state.classnumeral}个</dd>
							</dl>
							<dl>
								<dd>学生数</dd>
								<dd>已加入{this.state.studentnumeral}人</dd>
							</dl>
							<dl>
								<dd>家长数</dd>
								<dd>已加入{this.state.parentnumeral}人</dd>
							</dl>
							<dl>
								<dd>绑定学生数</dd>
								<dd>已加入{this.state.bindstudentnumeral}人</dd>
							</dl>
						</div>
					</Layout.Col>
				</Layout.Row>
			</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    userInfo: state.admin.userInfo,
    schoolInfo: state.admin.schoolInfo,
});

export default connect(mapStateToProps)(Home);