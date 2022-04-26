function displayAllProducts() { //affiche dynamiquement tous les produits sur la page d'accueil

    const items = document.getElementById('items');
    
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if(res.ok) {
               return res.json();
            }    
        })
    
        .then(function(products) {
            for (let product of products) {
                let linkProduct = document.createElement('a');
                items.appendChild(linkProduct);
                linkProduct.setAttribute("href", `./product.html?id=${product._id}`);
        
                let articleProduct = document.createElement('article');
                linkProduct.appendChild(articleProduct);
    
                let imgProduct = document.createElement('img');
                articleProduct.appendChild(imgProduct);
                imgProduct.setAttribute("src", product.imageUrl);
                imgProduct.setAttribute("alt", product.name);
    
                let titleProduct = document.createElement('h3');
                articleProduct.appendChild(titleProduct);
                titleProduct.textContent = product.name;
                titleProduct.classList.add("productName");
    
                let descriptionProduct = document.createElement('p');
                articleProduct.appendChild(descriptionProduct);
                descriptionProduct.textContent = product.description;
                descriptionProduct.classList.add("productDescription");
            }
        })
    
        .catch(function(error) {
            alert("Erreur");
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
}

displayAllProducts();
