$('#contact-form').bootstrapValidator({
    //        live: 'disabled',
    message: 'This value is not valid',

    fields: {

        email: {
            validators: {
                notEmpty: {
                    message: 'The email address is required'
                },
                emailAddress: {
                    message: 'The email address is not valid'
                }
            }
        }
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
            email: $("#email").val(),

        }
        console.log(formData.email);
if(formData.email!=""){
        $.ajax({

            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/usermanagement/forgotPassword?email=" + formData.email,
            data: JSON.stringify(formData),
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (result) {
                console.log(result.message);

                if (result.message == "done") {
                    console.log('hello');
                    // window.location = 'file:///home/bridgeit/Documents/UserManagement/home.html';
                    location.href="file:///home/bridgeit/Documents/UserManagement/home.html"

                }
               
                console.log(result);

            }
        });}
        resetData();
    }
    function resetData() {
        $("#email").val("");

    }
}
)

