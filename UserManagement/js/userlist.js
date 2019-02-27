 
$('#logout').click(function (e)
{
console.log('logout');

    localStorage.removeItem('token');
}
);
$(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
    });
    $('.side-nav .collapse').on("show.bs.collapse", function() {                        
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
    });
})    
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});

$('#left').click(function () {

    $(this).toggleClass('fa fa-chevron-left fa fa-chevron-right');

});


$(document).ready(function () {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/usermanagement/getUser",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("token", localStorage.getItem('token'));
        },
        success: function (user) {

            console.log(user);

            $('#lastloginStamp').text(user.lastloginStamp);

        }
    });
});


$(document).ready(function() {
    $('#example').DataTable();
} );