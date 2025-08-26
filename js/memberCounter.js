document.addEventListener("DOMContentLoaded", function() {
    // currentクラスをすべて取得
    const currentElements = document.querySelectorAll(".part-table .current");

    let total = 0;
    currentElements.forEach(el => {
        const num = parseInt(el.textContent, 10);
        if (!isNaN(num)) {
            total += num;
        }
    });

    // 最後の行の "計◯名" を書き換え
    const totalElement = document.querySelector(".part-table:last-child .current");
    if (totalElement) {
        totalElement.textContent = `計${total}名`;
    }
});
