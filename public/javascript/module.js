(function(){
	var PAGE = {
		init:function(){
			
			this.resizeWidth();//调整页面的总宽
			this.adjustFont();
			//this.showComment();
		},

		//调整字体
		adjustFont : function(){
			var ua = navigator.userAgent;
			var osVersion = navigator.appVersion.toLowerCase();
			var html = $e("html").elements[0];

			if(ua.indexOf("Windows")){
				if(ua.indexOf("Windows NT 6.1") != -1){
					html.className = "os_win7";
				}
				else if(ua.indexOf("Windows NT 6") != -1){
					html.className= "os_vista";
				}
				else{
					html.className = "os_winXp";
				}
			}
			else{
				html.className = "os_mac";
			}
		},

		//resize page width
		resizeWidth:function(){
			var ele = $e('.mod_wrap').elements[0];
			ele.setAttribute("style","width:900px;margin:0 auto");
		},

		//todo
		tabHover:function(){
			var tabs = $e('.mod_tabs_menu a');
			for(var i=0; i<tabs.length; i++){
				QZFL.event.addEvent(tabs[i] , 'hover',function(){

				});
			}
		}
	};
	PAGE.init();
})();
