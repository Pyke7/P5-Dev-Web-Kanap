function displayOrderId() {  //permet de récupérer l'id en parmètre de la page actuel pour faire le lien avec la bonne description
    let currentURL = new URL(window.location.href);
    let id = currentURL.searchParams.get("id");
    
    const orderIdContainer = document.getElementById('orderId');
    orderIdContainer.innerHTML = id;
    localStorage.clear();
}

displayOrderId();