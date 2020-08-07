// API
const url = "http://localhost:3000/api/cameras";

// Affichage nb produits panier
function displayNbProduct() {
    let NbItems = JSON.parse(localStorage.getItem('cart')).length;
    console.log(NbItems)
    
}

// Recupération des infos en local storage
function infosCart() {
    let storedItems = JSON.parse(localStorage.getItem('cart'));
    console.log(storedItems)
}

infosCart();


displayNbProduct();

// Récupère toutes les caméras
const getItems = async (url) => {
    const response = await fetch(url);
    return await response.json();
};



// Affiche tous les produits
const displaycart = async () => {
    const cart = await getItems(url);
    let storedItems = JSON.parse(localStorage.getItem('cart'));
    cart.forEach((cartItem) => {
        storedItems.forEach((storedItem) => {
            if (cartItem._id == storedItem.id) {
                console.log( renderCart(cartItem.name, cartItem._id, cartItem.imageUrl, cartItem.price, storedItem.lense)) ;
            }
            
        });
    });
};

displaycart();



// Paramètres d'afichage d'un produit
function renderCart(cartName, cartId, cartImg, cartPrice, cartLense) {
    const products = document.querySelector("#Produits"); 
    const article = document.createElement("article");
    article.classList.add('display-article');
    article.innerHTML = `<img alt="${cartName}" src="${cartImg}">
    <button class="product-link" type="button"><a href="produits.html?id=${cartId}">Consulter la fiche du produit</a></button>
    <p class="product-title">${cartName}</p>
    <p class="prdoduct-lense">${cartLense}</p>
    <p class="price">${cartPrice + " €"}</p>
    `;
    products.appendChild(article);
}


