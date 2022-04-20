const cartReview = document.getElementById('cart__items'); //FAIT
const totalQuantity = document.getElementById('totalQuantity'); //FAIT
const totalPrice = document.getElementById('totalPrice');

function mainProductRecap () {
    const cartContent = getCart();
    travelAndInsertInfos (cartContent);
}

mainProductRecap();

function getCart() { //récupére le panier 
    let cart = JSON.parse(localStorage.getItem("cart"));
    return cart;
}

function travelAndInsertInfos (cartContent) { //permet d'afficher du contenu pour l'utilisateur en fonction de son panier(localStorage)
    for (let i=0; i<cartContent.length; i++) {
        const article= cartContent[i];
    
        fetch(`http://localhost:3000/api/products/${article.id}`) //ici, on récupére les infos à afficher qui n'étaient pas dans le localStorage (img, name, price...) 
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })

            .then(function(product) {
                let articleContainer = document.createElement('article');
                cartReview.appendChild(articleContainer);
                articleContainer.classList.add("cart__item");
                articleContainer.setAttribute("data-id", article.id);
                articleContainer.setAttribute("data-color", article.color);
                

                let imgContainer = document.createElement('div');
                articleContainer.appendChild(imgContainer);
                imgContainer.classList.add("cart__item__img");

                let img = document.createElement('img');
                imgContainer.appendChild(img);
                img.setAttribute("src", product.imageUrl);
                img.setAttribute("alt", product.altTxt);

                let articleContent = document.createElement('div');
                articleContainer.appendChild(articleContent);
                articleContent.classList.add("cart__item__content");

                let articleContentDescription = document.createElement('div');
                articleContent.appendChild(articleContentDescription);
                articleContentDescription.classList.add("cart__item__content__description");

                let articleName = document.createElement('h2');
                articleContentDescription.appendChild(articleName);
                articleName.innerText = product.name;

                let articleColor = document.createElement('p');
                articleContentDescription.appendChild(articleColor);
                articleColor.innerText = article.color;

                let articlePrice = document.createElement('p');
                articleContentDescription.appendChild(articlePrice);
                articlePrice.innerText = product.price + "€";

                let articleContentSettings = document.createElement('div');
                articleContent.appendChild(articleContentSettings);
                articleContentSettings.classList.add("cart__item__content__settings");

                let articleContentSettingsQty = document.createElement('div');
                articleContentSettings.appendChild(articleContentSettingsQty);
                articleContentSettingsQty.classList.add("cart__item__content__settings__quantity");

                let articleQty = document.createElement('p');
                articleContentSettingsQty.appendChild(articleQty);
                articleQty.innerText = "Qté :";

                let articleInputQty = document.createElement('input');
                
                articleContentSettingsQty.appendChild(articleInputQty);
                articleInputQty.classList.add("itemQuantity");
                articleInputQty.setAttribute("type", "number");
                articleInputQty.setAttribute("name", "itemQuantity");
                articleInputQty.setAttribute("min", 1);
                articleInputQty.setAttribute("max", 100);
                articleInputQty.setAttribute("value", article.qty);

                let articleDeleteContainer = document.createElement('div');
                articleContentSettings.appendChild(articleDeleteContainer);
                articleDeleteContainer.classList.add("cart__item__content__settings__delete");

                let articleDeleteOption = document.createElement('p');
                articleDeleteContainer.appendChild(articleDeleteOption);
                articleDeleteOption.classList.add("deleteItem");
                articleDeleteOption.innerText = "Supprimer";

                if (i===cartContent.length-1) {
                    articleInputQty = document.getElementsByClassName('itemQuantity');
                    totalQty(articleInputQty);
                    articleDeleteOption = document.getElementsByClassName('deleteItem');
                    deleteItem(articleDeleteOption);  
                }
            })
    }
}


function totalQty(articleInputQty) { //affiche le bon total d'articles et s'actualise au changement de quantité ainsi que dans le localStorage
    let total = 0;
    for (let i=0; i<articleInputQty.length; i++) {
        const item = articleInputQty[i];
        let inputValue = parseInt(item.value);
    
        
        total += inputValue;
        totalQuantity.innerHTML = total;

        item.addEventListener('change', function(e) {
            let targetTheGoodProduct = item.closest('article');
            let dataColor = targetTheGoodProduct.dataset.color;
            let dataId = targetTheGoodProduct.dataset.id;

            let cart = JSON.parse(localStorage.getItem("cart"))
            const match = cart.find((prd) => { 
                if(prd.color === dataColor && prd.id === dataId) {
                    return prd;
                }
            })

            if(match) {
                match.qty = parseInt(e.target.value);
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.reload();
        })
    }
}



function deleteItem(articleDeleteOption) { //supprime le produit du localStorage et donc de la page

    for (let i = 0; i < articleDeleteOption.length; i++) {
        const btnDelete = articleDeleteOption[i];
        
        btnDelete.addEventListener('click', function(e) {
            let targetTheGoodProduct = btnDelete.closest('article');
            let dataColor = targetTheGoodProduct.dataset.color;
            let dataId = targetTheGoodProduct.dataset.id;

            let cart = JSON.parse(localStorage.getItem("cart"))
            const match = cart.find((prd) => { 
                
                if(prd.color === dataColor && prd.id === dataId) {
                    return prd;
                    
                }
            })

            if(match) {
                const indexKanap = cart.indexOf(match);
                cart.splice(indexKanap, 1);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.reload();
        })
    }
}


//VALIDATION DES DONNEES SAISIES DANS LE FORMULAIRE DE COMMANDE


function validUserInfos() {
    let myForm = document.getElementsByClassName("cart__order__form");
    
    myForm[0].addEventListener('submit', function(e) {
        const firstName = document.getElementById('firstName');
        let fullNameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

        if (fullNameRegex.test(firstName.value) == false) {
            const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
            firstNameErrorMsg.innerHTML = "Le champ prénom contient des caractères non autorisés";
            e.preventDefault();
        }

        const lastName = document.getElementById('lastName');

        if (fullNameRegex.test(lastName.value) == false) {
            const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
            lastNameErrorMsg.innerHTML = "Le champ nom contient des caractères non autorisés";
            e.preventDefault();
        }    
        
        const address = document.getElementById('address');
        let addressRegex = /^\s*\S+(?:\s+\S+){2}/;

        if (addressRegex.test(address.value) == false) {
            const addressErrorMsg = document.getElementById('addressErrorMsg');
            addressErrorMsg.innerHTML = "Le champ adresse n'est pas valide"
            e.preventDefault();
        }

        const city = document.getElementById('city');
        let cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

        if (cityRegex.test(city.value) == false) {
            const cityErrorMsg = document.getElementById('cityErrorMsg');
            cityErrorMsg.innerHTML = "Le champ ville n'est pas valide";
            e.preventDefault();
        }

        const email = document.getElementById('email');
        let emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

        if (emailRegex.test(email.value) == false) {
            const emailErrorMsg = document.getElementById('emailErrorMsg');
            emailErrorMsg.innerHTML = "Le champ email n'est pas valide"
            e.preventDefault();
        }
    })
}

validUserInfos();