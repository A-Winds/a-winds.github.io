document.getElementById('toggleButton').addEventListener('click', function() {
    const div = document.getElementById('toggleDiv');
    div.classList.toggle('show');  // CSSクラスの切り替え
    if (div.classList.contains('show')) {
        this.textContent = '募集パートを非表示';
    } else {
        this.textContent = '募集パートを表示';
    }
});