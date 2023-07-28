const firebaseAPIUrl = 'https://navashopify-d4231-default-rtdb.firebaseio.com/'; // Replace with your Firebase Realtime Database URL or Firestore base URL

function addData(event) {
   event.preventDefault();
const name = document.getElementById('name').value;
const description = document.getElementById('description').value;
const price = document.getElementById('price').value;
const image = document.getElementById('image').value;
const imageelement = document.getElementById('image-display');
imageelement.src=image;
const productData = {
    name: name,
    description: description,
    price: price,
    image:image
  };
  addDataToFirebase(productData);
}

function addDataToFirebase(data) {
  fetch(firebaseAPIUrl + 'productCredentials.json', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    alert('Data added successfully:', result);
    // Handle success, display a success message, or redirect to another page if needed
  })
  .catch(error => {
    alert('Error adding data:', error);
    // Handle error, display an error message, or take appropriate action
  });
}

    // Function to fetch data from Firebase using the fetch API
    function fetchDataFromFirebase() {
      return fetch(`${firebaseAPIUrl}/productCredentials.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data from Firebase.');
          }
          return response.json();
        })
        .catch((error) => {
          console.error('Error fetching data from Firebase:', error);
        });
    }
    // Function to display product data when the button is clicked
    function displayProductData() {
      const dataDisplay = document.getElementById('dataDisplay');
      dataDisplay.innerHTML = ''; // Clear previous data
      fetchDataFromFirebase()
        .then((data) => {
          // Process the retrieved data and display it on the page
          for (const key in data) {
            const item = data[key];
            const listItem = document.createElement('div');
            listItem.innerHTML = `
            <p>Product Name: ${item.name}</p>
            <p>Description: ${item.description}</p>
            <p>Price: ${item.price}</p>
            <img src="${item.image}" alt="Product Image" style="max-width: 200px; max-height: 200px;">
            <hr>
          `;
            dataDisplay.appendChild(listItem);
          }
        });
    }
