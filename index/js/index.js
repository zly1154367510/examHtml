$(function(){
	var bodyVM = new Vue({
		el:'.homepage',
		data:{
			name:""
		},
		mounted:function(){
			var name = this.$options.methods.requestParam()['name']
			this.name = name
			console.log(this.name)
		},
		methods:{
			requestParam:function(){
				var url = location.search; //获取url中"?"符后的字串 
				var theRequest = new Object(); 
				if (url.indexOf("?") != -1) { 
					var str = url.substr(1); 
					strs = str.split("&"); 
					for(var i = 0; i < strs.length; i ++) { 
						theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
					} 
				} 
				return theRequest
			}
		}
	})
})