function toggleConcerts(element) {
  const concerts = element.querySelector('.concerts');
  concerts.classList.toggle('open');
}

function toggleAll(open) {
  document.querySelectorAll('.concerts').forEach(concert => {
    concert.classList.toggle('open', !!open);
  });
}

function clearSearch() {
  document.getElementById('search').value = "";
  searchPieces();
}

// カタカナ→ひらがな
function kanaToHira(str) {
  return str.replace(/[ァ-ヶヷ-ヺ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

// 日本語検索向けの軽量正規化
function normalizeJa(str) {
  if (!str) return "";
  let s = (str.normalize ? str.normalize('NFKC') : str).toLowerCase();
  s = kanaToHira(s);
  s = s.replace(/\s+/g, ''); // 空白類は無視
  return s;
}

// 要素から検索キー（表示テキスト + data-yomi + data-alt-yomi）を収集
function collectKeys(el) {
  const keys = [];
  if (!el) return keys;

  // 画面に見えている文字列もヒット対象（漢字や英字での検索に対応）
  keys.push(normalizeJa(el.textContent || ""));

  // 読み（単一）
  const yomi = el.getAttribute('data-yomi');
  if (yomi) keys.push(normalizeJa(yomi));

  // 代替読みや別名（スペース区切りで複数OK）
  const alt = el.getAttribute('data-alt-yomi');
  if (alt) alt.split(/\s+/).forEach(t => {
    if (t) keys.push(normalizeJa(t));
  });

  return keys.filter(k => k.length > 0);
}

function searchPieces() {
  const raw = document.getElementById('search').value || "";
  const q = normalizeJa(raw);

  const pieces = document.getElementsByClassName('piece');
  for (const piece of pieces) {
    // 曲名（piece-header直下の先頭span）と作曲者
    const titleEl = piece.querySelector('.piece-header > span');
    const composerEl = piece.querySelector('.composer');

    // 両方からキーを集めて検索
    const keys = [
      ...collectKeys(titleEl),
      ...collectKeys(composerEl),
    ];

    const hit = !q || keys.some(k => k.includes(q));
    piece.classList.toggle('hidden', !hit);
  }
}
