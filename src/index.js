let addToy = false;



const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const getToys = document.getElementById("toy-collection");




function toyRetrieve() {
  return fetch("http://localhost:3000/toys")
  .then(res => res.json())
}




function toysPost(toy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then((data) => {
    const newToy = toyRender(data)
    getToys.append(newToy)
  })
}


function liker(event) {
  event.preventDefault();
  const likeChange = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likeChange
    })
  })
  .then(response => response.json())
  .then((data => {
    event.target.previousElementSibling.innerText = `${likeChange} likes`;
  }))
}



addBtn.addEventListener("click", () => {
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
    toyFormContainer.addEventListener("submit", e => {
      e.preventDefault();
      toysPost(e.target)
    })
  } else {
    toyFormContainer.style.display = "none";
  }
})




function toyRender(toy) {

    let h2 = document.createElement("h2")
    let img = document.createElement("img")
    let p = document.createElement("p")
    let btn = document.createElement("button")
    let div = document.createElement("div")

    div.className = "card";

    h2.innerText = toy.name;

    img.src = toy.image;
    img.className = "toy-avatar";

    p.textContent = toy.likes + " likes"
    
    btn.className = "like-btn"
    btn.id = toy.id
    btn.textContent = " like ♥" 

    btn.addEventListener("click", (e) => {
      liker(e)
    })

    div.append(h2, img, p, btn)
    getToys.append(div)
}

toyRetrieve().then(toys => {
  toys.forEach(toy => {
    toyRender(toy)
  })
})


