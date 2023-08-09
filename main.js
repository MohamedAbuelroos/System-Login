//validate form
function validateForm() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (name == "") {
    swal("Name is Requerd", "This Name Will Be Your Nick Name");
    return false;
  }
  if (email == "") {
    swal("Email is Requerd", "Enter A Valid Email");
    return false;
  } else if (!email.includes("@")) {
    swal("email Shoud Include '@' And '.'");
    return false;
  }
  if (password == "") {
    swal("Password is Requerd");
    return false;
  } else if (password.length <= 5) {
    swal("password Must Be More Complicated ");
    return false;
  }
  return true;
}

// handele signup page
let signup = document.getElementById("signup");
let dataToLocal = JSON.parse(localStorage.getItem("dataToLocal")) || [];

if (
  location.pathname === `/signup.html` ||
  location.pathname === `/System-Login/signup.html`
) {
  signup.onclick = function () {
    addUserToLocalStorage();
  };
  // signup.addEventListener("click", function () {
  //   addUserToLocalStorage();
  // });
}

function addUserToLocalStorage() {
  if (validateForm() == true) {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let gender = document.getElementById("gender").value;
    let newDataToLocal = {
      name,
      email,
      password,
      gender,
    };

    // Check email exsist in local storage
    const emailExists = dataToLocal.some((ele) =>
      ele.email.includes(newDataToLocal.email)
    );
    if (emailExists) {
      swal(" This Email Is Already Exsist", { icon: "warning" });
    } else {
      // console.log("Email doesnt exists in local storage.");
      swal("success !", "You Signed Up!", "success");
      dataToLocal.push(newDataToLocal);
      localStorage.setItem("dataToLocal", JSON.stringify(dataToLocal));
    }
  }

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

// handle sign in page

// validate signin
let userName = document.getElementById("user");
let pass = document.getElementById("pass");
const signIn = document.getElementById("signin");

function validateSignIn() {
  if (userName.value == "") {
    // alert("Enter Your Email First");
    swal("Enter Your Email First", { icon: "info" });
    return false;
  } else if (!userName.value.includes("@")) {
    swal("Email Shoud Include '@' And '.' ", { icon: "info" });
    return false;
  }
  if (pass.value == "") {
    swal("Enter Your Password First", { icon: "info" });
    return false;
  }
  return true;
}

//handle login
if (
  location.pathname === `/index.html` ||
  location.pathname === `/System-Login/index.html` ||
  location.pathname === "/System-Login/"
) {
  signIn.onclick = function () {
    logIn();
    userName.value = "";
    pass.value = "";
  };
  // signIn.addEventListener("click", function () {
  //   logIn();
  //   userName.value = "";
  //   pass.value = "";
  // });

  function logIn() {
    if (validateSignIn() == true) {
      // check email is correct
      dataToLocal.forEach((ele) => {
        if (
          ele.email.toLowerCase() === userName.value.toLowerCase() &&
          ele.password === pass.value
        ) {
          // location.pathname = "/home.html"; for my pc
          location.pathname = "/System-Login/home.html"; //for git hup
          localStorage.setItem("name", ele.name);
          localStorage.setItem("gender", ele.gender);
        }
        if (
          ele.email.toLowerCase() != userName.value.toLowerCase() ||
          ele.password != pass.value
        ) {
          document.getElementById("wrong").style.display = "inline-block";
        }
      });
      // check if there is no data in local storage
      let [check] = dataToLocal;
      if (check === undefined) {
        swal("Sign Up First", { icon: "warning" });
      }
    }
  }
}
// handle Home page

if (
  location.pathname === `/home.html` ||
  location.pathname === `/System-Login/home.html`
) {
  let nameFromLocal = localStorage.getItem("name");
  let genderFromLocal = localStorage.getItem("gender");
  let homeDiv = document.getElementById("welcome");
  genderFromLocal === "male"
    ? (homeDiv.innerHTML = `Hello <span>MR.</span> ${nameFromLocal.toUpperCase()} <br> " Wish A Good Day For You "`)
    : (homeDiv.innerHTML = `Hello <span>MRS.</span> ${nameFromLocal.toUpperCase()} <br> " Wish A Good Day For You "`);
}

function changeBg() {
  document.getElementById("light-mode").onclick = function () {
    let nightMode = document.getElementById("light-mode");
    nightMode.classList.toggle("active");
    if (nightMode.classList.contains("active")) {
      let row = document.querySelector(".row");
      row.style.backgroundColor = "#000000";
      row.style.color = "white";
    } else {
      let row = document.querySelector(".row");
      row.style.backgroundColor = "white";
      row.style.color = "black";
    }
  };
}

function logOut() {
  // location.pathname = `/index.html`; For my pc
  location.pathname = `/System-Login/index.html`; //for git hup
}
