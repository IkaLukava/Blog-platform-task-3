let blogs = [];

const getItemsFromLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem("blogs"));

    if (items) {
        blogs = [...items];
    }
}

getItemsFromLocalStorage();

const container = document.getElementById("container");
const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");


 const deleteItem = (title,text) =>{
    const index = blogs.findIndex(item=>item.title===title&&item.text===text)
    if(index !== -1){
        blogs.splice(index,1)
        addItemToLocacStorage();
        container.innerHTML="";
        renderItems();
    }
    
}



const getCard = (title, text) => {
    const dom = 
        `
        <div class="card m-2" style="width: 18rem; height: 300px">
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
                ${text}
            </p>
            <button class="btn btn-danger" onclick="deleteItem('${title}','${text}')">Delete</button>
            </div>
        </div>
      `
    const div = document.createElement("div");
    div.innerHTML = dom;

    return div;
};



const addItem = (title, text) => {
    const card = getCard(title, text);

    container.appendChild(card);
};

const renderItems = () => {
    blogs.forEach((item) => {
        addItem(item.title, item.text);
    });
};

renderItems();

const addFormValues = () => {
    const title = titleInput.value;
    const text = textInput.value;

    if (title != '' && text != '') {
        addItem(title, text);
        const item = {
            title,
            text
        };
        blogs.push(item);
    
        addItemToLocacStorage(item);
    } else {
        alert("შეავსეთ ეს დედამოხნული ველები!!!")
    }
}

const addItemToLocacStorage = (item) => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
}