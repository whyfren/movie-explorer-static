const apiKey = "9e7cba3af85cd26a1c284a38bc0afbdf";
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=id-ID&page=1`;
const imgBaseUrl = "https://image.tmdb.org/t/p/w500";

let semuaFilm = []; // Buat nyimpen semua film supaya bisa disaring nanti

// Ambil data dari API
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    semuaFilm = data.results;
    tampilkanFilm(semuaFilm); // tampil awal semua film
  })
  .catch((err) => {
    console.error(err);
    document.getElementById("movies-container").innerHTML = `
      <div class="col-12 text-center text-danger">
        Gagal ambil data film 😢
      </div>
    `;
  });

// Fungsi buat nampilin film
function tampilkanFilm(films) {
  const container = document.getElementById("movies-container");
  container.innerHTML = "";

  films.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "col-sm-6 col-md-4 col-lg-3";

    const movieLink = `https://www.google.com/search?q=${encodeURIComponent(
      movie.title + " film site:en.wikipedia.org"
    )}`;

    movieCard.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${imgBaseUrl + movie.poster_path}" class="card-img-top" alt="${movie.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text text-truncate" title="${movie.overview}">${movie.overview}</p>
          <p class="mt-auto"><span class="badge bg-warning text-dark">⭐ ${movie.vote_average}</span></p>
          <a href="${movieLink}" class="btn btn-primary mt-2" target="_blank">Lihat Detail 📖</a>
        </div>
      </div>
    `;
    container.appendChild(movieCard);
  });
}

let debounceTimer; // timer buat debouncing

document.getElementById("searchInput").addEventListener("input", function () {
  clearTimeout(debounceTimer); // reset timer sebelumnya

  debounceTimer = setTimeout(() => {
    const keyword = this.value.toLowerCase();
    const hasilFilter = semuaFilm.filter((film) =>
      film.title.toLowerCase().includes(keyword)
    );
    tampilkanFilm(hasilFilter);
  }, 500); // nunggu 300ms setelah user berhenti ngetik
});
