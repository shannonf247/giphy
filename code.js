const topics = ["puppies", "tacos", "beach", "skiing", "cars"];
const buttons = document.querySelector('#buttons');

const searchEndpoint = 'https://api.giphy.com/v1/gifs/search';
const gifEndpoint = 'https://api.giphy.com/v1/gifs';
const apiKey = 'XSEqcOIYrvAFCBmF0lBGqh1kb9wn8reA';
const query = 'travel';
const gifsEl = document.querySelector('#gifs');

const input = document.querySelector('#input');

const submit = document.querySelector('#submit');

const addMore = document.querySelector('#add-more');
let offset = 0;


const renderTopics = () => {
    topics.forEach((topic) => {
        addTopic(topic);
    })
}

const addTopic = (topic) => {
    const button = document.createElement('button');
    button.setAttribute('type', button);
    button.addEventListener('click', () => { //click needs to reference a function, but not call it directly
        clearGIFs();
        getGIFs(topic);
    }); 
    button.textContent= `${topic}`;
    buttons.appendChild(button);
}

submit.addEventListener('click', (event) => {
    event.preventDefault(); //to prevent browser from reloading and calling renderTopics() again by default
    addTopic(input.value); //grab input property value
})

addMore.addEventListener('click', () => {
    offset = offset + 10;
    getGIFs()
})

const clearGIFs = () => {
    gifsEl.innerHTML = "";
    offset = 0;
}

const getGIFs = (query) => {
    window
    .fetch(`${searchEndpoint}?api_key=${apiKey}&q=${query}&limit=10&offset=${offset}`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        json.data.forEach((giphy) => {
        window
            .fetch(`${gifEndpoint}/${giphy.id}?api_key=${apiKey}`)
            .then((response) => response.json())
            .then((json) => {
            console.log(json);
 
            const img = document.createElement('img');
            img.setAttribute('src', json.data.images.downsized_medium.url);
            img.setAttribute('style', 'width: 300px; height: 170px; padding: 5px;');

            const rating = document.createElement('div');
            rating.textContent = `Rating: ${json.data.rating}`

            const container = document.createElement('div')
            container.appendChild(img);
            container.appendChild(rating);
            container.classList.add('inline-style'); //references the class and style specified in the css file

            gifsEl.appendChild(container);
            })
        })
    })
}


renderTopics();
