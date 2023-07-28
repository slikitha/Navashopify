const firebaseAPIUrl = 'https://navashopify-d4231-default-rtdb.firebaseio.com/';
//Password Encoding
function base64Encode(input) {
    return btoa(input);
  }
  function base64Decode(input) {
    return atob(input);
  }

 // Basic email validation using a regular expression
function validateEmail(signupEmail) {
    const emailRegex = /^\w+([!@#$+%'\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(signupEmail);
  }

  document.getElementById('registrationForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const signupName= document.getElementById('signupName').value;
    const signupEmail = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('signupPassword').value;
    // Validate email format
    if (!validateEmail(signupEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Check if the user already exists
    checkUserExistence(signupName,signupEmail)
      .then((userExists) => {
        if (userExists) {
          alert('User already exists with this email. Please use a different email.');
        } else {
          // Call the registerUser function with the email and password
          registerUser(signupEmail,signupPassword,signupName);
        }
      })
      .catch((error) => {
        console.error('Error checking user existence:', error);
        // Handle errors in user existence check here
      });
  });

  //Checking for Duplicate Users
  function checkUserExistence(signupName,signupEmail) {
    // Use the Firebase REST API to query the database and check if the user exists
    return fetch(firebaseAPIUrl +'UserCredentials.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('User existence check failed.');
        }
        return response.json();
      })
      .then((data) => {
        if(data){
            const users= Object.values(data);
            const existname =users.some((user)=>user.signupName === signupName);
            const existsemail = users.some((user)=> user.signupEmail === signupEmail);
            return existname||existsemail;
        }
        // If data is not empty, it means the user already exists
        //return Object.keys(data).length > 0;
      });
  }

  //Adding the User and the passwordis encrypted
  function registerUser(signupEmail,signupPassword,signupName) {
    const encryptedPassword = btoa(signupPassword);
    const userData = {
        signupName: signupName,
        signupEmail: signupEmail,
        signupPassword: encryptedPassword
      // Add more user data here if needed
    };
    // Use the Firebase REST API to create a new user entry in the database
    fetch(firebaseAPIUrl + 'UserCredentials.json', {
      method: 'POST',
      body: JSON.stringify(userData),
    })  
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed.');
        }
        return response.json();
      })
      .then((data) => {
        alert('registration successful');
        // Handle successful registration here (e.g., show a success message to the user)
      })
      .catch((error) => {
        alert('Registration error:', error);
        // Handle registration errors here (e.g., show an error message to the user)
      });
  }

  



