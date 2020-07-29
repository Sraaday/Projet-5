// API
const url = "http://localhost:3000/api/cameras";

// Affichage nb produits panier
function displayNbProduct() {
    let NbItems = JSON.parse(localStorage.getItem('cart')).length;
    console.log(NbItems)

}

displayNbProduct();