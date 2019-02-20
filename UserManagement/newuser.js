$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $(".side-nav .collapse").on("hide.bs.collapse", function () {
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
    });
    $('.side-nav .collapse').on("show.bs.collapse", function () {
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");
    });
})

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});
$(document).ready(function () {
    $("#adduser").submit(function (event) {
        event.preventDefault();
        ajaxPost();

    });
    function ajaxPost() {

        // PREPARE FORM DATA
        var formData = {
            firstName: $("#firstname").val(),
            lastname: $("#lastname").val(),
            middleName: $("#middleName").val(),
            date_of_birth: $("#date_of_birth").val(),
            gender: $("#gender").val(),
            country: $("#country").val(),
            phone_number: $("#phone_number").val(),
            phone_Ext: $("#phone_Ext").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            confirm_password: $("#confirm_password").val(),
            role: $("#role").val(),
            userName: $("#userName").val(),
            address: $("#address").val(),
        


        }
        console.log(formData.email, formData.password);
    
        $.ajax({

    type : "POST",
    contentType : "application/json",
    url :  "http://localhost:8080/usermanagement/add",
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
$("#firstname").val("");
$("#lastname").val("");
}
}
)
$('#left').click(function(){
    
    $(this).toggleClass('fa fa-chevron-left fa fa-chevron-right');

});

