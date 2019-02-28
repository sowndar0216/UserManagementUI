 
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
   

        var table = $('#table').DataTable({
        "sAjaxSource": "http://localhost:8080/usermanagement/accountList",
        "sAjaxDataProp": "",
        "order": [[ 0, "asc" ]],
        "aoColumns": [
    
        { "mData": "userName" },
        { "mData": "email" },
        { "mData": "date_of_birth" },
        { "mData": "status" },
        { "mData": "role" },
        {render : editIcon}

        ]
        })

       

});

var editIcon=function(data,type,row){
    if(type ==='display'){
        return '<a href="./editUser.html" class="fa fa-pencil"/>';
    }
}
