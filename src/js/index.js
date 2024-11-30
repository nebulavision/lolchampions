// Importamos la clase Champion
import Champion from "./Champion.js";
import audioSrc from '../assets/audio/bienvenidos.mp3';

const audio = new Audio(audioSrc);
audio.volume = 0.1;
audio.play();

// Creamos un array para guardar los campeones
let champions = [];

// Seleccionamos el contendor donde irán las cards de cada campeón
const championContainer = document.getElementById('container');

// Añadimos el evento click al botón de cerrar el modal
document.getElementById('close-modal').addEventListener('click', () => closeModal());

// Añadimos el evento click en el logo del juego para abrir la página oficial al hacer click en él
document.getElementById('lol-image').addEventListener('click', () => {
    window.open('https://www.leagueoflegends.com/es-es/', '_blank');
});

// Función asíncrona IIFE para obtener todos los campeones llamando a la API
(async function fetchChampions() {
    await fetch('https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json')
        // Convertimos la respuesta a JSON
        .then(res => res.json())
        .then(data => {
            // Guardamos los campeones en el array
            Object.values(data.data).forEach(champion => champions.push(new Champion(champion)));
        })
        .catch(err => {
            console.log('Error fetching champion data:', err);
        }
    );

    // Una vez obtenido todos los campeones, mostramos en el html
    await showChampions();
})()

async function showChampions(){
    // Recorremos el array de capeones
        champions.forEach((champion, index) => {
            // Creamos el elemento para la card
            const card = document.createElement('article');
            //card.setAttribute("index", index);
            // Agregamos la clase card a la card
            card.className = 'card';

            // Cargamos dentro de la card el contenido html
            // la imagen del campeon, así como su nombre y título
            card.innerHTML = `
                <img src="${champion.image}" alt="${champion.name}"/>
                <div class="card-info">
                    <h3>${champion.name}</h3>
                    <p>${champion.title}</p>
                </div>
            `;

            // Añadimos el evento click para llamar a la función showData
            card.addEventListener('click', () => openModal(index));

            // Agregamos la card del campeon al contendor padre
            championContainer.appendChild(card);
        });
}

// Función para mostrar el modal
function openModal(championIndex) {
    // Obtenemos el campeón seleccionado
    const champion = champions[championIndex];
    // Seleccionamos el modal
    const modal = document.getElementById('modal');

    // Configuramos el contenido de los elementos del campeón
    document.getElementById('champion-name').innerText = champion.name;
    // Añadimos el evento click en el nombre del campeón para abrir la página oficial del campeón al hacer click en el nombre del campeón
    document.getElementById('champion-name').addEventListener('click', () => {
        window.open(`https://www.leagueoflegends.com/es-es/champions/${champion.name.toLowerCase()}`, '_black');
    });
    document.getElementById('champion-image').src = champion.image;
    document.getElementById('champion-description').innerText = champion.description;
    document.querySelector('#champion-stats div').innerHTML = `
        <table border="1px">
            <thead>
                <tr>
                    <td>HP</td>
                    <td>HP5</td>
                    <td>MP</td>
                    <td>MP5</td>
                    <td>AD</td>
                    <td>AS</td>
                    <td>AR</td>
                    <td>MR</td>
                    <td>MS</td>
                    <td>Range</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${champion.stats.hp} (+${champion.stats.hpperlevel})</td>
                    <td>${champion.stats.hpregen} (+${champion.stats.hpregenperlevel})</td>
                    <td>${champion.stats.mp} (+${champion.stats.mpperlevel})</td>
                    <td>${champion.stats.mpregen} (+${champion.stats.mpregenperlevel})</td>
                    <td>${champion.stats.attackdamage} (+${champion.stats.attackdamageperlevel})</td>
                    <td>${champion.stats.attackspeed} (+${champion.stats.attackspeedperlevel})</td>
                    <td>${champion.stats.armor} (+${champion.stats.armorperlevel})</td>
                    <td>${champion.stats.spellblock} (+${champion.stats.spellblockperlevel})</td>
                    <td>${champion.stats.movespeed}</td>
                    <td>${champion.stats.attackrange}</td>

                </tr>
            </tbody>
        </table>
    `;

    // Mostramos el modal
    modal.style.display = 'flex';
}
    
// Función para cerrar el modal
function closeModal() {
    // Seleccionamos el modal
    const modal = document.getElementById('modal');
    // Ocultamos el modal
    modal.style.display = 'none';
}