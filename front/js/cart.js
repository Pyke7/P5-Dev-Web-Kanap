const cartReview = document.getElementById('cart__items'); //FAIT
const totalQuantity = document.getElementById('totalQuantity'); 
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
    for (let article of cartContent) {
        const articleId = article.id;
        const articleColor = article.color;
        const articleQty = article.qty;
    
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
            })
    }
}
