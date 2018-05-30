$(function(){

	

	var vm = new Vue({
		el:".homepage",
		data:{
			json:"",
			pId:"",
			username:"",
			time:"",
			timer:null,
			saveJson:{},
			answer:""
		},
		mounted:function(){
			var username = localStorage.getItem("username")
			var that = this
			that.username = username
			var pId = this.$options.methods.requestParam()["pId"]
			$("#paperForm").ajaxForm(function(data){    
		       	if (data.status==200) {
			       	alert("考试完成，本次得分"+data.data)
			       	history.back(-1)
		      	}
			});
			if(pId != undefined){
				$.ajax({
					url:"http://localhost:8083/mi/user/paperDeta",
					dataType:"json",
					type:"GET",
					async: false,
					data:{
						"id":pId
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
					url:"http://localhost:8083/mi/user/noPerPaperDeta",
					dataType:"json",
					type:'GET',
					async: false,
					data:{
						"username":that.username,
						"pId":pId
					},
					success:function(data){
						console.log(data)
						var res = data.data
						if (data.status==200) {
							that.answer = res
							that.time = res[0].time
							that.timer = setInterval(function(){
							that.timers()
							},1000)
							//console.log(that.answer)
						}
					}
				})
				
			}else{
			    var that = this
			 //    window.onbeforeunload =function(e){
				// 	that.saveJson['paper'] = that.pId
			 //    	that.saveJson['username'] = that.username
			 //    	that.saveJson['time'] = that.time
			 //    	$.ajax({
				// 		url:"http://localhost:8083/mi/user/savePaper",
				// 		dataType:"json",
				// 		type:"POST",
				// 		contentType:"application/json;charset=utf-8",
				// 		data:JSON.stringify(that.saveJson),
				// 		success:function(data){
				// 			//console.log(data)
				// 		}
				// 	})
				// } 
			 //    $(window).unload(function(){
				// 	alert("Goodbye!");
				// });
			
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
							//console.log(that.time)
							that.timer = setInterval(function(){
							that.timers()
							},1000)
						}
					}
				})
			}
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
							//console.log(data)
						}
					})
				} 
				
		},
		
		updated:function(){
			var that = this
			if (that.answer=="") {
				return;
			}
			for(var i = 0;i<that.answer.length;i++){
				var arr = that.answer[i].answer.split("|")
				console.log(arr)
				for(var j = 0;j<arr.length;j++){
					$(".choice").each(function(){ 
						if($(this).val()==arr[j]){
							$(this).attr("checked","true")
						}
					})
				}
			}
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
			},
			addItem:function(e){
				var name = e.currentTarget.getAttribute("name")
				var value = e.currentTarget.getAttribute("value")
				this.saveJson[name] = value
				console.log(this.saveJson)
			},
			addItems:function(e){
				var name = e.currentTarget.getAttribute("name")
				var value = e.currentTarget.getAttribute("value")
				var flag = e.currentTarget.checked
				if (flag) {
					//console.log("保存前"+this.saveJson[name])
					if (this.saveJson[name] != undefined) {
						var yuan = this.saveJson[name]
						var value1 = yuan+"|"+value
						this.saveJson[name] = value1
					}else{
						this.saveJson[name] = value
					}
					//.log("保存后"+this.saveJson[name])
					//console.log(this.saveJson)
				}else{
					var value1 = this.saveJson[name]
					var va = value1.replace("|"+value,"")
					var va1 = va.replace(value,"")
					this.saveJson[name] = va1
				//	console.log(this.saveJson)
				}
				//console.log(flag)
				
			}
		}
	})
})