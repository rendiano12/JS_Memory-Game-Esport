const kartu = document.querySelectorAll('.kartu');
const papan = document.querySelectorAll('.papan');
const hasilSkor = document.querySelector('.skor');
const wrongAudio = document.querySelector('.wrong');
const correctAudio = document.querySelector('.correct');
const warningAudio = document.querySelector('.warning');
const progress = document.querySelector('progress');
const container = document.querySelector('.container');
const restart = document.querySelector('.restart');

// variable
let skor = 0;

// array gambar
const arrGambar = ['gambar1', 'gambar2', 'gambar3', 'gambar4', 'gambar5', 'gambar6',
    'gambar1', 'gambar2', 'gambar3', 'gambar4', 'gambar5', 'gambar6'];

// mulai
restart.style.display = 'none';

// acak kartu
function acakRandomKartu() {
    return Math.floor((Math.random() * kartu.length) + 1);
}

papan.forEach(aPapan => {
    aPapan.style.order = acakRandomKartu();
});

// check hasil kartu
let arrCheck = [];
let arrCheckIndex = [];

kartu.forEach(checkKartu);
function checkKartu(cKartu) {
    cKartu.addEventListener('click', bukaKartu);
}

function bukaKartu() {
    const index = this.getAttribute('id');
    arrCheck.push(arrGambar[index]);
    arrCheckIndex.push(index);

    this.classList.replace('kartu', arrGambar[index]);
    this.removeEventListener('click', bukaKartu);
    hasilKartu(kartu, arrCheckIndex[0], arrCheckIndex[1]);
    gameSelesai();
}

function hasilKartu(a1, a2, a3) {
    if (arrCheck.length == 2 && arrCheckIndex.length == 2) {
        if (arrCheck[0] == arrCheck[1]) {
            correctAudio.play();
            setTimeout(() => {
                a1[a2].style.opacity = '50%';
                a1[a3].style.opacity = '50%';
            }, 500);
            skor += 16.6666667;
            hasilSkor.innerText = Math.floor(skor);
            progress.value = Math.floor(skor);
        } else {
            wrongAudio.play();
            setTimeout(() => {
                a1[a2].classList.replace(a1[a2].classList.item(0), 'kartu');
                a1[a3].classList.replace(a1[a3].classList.item(0), 'kartu');
                a1[a2].addEventListener('click', bukaKartu);
                a1[a3].addEventListener('click', bukaKartu);
            }, 500);
        }
        arrCheck = [];
        arrCheckIndex = [];
    }
}

// selesai game
function gameSelesai() {
    if (skor >= 100) {
        setTimeout(() => {
            container.style.display = 'none';
            restart.style.display = 'inherit';
        }, 500);
    }
    restart.addEventListener('click', refreshPage);
}

function refreshPage() {
    skor = 0;
    hasilSkor.innerText = skor;
    progress.value = skor;
    container.style.display = 'grid';
    restart.style.display = 'none';
    for (let i = 0; i < kartu.length; i++) {
        kartu[i].removeAttribute('style');
        kartu[i].classList.replace(kartu[i].classList.item(0), 'kartu');
        kartu[i].addEventListener('click', bukaKartu);
        papan[i].style.order = acakRandomKartu();
    }
}