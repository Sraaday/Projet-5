    const queryString = window.location.search;
    console.log(queryString)
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams)
   
    function renderConfirmation() {
        // Recupération des infos de commande en local storage
        const id = urlParams.get('id')
        const name = urlParams.get('name')
        let storedPrice = JSON.parse(localStorage.getItem('finalPrice'));
        const target = document.querySelector("#Confirmation");
        const confirmation = document.createElement("article");
        confirmation.classList.add('display-article');
        
        confirmation.innerHTML = `<h1>Merci pour votre achat ${name} </h1>
        <p> Le prix de votre commande s'élève à ${storedPrice[0].prixTotal} € </p>
        <p> Votre numéro de commande est le suivant : ${id} </p>
        <p> Nous vous remercions de votre fidélité. A très bientôt sur Orinoco ! </p> `
        
        
        
        target.appendChild(confirmation);
    }
    
    
    
    
    try{
        renderConfirmation();
    }
    catch{
        alert("Impossible de récupérer vos informations de commande !");
    }
    localStorage.clear('cart');
    displayNbProduct();