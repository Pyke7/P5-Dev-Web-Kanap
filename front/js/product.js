async function main(){//fonction principale du script qui consiste à afficher les bonnes informations en fonction du produit cliqué sur la page d'accueil
    const productId = getProductId();
    const product = await getProduct(productId);
    hydrateDescription(product);
    addToCart(product);
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





function hydrateDescription(product) {  //permet d'hydrater le contenu de la page en fonction de l'id du produit
    let imgContainer = document.getElementsByClassName('item__img');
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
        let colors = document.getElementById('colors')
        let option = document.createElement('option');
        colors.appendChild(option);
        option.value = color;
        option.innerText = color;
    }
}



// Ajout de l'évenement au clic du boutton "ajouter au panier"


function addToCart(product) {
    
    const addToCartBtn = document.getElementById("addToCart");

    addToCartBtn.addEventListener('click', function(e) {

        //Verif des données entrées par l'utilisateur
        let selection = document.getElementById("colors").value;

        if(selection === ""){
            alert("Veuillez séléctionner une couleur");
            return;
        }

        let qty = parseInt(document.getElementById("quantity").value); 

        if(qty < 1 || qty > 100){
            alert("Veuillez séléctionner une quantité entre 1 et 100");
            return;
        }
        
        const kanap = {
            color: selection,
            id: product._id,
            qty,
        };

        let cart = JSON.parse(localStorage.getItem("cart")); //permet de récupérer le panier

        if (!cart || !cart.length) {
            cart = [];
            cart.push(kanap);
            localStorage.setItem("cart", JSON.stringify(cart));
        } else { //permet d'ajuster la quantité quand l'utilisateur ajoute le même produit dans le panier
            const match = cart.find((prd) => {
                if(prd.color === selection && prd.id === product._id) {
                    return prd;
                }
            })
            if(match) {
                match.qty+=qty;
            } else {
                cart.push(kanap);
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    });
}
    



