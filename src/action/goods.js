import {createAction} from 'redux-actions';
import axios from 'axios'
export const host = 'http://dev-lumen.jcweixiaoyuan.cn';
const updateUserInfo = createAction('updateUserInfo');
const updateSchoolInfo = createAction('updateSchoolInfo');

const getUserInfo = (params) => axios.get(host+"/school/backend/user/userinfo",{params});//用户信息
const getSchoolInfo = (params) => axios.get(host+"/school/backend/school/basicinfo",{params});//学校基本信息接口

export const getUuid = () => axios.get(host + '/school/backend/login/getUuid');//获取uuid

export const getCheckcode = host + '/school/backend/login/captcha?uuid=';//获取验证码

export const postLand = (data) => axios.post(host+"/school/backend/login/login",data);//登陆

export const setUserInfo = (data) => async dispatch => {
    getUserInfo(data).then(res => {
    	if(res.data.code === 0){
    		dispatch(updateUserInfo(res.data.data.list));
    	}
    });
};
export const setSchoolInfo = (data) => async dispatch => {
    getSchoolInfo(data).then(res => {
    	if(res.data.code === 0){
    		dispatch(updateSchoolInfo(res.data.data.list));
    	}
    });
};

export const getSchoolDepartment = (params) => axios.get(host+"/school/backend/department/get-department-by-schoolid",{params});//获取学校所有部门

export const getDepartmentUserList = (params) => axios.get(host+"/school/backend/department/get-userlist-by-department",{params});//获取学校所有部门

export const getGradeList = (params) => axios.get(host+"/school/backend/class/getgradelist",{params});//获取年级列表接口 

export const getClassList = (params) => axios.get(host+"/school/backend/class/getclasslist",{params});//获取班级列表接口 

export const getClassInfo = (params) => axios.get(host+"/school/backend/class/getbasicinfo",{params});//获取班级基本信息接口 

export const getClassTeacher = (params) => axios.get(host+"/school/backend/class/getteacher",{params});//班级老师任课信息接口  

export const getSysmsg = (params) => axios.get(host+"/school/backend/log/gettweetinfo",{params});//系统消息推文列表

export const addReadCount = (data) => axios.post(host+"/school/backend/log/addTweetInfoRead",data);//进入页面则增加阅读数

export const getSysmsgDetail = (params) => axios.get(host+"/school/backend/log/getTweetInfoDetail",{params}); //获取消息推文详情

export const getConunt = (params) => axios.get(host+"/school/backend/user/getcount",{params});//学校人员数据

export const getColumn = (params) => axios.get(host+"/peony/school/backend/newguide/columns",{params});//帮助中心

export const getShowButton = (params) => axios.get(host+"/peony/school/backend/attendance/statis/showbutton4class",{params});// 权限管理，班评管理，学生考勤统计，班级评比
