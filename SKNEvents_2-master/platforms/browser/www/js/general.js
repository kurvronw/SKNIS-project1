function TakePic(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function getQueryVariable(parameter){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == parameter){return pair[1];}
	}
	return(false);
}

var loading = function() {
	// add the overlay with loading image to the page
	var over = '<div id="overlay">' +
	'<img id="loading" src="img/loading.gif">' +
	'</div>';
	$(over).appendTo('body');

	//click on the overlay to remove it
	$('#overlay').click(function() {
	   $(this).remove();
	});

};

var EventTitle = getQueryVariable('Title'),
	EventTitle = decodeURI(EventTitle);

//Menu Items
$(document).on("pageshow",function(){
	//alert('page show');
	var ActivePageN = $.mobile.activePage.attr('id');

	//alert(Menuto);
	if($( "#"+ActivePageN+" .PanelItems" ).has( "li" ).length == 0){
		//alert('no item');
		var MenuItems = null;

		
		MenuItems ='<li><a href="allnews.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">All News</a></li>';
		MenuItems = MenuItems + '<li><a href="notices.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Notices</a></li>';
		MenuItems = MenuItems + '<li><a href="cabinetbriefings.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Post Cabinet Briefing</a></li>';
		//MenuItems = MenuItems + '<li><a href="ministries.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Ministries</a></li>';
		//MenuItems = MenuItems + '<li><a href="departments.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Departments</a></li>';
		
		
		MenuItems = MenuItems + '<li style="width: 12%;margin: 23px 10px 10px 10px;float: left;" ><a href="https://www.youtube.com/user/thesknis"><img src="img/youtube.png" width="100%" height="auto"></a></li>';
		MenuItems = MenuItems + '<li style="width: 12%;margin: 19px 10px 10px 10px;float: left;" ><a href="https://twitter.com/skngov?ref_src=twsrc%5Etfw"><img src="img/twitter.png" width="100%" height="auto"></a></li>';
		MenuItems = MenuItems + '<li style="width: 12%;margin: 19px 10px 10px 10px;float: left;" ><a href="https://www.facebook.com/SKNIS-St-Kitts-and-Nevis-Information-Service-473920689327764/"><img src="img/fblogo.jpg" width="100%" height="auto"></a></li>';
		MenuItems = MenuItems + '<li style="width: 12%;margin: 19px 10px 10px 10px;float: left;" ><a href="https://www.flickr.com/photos/skngov/"><img src="img/flickrlogo.png" width="100%" height="auto"></a></li>';
    	MenuItems = MenuItems + '<li style="width: 12%;margin: 23px 10px 10px 10px;float: left;" ><a href="https://soundcloud.com/sknis"><img src="img/soundcloudlogo.png" width="100%" height="auto"></a></li>';
		$( "#"+ActivePageN+" .PanelItems" ).append(MenuItems);
	}
	else{
		//alert($( ".PanelItems" ).html());
	}


	$( "#"+ActivePageN+" .MyFooter h1" ).html("Copyright 2016 &copy;");

});

//Details Page
$(document).on("pageshow","#detailspage",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var NewsTitle = getQueryVariable('Title'),
		NewsTitle = decodeURI(NewsTitle);

	//alert('3');
	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getsknisnews/?contenttype=json",
		data: {q : NewsTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = 1;

		var finishid = totalrec - 1;
		
		for (var i = 0; i < totalrec; i++) {
			var title = data.newsObjects[i].title,
			
			publishDate = new Date(data.newsObjects[i].publishDate),
			publishDate = publishDate.toDateString(),
			DateDisplay = publishDate;
			articleBody = data.newsObjects[i].articleBody,
			NewsImg = data.newsObjects[i].newsImages[0].full,
			NewsMins = data.newsObjects[i].newsMinistries.name,
			NewsDeps = data.newsObjects[i].newsDepartments.name; 

			if (data.newsObjects[i].newsImages[0].thumb == null) {
	            	var noimg = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/img/NavigationLayouts$No_image_found.jpg',
	            	NewsImg = noimg;
	            }
	            else{
	            	NewsImg = NewsImg;
	            }
			//alert(EventMins);
			//alert(EventDeps);
			
			$('.NewsTitle').append(title +' | '+ DateDisplay);
			$('.articleBody').append(articleBody);
			$('.Ministries').append(NewsMins);
			$('.Departments').append(NewsDeps);
			$('.newsImages').attr('src', NewsImg);

		};

		$('#overlay').remove();
	});

	// function AddToCal(){
	// 	// prep some variables
	// 	var startDate = new Date(2016,6,30,18,30,0,0,0); // beware: month 0 = january, 11 = december
	// 	var endDate = new Date(2016,6,15,30,30,0,0,0);
	// 	var title = "My nice event";
	// 	var location = "Home";
	// 	var notes = "Some notes about this event.";
	// 	var success = function(message) { alert("Success: " + JSON.stringify(message)); };
	// 	var error = function(message) { alert("Error: " + message); };

	// 	// create an event silently (on Android < 4 an interactive dialog is shown)
	// 	window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
	// }
});

////////////////////////////////////////////////////////
//Notices Details Page
$(document).on("pageshow","#notice_detailspage",function(){
	
	//alert("pageshow event fired - notice_detailspage is now shown");
	
	$(document).ready(loading);

	var NewsTitle = getQueryVariable('Title'),
		NewsTitle = decodeURI(NewsTitle);

	//alert('3');
	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getsknisnotices/?contenttype=json",
		data: {q : NewsTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = 1;

		var finishid = totalrec - 1;
		
		for (var i = 0; i < totalrec; i++) {
			var title = data.newsObjects[i].title,
			
			publishDate = new Date(data.newsObjects[i].publishDate),
			publishDate = publishDate.toDateString(),
			DateDisplay = publishDate;
			articleBody = data.newsObjects[i].articleBody,
			NewsImg = data.newsObjects[i].newsImages[0].full,
			NewsMins = data.newsObjects[i].newsMinistries.name,
			NewsDeps = data.newsObjects[i].newsDepartments.name; 
			
			//alert(EventMins);
			//alert(EventDeps);
			
			$('.noticeTitle').append(title +' | '+ DateDisplay);
			$('.noticeBody').append(articleBody);
			$('.Ministries').append(NewsMins);
			$('.Departments').append(NewsDeps);
			$('.noticeImages').attr('src', NewsImg);

		};

		$('#overlay').remove();
	});

	// function AddToCal(){
	// 	// prep some variables
	// 	var startDate = new Date(2016,6,30,18,30,0,0,0); // beware: month 0 = january, 11 = december
	// 	var endDate = new Date(2016,6,15,30,30,0,0,0);
	// 	var title = "My nice event";
	// 	var location = "Home";
	// 	var notes = "Some notes about this event.";
	// 	var success = function(message) { alert("Success: " + JSON.stringify(message)); };
	// 	var error = function(message) { alert("Error: " + message); };

	// 	// create an event silently (on Android < 4 an interactive dialog is shown)
	// 	window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
	// }
});
///////////////////////////////////////////////////////
//Cabinet Details Page
$(document).on("pageshow","#cabinet_detailspage",function(){
	
	//alert("pageshow event fired - notice_detailspage is now shown");
	
	$(document).ready(loading);

	var NewsTitle = getQueryVariable('Title'),
		NewsTitle = decodeURI(NewsTitle);

	//alert('3');
	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getskniscabinet/?contenttype=json",
		data: {q : NewsTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = 1;

		var finishid = totalrec - 1;
		
		for (var i = 0; i < totalrec; i++) {
			var title = data.newsObjects[i].title,
			
			publishDate = new Date(data.newsObjects[i].publishDate),
			publishDate = publishDate.toDateString(),
			DateDisplay = publishDate,
			articleBody = data.newsObjects[i].articleBody,
			
			NewsMins = data.newsObjects[i].newsMinistries.name,
			NewsDeps = data.newsObjects[i].newsDepartments.name;
			//mainimg = data.newsObjects[i].newsImages[0].thumb; 
			//if (mainimg == null) {
	        //   	var noimg = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/img/NavigationLayouts$No_image_found.jpg',
	        //    	NewsImg = noimg;
	        //    }
	        //    else{
	        //    	NewsImg = NewsImg;
	        //  }
			//alert(EventMins);
			//alert(EventDeps);
			
			$('.cabinetTitle').append(title +' | '+ DateDisplay);
			$('.cabinetBody').append(articleBody);
			$('.Ministries').append(NewsMins);
			$('.Departments').append(NewsDeps);
			//$('.cabinetImages').attr('src', NewsImg);

		};

		$('#overlay').remove();
	});

	// function AddToCal(){
	// 	// prep some variables
	// 	var startDate = new Date(2016,6,30,18,30,0,0,0); // beware: month 0 = january, 11 = december
	// 	var endDate = new Date(2016,6,15,30,30,0,0,0);
	// 	var title = "My nice event";
	// 	var location = "Home";
	// 	var notes = "Some notes about this event.";
	// 	var success = function(message) { alert("Success: " + JSON.stringify(message)); };
	// 	var error = function(message) { alert("Error: " + message); };

	// 	// create an event silently (on Android < 4 an interactive dialog is shown)
	// 	window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
	// }
});
///////////////////////////////////////////////////////

////////////////////////////////////////////////////////
//Notices Details Page
$(document).on("pageshow","#featured_detailspage",function(){
	
	//alert("pageshow event fired - notice_detailspage is now shown");
	
	$(document).ready(loading);

	var NewsTitle = getQueryVariable('Title'),
		NewsTitle = decodeURI(NewsTitle);

	//alert('3');
	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getsknisnewsfeatured/?contenttype=json",
		data: {q : NewsTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = 1;

		var finishid = totalrec - 1;
		
		for (var i = 0; i < totalrec; i++) {
			var title = data.newsObjects[i].title,
			publishDate = new Date(data.newsObjects[i].publishDate),
			publishDate = publishDate.toDateString(),
			DateDisplay = publishDate,
			articleBody = data.newsObjects[i].articleBody,
			NewsMins = data.newsObjects[i].newsMinistries.name,
			NewsDeps = data.newsObjects[i].newsDepartments.name, 

			NewsImg = data.newsObjects[i].newsImages[0].thumb;
			
			 if (data.newsObjects[i].newsImages[0].thumb == null) {
	            	var noimg = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/img/NavigationLayouts$No_image_found.jpg',
	            	NewsImg = noimg;
	            }
	            else{
	            	NewsImg = NewsImg;
	            }

			//alert(EventMins);
			//alert(EventDeps);
			
			$('.featuredTitle').append(title +' | '+ DateDisplay);
			$('.featuredBody').append(articleBody);
			$('.Ministries').append(NewsMins);
			$('.Departments').append(NewsDeps);
			$('.featuredImages').attr('src', NewsImg);

		};

		$('#overlay').remove();
	});

	// function AddToCal(){
	// 	// prep some variables
	// 	var startDate = new Date(2016,6,30,18,30,0,0,0); // beware: month 0 = january, 11 = december
	// 	var endDate = new Date(2016,6,15,30,30,0,0,0);
	// 	var title = "My nice event";
	// 	var location = "Home";
	// 	var notes = "Some notes about this event.";
	// 	var success = function(message) { alert("Success: " + JSON.stringify(message)); };
	// 	var error = function(message) { alert("Error: " + message); };

	// 	// create an event silently (on Android < 4 an interactive dialog is shown)
	// 	window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
	// }
});
///////////////////////////////////////////////////////

//Notices page
$(document).on("pageshow","#notices_page",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	$(document).ready(loading);

	var NewsTitle = getQueryVariable('Title'),
		NewsTitle = decodeURI(NewsTitle);

	//alert('3');

	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getsknisnotices/?contenttype=json",
		//data: {q : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.newsObjects.length,
			finishid = totalrec - 1,
			PerPage = 10,
			Pages = totalrec / PerPage;


		for (var i = 0; i < totalrec; i++) {
			//alert(totalrec);
			var title = data.newsObjects[i].title,
			publishDate = new Date(data.newsObjects[i].publishDate),
			publishDate = publishDate.toDateString(),
			DateDisplay = publishDate;
			Details = data.newsObjects[i].articleBody,
			summary = data.newsObjects[i].summary,
			EventImg = data.newsObjects[i].newsImages[0].full;
			
	       

			$('.noticelistwhole').append('<li><a id="'+i+'" href="notices_details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

			
		};

		$('#overlay').remove();
	});

	//$(document).ready(LoadContent);
	
});

/////////////////////////////////////////////
//Cabinet page
$(document).on("pageshow","#cabinetbrief",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	$(document).ready(loading);

	var NewsTitle = getQueryVariable('Title'),
		NewsTitle = decodeURI(NewsTitle);

	//alert('3');

	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getskniscabinet/?contenttype=json",
		//data: {q : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.newsObjects.length,
			finishid = totalrec - 1,
			PerPage = 10,
			Pages = totalrec / PerPage;


		for (var i = 0; i < totalrec; i++) {
			//alert(totalrec);
			var title = data.newsObjects[i].title,
			
			///////
			D= new Date(data.newsObjects[i].publishDate);
			DateDisplay = D.toDateString();
			if (data.newsObjects[i].publishDate == null) {
			              var datda11= new Date(),
			               DateDisplay = datda11.toDateString();
			              
			             }
			             else{
			              DateDisplay= DateDisplay ;
			             }
			///////
			
	       

			$('.cabinetlistwhole').append('<li><a id="'+i+'" href="cabinet_details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

			
		};

		$('#overlay').remove();
	});

	//$(document).ready(LoadContent);
	
});

/////////////////////////////////////////////


//All news Page
$(document).on("pageshow","#AllEvents",function(){
	
	//alert("pageshow event fired - detailspage is now shown");

	$(document).ready(loading);

	var EventTitle = getQueryVariable('Title'),
		EventTitle = decodeURI(EventTitle);

	$.ajax({
		url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getsknisnews/?contenttype=json",
		//data: {q : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.newsObjects.length,
			PerPage = 20,
			finishid = PerPage - 1,
			Start = 0;

		$(document).ready(Showmore(Start));

		function Showmore(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
					//alert(totalrec);
					var title = data.newsObjects[amount].title,
					publishDate = new Date(data.newsObjects[amount].publishDate),
					publishDate = publishDate.toDateString(),
					Details = data.newsObjects[amount].articleBody,
					EventImg = data.newsObjects[amount].full;
					DateDisplay = publishDate;
					
					$('.Eventlistitems').append('<li><a href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

					

					var amount = amount + 1;
				};

				$('#overlay').remove();
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'AllEvents'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".Eventlistitems li" ).length,
						Start = Start + 1;

					$(document).ready(Showmore(Start));
				}
			});
		}
		
	});

	
});

//Home Page
$(document).on("pageshow","#HomePage",function(){

	if($( "#HomePage .listitems" ).has( "li" ).length == 0){
		//alert("hi");
		
		$(document).ready(loading);
		//$('.listitems').empty();

		$.ajax({
	        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getsknisnews/?contenttype=json",
	        	  //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json

	        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
	        //data: {q : 'Van Gogh'},
	        xhrFields: {
	            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
	            // This can be used to set the 'withCredentials' property.
	            // Set the value to 'true' if you'd like to pass cookies to the server.
	            // If this is enabled, your server must respond with the header
	            // 'Access-Control-Allow-Credentials: true'.
	            withCredentials: true
	        },
	    }).then(function(data) {
	    	$.ajax({
		        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getsknisnewsfeatured/?contenttype=json",
		        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventsfeatured?contenttype=json
		        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
		        //data: {q : 'Van Gogh'},
		        xhrFields: {
		            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		            // This can be used to set the 'withCredentials' property.
		            // Set the value to 'true' if you'd like to pass cookies to the server.
		            // If this is enabled, your server must respond with the header
		            // 'Access-Control-Allow-Credentials: true'.
		            withCredentials: true
		        },
		    }).then(function(data) {
		        var totalrec = 5; //data.newsObjects.length;
		        /*if(totalrec > 10){
		            var totalrec = 10;
		        }*/
		        var finishid = totalrec - 1;
		        for (var i = 0; i < totalrec; i++) {
		            var title = data.newsObjects[i].title,
		                publishDate = new Date(data.newsObjects[i].publishDate),
		                publishDate = publishDate.toDateString(),
		                //imgthumb = data.newsObjects[i].newsImages[0].thumb;
		                DateDisplay = publishDate;

		        	                		                
	            	$('.featlist').append('<li class="featlistitems"><a id="'+i+'" href="featured_details.html?Title='+ title +'" data-transition="slide"><h3 style="margin-top:5px;">'+title+'</h3><p>'+ DateDisplay +'</p</a></li>');
		            $('.featlistpagination').append('<li></li>');

		            if(i == finishid){
		               $(".featlistitems").on("swipeleft",function(){
			            var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
			                id = this.id,
			                nextid = parseInt(id) + 1;
			            
			            if($(this).is(':last-child') == false){

			            	$('.featlistpagination li').removeClass('active');
			            	$(this).removeClass('active');
			                $(this).fadeOut("fast", function(){
			                    $(this).next().fadeIn();
			                    $(this).next().addClass('active');
			                    $('.featlistpagination #pz'+nextid).addClass('active');
			                });
			            }
			        });


			        $(".featlistitems").on("swiperight",function(){
			            var FeatAmt = $( ".featlistitems" ).has( "li" ).length,
			                id = this.id,
			                nextid = parseInt(id) - 1;
			            
			            if($(this).is(':first-child') == false){

			            	$('.featlistpagination li').removeClass('active');
			            	$(this).removeClass('active');
			                $(this).fadeOut("fast", function(){
			                    $(this).prev().fadeIn();
			                    $(this).prev().addClass('active');
			                    $('.featlistpagination #pz'+nextid).addClass('active');
			                });
			            }
			        });

			        $(".featlistpagination li").on("tap",function(){
			        	if($(this).hasClass('active')){

			        	}
			        	else{
			        		var id = this.id,
			        			id = id[id.length -1],
			        			idshow = parseInt(id) + 1;

			        		$('.featlistpagination li').removeClass('active');
			        		$(this).addClass('active');
			        		$('.featlist li.active').fadeOut('fast' ,function(){
			        			$('.featlist li').removeClass('active');
			                    $('.featlist li:nth-child('+idshow+')').fadeIn('fast' , function(){
			                    	$(this).addClass('active');
			                    });
			                });
			        	}
		        	});
		            }
		        };
		    });
	        var totalrec = 10; //data.newsObjects.length;
	        /*if(totalrec > 10){
	            var totalrec = 10;
	        }*/
	        var finishid = totalrec - 1;
	        for (var i = 0; i < totalrec; i++) {
	            var title = data.newsObjects[i].title,
	            	summary = data.newsObjects[i].summary,
	                publishDate = new Date(data.newsObjects[i].publishDate),
	                publishDate = publishDate.toDateString(),
	                
	                DateDisplay = publishDate;
	                
	            

	                	                
	            // if(i <= 4){
	            // 	$('.featlist').append('<li class="featlistitems"><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide"><img src="'+imgthumb+'" width="100" height="100"><h3 style="margin-top:5px;">'+title+'</h3><p>'+ DateDisplay +'</p</a></li>');
	            // };
	            
	            $('.listitems').append('<li><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');
	          };
	        $('#overlay').remove();
	    });
	}
});

//Categories Page
$(document).on("pageshow","#Categories",function(){

	$(document).ready(loading);
	//$('.listitems').empty();

	$.ajax({
        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventcategories/?contenttype=json",
        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
        //data: {q : 'Van Gogh'},
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
    }).then(function(data) {
        var totalrec = data.eventCategoriesObjects.length;
        /*if(totalrec > 10){
            var totalrec = 10;
        }*/
        var finishid = totalrec - 1;
        for (var i = 0; i < totalrec; i++) {
            var title = data.eventCategoriesObjects[i].categoryName,
                Descr = data.eventCategoriesObjects[i].categoryDescription;
                
            
            $('.Catslistitems').append('<li><a href="groupevents.html?CatType=Categories&Cats='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');
            
            
        };

        $('#overlay').remove();
    });
});


//Departments Page
$(document).on("pageshow","#Departments",function(){

	$(document).ready(loading);
	//$('.listitems').empty();

	$.ajax({
        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getdepartments/?contenttype=json",
        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
        //data: {q : 'Van Gogh'},
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
    }).then(function(data) {
        var totalrec = data.departments.length,
        	PerPage = 20,
			finishid = PerPage - 1,
			Start = 0;

		$(document).ready(Showmore(Start));

		function Showmore(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
		            var title = data.departments[amount].name,
		                Descr = data.departments[amount].summary;
		                
		            
		            $('.DepartmentListing').append('<li><a href="groupevents.html?CatType=Departments&Dep='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');

		            var amount = amount + 1;
		        };

				$('#overlay').remove();
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'Departments'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".DepartmentListing li" ).length,
						Start = Start + 1;

					$(document).ready(Showmore(Start));
				}
			});
		}
    });
});

//Ministries Page
$(document).on("pageshow","#Ministries",function(){

	$(document).ready(loading);
	//$('.listitems').empty();

	$.ajax({
        url: "https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getministries/?contenttype=json",
        //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json
        //data: {q : 'Van Gogh'},
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
    }).then(function(data) {
        var totalrec = data.ministries.length,
        	PerPage = 20,
			finishid = PerPage - 1,
			Start = 0;

		$(document).ready(Showmore(Start));

		function Showmore(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
		            var title = data.ministries[amount].name,
		                Descr = data.ministries[amount].summary;
		                
		            
		            $('.MinistryListingPH').append('<li><a href="groupevents.html?CatType=Ministries&Min='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');

		            

		            var amount = amount + 1;
		        };

		        $('#overlay').remove();
				
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'Ministries'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".MinistryListingPH li" ).length,
						Start = Start + 1;

					$(document).ready(Showmore(Start));
				}
			});
		}
    });
});


//Group Event Listing Page
$(document).on("pageshow","#GroupEvents",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var CatType = getQueryVariable('CatType'),
		CatType = decodeURI(CatType);

	if(CatType == 'Ministries'){
		var SearchParam = getQueryVariable('Min'),
			SearchParamz = decodeURI(SearchParam),

			ServiceUrl = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventsforministry/?contenttype=json&ministry='+SearchParam+'';
	}
	else if(CatType == 'Departments'){
		var SearchParam = getQueryVariable('Dep'),
			SearchParamz = decodeURI(SearchParam),
			ServiceUrl = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventsfordepartment/?contenttype=json&department='+SearchParam+'';
	}
	else if(CatType == 'Categories'){
		var SearchParam = getQueryVariable('Cats'),
			SearchParamz = decodeURI(SearchParam),
			ServiceUrl = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_geteventsforcategory/?contenttype=json&category='+SearchParam+'';
	}

	//alert('3');
	$.ajax({
		url: ServiceUrl,
		//data: {q : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.eventsObjects.length;

		var finishid = totalrec - 1;

		$('.EventHeader').append('Events for '+SearchParamz);
		
		if(totalrec < 15){$('.SearchEventsInput').css('display', 'none');}
		if(totalrec == 0){
			$('.GroupEventlistitems').append('<li><a href="" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>No Events</h3></a></li>');
			$('#overlay').remove();

		}
		else{
			for (var i = 0; i < totalrec; i++) {
				var title = data.eventsObjects[i].title,
				EventDate = new Date(data.eventsObjects[i].startDate),
				EventDate = EventDate.toDateString(),
				Details = data.eventsObjects[i].pageContent,
				Category = data.eventsObjects[i].eventCategories.categoryName;

				//alert(EventMins);
				//alert(EventDeps);
				if (data.eventsObjects[i].endDate != null) {
	            	var EndDate = new Date(data.eventsObjects[i].endDate),
	            		EndDate = EndDate.toDateString(),
	            		Blank = ' - ',
	            		DateDisplay = EventDate.concat(Blank,EndDate);
	            }
	            else{
	            	DateDisplay = EventDate;
	            }

				$('.GroupEventlistitems').append('<li><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><p>'+ DateDisplay +'</p></a></li>');

				
			};

			$('#overlay').remove();
		}
	});
});

$(document).on("pageshow","#CalendarView",function(){

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}

	//alert('before');
	$.ajax({
		url: 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getevents/?contenttype=json',
		//data: {q : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.eventsObjects.length;
		var finishid = totalrec - 1;

		var CalDataString = null;
		var events = [];
		for (var i = 0; i < totalrec; i++) {
			//if(i == 0){var CalDataString = '['}
			
			var title = data.eventsObjects[i].title,
			EventDate = formatDate(data.eventsObjects[i].startDate);

			if (data.eventsObjects[i].endDate != null) {
            	var EndDate = formatDate(data.eventsObjects[i].endDate);
            		//EndDate = EndDate.toDateString();
            }
            else{
            	var EndDate = '';
            }

			// if(i == finishid){
			// 	CalDataString = CalDataString + '{ title: '+title+', start: '+EventDate+' }';	
			// 	//$('#testzzz').append(CalDataString);
			// }	
			// else{
			// 	CalDataString = CalDataString + '{ title: '+title+', start: '+EventDate+'},';	
			// }

			events.push({
                title: title,
                start: EventDate,
                end: EndDate
            });

		};

		$(document).ready(function() {
	    	//alert('ready');
	    	CalDataString = String(CalDataString);
	        $('#calendarz').fullCalendar({
	            defaultDate: new Date(),
	            header: {
					left: 'prev,next today',
					right: 'title'
					//right: 'month,agendaWeek,agendaDay'
				},
				eventClick: function(calEvent, jsEvent, view) {
                    //alert('Event: ' + calEvent.title);
                    //window.open('details.html?Title='+calEvent.title+'','_self');
                    $.mobile.navigate( 'details.html?Title='+calEvent.title );
                },
                loading: function(bool) {
					$('#loadingcal').toggle(bool);
				},
	            editable: false,
	            eventLimit: true, // allow "more" link when too many events
	            events: events,
	            eventBackgroundColor: 'black', 
                eventTextColor: 'white'
	        });
	    });

	});
    
});

//Group Event Listing Page
$(document).on("pageshow","#SearchEvents",function(){
	
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var NewsTitle = getQueryVariable('Title'),
		NewsTitle = decodeURI(NewsTitle),
		ServiceUrl = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getsknisnews/?contenttype=json';
	

	//alert('3');
	$.ajax({
		url: ServiceUrl,
		data: {q : NewsTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.eventsObjects.length;
		if(PerPage > totalrec){
			var PerPage = totalrec;
		}
		else{
			var PerPage = 20;
		}
		var	finishid = PerPage - 1,
			Start = 0;

		$('.ResultHeader').append('Showing results for "'+NewsTitle+'"');


		if(totalrec == 0){
			$('.resultlistitems').append('<li><a href="" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>No News</h3></a></li>');
			$('#overlay').remove();
		}
		else{
			$(document).ready(Showmore(Start));
		}

		function Showmore(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
					var title = data.newsObjects[amount].title,
						summary= data.newsObjects[amount].summary,
					publishDate = new Date(data.newsObjects[amount].publishDate),
					publishDate = publishDate.toDateString();
					DateDisplay = publishDate;
					//alert(EventMins);
					//alert(EventDeps);
					
					$('.resultlistitems').append('<li><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ title +'</h3><h3>'+ summary +'</h3><p>'+ DateDisplay +'</p></a></li>');

					var amount = amount + 1;
				};

				$('#overlay').remove();
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'SearchEvents'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".resultlistitems li" ).length,
						Start = Start + 1;

					$(document).ready(Showmore(Start));
				}
			});
		}
	});
});

$(document).on("pageshow","#CategoriesListing",function(){
	alert('Listing');
});
