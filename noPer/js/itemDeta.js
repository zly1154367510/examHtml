$(function(){

	

	var vm = new Vue({
		el:".homepage",
		data:{
			json:"",
			pId:"",
			username:"",
			time:"",
			timer:null,
			saveJson:{}
		},
		mounted:function(){
			$("#paperForm").ajaxForm(function(data){    
		       	if (data.status==200) {
			       	alert("考试完成，本次得分"+data.data)
			       	history.back(-1)
		      	}
		    });
		    var that = this
		    window.onbeforeunload =function(e){
				that.saveJson['paper'] = that.pId
		    	that.saveJson['username'] = that.username
		    	that.saveJson['time'] = that.time
		    	$.ajax({
					url:"http://localhost:8083/mi/user/savePaper",
					dataType:"json",
					type:"POST",
					contentType:"application/json;charset=utf-8",
					data:JSON.stringify(that.saveJson),
					success:function(data){
						console.log(data)
					}
				})
			} 
		 //    $(window).unload(function(){
			// 	alert("Goodbye!");
			// });
			var username = localStorage.getItem("username")
			var that = this
			that.username = username
			var id = this.$options.methods.requestParam()["id"]
			$.ajax({
				url:"http://localhost:8083/mi/user/paperDeta",
				dataType:"json",
				type:"GET",
				data:{
					"id":id
				},
				success:function(data){
				//console.log(data)
					if (data.status==200) {
						that.json = data.data
						that.pId = data.data[0].pId
					}
				}
			})
			$.ajax({
				url:"http://localhost:8083/mi/user/paperTime",
				dataType:"json",
				type:"GET",
				data:{
					"id":id
				},
				success:function(data){
					//console.log(data)
					if (data.status==200) {
						that.time = data.data
						console.log(that.time)
						that.timer = setInterval(function(){
						that.timers()
						},1000)
					}
				}
			})
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
			},
			timers:function(){
				this.time--
				//console.log(this.time)
				if(this.time==0){
					$("#paperForm").submit()
					clearInterval(this.timer);
					alert("时间到了")
					//history.back(-1)
				}
			}
		}
	})
})