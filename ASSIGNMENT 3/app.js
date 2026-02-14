const searchbutton = document.getElementById("searchbutton");
const searchinput = document.getElementById("searchInput");
const container = document.getElementById("product-container");
const description = document.getElementsByClassName("child");
const detailsContainer = document.getElementById("details");

const loadproducts = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`)
        .then(res => res.json())
        .then(data => {
            if (data.drinks) {
                displayproduct(data.drinks.slice(0, 8));
            }
        })
        .catch((err) => {
            console.log(err);
    });
}
searchbutton.addEventListener("click", () => {
    const searchterm = searchinput.value;
    container.innerHTML = "";

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchterm}`)
        .then(res => res.json())
        .then(data => {
            displayproduct(data.drinks);
        })
        .catch((err) => {
            console.log(err);
    });
});




const cartcount = document.getElementById("count").innerText;
let convertedcount = parseInt(cartcount);

const displayproduct = (products) => {
    if (!products) {
        container.innerHTML = "<h2>No drinks found</h2>";
        return;
    }
    const productcontainer = document.getElementById("product-container");
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <img class="card-img" src="${product.strDrinkThumb}" alt=""/>
        <h5><strong>Name : ${product.strDrink.slice(0,50)}</strong></h5>
        <p>Catagori: ${product.strCategory.slice(0, 15)}</p>
        <p>Instructions: ${product.strInstructions.slice(0, 15)}</p>
        <button onclick="handleaddtocart('${product.strDrink.slice(0, 12)}','${product.strDrinkThumb}')">add to cart</button>
         <button onclick="singleproduct('${product.idDrink}')">details</button>
        `;
        productcontainer.appendChild(div);
    });
}

const handleaddtocart = (name, img) => {
    const cartcount = document.getElementById("count").innerText;
    let convertedcount = parseInt(cartcount);
    if (convertedcount >= 7)
    {
        alert("You cannot add more");
        return;
    }
    convertedcount = convertedcount + 1;
    document.getElementById("count").innerText = convertedcount;


    const container = document.getElementById("cart-main-container");
    const div = document.createElement("div");
    div.classList.add("cart-info");
    div.innerHTML = ` 
        <p>${convertedcount}</p>
         <img class="cart-img" src="${img}">
        <p>${name}</p>
    `;
    container.appendChild(div);
};

function displaydetails(data) {
    const drink = data.drinks[0];
    
    detailsContainer.innerHTML = "";
    detailsContainer.innerHTML = `
        <h1>${drink.strDrink}</h1>
        <img src="${drink.strDrinkThumb}" class="card-img">
        <p><strong>Category:</strong> ${drink.strCategory}</p>
        <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
        <p><strong>Glass:</strong> ${drink.strGlass}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions.slice(0,50)}</p>
    `;
    
    detailsContainer.style.display = 'block';
}
const singleproduct = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            displaydetails(data);
        })
        .catch((err) => {
            console.log(err);
    });
};

loadproducts();
document.getElementById("count").innerText = "0";