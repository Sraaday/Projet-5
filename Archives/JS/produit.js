// API
const url = "http://localhost:3000/api/cameras";

// Paramètres d'afichage d'un produit
function renderProduct(productName, productImg, productPrice, productDescription, lenses) {
  const products = document.querySelector("#Produits"); 
  const article = document.createElement("article");
  article.classList.add('display-article');
  article.innerHTML = `<img alt="${productName}" src="${productImg}">
  <p class="product-title">${productName}</p>
  <p class="price">Prix : ${productPrice + " €"}</p>
  <p class="lense-text">Choissisez une lentille : </p>
  <select id="Lentilles" class="lenses"> ${createOptions(lenses)}</select>
  <p class="description">${productDescription}</p>
  <button class="panier" type="button" onClick="AddCart()"> Ajouter au panier </button>
  `;
  products.appendChild(article);
}

// Recup product Id
const urlId = document.location.href;
console.log(urlId);
const indexId = urlId.search('=');
const productUrlId = urlId.slice (indexId + 1, urlId.length);
console.log(productUrlId);

const id = (new URL(document.location)).searchParams.get('id');

// Récupère une caméra
const getOneCam = async (url, id) => {
  const response = await fetch(`${url}/${id}`);
  return await response.json();
};

// Affiche le produit demandé via son id
const displayProducts = async (id) => {
  const product = await getOneCam(url,id);
  console.log({type:typeof product, product})
  renderProduct(product.name, product._id, product.imageUrl, product.price, product.description, product.lenses );
  
};

displayProducts(productUrlId);


// Options lentilles
function createOptions (lenses) {
  let Options = '' ;
  lenses.forEach(lense => {
    Options += `<option value="${lense}">${lense}</option>`
    
  })
  return Options;
}

//Ajout Panier
function AddCart () {
  const selecteur = document.getElementById('Lentilles');
  const LenseId = selecteur.options[selecteur.selectedIndex].value;
  console.log(LenseId);
  const newItem = {
    id : productUrlId, 
    lense : LenseId
  }
  let cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart)
  if (cart===null) {
    cart = [] 
    
  }
  console.log(cart)
  cart.push(newItem);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayNbProduct();
  
}






