console.log(window.location.search)




 const queryString = window.location.search; 
 const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id');

console.log(productId);

const url = `http://localhost:3000/api/products/${productId}`;

async function fetchSingleProduct() {
    try {
      const response = await fetch(url);
      console.log(response);
  
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.log("Error");
    }
  }
// async function that grabs the data from fetchSingleProduct
  async function displaySingleProduct() {

    const product = await fetchSingleProduct();
    console.log(product.name)

    const productTitle = document.getElementById('title');
    productTitle.innerText = product.name;

    const singleProductDescription = document.getElementById('description');
    singleProductDescription.innerText = product.description;

    const productPrice = document.getElementById('price');
    productPrice.innerText = product.price;


    const imgContainer = document.querySelector('.item__img');
    imgContainer.innerHTML = `
    <img src= ${product.imageUrl} alt=${product.altTxt}>
    `;
// Changes the color to match the variations of the sofas
    const colorSelect = document.getElementById('colors')
    for (let i = 0; i < product.colors.length; i++) {
      const colorOption = document.createElement('option');
      colorOption.innerText = product.colors[i];
      colorSelect.appendChild(colorOption);
    }
    
    const addToCart = document.getElementById('addToCart');
    addToCart.addEventListener('click', ($event) =>{

    })
    
    
    
    // product.colors.forEach(productColors);

    // function productColors(singleColor) {
    //   colorSelect.innerHTML = `
    //   <option value="">--Please, select a color --</option>
    //   <option value=${singleColor}>${singleColor}</option>

    //   `
    // }
  }

  displaySingleProduct();