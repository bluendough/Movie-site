
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';


const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI ='https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const page = document.getElementById('page')
getFilms(APIURL);

async function getFilms(url){
    const Resp = await fetch(url);
    const RespData = await Resp.json();


    console.log(RespData);

   /*Function to make the movies show up
    RespData.results.forEach((movie) => {
        const img = document.createElement("img");
        img.src = IMGPATH + movie.poster_path;


        document.body.appendChild(img);
    });
    */

    
    /* function to make movies show up properly

    RespData.results.forEach(movie => {

        const { poster_path,title,vote_average} = movie;

        const movieElement= document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML=`
            <img 
            src="${IMGPATH + poster_path}" 
            alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
        </div>
        `;

        main.appendChild(movieElement);
    });
    */

   showFilms(RespData.results);


}

function showFilms(movies){
    //Empty main
    main.innerHTML='';
    movies.forEach(movie => {
        

        const { poster_path,title,vote_average,overview} = movie;

        const movieElement= document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML=`
            <img 
            src="${IMGPATH + poster_path}" 
            alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
        </div>
        <div class="overview">
        <h4>Overview:</h4>
        ${overview}
        </div>
        
        
        `;

        main.appendChild(movieElement);
    });

}

function getClassByRate(vote){
    if(vote>8){
        return 'green';
    }else if (vote>=5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const SearchTerm = search.value;

    if(SearchTerm){
        
        getFilms(SEARCHAPI + SearchTerm);

        search.value = '';

    }
});


function paginated_Fetch(
    url= is_required('url'),
    page=1,
    previousResponse =[]
)
{
    return fetch(`${url}$page=${page}`)
}