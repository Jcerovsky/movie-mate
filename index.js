const searchBar = document.getElementById('input')
const searchBtn = document.getElementById('search-btn')
const movieSection = document.getElementById('movie-section')

let moviesHtml = ''

// On click of the button, fetching all movies that are displayed as per the user input. 
searchBtn.addEventListener('click', async () => {
    
    if (!searchBar.value) {
        return
    }
    
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=b6aebb59&s=${searchBar.value}`);
        if (!response.ok) {
            throw Error(`Something's wrong`);
        } 
        
        const data = await response.json();
        const moviesArray = data.Search;
        
        if(Array.isArray(moviesArray)) {
            // Then iterating over the array of titles and fetching each title separately as 
        // searchng by title only returns one movie
            for (let movie of moviesArray) {
                movieSection.innerHTML = ''
                
                const movieResponse = await fetch(`https://www.omdbapi.com/?apikey=b6aebb59&t=${movie.Title}`);
                const movieData = await movieResponse.json();
                
                // filtering movies that have N/A as plot description and N/A as image source
                if (movieData.Plot.length > 3 && movieData.Poster !== "N/A") {
                    moviesHtml += `
                    <div class="movie-container">
                        <img src="${movieData.Poster}" class="movie-poster"/>
                        <div class="movie-info-div">
                            <div class="movie-info-top">
                                <p class="movie-title-text">${movieData.Title}</p>
                                <i class="fa-solid fa-star star-icon"></i>
                                <p class="movie-rating">${movieData.imdbRating}</p>
                            </div>
                            <div class="movie-info-middle">
                                <p class="movie-runtime">${movieData.Runtime}</p>
                                <p class="movie-genre">${movieData.Genre}</p>
                                <i class="fa-solid fa-circle-plus plus-btn"></i>                    <p class="watchlist-text">Watchlist</p>
                            </div>
                            <p class="movie-plot">${movieData.Plot}</p>

                        </div>
                    </div>
                `;
                }
              }
            }  else {
                moviesHtml = `
                <div class="unable-to-find">
                    <p class="unable-to-find-text">
                        Unable to find what you’re looking for. Please try another search.
                    </p>
                </div>`
            }
  } catch (error) {
    console.error(error);
  }

  movieSection.innerHTML = moviesHtml;
  moviesHtml = '';
  searchBar.value = '';
});


movieSection.addEventListener('click', (e) => {

  if (e.target.classList.contains('plus-btn')) {
    e.target.classList.add('green')
    e.target.closest('.movie-container').querySelector('.watchlist-text').textContent ='Added'    
    
    const container = e.target.closest('.movie-container');
    const title = container.querySelector('.movie-title-text').textContent;
    const poster = container.querySelector('.movie-poster').getAttribute('src');
    const rating = container.querySelector('.movie-rating').textContent;
    const runtime = container.querySelector('.movie-runtime').textContent;
    const genre = container.querySelector('.movie-genre').textContent;
    const plot = container.querySelector('.movie-plot').textContent;
    
    setTimeout(()=> container.classList.add('none'), 500)
        
    const newMovie = {title, poster, rating, runtime, genre, plot };
    
    let watchList = JSON.parse(localStorage.getItem('watchList')) || [];
    watchList.push(newMovie);
    localStorage.setItem('watchList', JSON.stringify(watchList));
  }
});
