$(document).ready(function() {


    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/usermanagement/accountList",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("token", localStorage.getItem('token'));
        },
        success: function (userlist) {

            console.log(userlist);
            for( i=0;i<userlist.length;i++){
           var row = $("<tr > <td>"+userlist[i].userName+"</td><td><label id='email'></label></td><td><label id='dob'></label></td><td><label id='status'></label></td><td><label id='role'></label></td>                                    <td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' ><span class='glyphicon glyphicon-pencil'></span></button></p></td>           <td><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-danger btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' ><span class='glyphicon glyphicon-trash'></span></button></p></td></tr>");

           $("#datatable").append(row);
 
        }




        }
    });
    $('#datatable').dataTable();
    
     $("[data-toggle=tooltip]").tooltip();
    
    

} );


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




// $(document).ready(function () {
   

//         var table = $('#table').DataTable({
//         "sAjaxSource": "http://localhost:8080/usermanagement/accountList",
//         "sAjaxDataProp": "",
//         "order": [[ 0, "asc" ]],
//         "aoColumns": [
    
//         { "mData": "userName" },
//         { "mData": "email" },
//         { "mData": "date_of_birth" },
//         { "mData": "status" },
//         { "mData": "role" },
//         {render : editIcon}

//         ]
//         })

       

// });

// var editIcon=function(data,type,row){
//     if(type ==='display'){
//         return '<a href="./editUser.html" class="fa fa-pencil"/>';
//     }
// }
