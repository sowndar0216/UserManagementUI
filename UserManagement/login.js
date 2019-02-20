$(document).ready(function () {
    $("#loginverify").submit(function (event) {
        event.preventDefault();
        ajaxPost();

    });
    function ajaxPost() {

        // PREPARE FORM DATA
        var formData = {
            email: $("#username").val(),
            password: $("#password").val()
        }
        console.log(formData.email, formData.password);
    
        $.ajax({

    type : "POST",
    contentType : "application/json",
    url :  "http://localhost:8080/usermanagement/login",
    data : JSON.stringify(formData),
    dataType : 'json',
    beforeSend: function(xhr) {
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
},
    success : function(result) {
        if(result.message == "done"){
            console.log('hello');
            window.location = 'file:///home/bridgeit/Documents/UserManagement/check.html';

            }
            else{

                console.log('error')
        alert('invalid username and password')
            }
        console.log(result);

    }
});
resetData();
}
function resetData(){
$("#username").val("");
$("#password").val("");
}
}
)


  function check(){
      
    var $regexname=/^\s*\S+.*/;
console.log($("#username").val());

             if ($("#username").val().match($regexname)  ) {
                 console.log('soo');
                 
              // there is a mismatch, hence show the error message
                 $('.emsg_first').removeClass('hidden');
                 $('.emsg_first').show();

                 if($("#password").val().match($regexname)  ){
                    $('.emsg_last').removeClass('hidden');
                    $('.emsg_last').show();
   console.log('hellll');
   
                    return true;
                 }
              
             }
           else{
                // else, do not display message
                $('.emsg_first').addClass('hidden');  $('.emsg_last').addClass('hidden');
                return false;
               }
            }
