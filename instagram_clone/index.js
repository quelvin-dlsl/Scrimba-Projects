const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

const postAvatar = document.getElementById("post-avatar")
const postUsername = document.getElementById("post-username")
const postLocation = document.getElementById("post-location")

const postImage = document.getElementById("post-image")

const username = document.getElementById("user-id")
const comment = document.getElementById("comment")

let feed = document.getElementById("feed")
let firstPost = 0
let lastIndex = posts.length - 1

for (let i = 0; i < posts.length; i++){
    if (firstPost === i) {
        feed.innerHTML = `
            <section class="container">
                <div class="post-header">
                    <img id="post-avatar" src="${postAvatar.src = posts[i].avatar}">
                    <div class="block">
                        <h3 id="post-username">${postUsername.textContent = posts[i].name}</h3>
                        <p id="post-location">${postLocation.textContent = posts[i].location}</p>
                    </div>
                </div>
                <img class="post-image" data-index="${i}" src="${postImage.src = posts[i].post}">
                <div class="post-footer">
                    <div class="post-icons">
                        <img class="like-icon" data-index="${i}" src="images/icon-heart.png">
                        <img id="comment-icon" src="images/icon-comment.png">
                        <img id="dm-icon" src="images/icon-dm.png">
                    </div>
                    <p class="num-likes" id="likes-${i}">${posts[i].likes} likes</p>
                    <!-- caption? -->
                    <p><span id="user-id">${username.textContent = posts[i].username}</span> <span id="comment">${comment.textContent = posts[i].comment}</span></p>
                </div>
            </section>`


    } else if (i <= lastIndex) {
        feed.innerHTML += `
            <section class="container">
                <div class="post-header">
                    <img id="post-avatar" src="${postAvatar.src = posts[i].avatar}">
                    <div class="block">
                        <h3 id="post-username">${postUsername.textContent = posts[i].name}</h3>
                        <p id="post-location">${postLocation.textContent = posts[i].location}</p>
                    </div>
                </div>
                <img class="post-image" data-index="${i}" src="${postImage.src = posts[i].post}">
                <div class="post-footer">
                    <div class="post-icons">
                        <img class="like-icon" data-index="${i}" src="images/icon-heart.png">
                        <img id="comment-icon" src="images/icon-comment.png">
                        <img id="dm-icon" src="images/icon-dm.png">
                    </div>
                    <p class="num-likes" id="likes-${i}">${posts[i].likes} likes</p>
                    <!-- caption? -->
                    <p><span id="user-id">${username.textContent = posts[i].username}</span> <span id="comment">${comment.textContent = posts[i].comment}</span></p>
                </div>
            </section>`
    }
}

// Used classList.contains method to target intended image and .getAttribute method to target unique indexed icons within the loop
feed.addEventListener("click", function(){
    if(event.target.classList.contains("like-icon")) {
        let index = event.target.getAttribute("data-index");

        posts[index].likes++

        document.getElementById(`likes-${index}`).textContent = `${posts[index].likes} likes`
    }
})

feed.addEventListener("dblclick", function(){
    if(event.target.classList.contains("post-image")) {
        let index = event.target.getAttribute("data-index");

        posts[index].likes++

        document.getElementById(`likes-${index}`).textContent = `${posts[index].likes} likes`
    }
})

