let musicas = [
    {
        titulo: 'CORAÇÃO PARTIDO - ELA JOGA NO 7',
        artista: 'Netto Britto',
        src: 'https://github.com/MonycLAC/player-de-Musica/blob/main/11%20-%20CORA%C3%87%C3%83O%20PARTIDO%20-%20ELA%20JOGA%20NO%207.mp3',
        img: 'Imagens/andrew-varnum-nbdVeCABFeU-unsplash.jpg'
    },
    {
        titulo: 'VOCÊ NÃO VER',
        artista: 'Netto Britto',
        src: 'https://github.com/MonycLAC/player-de-Musica/blob/main/02%20-%20VOC%C3%8A%20N%C3%83O%20V%C3%8A%20-%20L%C3%81BIOS%20DIVIDIDOS.mp3',
        img: 'Imagens/kenny-gaines-U-d828ayEdw-unsplash.jpg'
    },
    {
        titulo: 'DEPOIS DE MIM',
        artista: 'Netto Britto',
        src: 'https://github.com/MonycLAC/player-de-Musica/blob/main/12%20-%20DEPOIS%20DE%20MIM.mp3 ',
        img: 'Imagens/kenny-gaines-YScLVuOv7nU-unsplash.jpg'
    }
];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

// Inicializar a primeira música
renderizarMusica(indexMusica);

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);
musica.addEventListener('ended', proximaMusica);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = musicas.length - 1;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', proximaMusica);

// Funções
function renderizarMusica(index) {
    console.log("Renderizando música:", musicas[index]);
    
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    musica.src = musicas[index].src;
    duracaoMusica.textContent = '0:00';

    // Adicionar evento 'loadedmetadata' para atualizar a duração
    musica.addEventListener('loadedmetadata', () => {
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica() {
    console.log("Tocando música:", musicas[indexMusica]);
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    console.log("Pausando música:", musicas[indexMusica]);
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
    let minutos = Math.floor(segundos / 60);
    segundos = segundos % 60;
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    return minutos + ":" + segundos;
}

function proximaMusica() {
    indexMusica++;
    if (indexMusica >= musicas.length) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    tocarMusica();
}

// Inicializar a primeira música
renderizarMusica(indexMusica);
