import { posts } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
})

document.addEventListener('dblclick', function(e){
    if(e.target.dataset.imageLike){
        handleDblClick(e.target.dataset.imageLike)
    }
})

function handleDblClick(imageId){
    const imageObj = posts.filter(function(likes){
        return likes.uuid === imageId
    })[0]

    if (imageObj.isLiked){
        imageObj.likes--
    } else {
        imageObj.likes++
    }
    imageObj.isLiked = !imageObj.isLiked
    render()
}

function handleLikeClick(postsId){
    const postsObj = posts.filter(function(likes){
        return likes.uuid === postsId
    })[0]

    if (postsObj.isLiked){
        postsObj.likes--
    } else {
        postsObj.likes++
    }
    postsObj.isLiked = !postsObj.isLiked
    render()
}

function getPostsHtml(){
    let postHtml = ''

    posts.forEach(function(post){
        let likeClass = ''
        let likeType = 'fa-regular'

        if (post.isLiked){
            likeClass = 'liked'
            likeType = 'fa-solid'
        }

        postHtml += `
        <section class="container">
                <div class="post-header">
                    <img id="post-avatar" src="${post.avatar}">
                    <div class="block">
                        <h3 id="post-username">${post.name}</h3>
                        <p id="post-location">${post.location}</p>
                    </div>
                </div>
                <img class="post-image" data-image-like="${post.uuid}" src="${post.post}">
                <div class="post-footer">
                    <div class="post-icons">
                        <i class="${likeType} fa-heart ${likeClass}" data-like="${post.uuid}"></i>
                        <i class="fa-regular fa-comment"></i>
                        <i class="fa-regular fa-paper-plane"></i>
                    </div>
                    <p class="num-likes" id="likes-${post.uuid}">${post.likes} likes</p>
                    <!-- caption? -->
                    <p><span id="user-id">${post.username}</span> <span id="comment">${post.comment}</span></p>
                </div>
            </section>`
    })
    return postHtml
}

function render(){
    document.getElementById('feed').innerHTML = getPostsHtml()
}

render()

