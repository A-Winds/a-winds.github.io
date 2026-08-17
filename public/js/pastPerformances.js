const pieces = [...document.querySelectorAll(".piece")].map((element) => {
  let keys = [];

  try {
    keys = JSON.parse(element.dataset.search || "[]");
  } catch {
    keys = [];
  }

  return {
    element,
    concerts: element.querySelector(".concerts"),
    keys: keys.map(normalizeJa).filter(Boolean),
  };
});

function kanaToHira(str) {
  return str.replace(/[ァ-ヶヷ-ヺ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

function numberToHira(num) {
  const n = Number(num);
  if (!Number.isInteger(n) || n < 0 || n > 9999) return String(num);
  if (n === 0) return "ぜろ";

  const ones = ["", "いち", "に", "さん", "よん", "ご", "ろく", "なな", "はち", "きゅう"];

  let result = "";
  const thousands = Math.floor(n / 1000);
  const hundreds = Math.floor((n % 1000) / 100);
  const tens = Math.floor((n % 100) / 10);
  const units = n % 10;

  if (thousands) {
    if (thousands === 1) result += "せん";
    else if (thousands === 3) result += "さんぜん";
    else if (thousands === 8) result += "はっせん";
    else result += ones[thousands] + "せん";
  }

  if (hundreds) {
    if (hundreds === 1) result += "ひゃく";
    else if (hundreds === 3) result += "さんびゃく";
    else if (hundreds === 6) result += "ろっぴゃく";
    else if (hundreds === 8) result += "はっぴゃく";
    else result += ones[hundreds] + "ひゃく";
  }

  if (tens) {
    if (tens === 1) result += "じゅう";
    else result += ones[tens] + "じゅう";
  }

  result += ones[units];

  return result;
}

function normalizeJa(str) {
  if (!str) return "";

  let s = str.normalize("NFKC").toLowerCase();
  s = kanaToHira(s);

  s = s.replace(/\d+/g, (num) => numberToHira(num));

  s = s
    .replace(/ゔぁ/g, "ば")
    .replace(/ゔぃ/g, "び")
    .replace(/ゔぇ/g, "べ")
    .replace(/ゔぉ/g, "ぼ")
    .replace(/ゔ/g, "ぶ")
    .replace(/つぃ/g, "ち")
    .replace(/すぃ/g, "し")
    .replace(/ずぃ/g, "じ")
    .replace(/ぁ/g, "あ")
    .replace(/ぃ/g, "い")
    .replace(/ぅ/g, "う")
    .replace(/ぇ/g, "え")
    .replace(/ぉ/g, "お")
    .replace(/ゃ/g, "や")
    .replace(/ゅ/g, "ゆ")
    .replace(/ょ/g, "よ")
    .replace(/っ/g, "つ")
    .replace(/ゎ/g, "わ")
    .replace(/ゕ/g, "か")
    .replace(/ゖ/g, "け")
    .replace(/ぢ/g, "じ")
    .replace(/づ/g, "ず")
    .replace(/ゐ/g, "い")
    .replace(/ゑ/g, "え")
    .replace(/[ーｰ]/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "");
  

  return s;
}

function splitQuery(str) {
  const normalized = normalizeJa(str);

  if (!normalized) return [];

  return normalized.match(
    /\p{Script=Han}+|\p{Script=Hiragana}+|[a-z0-9]+/gu
  ) ?? [normalized];
}

function bigrams(str) {
  const result = [];

  for (let i = 0; i < str.length - 1; i++) {
    result.push(str.slice(i, i + 2));
  }

  return result;
}

function fuzzyIncludes(query, key) {
  if (key.includes(query)) return true;

  if (query.length < 4) return false;

  const grams = bigrams(query);

  if (grams.length === 0) return false;

  let matches = 0;

  for (const gram of grams) {
    if (key.includes(gram)) matches++;
  }

  return matches / grams.length >= 0.5;
}

function searchPieces() {
  const raw = document.getElementById("search").value;
  const tokens = splitQuery(raw);

  for (const piece of pieces) {
    const hit =
      tokens.length === 0 ||
      tokens.every((token) =>
        piece.keys.some((key) => fuzzyIncludes(token, key))
      );

    piece.element.classList.toggle("hidden", !hit);
  }
}

function setOpen(piece, open) {
  if (!piece.concerts) return;
  piece.concerts.classList.toggle("open", open);
}

for (const piece of pieces) {
  const header = piece.element.querySelector(".piece-header");

  header?.addEventListener("click", () => {
    if (!piece.concerts) return;
    piece.concerts.classList.toggle("open");
  });
}

document.getElementById("search")?.addEventListener("input", searchPieces);

document.getElementById("clear-search")?.addEventListener("click", () => {
  document.getElementById("search").value = "";
  searchPieces();
});

document.getElementById("open-all")?.addEventListener("click", () => {
  pieces.forEach((piece) => setOpen(piece, true));
});

document.getElementById("close-all")?.addEventListener("click", () => {
  pieces.forEach((piece) => setOpen(piece, false));
});
