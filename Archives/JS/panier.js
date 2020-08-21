
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
    const cameras = await getItems(url);
    let storedItems = JSON.parse(localStorage.getItem('cart'));
    console.log(storedItems)
    let cart = [];
    for (const camera of cameras) {
        const item = storedItems.find((idobj) => idobj.id === camera._id) ;
        if (item) {
            camera.lense = item.lense;
            cart.push(camera);
        }
    }
    
   
  renderCart(cart);
};

displaycart();



// Paramètres d'afichage du panier
function renderCart(cart) {
    
    const products = document.querySelector("#Produits");
    const panier = document.createElement("div");
    panier.classList.add('row');
    panier.classList.add('render-cart');
    
    panier.innerHTML = `
    <div class ="col-12 .container">
        <div class ="col-9 col-lg-9 col-sm-9 col-xs-9 col-md-9 case">
            <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case cell"> Illustration   </div>
            <div class ="col-4 col-lg-4 col-sm-4 col-xs-4 col-md-4 case cell"> Modèle </div>
            <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case cell"> Lentille </div>
            <div class ="col-1 col-lg-1 col-sm-1 col-xs-1 col-md-1 case cell"> Prix </div>
        </div>
    
    `;
    let totalPrice = 0;

    for(let i = 0; i < cart.length; i++) {
        panier.innerHTML += `
        <div class ="col-9 col-lg-9 col-sm-9 col-xs-9 col-md-9 case">
            <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case cell"> <img class="cart-img" src="${cart[i].imageUrl}"> </div>
            <div class ="col-4 col-lg-4 col-sm-4 col-xs-4 col-md-4 case cell"> ${cart[i].name} </div>
            <div class ="col-2 col-lg-2 col-sm-2 col-xs-2 col-md-2 case cell"> ${cart[i].lense} </div>
            <div class ="col-1 col-lg-1 col-sm-1 col-xs-1 col-md-1 case cell"> ${cart[i].price} </div>
        </div> 
        `
        totalPrice += cart[i].price
    }
    panier.innerHTML += `
    <div class ="row col-3">
        <div class ="col-3 case cell"> Prix Total </div>
        <div class ="col-3 case cell"> ${totalPrice} </div>
    
        </div>
    </div>
    
    `
    
    getArrayId();
    products.appendChild(panier);

    //envoi du prix total en session Storage
    const infosPrice = {
        prixTotal : totalPrice
    }
    let FinalPrice = JSON.parse(sessionStorage.getItem('FinalPrice'));
    
    if (FinalPrice===null) {
        FinalPrice = [] 
        
    }
    FinalPrice.push(infosPrice);
    localStorage.setItem('FinalPrice', JSON.stringify(FinalPrice));
    console.log(FinalPrice)
}

    


// Formulaire //
// récupération des id en local storage
function getArrayId () {
    let storedItems = JSON.parse(localStorage.getItem('cart'));
    let arrayId = [];

    storedItems.forEach(storedItems => {

        arrayId.push(storedItems.id)
        
    });
    console.log(arrayId)
    return arrayId;
    
}
// vérification reggex du formulaire
function isValid(value) {
    return /[A-Za-z\-\s]/.test(value);
}
    

    var form = document.getElementById("form");
form.addEventListener("submit", async  (e) => {
    e.preventDefault();
    let lama = document.querySelector("#form");
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
                console.log(data)
                

                
                



                // envoi des infos en session storage
                const OrderId = data.orderId ;
                const infosPrice = {
                    id : OrderId, 
                    name : form.elements.firstName.value
                }
                let customerInfos = JSON.parse(sessionStorage.getItem('customerInfos'));
                
                if (customerInfos===null) {
                    customerInfos = [] 
                    
                }
                customerInfos.push(infosPrice);
                localStorage.setItem('customerInfos', JSON.stringify(customerInfos));
                console.log(customerInfos)
            
                
                //redirection vers confirmation.html
                
                const customUrl = `confirmation.html?id=${OrderId}`;
            
                
                document.location.href = customUrl;
            }

                catch (error) {
                    alert("Error: " + error.description );
                }

            

            }


        
 


        
    })


