document.addEventListener("DOMContentLoaded", function() {


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
const realForm = document.querySelector(".add-toy-form")
let nameInput = document.querySelector("#name")
let imageInput = document.querySelector("#image")
let likeButton = document.querySelector(".like-btn")
let addToy = false
let allToys;
// YOUR CODE HERE

fetch('http://localhost:3000/toys/')
  .then(resp => resp.json())
  .then(toys => {
    allToys = toys

    renderToys()
  })



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function renderToys() {
  allToys.forEach(function(e) {
     const toyCard = document.createElement("div")
     toyCard.className = "card"
     toyCollection.appendChild(toyCard)
    toyCard.innerHTML = `<h2>${e.name}</h2>
        <img src=${e.image} class="toy-avatar" />
        <p>${e.likes} Likes </p>
        <button class="like-btn">Like <3</button>`
    toyCard.dataset.name = e.name
    toyCard.dataset.image = e.image
    toyCard.dataset.likes = e.likes
    toyCard.dataset.id = e.id
  })
}


      
          
       
      
              
              
realForm.addEventListener("submit", function(e) {
  e.preventDefault()
    let formData = {
      name: nameInput.value,
      image: imageInput.value,
      likes: 0
    };

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/toys", configObj)
    
        .then(function (response) {
            return response.json();
        })
        .then(function (object) {
            console.log(object);
          toyCollection.innerHTML += `<div class="card"><h2>${object.name}</h2>
            <img src=${object.image} class="toy-avatar" />
            <p>${object.likes} Likes </p>
            <button class="like-btn">Like <3</button> </div>`
            })
        .catch(function (error) {
            alert("Unauthorized Access");
            console.log(error.message);
            toyCollection.innerHTML += 'Unauthorized Access'
        });
        
})


  toyCollection.addEventListener("click", function (e) {
    e.preventDefault()
    if (e.target.className==="like-btn") {
      e.target.parentNode.dataset.likes++
      console.log(e.target.parentNode.dataset.likes)
      fetch(`http://localhost:3000/toys/${e.target.parentNode.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
        body: JSON.stringify({
          "likes": e.target.parentNode.dataset.likes
      })
    })
    }
})
      
      
})