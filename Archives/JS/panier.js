

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
        <div class ="col-9 col-lg-9 col-sm-9 col-xs-9 col-md-9 case">
            <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case">   </div>
            <div class ="col-4 col-lg-4 col-sm-4 col-xs-4 col-md-4 case"> Modèle </div>
            <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case"> Lentille </div>
            <div class ="col-1 col-lg-1 col-sm-1 col-xs-1 col-md-1 case"> Prix </div>
        </div>
    
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
    <div class ="row col-3">
        <div class ="col-3 case"> Prix Total </div>
        <div class ="col-3 case"> ${totalPrice} </div>
    
        </div>
    </div>
    
    `
    
    getArrayId();
    products.appendChild(panier);
    return cartLense;


}

    


// Formulaire 

function getArrayId () {
    let storedItems = JSON.parse(localStorage.getItem('cart'));
    let arrayId = [];

    storedItems.forEach(storedItems => {

        arrayId.push(storedItems.id)
        
    });
    console.log(arrayId)
    return arrayId;
    
}

function isValid(value) {
    return /[A-Za-z]/.test(value);
}
    

    var form = document.getElementById("form");
form.addEventListener("submit", function (e) {
    
    let lama = document.querySelector("#form");
    var firstName = form.elements.firstName.value;
    var lastName = form.elements.lastName.value;
    var address = form.elements.address.value;
    var City = form.elements.City.value;
    var Email = form.elements.Email.value;
    var Ids = getArrayId();

    if (isValid(firstName))
        if (isValid(lastName))
            if (isValid(City)) {

                var contact = { "firstName" : firstName.value, "lastName" : lastName.value, "address" : address.value, "City" : City.value, "email" : Email.value };
                var req = {"contact" : contact, "products" : Ids};
                


                var request = new XMLHttpRequest();
                request.open("POST", "controllers\camera.js");
                request.setRequestHeader("Content-Type", "application/json");
                request.send(req);

            }


        
 


        
    })


