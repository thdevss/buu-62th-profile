

        function checkLoginState() {
            FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
            });
        }

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1463406297035195',
                cookie     : true,  // enable cookies to allow the server to access 
                                    // the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.7' // use version 2.2
            });

            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });

        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    
        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                $('.loginBtn').hide();
                $('.memberBar').show();
                $("#isLogin").show();
                getInfo();
            } else {
                $('.loginBtn').show();
                $('.memberBar').hide();
            }
        } 



var frame, picture;
//login fb

        function getInfo() {
            FB.api('/me', 'GET', {fields: 'name,email,id,picture.width(400).height(400)'}, function(response) {
                     
                //here
                frame = 'img/frame-0.png'; //default frame
                jQuery(".changeFrame").removeClass('disabled');
                jQuery("#user_fullname").html(response.name);
                toDataURL(response.picture.data.url, function(dataUrl) {
                    // var picture = loadImage(dataUrl, createProfileImage);
                    // var frame = loadImage(frame, createProfileImage);
                    picture = dataUrl;
                    generateImg(picture, frame);
                })
                


                // $('#user_img').attr('src', response.picture.data.url);
            });
        }




        function loginFB() 
        {
            FB.login(function(response) {
                    statusChangeCallback(response);
                }, {scope: 'public_profile,email,user_friends,user_work_history,user_education_history'
            });
        }

 
$( ".changeFrame" ).click(function() {
    frame = jQuery(this).data('url');
    // alert(frame);

    generateImg(picture, frame);
});




function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}


//change frame


//picture zone
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imagesLoaded = 0;
var img1, img2;
function generateImg(picture, frame) {
    imagesLoaded = 0;

    img1 = loadImage(frame, createProfileImage);
    img2 = loadImage(picture, createProfileImage);
    
}

function createProfileImage() {
    imagesLoaded += 1;

    if(imagesLoaded == 2) {

        // composite now
        // ctx.globalAlpha = 0.8;
        // ctx.drawImage(img2, 0, 0);
        ctx.drawImage(img2, 0, 0, img2.width,    img2.height,     // source rectangle
                           0, 0, canvas.width, canvas.height); // destination rectangle

        // ctx.globalAlpha = 1;
        ctx.drawImage(img1, 0, 0);
        canvas.setAttribute('crossorigin', 'anonymous')

    }
}

function loadImage(src, onload) {
    // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
    var img = new Image();

    img.onload = onload;
    img.src = src;

    return img;
}

function getProfileImg(){
    var download = document.getElementById("download");
    var image = document.getElementById("canvas").toDataURL("image/png");
    download.setAttribute("href", image);
    download.setAttribute("download", "buu-62th.png");

}