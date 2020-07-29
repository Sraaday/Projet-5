

// Affichage nb produits panier
function displayNbProduct() {
    const NbItems = JSON.parse(localStorage.getItem('cart')).length;
    const anchorCart = document.querySelector('a[href="panier.html"]');
    const spanNbItems = document.createElement("span");
    spanNbItems.innerHTML = NbItems;   
    anchorCart.appendChild(spanNbItems);
}

displayNbProduct();

// 