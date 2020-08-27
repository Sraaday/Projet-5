try{
    function renderConfirmation() {
        // Recupération des infos de commande en local storage
        let storedInfos = JSON.parse(localStorage.getItem('customerInfos'));
        let storedPrice = JSON.parse(localStorage.getItem('FinalPrice'));
        console.log(storedInfos)
        console.log(storedPrice)
        const target = document.querySelector("#Confirmation");
        const confirmation = document.createElement("article");
        confirmation.classList.add('display-article');
        
        confirmation.innerHTML = `<h1>Merci pour votre achat ${storedInfos[0].name} </h1>
        <p> Le prix de votre commande s'élève à ${storedPrice[0].prixTotal} € </p>
        <p> Votre numéro de commande est le suivant : ${storedInfos[0].id} </p>
        <p> Nous vous remercions de votre fidélité. A très bientôt sur Orinoco ! </p> `
        
        
        
        target.appendChild(confirmation);
    }
}
catch (error) {
    alert("Impossible de récupérer vos informations de commande !");
}

renderConfirmation();