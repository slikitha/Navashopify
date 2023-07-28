const firebaseAPIUrl = 'https://navashopify-d4231-default-rtdb.firebaseio.com/';
let loggedInUserName = "";
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;
    fetch(firebaseAPIUrl + "UserCredentials.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching user data");
        }
        return response.json();
      })
      .then((usersData) => {
        if (usersData) {
          const users = Object.values(usersData);
          const matchedUser = users.find((user) => user.signupEmail === loginEmail);
          if (matchedUser) {
            const decpassword = atob(matchedUser.signupPassword);
            if(decpassword === loginPassword){

                loggedInUserName =matchedUser.signupName;
                localStorage.setItem("signupName",loggedInUserName);
                redirectToDashboard(loggedInUserName);
                //window.location.href = 'dash.html';
            }else{
                alert("password not match")
            }
          } else {
            alert("Invalid credentials. Please try again.");
          }
        } else {
          alert("No users found in the database.");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
    return false;
  });
  function redirectToDashboard(signupName){
    console.log(signupName);
   
    if(signupName==="admin"){
        window.location.href="admin.html";
    }
    else{
      window.location.href="header.html";
    }
  }

  