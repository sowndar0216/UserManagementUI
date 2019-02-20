$('#contact-form').bootstrapValidator({
    //        live: 'disabled',
            message: 'This value is not valid',
     
            fields: {
                username: {
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
                        emailAddress: {
                            message: 'The password is not valid'
                        }
                    }
                },
            }
        });

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
        
        