$(document).ready(() => {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var ageInput = $("input#age-input");
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      age: ageInput.val(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.age, userData.firstName, userData.lastName);
    emailInput.val("");
    passwordInput.val("");
    ageInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");


  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors

  function signUpUser(email, password, age, firstName, lastName) {
    $.post("/api/signup", {
      email: email,
      password: password,
      age: age,
      firstName: firstName,
      lastName: lastName

    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
