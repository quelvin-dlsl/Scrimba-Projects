# Oldagram - Instagram Clone

A fully functional Instagram clone featuring classic artist posts with interactive likes, double-tap functionality, and a feed layout. Built with vanilla JavaScript and ES6 modules.

![Instagram Clone Screenshot](instagram_clone/screenshot.png)

## Features

- **Interactive Feed:** Scrollable post feed with multiple posts
- **Like Functionality:** Click heart icon to like/unlike posts
- **Double-Tap Like:** Double-click on post images to like (Instagram-style)
- **Live Like Counter:** Real-time updates of like counts
- **Visual Feedback:** Heart icon changes color and style when liked
- **Post Information:** Displays username, location, and caption for each post
- **Modular Architecture:** Data separated from logic using ES6 modules
- **Unique IDs:** Each post tracked with UUID for reliable interaction
- **Responsive Icons:** Font Awesome icons with hover effects

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Instagram-inspired styling and layout
- **JavaScript (ES6+)** - Interactive functionality
  - ES6 Modules (`import/export`)
  - Arrow functions
  - Template literals
  - Array methods (`forEach`, `filter`)
- **Font Awesome 6.2.0** - Icons for like, comment, and DM
- **UUID Library** - Unique identifier generation
- **Google Fonts** - Source Sans 3 font family

## How to Use

1. **Like a post:** Click the heart icon below any post
2. **Double-tap like:** Double-click directly on any post image
3. **Unlike:** Click the heart icon again or double-tap again to remove like
4. **Scroll:** Browse through all posts in the feed

## What I Learned

- **ES6 Modules:** Organizing code with `import` and `export`
- **Event Delegation:** Using `data-*` attributes for efficient event handling
- **State Management:** Tracking like state with `isLiked` property
- **Array Methods:** 
  - `filter()` to find specific posts by UUID
  - `forEach()` to iterate and render posts
- **Toggle Logic:** Implementing like/unlike functionality
- **Double-Click Events:** Using `dblclick` event listener
- **Dynamic HTML:** Generating post feed with template literals
- **Conditional Rendering:** Changing icon style based on like state
- **External Libraries:** Using CDN for Font Awesome and UUID
- **Modular Data:** Separating data structure from application logic

## Technical Implementation

**Data Structure (data.js):**
```javascript
{
    name: "Artist Name",
    username: "username",
    location: "City, Country",
    avatar: "path/to/avatar",
    post: "path/to/post-image",
    comment: "Post caption",
    likes: 21,
    isLiked: 0,
    uuid: 'unique-identifier'
}
```

**Event Delegation Pattern:**
```javascript
document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
})
```

**Toggle Like Logic:**
```javascript
if (postsObj.isLiked){
    postsObj.likes--  // Unlike
} else {
    postsObj.likes++  // Like
}
postsObj.isLiked = !postsObj.isLiked
```

## Design Highlights

- **Instagram-Inspired Layout:** Fixed width (575px) centered feed
- **Profile Header:** Logo and user profile picture
- **Post Cards:** Clean white background with proper spacing
- **Circular Avatars:** 50px rounded profile pictures
- **Interactive Icons:** Hover effects and color changes
- **Typography:** Source Sans 3 for clean, modern text
- **Like Animation:** Red filled heart when liked

## Running the Project

1. Clone or download the project files
2. Ensure proper folder structure with `/images` directory
3. Open `index.html` in your web browser
4. **Note:** Must be served via HTTP server (not file://) for ES6 modules to work

**Quick Server Options:**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using VS Code
Use Live Server extension
```

## Important Notes

- **ES6 Modules:** Requires HTTP server; won't work with `file://` protocol
- **UUID Library:** Imported via jspm.dev CDN
- **Font Awesome:** Uses CDN for icons
- **Image Dependencies:** Ensure all image files are in `/images` folder

## Future Enhancements

- Add comment functionality
- Implement DM (direct message) feature
- Add "Add Post" functionality for new posts
- Create story bubbles at top of feed
- Add user profile pages
- Implement follow/unfollow functionality
- Add timestamp to posts ("2 hours ago")
- Create explore page
- Add search functionality
- Implement infinite scroll
- Add image filters
- Create bookmark/save feature
- Add emoji reactions
