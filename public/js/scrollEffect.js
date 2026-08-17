// スクロールした時にarticleが浮き上がってくるアニメーション
// スクロール位置を監視してshowクラスを追加する.
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('scroll', function() {
        const articles = document.querySelectorAll('.section-article');

        articles.forEach(article => {
            const articlePosition = article.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            if (articlePosition < viewportHeight - 300) {
                article.classList.add('show');
            }
        });
    });
});
