window.addEventListener('DOMContentLoaded', function() {
    const secretLink = document.getElementById('secret_aw60');

    const randomNumber = Math.random() * 100; // 0〜100のランダムな数値を生成
    if (randomNumber < 10) { // 10%の確率
        secretLink.style.display = 'inline-block'; // リンクを表示
    }
});
