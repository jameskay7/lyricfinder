
const search = document.getElementById('search');
const result = document.getElementById('results');
const button = document.querySelector('button')
const picture = document.querySelector('picture')
const form = document.querySelector('form')
const apiURL = "https://api.lyrics.ovh";
const writersCredits = `Writer(s): `

//Creating a search function to search any songs within the api.



async function searchSongs(term){
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json()

  showData(data);
  console.log(data);
 
}

 
//The show data function shoiuld then be able to display the artists information - title and artist name.

function showData(data) {
  result.innerHTML = `
   <ul class="songs">
    ${data.data
      .map(
        (song) => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Lyrics</button>
      <br>
      <br>
    </li>`
        )
        .join("")}
    </ul>
   `;
}  

//After information is submitted within the form it should be able to display lyrics in the container. Or alert you to type a song inside search bar.
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (!searchTerm) {
      alert('Please type in a search term');
    } else {
        searchSongs(searchTerm)
    }
});




async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    
    result.innerHTML = `
         <h2><strong>${artist}</strong> - ${songTitle} </h2> 
         

          <span>${lyrics}</span>
          `;
  }
  more.innerHTML = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Don't forget to type something!");
  } else {
    searchSongs(searchTerm);
  }
});


// Get lyrics button click
result.addEventListener("click", (e) => {
  const clickedEl= e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);

  }
});