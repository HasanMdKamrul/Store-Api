// ** data loading

const loadAllProducts = async()=>{
    try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        response.ok ? console.log('Successfull') : console.log('Failed');
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
};

// ** generate the menu catagory

const catagoryDisplay = async ()=>{

    // ** Where to display
    const listProducts = document.getElementById('unordered-list');

    const data = await loadAllProducts();
    
    const productCategories = data.map(product => {
        const {category} = product
        
        return category
    });

    const productCategoryUnique = new Set(productCategories);

    const menuProducts = Array.from(productCategoryUnique);

    menuProducts.forEach(product => {
        const menuItem = document.createElement('li');
        menuItem.classList.add('list-group-item')
        menuItem.innerText = `
        ${product}
        `
        listProducts.appendChild(menuItem);
    })
    
};

catagoryDisplay();


// ** Search products

document.getElementById('search-input').addEventListener('keypress', async(event)=>{
    // ** sppiner start
    sppiner(true)

    if (event.key === 'Enter') {
        const searchFieldValue = document.getElementById('search-input').value;
        const searchResultContainer = document.getElementById('search-results');
        searchResultContainer.textContent = ``;
        // ** load data 
        const allProducts = await loadAllProducts();
        
        const filteredProducts = allProducts.filter(product => product.category.includes(searchFieldValue));


        filteredProducts.length === 0 ? document.getElementById('no-data').classList.remove('d-none') : document.getElementById('no-data').classList.add('d-none')


        console.log(filteredProducts)
        
        filteredProducts.forEach(product => {
            const {category,title,image,price,description,id} = product;
            const cardContent = document.createElement('div');
            cardContent.classList.add('col',"my-5");
            cardContent.innerHTML = `
            <div class="card" style="height:800px">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${category}</h5>
                <h5 class="card-title">${title.length > 5 ? title.slice(0,5): title}</h5>
                <p class="card-text">${description.length > 20 ? description.slice(0,20) : description }</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Price: ${price}</small>
                <button onclick='loadDetailsProduct(${id})' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                     Product Details
                </button>

            </div>
            </div>
            
            `;

            searchResultContainer.appendChild(cardContent);
        })

        // ** Sppiner sttoped
        sppiner(false)
    }
});


// ** sppiner functionality

const sppiner = (isSppiner)=>{

    isSppiner ? document.getElementById('sppiner').classList.remove('d-none') : document.getElementById('sppiner').classList.add('d-none')
};

// ** loadProductdetails

const loadDetailsProduct = async(productId)=>{

    // ** product detail display
    const modalBody = document.getElementById('modal-body')
    // ** load all products data

    console.log(productId)
    const allProducts = await loadAllProducts();

    const findProduct = allProducts.find(product => {
        const {id} = product;
        if (id === productId) {
            const {category,description,image} = product;
            return (category,image,description)
        }
        
    });

    const {image,description,category} = findProduct;

    modalBody.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${category}</h5>
        <p class="card-text">${description}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
    `



}