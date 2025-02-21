document.addEventListener('DOMContentLoaded', () => {
    let musicas = [
        {
            titulo: 'CORAÇÃO PARTIDO - ELA JOGA NO 7',
            artista: 'Netto Britto',
            src: '11 - CORAÇÃO PARTIDO - ELA JOGA NO 7.mp3',
            img: 'andrew-varnum-nbdVeCABFeU-unsplash.jpg'
        },
        {
            titulo: 'VOCÊ NÃO VER',
            artista: 'Netto Britto',
            src: '02 - VOCÊ NÃO VÊ - LÁBIOS DIVIDIDOS.mp3',
            img: 'kenny-gaines-U-d828ayEdw-unsplash.jpg'
        },
        {
            titulo: 'DEPOIS DE MIM',
            artista: 'Netto Britto',
            src: '12 - DEPOIS DE MIM.mp3',
            img: 'kenny-gaines-YScLVuOv7nU-unsplash.jpg'
        }
    ];

    let musica = document.querySelector('audio');
    let indexMusica = 0;

    let duracaoMusica = document.querySelector('.fim');
    let imagem = document.querySelector('img');
    let nomeMusica = document.querySelector('.descricao h2');
    let nomeArtista = document.querySelector('.descricao i');

    renderizarMusica(indexMusica);

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

    function renderizarMusica(index) {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        musica.src = musicas[index].src;

        musica.addEventListener('loadedmetadata', () => {
            duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
        });
    }

    function tocarMusica() {
        musica.play();
        document.querySelector('.botao-pause').style.display = 'block';
        document.querySelector('.botao-play').style.display = 'none';
    }

    function pausarMusica() {
        musica.pause();
        document.querySelector('.botao-pause').style.display = 'none';
        document.querySelector('.botao-play').style.display = 'block';
    }

    function atualizarBarra() {
        let barra = document.querySelector('progress');
        barra.value = musica.currentTime / musica.duration;
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
});
