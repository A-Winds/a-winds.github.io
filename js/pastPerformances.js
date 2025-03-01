function toggleConcerts(element) {
    let concerts = element.querySelector('.concerts');
    concerts.classList.toggle('open');
}

function toggleAll(open) {
    let concerts = document.querySelectorAll('.concerts');
    concerts.forEach(concert => {
        if (open) {
            concert.classList.add('open');
        } else {
            concert.classList.remove('open');
        }
    });
}

function clearSearch() {
    document.getElementById('search').value = "";
    searchPieces();
}

function kanaToHira(str) {
    return str.replace(/[ァ-ヺ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

function searchPieces() {
    let input = document.getElementById('search').value.toLowerCase();
    let inputHiragana = kanaToHira(input);
    let pieces = document.getElementsByClassName('piece');
    
    for (let piece of pieces) {
        let title = piece.querySelector('.piece-header span').textContent.toLowerCase();
        let composer = piece.querySelector('.composer').textContent.toLowerCase();
        
        let titleHiragana = kanaToHira(title);
        let composerHiragana = kanaToHira(composer);
        
        if (title.includes(input) || composer.includes(input) || titleHiragana.includes(inputHiragana) || composerHiragana.includes(inputHiragana)) {
            piece.classList.remove('hidden');
        } else {
            piece.classList.add('hidden');
        }
    }
}
