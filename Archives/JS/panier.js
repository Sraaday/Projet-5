// API
const url = "http://localhost:3000/api/cameras";

// requête API selon L'id
const getOneCam = async (url, id) => {
    const response = await fetch(`${url}/${id}`);
    return await response.json();
};

// Affichage nb produits panier
function displayNbProduct() {
    let NbItems = JSON.parse(localStorage.getItem('cart')).length;
    
}

// Recupération des infos en local storage
function infosCart() {
    let storedItems = JSON.parse(localStorage.getItem('cart'));
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
    const cameras = await getItems(url);
    let storedItems = JSON.parse(localStorage.getItem('cart'));  
    const products = document.querySelector("#Produits");
    const panier = document.createElement("div");
    panier.classList.add('row');
    panier.classList.add('render-cart');
    
    panier.innerHTML = `
    <div class ="col-12 .container">
    <div class ="col-9 col-lg-9 col-sm-9 col-xs-9 col-md-9 case">
    <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case cell"> Image   </div>
    <div class ="col-4 col-lg-4 col-sm-4 col-xs-4 col-md-4 case cell"> Modèle </div>
    <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case cell"> Lentille </div>
    <div class ="col-1 col-lg-1 col-sm-1 col-xs-1 col-md-1 case cell"> Prix </div>
    </div>
    
    `;
    let totalPrice = 0;
    for (const item of storedItems) {
        let id = item.id
        
        const product = await getOneCam(url,id);    
        
        panier.innerHTML += `
        <div class ="col-9 col-lg-9 col-sm-9 col-xs-9 col-md-9 case">
        <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case cell"> <img class="cart-img" src="${product.imageUrl}"> </div>
        <div class ="col-4 col-lg-4 col-sm-4 col-xs-4 col-md-4 case cell"> ${product.name} </div>
        <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case cell"> ${item.lense} </div>
        <div class ="col-1 col-lg-1 col-sm-1 col-xs-1 col-md-1 case cell"> ${product.price/100} </div>
        </div> 
        `
        totalPrice += product.price 
        
        
    }
    
    panier.innerHTML += `
    <div class ="row col-3">
    <div class ="col-3 case cell price"> Prix Total </div>
    <div class ="col-3 case cell price"> ${totalPrice/100} € </div>
    
    </div>
    </div>
    
    `
    
    infosCart();
    products.appendChild(panier);
    
    //envoi du prix total en session Storage
    const infosPrice = {
        prixTotal : totalPrice/100
    }
    let finalPrice = JSON.parse(sessionStorage.getItem('finalPrice'));
    
    if (finalPrice===null) {
        finalPrice = [] 
        
    }
    finalPrice.push(infosPrice);
    localStorage.setItem('finalPrice', JSON.stringify(finalPrice));
    
};

displaycart();

// Formulaire //
// récupération des id en local storage
function getArrayId () {
    let storedItems = JSON.parse(localStorage.getItem('cart'));
    let arrayId = [];
    
    storedItems.forEach(storedItems => {
        
        arrayId.push(storedItems.id)
        
    });
    return arrayId;
    
}

// vérification reggex du formulaire
function isValid(value) {
    return /[A-Za-z\-\s]/.test(value);
}


var form = document.getElementById("form");
form.addEventListener("submit", async  (e) => {
    e.preventDefault();
    var firstName = form.elements.firstName.value;
    var lastName = form.elements.lastName.value;
    var address = form.elements.address.value;
    var City = form.elements.city.value;
    var Email = form.elements.email.value;
    var Ids = getArrayId();
    
    if (isValid(firstName))
    if (isValid(lastName))
    if (isValid(City)) {
        
        var contact = { "firstName" : firstName, "lastName" : lastName, "address" : address, "city" : City, "email" : Email };
        var req = {"contact" : contact, "products" : Ids};
        let options = {
            method:"POST",
            body: JSON.stringify(req),
            headers:{
                "Content-Type" : "application/json"
            }
        };
        
        
        try {
            const response = await fetch("http://localhost:3000/api/cameras/order",options);
            const data = await response.json();
              
            //redirection vers confirmation.html avec des paramètres
            const OrderId = data.orderId ;
            const name = form.elements.firstName.value;
            
            const customUrl = `confirmation.html?id=${OrderId}&name=${name}`;
            
            
            document.location.href = customUrl;
        }
        
        catch (error) {
            alert("Error: " + error.description );
        }
        
        
        
    }
    
    
    
    
    
    
    
})


