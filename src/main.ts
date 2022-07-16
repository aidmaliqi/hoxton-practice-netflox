import './style.css'


type Comment = {
  movieID: number
  id: number
  text: string
  user: string
}

type Movie = {
  movieID: number
  title: string
  src: string
  description: string
  comments: Comment[] | null
}
type State = {
  movies: Movie[]
  selectedMovie: Movie | null
}

let state: State = {
  movies: [],
  selectedMovie: null
}
let body = document.querySelector('.body')

function fetchMoviesFromServer() {
  fetch('http://localhost:3009/movies')
    .then(resp => resp.json())
    .then(serverData => {
      state.movies = serverData
      render()
    })
  
}


function renderHeader() {
  /*<header class="header">
  <img src="netflix.svg" alt="" srcset="" class="netflix-logo">
</header>*/

  let header = document.createElement('header')
  header.className = "header"

  let netflixlogo = document.createElement('img')
  netflixlogo.className = 'netflix-logo'
  netflixlogo.src = "netflix.svg"

  header.appendChild(netflixlogo)
  body?.append(header)
}

function renderMain() {
  /*<main class="main">
  <div>
    <p class="movie-description">
      Movies
    </p>
  </div>
  <section class="movie-wrapper">
  <div class="movie-item">
     <img src="/assets/movie1.jpg" alt="" srcset="" class="movie-img">
     <span class="movie-description">Avengers</span>
  </div>
  
</section>
</main>*/

  let main = document.createElement('main')
  main.className = 'main'
  let divEl = document.createElement('div')
  let pEl = document.createElement('p')
  pEl.className = "movie-description"
  pEl.textContent = "Movies:"

  divEl.appendChild(pEl)

  for (let element of state.movies) {
    let sectionEl = document.createElement('section')
    sectionEl.className = 'movie-wrapper'

    let divEl2 = document.createElement('div')
    divEl2.className = 'movie-item'

    let movieImg = document.createElement('img')
    movieImg.className = 'movie-img'
    movieImg.src = element.src

    movieImg.addEventListener('click', function () {
      state.selectedMovie = element
      render()
    })

    let spanEl = document.createElement('span')
    spanEl.className = 'movie-description'
    spanEl.textContent = element.title

    divEl2.append(movieImg, spanEl)
    sectionEl.append(divEl2)
    main.append(sectionEl)

  }

  /*<legend class="movie-description">Movie-Form:
    <form action="" class="form">
        <label for="number">Movie ID:</label>
        <input type="number" id="number" placeholder="ID..">
text..">
        <label for="file">Movie Picture source:</label>
        <input type="file" name="" id="file">
        <label for="description">Movie description:</label>
        <textarea name="" id="description" cols="40" rows="5" placeholder="Description..."></textarea>

    </form>
   </legend> */

  let legendEl = document.createElement('legend')
  legendEl.className = 'movie-description'
  legendEl.textContent = 'Movie Form:'

  let formEl = document.createElement('form')
  formEl.className = 'form'

  formEl.addEventListener('submit', function (event) {
    event.preventDefault
    createMovie(inputEl2,inputEl3,textareaEl)
  })

  let labelEl2 = document.createElement('label')
  labelEl2.htmlFor = 'text'
  labelEl2.textContent = "Movie Name"

  let inputEl2 = document.createElement('input')
  inputEl2.type = "text"
  inputEl2.id = "text"
  inputEl2.placeholder = "Name"

  let labelEl3 = document.createElement('label')
  labelEl3.htmlFor = 'file'
  labelEl3.textContent = "Picture Source:"

  let inputEl3 = document.createElement('input')
  inputEl3.type = "url"
  inputEl3.id = "file"

  let labelEl4 = document.createElement('label')
  labelEl4.htmlFor = "description"
  labelEl4.textContent = "Movie description"

  let textareaEl = document.createElement('textarea')
  textareaEl.id = "description"
  textareaEl.cols = 40
  textareaEl.rows = 5
  textareaEl.placeholder = 'Movie Description..'

  let inputEl4 = document.createElement('input')
  inputEl4.type = 'submit'
  formEl.addEventListener('submit', function (event) {
    event.preventDefault()
    createMovie(inputEl2,inputEl3,textareaEl)
  })

  formEl.append( labelEl2, inputEl2, labelEl3, inputEl3, labelEl4, textareaEl , inputEl4)
  legendEl.appendChild(formEl)
  main.prepend(divEl, legendEl)
  body?.append(main)
}


function renderSecondpage() {
  if (state.selectedMovie === null) return
  /*<header class="second-page-header">
      <button class="button-36" role="button">🔌back</button>
      <img src="/netflix.svg" alt="" class="netflix-logo blah">
  </header>
  <main class="wrapper-section">
      <div>
          <img src="/assets/movie1.jpg" alt="" class="selected-movie">
      </div>
      <section class="section-element">
          <div class="div-wrapper">
          <h1 class="movie-title">title</h1>
          <p class="movie-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, tempora.</p>
          </div>
          <div class="div-wrapper2">
              <h3>Comments</h3>
              <p><strong>username</strong> &nbsp;&nbsp;&nbsp;&nbsp; comment</p>
          </div>
      </section>
  </main>*/

  let header1 = document.createElement('header')
  header1.className = 'second-page-header'

  let buttonEl = document.createElement('button')
  buttonEl.className = 'button-36'
  buttonEl.textContent = '⬅Back'

  buttonEl.addEventListener("click", function () {
    state.selectedMovie = null
    render()
  })

  let imageEl = document.createElement('img')
  imageEl.className = 'netflix-logo'
  imageEl.src = 'netflix.svg'

  header1.append(buttonEl, imageEl)

  let mainEl = document.createElement('main')
  mainEl.className = "wrapper-section"

  let image = document.createElement('img')
  image.className = 'selected-movie'

  let sectionEl2 = document.createElement('section')
  sectionEl2.className = 'section-element'

  let divEl3 = document.createElement('div')
  divEl3.className = 'div-wrapper'

  let h1EL = document.createElement('h1')
  h1EL.className = 'movie-title'

  let pEl1 = document.createElement('p')
  pEl1.className = 'movie-desc'

  let divEl4 = document.createElement('div')
  divEl4.className = 'div-wrapper2'

  let h3El = document.createElement("h3")
  h3El.textContent = "Comments"

  h1EL.textContent = state.selectedMovie.title
  image.src = state.selectedMovie.src
  pEl1.textContent = state.selectedMovie.description
  if (state.selectedMovie.comments !== null) {
    for (let item of state.selectedMovie.comments) {
      let comment = document.createElement('p')
      let user = document.createElement('strong')
      user.textContent = item.user
      let space = document.createTextNode('\u00A0\u00A0\u00A0\u00A0')
      comment.append(user, space, item.text)
      divEl4.append(comment)
      divEl4.prepend(h3El)
    }
  }

  divEl3.append(h1EL, pEl1)
  sectionEl2.append(divEl3, divEl4)
  mainEl.append(image, sectionEl2)
  body?.append(header1, mainEl)
}

function render() {
  document.body.textContent = ""

  if (state.selectedMovie === null) {
    renderHeader()
    renderMain()
  }
  else {
    renderSecondpage()
  }
}

function createMovie( tileinput:HTMLInputElement, srcinput: HTMLInputElement, desctext : HTMLTextAreaElement ) {
  fetch(`http://localhost:3009/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      
      title: tileinput.value,
      src: srcinput.value,
      description: desctext.value,
      comments : []
    })
}).then(resp => resp.json())
.then(function (newMovie : Movie) {
  state.movies.push(newMovie)
  render()
})
}
fetchMoviesFromServer()
render()
