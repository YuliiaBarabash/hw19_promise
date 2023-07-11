// 'use strict';

// const searchButton = document.getElementById("searchButton");
// const post = document.querySelector(".post");
// const postSearch = document.getElementById("postSearchInput");
// const getCommentsBtn = document.getElementById("getCommentsBtn");


// function getPostById(id) {
//   const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

//   return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       }
//       return response.json();
//     });
// }

// function displayPost(post) {
//   const postElement = document.createElement('div');
//   postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;

//   post.innerHTML = '';
//   post.appendChild(postElement);

//   getCommentsBtn.style.display = 'block';
//   getCommentsBtn.addEventListener('click', function() {
//     getComments(post.id);
//   });
// }

// function displayComments(comments) {
//   const commentsList = document.createElement('ul');

//   comments.forEach(comment => {
//     const commentItem = document.createElement('li');
//     commentItem.textContent = comment.body;
//     commentsList.appendChild(commentItem);
//   });

//   post.appendChild(commentsList);
// }

// function getComments(postId) {
//   fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
//     .then(response => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       }
//       return response.json();
//     })
//     .then(comments => {
//       displayComments(comments);
//     })
//     .catch(error => {
//       console.log('Помилка при отриманні коментарів:', error);
//     });
// }

// searchButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   const postId = parseInt(postSearch.value);

//   if (postId >= 1 && postId <= 100) {
//     getPostById(postId)
//       .then(post => {
//         displayPost(post);
//       })
//       .catch(error => {
//         console.log('Помилка при отриманні поста:', error);
//       });
//   } else {
//     console.log('Недопустимий ідентифікатор поста');
//   }
// });


'use strict';

const searchButton = document.getElementById("searchButton");
const post = document.querySelector(".post");
const postSearch = document.getElementById("postSearchInput");
const getCommentsBtn = document.getElementById("getCommentsBtn");

function getPostById(id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.json())
    .then(post => {
      if (!response.ok) {
        throw new Error(post.error || 'Не вдалося отримати пост');
      }
      return post;
    });
}

function displayPost(post) {
  post.innerHTML = `
    <div>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    </div>
  `;

  getCommentsBtn.style.display = 'block';
  getCommentsBtn.addEventListener('click', () => {
    getComments(post.id);
  });
}

function getComments(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => {
      const commentsList = document.createElement('ul');
      commentsList.innerHTML = comments.map(comment => `<li>${comment.body}</li>`).join('');
      post.appendChild(commentsList);
    })
    .catch(error => {
      console.log('Помилка при отриманні коментарів:', error);
    });
}

searchButton.addEventListener('click', event => {
  event.preventDefault();
  const postId = parseInt(postSearch.value);

  if (postId >= 1 && postId <= 100) {
    getPostById(postId)
      .then(displayPost)
      .catch(error => {
        console.log('Помилка при отриманні поста:', error);
      });
  } else {
    console.log('невірне айді');
  }
});



