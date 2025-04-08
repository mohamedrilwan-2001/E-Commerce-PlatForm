document.addEventListener("DOMContentLoaded",() =>{
  //toggle between registration and login forms
  const showLoginLink = document.getElementById("showLogin");
  const showRegisterLink = document.getElementById("showRegister");
  const registrationForm = document.getElementById("registration-form");
  const loginForm = document.getElementById("login-form");

  showLoginLink.addEventListener("click", (e)=>{
    e.preventDefault();
    registrationForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  showRegisterLink.addEventListener("click", (e)=>{
    e.preventDefault();
    loginForm.classList.remove("hidden");
  });

  //Handle registration form submission

  const registerFormElement = document.getElementById("registerForm");
  registerFormElement.addEventListener("submit", (e)=>{
    e.preventDefault();

    //collect input values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //basic validation
    if(username && email && password){
      //simulate successful registration
      alert("Registration successful! You can now log in.");
      //show the login form
      registrationForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    }else{
      alert("please fill in all fields.")
    }
  });

  //Handle login form submission
  const loginFormElement = document.getElementById("loginForm");
  loginFormElement.addEventListener("submit", (e)=>{
    e.preventDefault();

    //collect input values
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;


    //Basic validation
    if(email && password){
      //simulate successful login
      alert("Welcome to our store!");
      //redirect to e-commerce home page
      window.location.href = "e-commerce.html";
    }else{
      alert("please fill in both fields.")
    }
  });
});