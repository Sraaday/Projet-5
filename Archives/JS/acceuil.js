  
// API
const url = "http://localhost:3000/api/cameras";

// Affiche tous les produits
const displayProducts = async () => {
  const products = await getAllCams(url);
  products.forEach((product) => {
    renderProduct(product.name, product._id, product.imageUrl, product.price, product.description);
  });
};
// Récupère toutes les caméras
const getAllCams = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// Paramètres d'afichage d'un produit
function renderProduct(productName, productId, productImg, productPrice, productDescription) {
  const products = document.querySelector("#Produits"); 
  const article = document.createElement("article");
  article.classList.add('display-article');
  article.innerHTML = `<img alt="${productName}" src="${productImg}">
    <button class="product-link" type="button"><a href="produits.html?id=${productId}">Voir le produit</a></button>
    <p class="product-title">${productName}</p>
    <p class="price">${productPrice + " €"}</p>
    <p class="description">${productDescription}</p>
    `;
  products.appendChild(article);
}

displayProducts();