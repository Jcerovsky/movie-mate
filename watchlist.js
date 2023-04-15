function updateWatchlist() {
  const watchlistSection = document.querySelector('.movie-section-watchlist');
  const watchList = JSON.parse(localStorage.getItem('watchList')) || [];

  if (watchList.length === 0) {
      watchlistSection.innerHTML = `
        <h3 class="movie-section__text-watchlist">Your watchlist is looking a little empty...</h3>
        <div class="movie-section__add-movies">
            <i class="fa-solid fa-circle-plus"></i>
            <a class="movie-section__add-movies-link" href="index.html">Let’s add some movies!</a>  
        </div>
   `     
  } else {
      let watchlistHtml = '';
  for (let movie of watchList) {
    watchlistHtml += `
      <div class="movie-container">
        <img src="${movie.poster}" class="movie-poster"/>
        <div class="movie-info-div">
          <div class="movie-info-top">
            <p class="movie-title-text">${movie.title}</p>
            <i class="fa-solid fa-star star-icon"></i>
            <p class="movie-rating">${movie.rating}</p>
          </div>
          <div class="movie-info-middle">
            <p class="movie-runtime">${movie.runtime}</p>
            <p class="movie-genre">${movie.genre}</p>
            <i class="fa-solid fa-circle-minus minus-btn"></i>
            <p class="watchlist-text">Remove</p>
          </div>
          <p class="movie-plot">${movie.plot}</p>
        </div>
      </div>
    `;
  }
  watchlistSection.innerHTML = watchlistHtml;
  }
  
}

window.addEventListener('load', updateWatchlist);
  
  
document.querySelector('.movie-section').addEventListener('click', (e) => {
    if (e.target.classList.contains('minus-btn')) {
        const movieDiv = e.target.closest('.movie-container');
        const title = movieDiv.querySelector('.movie-title-text').textContent;
        const watchList = JSON.parse(localStorage.getItem('watchList'));
        
        e.target.classList.add('red')

        // Remove movie from watchlist
        setTimeout(() => {
            const updatedWatchList = watchList.filter(movie => movie.title !== title);
            localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
            movieDiv.remove();
            if (updatedWatchList.length === 0) {
                updateWatchlist()
            }
        }, 500) 
    }
})

