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
    if (event.key === 'Enter') {
        
    }
})