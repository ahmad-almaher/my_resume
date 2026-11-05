$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            // GitHub Pages can't run server-side scripts, so open the visitor's
            // email app with the message pre-filled instead.
            var subject = "Message from " + name + " via portfolio";
            var body = message + "\n\n— " + name + " (" + email + ")";
            window.location.href = "mailto:amjo123ahmad@gmail.com?subject=" +
                encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
            $('#success').html("<div class='alert alert-success'><strong>Thanks " + firstName +
                "! Your email app should open with the message ready to send.</strong></div>");
            $('#contactForm').trigger("reset");
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
