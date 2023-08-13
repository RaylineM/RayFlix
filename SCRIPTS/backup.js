const chave_api = 'aa169569112bceef9d4ee4d725de9e8d';
const end_point = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&api_key=${chave_api}`;
const base_url = 'https://api.themoviedb.org/3/'
const api_url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=${chave_api}`;

/* getmovies */
get_dados(end_point)
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
/* showmovie */
function show(filmes) {
    const div_item = document.getElementById("filmes");
    const filmes_html = filmes.map(filme => {
        return `
        <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" class="card-img-top" alt="${filme.title}">
            <div class="card-body" style="margin-bottom: 20px;">
                <h5 class="card-title">${filme.title}</h5>
                <p class="card-text">${filme.overview}</p>
            </div>
            </div>
            </div>
        `;
    });
    div_item.innerHTML = filmes_html.join("");
}


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
]

const form = document.getElementById('form');
const pesquisa = document.getElementById('pesquisa');
const tagsEl = document.getElementById('tags');

// Função para obter os filmes por filtros
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
            if (selecao_por_genero.length == 0) {
                selecao_por_genero.push(genre.id);
            } else {
                if (selecao_por_genero.includes(genre.id)) {
                    selecao_por_genero.forEach((id, idx) => {
                        if (id == genre.id) {
                            selecao_por_genero.splice(idx, 1);
                        }
                    });
                } else {
                    selecao_por_genero.push(genre.id);
                }
            }
            get_dados(api_url +'&with_genres='+encodeURI(selecao_por_genero.join(',')))
        });

        tagsEl.append(t);
    });
}
s