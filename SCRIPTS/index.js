const chave_api = 'aa169569112bceef9d4ee4d725de9e8d';
const base_url = 'https://api.themoviedb.org/3/'
const api_url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=${chave_api}`;

/*Obter dados */
get_dados(api_url)
    .then(filmes => show(filmes))
    .catch(error => console.error("Erro ao obter os dados da API :", error));

async function get_dados(end_point) {
    try {
        const resultado = await fetch(end_point);
        const dados = await resultado.json();
        const filmes = dados.results;
        return filmes;
    } catch (error) {
        throw error;
    }
}

//movie = card  style="width: 18rem;"

/*Mostrar dados */
function show(filmes) {
    const div_item = document.getElementById("filmes");
    const filmes_html = filmes.map(filme => {
        return `
        <div class="col">
         <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" class="card-img-top" alt="${filme.title}">
                <div class="card-body">
                    <h5 class="card-title">${filme.title}</h5>
                    <p class="card-text overview">${filme.overview}</p>
                </div>
            </div>
        </div>
        `;
    });
    div_item.innerHTML = filmes_html.join("");
}
    


//Seleção por gênero
var genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];

const form = document.getElementById('form');
const pesquisa = document.getElementById('pesquisa');
const tagsEl = document.getElementById('tags');

let selecao_por_genero = [];
set_genero(); 

function set_genero() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selecao_por_genero.includes(genre.id)) {
                selecao_por_genero = selecao_por_genero.filter(id => id !== genre.id);
            } else {
                selecao_por_genero.push(genre.id);
            }
            get_filmes_por_genero();
           
        
        });

        tagsEl.appendChild(t);
    });
}


async function get_filmes_por_genero() {
    const genero_query = selecao_por_genero.join(',');
    const url_com_genero = api_url + '&with_genres=' + encodeURI(genero_query);
    selecao_destaque();

    try {
        const resultado = await fetch(url_com_genero);
        const dados = await resultado.json();
        const filmes = dados.results;
        show(filmes);
    } catch (error) {
        console.error("Erro ao obter os dados da API por gênero:", error);
    }
}


