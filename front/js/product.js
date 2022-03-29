//fonction principale du script qui consiste à afficher les bonnes informations en fonction du produit cliqué sur la page d'accueil
    const productId = getProductId();
    console.log(productId);
    const product = getProduct(productId);
    hydrateDescription(product);



function getProductId() {  //permet de récupérer l'id en parmètre de la page actuel pour faire le lien avec la bonne description
    let currentURL = new URL(window.location.href);
    let getId = currentURL.searchParams.get("id");
    return getId;
}


function getProduct(productId) {   //permet de récupérer le produit en question via son Id
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function(res) {
            if(res.ok) {
                return res.json();
            }
        })

        .then(function(product) {
            console.log(product);
            return product;
        })

        .catch(function(error) {
            alert('Erreur');
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        })
    
    return fetch;
}



function hydrateDescription(product) {  //permet d'hydrater le contenu de la page en fonction de l'id du produit
    let imgContainer = document.getElementsByClassName('item__img');
    let img = document.createElement("img");
    imgContainer.appendChild(img);
    img.setAttribute('src', product.imageUrl);
    img.setAttribute('alt' , product.altTxt);

    let title = document.getElementById('title');
    title.textContent = product.name;
    
}
