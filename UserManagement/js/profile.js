
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $(".side-nav .collapse").on("hide.bs.collapse", function () {
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
    });
    $('.side-nav .collapse').on("show.bs.collapse", function () {
        $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");
    });
})


$('#logout').click(function (e) {
    console.log('logout');

    localStorage.removeItem('token');
}
);

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

            console.log("hello");


            console.log(firstname);
            $('#lastloginStamp').text(user.lastloginStamp);
            if (user.firstName == null) {
                $('#firstname').text('-');

            } else {
                $('#firstname').text(user.firstName);
            }
            if (user.middleName == null) {
                $('#middleName').text('-');
            } else {
                $('#middleName').text(user.middleName);
            }
            if (user.lastName == null) {
                $('#lastName').text('-');
            } else {
                $('#lastName').text(user.lastName);
            }
            if (user.date_of_birth == null) {
                $('#dob').text('-');

            } else {
                $('#dob').text(user.date_of_birth);

            }
            if (user.gender == null) {
                $('#gender').text('-');

            } else {
                $('#gender').text(user.gender);

            } if (user.country == null) {
                $('#country').text('-');
            } else {
                $('#country').text(user.country);

            } if (user.phone == null) {
                $('#phone').text('-');
            } else {
                $('#phone').text(user.phone);

            } if (user.phone_Ext == null) {
                $('#phoneExt').text('-');
            } else {
                $('#phoneExt').text(user.phone_Ext);

            } if (user.address == null) {
                $('#address').text('-');

            } else {
                $('#address').text(user.address);
            } if (user.email == null) {
                $('#email').text('-');
            } else {
                $('#email').text(user.email);
            } if (user.userName == null) {
                $('#userName').text('-');

            } else {
                $('#userName').text(user.userName);
            }
        }
    });

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/usermanagement/logInTime",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("token", localStorage.getItem('token'));
        },
        success: function (logTime) {
            var i;
            var time='>';
            for (i = 0; i < logTime.length; i++) {
           $("#result").append('>'+logTime[i].lastloginStamp+'<br>');
            }


        }
    });
























});


