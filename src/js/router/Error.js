function errorPage() {
  // selection de l'élément HTML article
  const article = document.getElementsByTagName('article')[0];
  // mise en place de la class 'list-articles' sur <article>
  article.className = 'error-page';
  // selection du premier enfant de l'élément HTML article
  const wrapper = article.children[0];
  // on vide le wrapper
  wrapper.innerHTML = '';

  wrapper.innerHTML = `
    <h1>Page d'erreur</h1>
    <p>Cette page n'existe pas ou n'est plus accessible</p>
    </br>
    <a href="" onclick="router.push({ name: 'index' }, ...arguments)" class="btn" color="primary" elevation>
      Retourner à l'accueil
    </a>
  `;
  // on place le wrapper dans l'élément HTML article
  article.appendChild(wrapper);
}

export default errorPage;
