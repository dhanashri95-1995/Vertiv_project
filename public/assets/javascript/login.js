(function () {
    $("#login_btn").click(function (e) {
        e.preventDefault();
        $("#form-login").submit();
    })
    $("#form-login").on("submit", function (e) {
        try {
            var data = {
                username: $("#emailid").val(),
                password: $("#pass").val(),
            };
            // return;
            $.ajax({
                url: '/login',
                type: 'POST',
                crossDomain: true,
                data: data,
                beforeSend: function () {
                    $("#loader").addClass("is-active");
                    document.getElementById("loader").setAttribute("data-text", "Loading...");
                },
                success: function (result) {
                    
                    localStorage.setItem("email", result.data.s_email);
                    localStorage.setItem("role", result.data.s_role);
                    localStorage.setItem("myidentity", `auth2 ${result.token}`);
                    getnotify('success', undefined, 1, 'stack_top_right', result.mess, result.mess_body);
                    setTimeout(() => {
                        window.location = "/main";
                    }, 2000);
                },
                error: function (err) {
                    getnotify('danger', undefined, 1, 'stack_top_right', err.responseJSON.mess, err.responseJSON.mess_body);
                },
                complete: function (response) {
                    $("#loader").removeClass("is-active");
                }
            });
        } catch (error) {
            alert(error);
        }
    });
    chk_cps = function (event) {
        try {
            $("#inputUid_error").text("");
            var x = event.getModifierState("CapsLock");
            if (x == false) {
                $("#inputUid_error").text("");
                return true;
            }
            $("#inputUid_error").text("Caps Lock activated: ");
        } catch (error) {
            console.log(error);
        }
    }
})();