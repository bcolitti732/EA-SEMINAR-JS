console.log("Inicio");

// Función para obtener un usuario de una API
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}

// Función para obtener los posts de un usuario
function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}

// Función para obtener los comentarios del post
function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener comentarios del post");
      return response.json();
    });
}

async function fetchOrderDetails() {
  try {
    const user = await getUser(1);
    const posts = await getPosts(user.id);
    
    const allComments = []; //per obtenir tots els comentaris dels posts de l'usuari amb id 
    for (const post of posts) {
      const comments = await getComments(post.id);
      allComments.push(...comments);
    }

    console.log("Usuari:", user);
    console.log("Posts del usuari:", posts.map(post => post.title));
    console.log("Tots els comnentaris:", allComments.map(comment => comment.email));

    //map filter sort
    const processedComments = allComments
      .map(comment => ({ ...comment, email: comment.email.toUpperCase() }))
      .filter(comment => comment.id > 45 && comment.id < 50)
      .sort((a, b) => a.email.localeCompare(b.email));

    console.log("Comentarios procesados:", processedComments);
    console.log("Fin");
  } catch (error) {
    console.error("Error:", error);
  }
}


console.log("Inicio");

fetchOrderDetails();



