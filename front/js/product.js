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

    const colorSelect = document.getElementById('colors')
    // const imgs = await fetchSingleProduct();

    // imgs.forEach((img) => {
    //     const imgEl = document.createElement('img');
    //     const itemTitle = document.getElementById('title');
    //     const itemPrice = document.getElementById('price');
    //     const itemDescription = document.getElementById('description');

    //     imgEl.innerHTML = `
    //     <img src="${img.imageUrl}" alt="${img.altTxt}">
    //     `

    //     itemTitle.innerText = `${img.name}`;
    //     itemPrice.innerText = `${img.price}`;
    //     itemDescription.innerText = `${img.description}`;
    //     imgContainer.appendChild(imgEl);

    // });
  }

  displaySingleProduct();