//YouTubeプレーヤーの動画を変更するやつ
function changeVideo(videoId, element) {
    // 動画を変更
    document.getElementById('mainPlayer').src = `https://www.youtube.com/embed/${videoId}`;

    // 現在のアクティブなリストアイテムを探してクラスを削除
    const activeItem = document.querySelector('#videoList li.active');
    if (activeItem) {
        activeItem.classList.remove('active');
    }

    // 新しいリストアイテムにアクティブクラスを追加
    element.classList.add('active');

    // 現在表示されているビデオの詳細を削除
    const activeDescription = document.querySelector('.video-description.active');
    if (activeDescription) {
        activeDescription.classList.remove('active')
    }

    // 新しいビデオの詳細を表示
    document.getElementById(videoId).classList.add('active')

    // スクロール
    document.getElementById("top").scrollIntoView({ behavior: "smooth", block: "start" });
}
