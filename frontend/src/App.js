import React, { useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

function App() {

  const [viewer, setViewer] = useState(1);

  function Read() {
    fetch("http://localhost:8081/listProducts")
    .then((response) => response.json())
    .then((products) => {
      loadProducts(products);
    });

  function loadProducts(products) {
    // Find the element “col” in HTML
    var productCard = document.getElementById("col");

    var cards = [];
    for (var i = 1; i <= products.length; i++) {
      let item = products.find((product) => product.id === i);
      if (item) {
        let card = "card" + i.toString();
        let id = item.id;
        let name = item.title;
        let price = item.price;
        let url = item.imageUrl;
        let description = item.description;
        let cat = item.category;
        let rating = item.rating;

        // create a new HTML div division
        let AddCard = document.createElement("div");
        // add class = “col” to new division for Bootstrap
        AddCard.classList.add("col");
        // create Bootstrap card
        AddCard.innerHTML = `
        <div id=${card} class="card shadow-sm">
            <img src=${url} class="card-img-top" alt="..."></img>    
            <div  class="card-body">
            <p class="card-text"> <strong>${name}</strong>, ${cat} $ ${price} <br> ${description} <br> ${rating} </p>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-body-secondary">9 mins</small>
                </div>
            </div>
        </div> `;
        // append new division
        productCard.appendChild(AddCard);

        let ccard = document.getElementById(card);
        cards.push(ccard);
      }
    } // end of for

   
  }
}

  return (<div>
    {viewer === 0 && <Create />}
    {viewer === 1 && <Read />}
    {viewer === 2 && <Update />}
    {viewer == 3 && <Delete />}
  </div>)
}

export default App;
