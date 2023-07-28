// app.js
function base64Encode(input) {
    return btoa(input);
  }
  
  function base64Decode(input) {
    return atob(input);
  }
  
function validateEmail(email) {
    // Basic email validation using a regular expression
    const emailRegex = /^\w+([!@#$+%'\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }
  
  document.getElementById('registrationForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Validate email format
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Check if the user already exists
    checkUserExistence(email)
      .then((userExists) => {
        if (userExists) {
          alert('User already exists with this email. Please use a different email.');
        } else {
          // Call the registerUser function with the email and password
          registerUser(email, password);
        }
      })
      .catch((error) => {
        console.error('Error checking user existence:', error);
        // Handle errors in user existence check here
      });
  });
  const firebaseAPIUrl = 'https://navashopify-d4231-default-rtdb.firebaseio.com/';
  function checkUserExistence(email) {
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
            const existsemail = users.some((user)=> user.email === email);
            return existsemail;
        }
        // If data is not empty, it means the user already exists
        //return Object.keys(data).length > 0;
      });
  }
  
  function registerUser(email, password) {
    const encryptedPassword = btoa(password);
    const userData = {
      email: email,
      password: encryptedPassword
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
        console.log('User registered with ID:', data.name);
        // Handle successful registration here (e.g., show a success message to the user)
      })
      .catch((error) => {
        console.error('Registration error:', error);
        // Handle registration errors here (e.g., show an error message to the user)
      });
  }



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
          const decryptedPassword = atob(users.password);
          console.log(decryptedPassword)
          const matchedUser = users.find((user) => user.email === loginEmail && decryptedPassword === loginPassword);
          if (matchedUser) {
            window.location.href = 'home.html';
            //alert("Login successful");
            // Redirect the user to the dashboard or profile page
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