const host = 'http://dev-lumen.jcweixiaoyuan.cn'
let consts = {
	cookie_prefix: "jc_schooladmin_",
	cookie_expires: 2, //设置cookie的有效时间
}

module.exports = {
	/**
	 * 获取url参数
	 * @param name  参数名 
	 * by wuyi
	 **/
	GetQueryString: function(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		let r = window.location.search.substr(1).match(reg);
		if(r != null)
			return decodeURIComponent(r[2]);
		return null;
	},

	//设置cookie
	setCookie: function(key, value, t) {
		let cookie_key = consts.cookie_prefix + key;
		let oDate;
		if(!t) {
			oDate = new Date(0x7fffffff * 1e3);
		} else {
			oDate = new Date();
			oDate.setHours(oDate.getHours() + Number(t));
		}
		document.cookie = cookie_key + '=' + value + ';expires=' + oDate.toGMTString() + ';path=/';
	},
	//删除cookie    
	delCookie: function(key) {
		let exp = new Date();
		exp.setTime(exp.getTime() - 1);
		let cval = module.exports.getCookie(key);
		let cookie_key = consts.cookie_prefix + key;
		if(cval != null) {
			document.cookie = cookie_key + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/';
		}
	},

	//获得cookie
	getCookie: function(key) {
		let cookie_key = consts.cookie_prefix + key;

		let arr1 = document.cookie.split('; ');
		for(let i = 0; i < arr1.length; i++) {
			let arr2 = arr1[i].split('=');
			if(arr2[0] === cookie_key) {
				return decodeURI(arr2[1]);
			}
		}

	},
	/**
	 *  心跳方法
	 *  @param waitSecond秒数   fn：每次的执行方法    backFn  退出时的方法
	 *  
	 */
	setInterval: function(waitSecond, fn, backFn) {
		let wait = waitSecond;

		//设置秒数(单位秒) 
		let i = 0,
			ind = '',
			timer = function() {
				let r = wait - i;
				if(r === 0) {
					clearInterval(ind);
					backFn && backFn();
				} else {
					fn && fn(r);
					i++;
				}
			}

		ind = setInterval(timer, 1000);
	},

	/**
	 *获取URL参数
	 */
	getURLParam: function() {
		let search = window.location.search,
			reg = /[^&]+=[^&]+/g;

		if(!search) return {};

		//解析出锚点参数
		search = search.slice(1);

		let arr, arrs, result = {};
		while(arr === reg.exec(search)) {
			if(arrs === arr[0].match(/[^=]+/g)) {
				result[arrs[0]] = arrs[1];
			}
		}
		return result;
	},
	//是否是绝对地址
	isFullSite: function(url) {
		if(!~url.indexOf("http")) {
			return host + "/" + url
		} else {
			return url;
		}
	},

	//当后台数据库返回为0或者是null的时候将其当做字符串"0"处理
	zeroDisplay: function(Param) {
		for(let key in Param) {
			if(Param[key] === 0 || Param[key] === undefined || Param[key] === null || Param[key] === 0.00) {
				Param[key] = "0";
			}
		}
	},
	
	//对象数组去重
	removalObj: function(tmp, prop) {
		let result = [],
			hash = {};
		for(let i = 0; i < tmp.length; i++) {
			let elem = tmp[i][prop] ? tmp[i][prop] : tmp[i];
			if(!hash[elem]) {
				result.push(tmp[i]);
				hash[elem] = true;
			}
		}

		return result;
	},
	unique: function(arr) {
		let res = [];
		let json = {};
		for(let i = 0; i < arr.length; i++) {
			if(!json[arr[i]]) {
				res.push(arr[i]);
				json[arr[i]] = 1;
			}
		}
		return res;
	}

}