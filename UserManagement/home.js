$('#contact-form').bootstrapValidator({
    //        live: 'disabled',
    message: 'This value is not valid',

    fields: {
        userName: {
            validators: {
                notEmpty: {
                    message: 'The username is required'
                },
                notEmpty: {
                    message: 'The username is required'
                }
            }
        }, password: {
            validators: {
                notEmpty: {
                    message: 'The password is required'
                },

            }
        },
    }
});

$(document).ready(function () {
    $(".loginverify").submit(function (event) {
        event.preventDefault();
        ajaxPost();

    });
    function ajaxPost() {

        // PREPARE FORM DATA
        var formData = {
            userName: $("#userName").val(),
            password: $("#password").val()
        }
        console.log(formData.userName);
if(formData.userName!=""){
        $.ajax({

            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/usermanagement/login",
            data: JSON.stringify(formData),
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (result) {
                if (result.message == "admin") {
                    console.log('hello');
                    window.location = 'file:///home/bridgeit/Documents/UserManagement/check.html';
                }
                else if (result.message == "user") {
                    console.log('user')
                    alert('not authuoried person to access this port')
                }
                else if (result.message == "invalid") {
                    console.log('error')
                    alert('invalid username and password')
                }


            }
        });
    }
        resetData();
    }
    function resetData() {
        $("#userName").val("");
        $("#password").val("");
    }
}
)

