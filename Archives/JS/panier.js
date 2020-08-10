

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
    console.log(storedItems)
    let totalPrice = 0;
    let name = [];
    let _id = [];
    let imageUrl = [];
    let price = [];
    let lense = [];
    
    
    cart.forEach((cartItem) => {
        storedItems.forEach((storedItems) => {
            if (cartItem._id == storedItems.id) {
                name.push(cartItem.name);
                _id.push(cartItem._id);
                imageUrl.push(cartItem.imageUrl);
                price.push(cartItem.price);
                lense.push(storedItems.lense);
                console.log(storedItems.lense)
                
                totalPrice += cartItem.price;
            }
            
        });
    });
    console.log( renderCart(name, _id, imageUrl, price, lense, totalPrice)) ;
};

displaycart();



// Paramètres d'afichage d'un produit
function renderCart(cartName, cartId, cartImg, cartPrice, cartLense, totalPrice) {
    
    const products = document.querySelector("#Produits");
    const panier = document.createElement("div");
    panier.classList.add('row');
    panier.classList.add('render-cart');
    
    panier.innerHTML = `
    <div class ="col-12 .container">
    `;
    
    for(let i = 0; i < cartName.length; i++) {
        panier.innerHTML += `
        <div class ="col-9 col-lg-9 col-sm-9 col-xs-9 col-md-9 case">
        <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case"> <img class="cart-img" src="${cartImg[i]}"> </div>
        <div class ="col-4 col-lg-4 col-sm-4 col-xs-4 col-md-4 case"> ${cartName[i]} </div>
        <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case"> ${cartLense[i]} </div>
        <div class ="col-1 col-lg-1 col-sm-1 col-xs-1 col-md-1 case"> ${cartPrice[i]} </div>
        </div> 
        `
    }
    panier.innerHTML += `
    
    <div class ="col-3"> prix total </div>
    
    </div>
    
    `
    
    
    products.appendChild(panier);
    return cartLense;
}


