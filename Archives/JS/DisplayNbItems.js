

// Affichage nb produits panier
function displayNbProduct() {
    const items = JSON.parse(localStorage.getItem('cart'));
    const NbItems = items == null ? 0 : items.length;
    const anchorCart = document.querySelector('a[href="panier.html"]');

    let spanNbItems = document.querySelector('a[href="panier.html"] span');
    if (spanNbItems == null) {
        spanNbItems = document.createElement('span');
        anchorCart.appendChild(spanNbItems);
    }  

    spanNbItems.innerHTML = `&nbsp;(${NbItems})`;   
    
}

displayNbProduct();

// 