window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '558783717653580',
		      xfbml      : true,
		      version    : 'v2.7'
		    });
		    FB.getLoginStatus(function(response) {
		    	if (response.status === 'connected') {
		    		document.getElementById('status').innerHTML = 'We are connected.';
		    		document.getElementById('login').style.visibility = 'hidden';
		    	} else if (response.status === 'not_authorized') {
		    		document.getElementById('status').innerHTML = 'We are not logged in.'
		    	} else {
		    		document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
		    	}
		    });
		};
		(function(d, s, id){
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) {return;}
		    js = d.createElement(s); js.id = id;
		    js.src = "//connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		// login with facebook with extra permissions
		function login() {
			FB.login(function(response) {
				if (response.status === 'connected') {
		    		document.getElementById('status').innerHTML = 'We are connected.';
		    		document.getElementById('login').style.visibility = 'hidden';
		    	} else if (response.status === 'not_authorized') {
		    		document.getElementById('status').innerHTML = 'We are not logged in.'
		    	} else {
		    		document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
		    	}
			}, {scope: 'email,user_photos'});
		}
		
		// getting basic user info
		function getInfo() {
			FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,email,picture.width(150).height(150)'}, function(response) {
				var str="<b>Name</b> : "+response.name+"<br>";
			          str +="<b>Email:</b> "+response.email+"<br>";
			          str +="<img src='" + response.picture.data.url + "'>";
				document.getElementById('status').innerHTML = str;
			});
		}

		function getAlbums(){
			//document.getElementById("albums").innerHTML="yukleniyor...";
            FB.api('/me/albums','GET',  function(response) {
                var html="<nav><ul> ";
                for (var i=0, l=response.data.length; i<l; i++){
                    var album = response.data[i];
                    html+=  '<li><a href="#" onclick="getAlbumPhotos1(\''+album.id+'\')">'+album.name+'</a></li>';
                    
                }
                html+= "</ul></nav><br />";
                
                document.getElementById("albums").innerHTML=html;
            });
        }

         function getAlbumPhotos1(albumid){
			FB.api("/"+albumid+"/photos",'GET',{fields: 'images'},function(response){
				if(!response||response.error){
					console.log("error");
				}
				else{
				    var photos = [];
				    photos = response.data;
				    console.log(photos);
				    var html = "No of pictures "+photos.length+"<br><br>";
				    html+="<div class='slideshow-container'>";
				    for(var i=0;i<photos.length;i++) {
				    	var images = photos[i].images;
				    	html+="<div class='mySlides fade'>";
				    	html+="<div class='numbertext'><b>"+(i+1)+"/"+photos.length+"</b></div>";
				       html +="<img src='"+images[i].source+"' style='width:100%;height:100%;'/>";
				       html +="</div>";
				    }
				    html +="</div><br>";
				    html +="<div style='text-align:center'>";
				    for(var k=0;k<photos.length;k++){
				    	html+=" <span class='dot'></span>";
				    }
				    document.getElementById("photo").innerHTML = html;
				    showSlides();
				}
			    });

			}
			var slideIndex = 0;
			function showSlides() {
				    var i;
				    var slides = document.getElementsByClassName("mySlides");
				    var dots = document.getElementsByClassName("dot");
				    for (i = 0; i < slides.length; i++) {
				       slides[i].style.display = "none";
				    }
				    slideIndex++;
				    if (slideIndex> slides.length) {slideIndex = 1}
				    for (i = 0; i < dots.length; i++) {
				        dots[i].className = dots[i].className.replace(" active", "");
				    }
				    slides[slideIndex-1].style.display = "block";
				    dots[slideIndex-1].className += " active";
				    setTimeout(showSlides, 3000); // Change image every 2 seconds
				}