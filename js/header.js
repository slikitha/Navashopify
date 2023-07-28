document.addEventListener('DOMContentLoaded', () => {
  let loggedInUserName = localStorage.getItem("signupName");
  console.log(loggedInUserName);
  const usernameDisplay = document.getElementById('usernameDisplay');
  usernameDisplay.textContent = `${loggedInUserName}!`;
});


function logout(){
  localStorage.removeItem("signupName");
  location.reload();
}


