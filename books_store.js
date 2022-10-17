let master_cards_list = localStorage.length > 0 ? JSON.parse(localStorage.getItem('master_cards_list')) : []; // ternary operator - very nice thing with condition on daclaration.

document.querySelector("form").addEventListener('submit', onSubmit);
document.querySelector(".clear_all").addEventListener('click', onResetBookList);

render();

function onSubmit(event){

    event.preventDefault();
    const formData = new FormData(event.target);
    const newBook = {};
    for (const [key, value] of formData) {
        newBook[key] = value;
    }
    event.target.reset();
    cardListUpdater(newBook);
}

function cardListUpdater(cardObj){
    console.log(cardObj)
    master_cards_list.push(cardObj);
    render();
    localStorage.setItem('master_cards_list',JSON.stringify(master_cards_list))
}

function render(){
    
    document.getElementById('dynamic_content').innerHTML = ""; // clear canvas before printing new card_list

    for(let i = 0; i<master_cards_list.length; i++){ 
        const node = document.createElement("div");
        node.classList.add("col-3");
        node.innerHTML = innerHTMLcreator(master_cards_list[i]);
        document.getElementById('dynamic_content').appendChild(node);
    }   

}

function innerHTMLcreator(bookObj){
    let content = `
    <div class="card" style="width: 12rem;">
    <img src=${bookObj.imageUrl} height="260" class="card-img-top" alt="">
    <div class="card-body">
    <h5 class="card-title">${bookObj.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${bookObj.autor}</h6>
    <p class="card-text">${bookObj.description}</p>
    <h6 class="card-subtitle mb-2 text-muted">Price: ${bookObj.price}$</h6>
    </div>
    </div>  
    `
    return content;
}

function onResetBookList(){
    master_cards_list = [];
    localStorage.clear();
    render();   
}
