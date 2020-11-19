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
  `;
  article.appendChild(wrapper);
}

export default errorPage;
