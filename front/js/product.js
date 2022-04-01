async function main(){//fonction principale du script qui consiste à afficher les bonnes informations en fonction du produit cliqué sur la page d'accueil
    const productId = getProductId();
    const product = await getProduct(productId);
    hydrateDescription(product);
}

main();

function getProductId() {  //permet de récupérer l'id en parmètre de la page actuel pour faire le lien avec la bonne description
    let currentURL = new URL(window.location.href);
    let getId = currentURL.searchParams.get("id");
    return getId;
}


function getProduct(productId) {   //permet de récupérer le produit en question via son Id
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function(res) {
            if(res.ok) {
                return res.json();
            }
        })

        .then(function(product) {
            return product;
        })

        .catch(function(error) {
            alert('Erreur');
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        })
}



function hydrateDescription(product) {
    console.log(product)  //permet d'hydrater le contenu de la page en fonction de l'id du produit
    let imgContainer = document.getElementsByClassName('item__img');
    console.log(imgContainer)
    let img = document.createElement("img");
    imgContainer[0].appendChild(img);
    img.setAttribute('src', product.imageUrl);
    img.setAttribute('alt' , product.altTxt);

    let title = document.getElementById('title');
    title.textContent = product.name;

    let price = document.getElementById('price');
    price.innerText = product.price;

    let description = document.getElementById('description');
    description.innerText = product.description;

    for (let color of product.colors) {
        console.log(color)
        let colors = document.getElementById('colors')
        let option = document.createElement('option');
        colors.appendChild(option);
        option.value = color;
        option.innerText = color;
    }
}
