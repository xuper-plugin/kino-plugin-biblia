// Kino plugin: Biblia en audio
// Audio: WordProject (Reina Valera, one MP3 per chapter) · Text for the lyrics view: bolls.life (RV1960 and other
// Spanish versions), with WordProject's Reina Valera 1909 when bolls.life fails.
// Personal use only: WordProject asks apps not to link the whole audio Bible to its servers.

const AUDIO = "https://www.wordproaudio.net/bibles/app/audio/6";
const TEXT = "https://www.wordproject.org/bibles/sp";
const BOLLS = "https://bolls.life/get-text";
const COVERS = "https://raw.githubusercontent.com/xuper-plugin/kino-plugin-biblia/main/covers";
const bookCover = (b) => `${COVERS}/libro-${b.num}.png`;
const NARRATOR = "Reina Valera";

const VERSIONS = {
  RV1960: "Reina-Valera 1960",
  NVI: "Nueva Versión Internacional",
  NTV: "Nueva Traducción Viviente",
  LBLA: "La Biblia de las Américas",
  PDT: "Palabra de Dios para Todos",
  BTX3: "La Biblia Textual",
  RV2004: "Reina Valera Gómez 2004",
  RV1909: "Reina Valera 1909",
};

// [number, name, chapters, section, short description]
const BOOKS = [
  [1, "Génesis", 50, "ley", "La creación, los patriarcas y el origen del pueblo de Israel."],
  [2, "Éxodo", 40, "ley", "La salida de Egipto, Moisés y los diez mandamientos."],
  [3, "Levítico", 27, "ley", "Las leyes de santidad, los sacrificios y el sacerdocio."],
  [4, "Números", 36, "ley", "Los cuarenta años de Israel en el desierto."],
  [5, "Deuteronomio", 34, "ley", "Los últimos discursos de Moisés antes de entrar a la tierra prometida."],
  [6, "Josué", 24, "historia", "La conquista y el reparto de la tierra prometida."],
  [7, "Jueces", 21, "historia", "Los jueces de Israel: Débora, Gedeón, Sansón."],
  [8, "Rut", 4, "historia", "La lealtad de Rut y su historia con Booz."],
  [9, "1 Samuel", 31, "historia", "Samuel, Saúl y el ascenso de David."],
  [10, "2 Samuel", 24, "historia", "El reinado de David."],
  [11, "1 Reyes", 22, "historia", "Salomón, el templo y la división del reino; el profeta Elías."],
  [12, "2 Reyes", 25, "historia", "Eliseo y la caída de Israel y de Judá."],
  [13, "1 Crónicas", 29, "historia", "Las genealogías y el reinado de David."],
  [14, "2 Crónicas", 36, "historia", "Salomón y los reyes de Judá hasta el exilio."],
  [15, "Esdras", 10, "historia", "El regreso del exilio y la reconstrucción del templo."],
  [16, "Nehemías", 13, "historia", "La reconstrucción de los muros de Jerusalén."],
  [17, "Ester", 10, "historia", "La reina Ester salva a su pueblo."],
  [18, "Job", 42, "poesia", "El sufrimiento del justo y la respuesta de Dios."],
  [19, "Salmos", 150, "poesia", "Los cantos y oraciones de Israel."],
  [20, "Proverbios", 31, "poesia", "Dichos de sabiduría para la vida diaria."],
  [21, "Eclesiastés", 12, "poesia", "Vanidad de vanidades: el sentido de la vida."],
  [22, "Cantares", 8, "poesia", "El Cantar de los Cantares, poema de amor."],
  [23, "Isaías", 66, "mayores", "Profecías de juicio y de esperanza; el siervo sufriente."],
  [24, "Jeremías", 52, "mayores", "El profeta que lloró la caída de Jerusalén."],
  [25, "Lamentaciones", 5, "mayores", "Lamentos por la destrucción de Jerusalén."],
  [26, "Ezequiel", 48, "mayores", "Visiones del profeta en el exilio."],
  [27, "Daniel", 12, "mayores", "Daniel en Babilonia: el foso de los leones y sus visiones."],
  [28, "Oseas", 14, "menores", "El amor fiel de Dios hacia un pueblo infiel."],
  [29, "Joel", 3, "menores", "El día del Señor y el derramamiento del Espíritu."],
  [30, "Amós", 9, "menores", "Justicia para los pobres."],
  [31, "Abdías", 1, "menores", "Profecía contra Edom."],
  [32, "Jonás", 4, "menores", "El profeta, el gran pez y Nínive."],
  [33, "Miqueas", 7, "menores", "Hacer justicia, amar misericordia y humillarse ante Dios."],
  [34, "Nahúm", 3, "menores", "La caída de Nínive."],
  [35, "Habacuc", 3, "menores", "El justo por su fe vivirá."],
  [36, "Sofonías", 3, "menores", "El día del Señor y la restauración."],
  [37, "Hageo", 2, "menores", "Llamado a reconstruir el templo."],
  [38, "Zacarías", 14, "menores", "Visiones y la llegada del rey humilde."],
  [39, "Malaquías", 4, "menores", "El último profeta del Antiguo Testamento."],
  [40, "Mateo", 28, "evangelios", "La vida de Jesús, el Mesías prometido."],
  [41, "Marcos", 16, "evangelios", "El evangelio más breve: Jesús, el siervo."],
  [42, "Lucas", 24, "evangelios", "La vida de Jesús contada en orden por el médico Lucas."],
  [43, "Juan", 21, "evangelios", "Jesús, el Verbo hecho carne."],
  [44, "Hechos", 28, "evangelios", "El nacimiento de la iglesia y los viajes de Pablo."],
  [45, "Romanos", 16, "pablo", "La justificación por la fe."],
  [46, "1 Corintios", 16, "pablo", "Consejos a una iglesia dividida; el capítulo del amor."],
  [47, "2 Corintios", 13, "pablo", "Pablo defiende su ministerio."],
  [48, "Gálatas", 6, "pablo", "La libertad en Cristo."],
  [49, "Efesios", 6, "pablo", "La iglesia, cuerpo de Cristo; la armadura de Dios."],
  [50, "Filipenses", 4, "pablo", "La carta del gozo."],
  [51, "Colosenses", 4, "pablo", "La supremacía de Cristo."],
  [52, "1 Tesalonicenses", 5, "pablo", "Esperanza en la venida del Señor."],
  [53, "2 Tesalonicenses", 3, "pablo", "Firmes mientras llega el día del Señor."],
  [54, "1 Timoteo", 6, "pablo", "Instrucciones a un joven pastor."],
  [55, "2 Timoteo", 4, "pablo", "La última carta de Pablo."],
  [56, "Tito", 3, "pablo", "El orden en las iglesias de Creta."],
  [57, "Filemón", 1, "pablo", "Pablo intercede por el esclavo Onésimo."],
  [58, "Hebreos", 13, "generales", "Cristo, el sumo sacerdote; el capítulo de la fe."],
  [59, "Santiago", 5, "generales", "La fe sin obras es muerta."],
  [60, "1 Pedro", 5, "generales", "Esperanza en medio del sufrimiento."],
  [61, "2 Pedro", 3, "generales", "Contra los falsos maestros."],
  [62, "1 Juan", 5, "generales", "Dios es amor."],
  [63, "2 Juan", 1, "generales", "Andar en la verdad y en el amor."],
  [64, "3 Juan", 1, "generales", "Carta a Gayo sobre la hospitalidad."],
  [65, "Judas", 1, "generales", "Contender por la fe."],
  [66, "Apocalipsis", 22, "generales", "La revelación de Jesucristo y la nueva Jerusalén."],
].map(([num, name, chapters, section, about]) => ({ num, name, chapters, section, about }));

const SECTIONS = [
  ["ley", "Pentateuco"],
  ["historia", "Libros históricos"],
  ["poesia", "Poéticos y sapienciales"],
  ["mayores", "Profetas mayores"],
  ["menores", "Profetas menores"],
  ["evangelios", "Evangelios y Hechos"],
  ["pablo", "Cartas de Pablo"],
  ["generales", "Cartas generales y Apocalipsis"],
];
const SECTION_NAME = Object.fromEntries(SECTIONS);

// [book, chapter, theme]
const FAVORITES = [
  [1, 1, "La creación"],
  [2, 20, "Los diez mandamientos"],
  [19, 23, "El Señor es mi pastor"],
  [19, 91, "El que habita al abrigo del Altísimo"],
  [19, 121, "Alzaré mis ojos a los montes"],
  [20, 3, "Fíate del Señor de todo tu corazón"],
  [23, 53, "El siervo sufriente"],
  [40, 5, "El sermón del monte"],
  [40, 6, "El Padre nuestro"],
  [42, 2, "El nacimiento de Jesús"],
  [42, 15, "El hijo pródigo"],
  [43, 1, "En el principio era el Verbo"],
  [43, 3, "De tal manera amó Dios al mundo"],
  [43, 14, "Yo soy el camino"],
  [45, 8, "Nada nos separará del amor de Dios"],
  [46, 13, "El amor"],
  [49, 6, "La armadura de Dios"],
  [58, 11, "La fe"],
  [66, 21, "Cielo nuevo y tierra nueva"],
];

const byNum = (n) => BOOKS.find((b) => b.num === Number(n));
const testament = (b) => (b.num <= 39 ? "Antiguo Testamento" : "Nuevo Testamento");

// ─── Refs ───────────────────────────────────────────────────────────────────
// Book: book:{num}   Chapter: chap:{num}:{chapter}

function parseRef(ref) {
  const [kind, num, chapter] = String(ref || "").split(":");
  const book = byNum(num);
  if (!book || (kind !== "book" && kind !== "chap")) return null;
  const ch = Number(chapter);
  if (kind === "chap" && !(Number.isInteger(ch) && ch >= 1 && ch <= book.chapters)) return null;
  return { kind, book, chapter: kind === "chap" ? ch : null };
}

// ─── Items ──────────────────────────────────────────────────────────────────

function bookItem(b) {
  return {
    id: `libro-${b.num}`,
    ref: `book:${b.num}`,
    title: b.name,
    kind: "podcast",
    artist: NARRATOR,
    poster: bookCover(b),
    overview: `${b.about} ${b.chapters === 1 ? "1 capítulo" : `${b.chapters} capítulos`} · ${testament(b)}.`,
    genres: [testament(b), SECTION_NAME[b.section]],
    lang: "es",
  };
}

function chapterItem(b, chapter, theme) {
  return {
    id: `cap-${b.num}-${chapter}`,
    ref: `chap:${b.num}:${chapter}`,
    title: theme || `${b.name} ${chapter}`,
    kind: "podcast",
    artist: `${b.name} ${chapter}`,
    // Favorites have their own cover; any other chapter shows its book's.
    poster: theme ? `${COVERS}/cap-${b.num}-${chapter}.png` : bookCover(b),
    overview: `${b.name}, capítulo ${chapter}. ${b.about}`,
    genres: [testament(b), SECTION_NAME[b.section]],
    lang: "es",
  };
}

const favoriteItems = () => FAVORITES.map(([n, c, theme]) => chapterItem(byNum(n), c, theme));

// ─── Finding a book in free text ("juan 3", "Salmo 23", "1 Co 13", "Génesis capítulo 1") ─────

const norm = (s) =>
  String(s || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\b(iii|ii|i)\s+(?=[a-z])/g, (m, r) => `${r.length} `)
    .replace(/(\d)\s*(?=[a-z])/g, "$1 ")
    .replace(/[^a-z0-9: ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const EXTRA_NAMES = {
  19: ["salmo"],
  22: ["cantar de los cantares", "cantares de salomon"],
  34: ["nahum"],
  37: ["haggeo"],
  44: ["hechos de los apostoles"],
  66: ["revelacion"],
};

const NAMES = BOOKS.flatMap((b) => [norm(b.name), ...(EXTRA_NAMES[b.num] || [])].map((n) => ({ n, b })))
  .sort((x, y) => y.n.length - x.n.length);

/** Abbreviations of 2+ letters that point to one book only ("gen", "1 co", "apoc"). */
function byPrefix(word, digit) {
  const hits = BOOKS.filter((b) => {
    const n = norm(b.name);
    const [lead, rest] = /^\d /.test(n) ? [n[0], n.slice(2)] : ["", n];
    return lead === (digit || "") && rest.startsWith(word);
  });
  return hits.length === 1 ? hits[0] : null;
}

/** { book, chapter? } named in the text, or null. */
function findPassage(text) {
  const s = ` ${norm(text)} `;
  let book = null;
  let after = "";
  for (const { n, b } of NAMES) {
    const at = s.indexOf(` ${n} `);
    if (at !== -1) { book = b; after = s.slice(at + n.length + 1); break; }
  }
  if (!book) {
    const m = /^ (?:(\d) )?([a-z]{2,}) ?(.*)$/.exec(s);
    if (m) { book = byPrefix(m[2], m[1]); after = m[3]; }
  }
  if (!book) return null;
  const ch = Number(/\d+/.exec(after.replace(/\bcapitulo\b/g, ""))?.[0]);
  return { book, chapter: Number.isInteger(ch) && ch >= 1 && ch <= book.chapters ? ch : null };
}

// ─── Catalog ────────────────────────────────────────────────────────────────

export async function home() {
  return [
    { id: "favoritos", title: "Pasajes favoritos", items: favoriteItems() },
    { id: "antiguo", title: "Antiguo Testamento", items: BOOKS.filter((b) => b.num <= 39).map(bookItem) },
    { id: "nuevo", title: "Nuevo Testamento", items: BOOKS.filter((b) => b.num >= 40).map(bookItem) },
    ...SECTIONS.map(([key, title]) => ({ id: key, title, items: BOOKS.filter((b) => b.section === key).map(bookItem) })),
  ];
}

export async function search(query) {
  const raw = typeof query === "string" ? query : (query && query.q) || "";
  const q = norm(raw);
  if (!q) return [];

  const out = [];
  const passage = findPassage(raw);
  if (passage?.chapter) out.push(chapterItem(passage.book, passage.chapter));
  if (passage) out.push(bookItem(passage.book));

  for (const [n, c, theme] of FAVORITES) {
    if (norm(theme).includes(q)) out.push(chapterItem(byNum(n), c, theme));
  }
  for (const b of BOOKS) {
    const hay = norm(`${b.name} ${b.about} ${SECTION_NAME[b.section]} ${testament(b)}`);
    if (q.split(" ").every((w) => hay.includes(w))) out.push(bookItem(b));
  }

  const seen = new Set();
  return out.filter((it) => !seen.has(it.id) && seen.add(it.id)).slice(0, 100);
}

function chapterEpisode(b, chapter, title) {
  return {
    season: 1,
    number: chapter,
    ref: `chap:${b.num}:${chapter}`,
    title: title || `${b.name} ${chapter}`,
    still: bookCover(b),
  };
}

export async function episodes(ref) {
  const r = parseRef(ref);
  if (!r) throw kino.error("not_found", `unknown ref ${ref}`, { userMessage: "No encontré ese libro." });
  const { book: b } = r;
  const series = {
    title: r.kind === "chap" ? `${b.name} ${r.chapter}` : b.name,
    poster: bookCover(b),
    overview: b.about,
    genres: [testament(b), SECTION_NAME[b.section]],
  };
  if (r.kind === "chap") return { series, episodes: [chapterEpisode(b, r.chapter)] };
  return {
    series,
    episodes: Array.from({ length: b.chapters }, (_, i) => chapterEpisode(b, i + 1)),
  };
}

// ─── Playback ───────────────────────────────────────────────────────────────

export async function resolve(ref) {
  const r = parseRef(ref);
  if (!r) throw kino.error("not_found", `unknown ref ${ref}`, { userMessage: "No encontré ese capítulo." });
  // A whole book plays from its first chapter.
  const chapter = r.chapter || 1;
  return {
    url: `${AUDIO}/${r.book.num}/${chapter}.mp3`,
    mime: "audio/mpeg",
    label: NARRATOR,
  };
}

// ─── Lyrics: the chapter's text ─────────────────────────────────────────────

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
    e[0] === "#"
      ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1)))
      : ENTITIES[e.toLowerCase()] ?? m);

const clean = (s) => decode(String(s).replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/** [{ n, text }] from bolls.life, which numbers books 1-66 like WordProject. */
async function bollsVerses(version, b, chapter) {
  const res = await kino.fetch(`${BOLLS}/${version}/${b.num}/${chapter}/`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw kino.error("unavailable", `bolls ${res.status}`);
  const list = await res.json();
  return (Array.isArray(list) ? list : [])
    .map((v) => ({ n: Number(v.verse), text: clean(v.text) }))
    .filter((v) => v.n > 0 && v.text);
}

/** [{ n, text }] for one chapter. WordProject comments out verse 1's marker, so it is matched separately. */
async function wordprojectVerses(b, chapter) {
  const res = await kino.fetch(`${TEXT}/${String(b.num).padStart(2, "0")}/${chapter}.htm`);
  if (!res.ok) throw kino.error("unavailable", `text ${res.status}`);
  const html = await res.text();
  const start = html.indexOf('id="textBody"');
  const end = html.indexOf("<!-- /textBody -->", start);
  const body = start === -1 ? html : html.slice(start, end === -1 ? undefined : end);

  const verses = [];
  const re = /(?:<!--\s*span class="verse" id="1">\s*1\s*<\/span\s*-->|<span class="verse" id="(\d+)">\s*\d+\s*<\/span>)([\s\S]*?)(?=<br\s*\/?>|<\/p>|<!--\s*span class="verse"|<span class="verse")/g;
  for (let m; (m = re.exec(body)); ) {
    const text = clean(m[2]);
    if (text) verses.push({ n: m[1] ? Number(m[1]) : 1, text });
  }
  return verses;
}

/** { verses, label } in the chosen version, falling back to WordProject's 1909 text. */
async function chapterText(b, chapter) {
  const chosen = kino.config.get("textVersion");
  const version = VERSIONS[chosen] ? chosen : "RV1960";
  if (version !== "RV1909") {
    try {
      const verses = await bollsVerses(version, b, chapter);
      if (verses.length) return { verses, label: VERSIONS[version] };
    } catch (err) {
      kino.log("[biblia] bolls failed:", err?.code || err?.message);
    }
  }
  return { verses: await wordprojectVerses(b, chapter), label: VERSIONS.RV1909 };
}

export async function lyrics(query) {
  const passage =
    findPassage(query?.title) ||
    findPassage(`${query?.artist || ""} ${query?.title || ""}`) ||
    findPassage(`${query?.album || ""} ${query?.title || ""}`);
  if (!passage) return null;
  const chapter = passage.chapter || 1;

  const { verses, label } = await chapterText(passage.book, chapter);
  if (!verses.length) return null;

  const numbered = kino.config.get("verseNumbers") !== false;
  const lines = verses.map((v) => (numbered ? `${v.n} ${v.text}` : v.text));
  const out = { plain: `${passage.book.name} ${chapter}\n\n${lines.join("\n")}`.slice(0, 20000), label };

  // Estimated timing: the reading pace is steady, so each verse gets time in proportion to its length.
  const dur = Number(query?.durationMs);
  if (kino.config.get("syncedText") === true && dur > 0) {
    const intro = Math.min(4000, dur * 0.03);
    const total = lines.reduce((sum, l) => sum + l.length, 0) || 1;
    let at = intro;
    out.synced = lines.slice(0, 800).map((text) => {
      const line = { ms: Math.round(at), text: text.slice(0, 300) };
      at += ((dur - intro) * text.length) / total;
      return line;
    });
    out.matchDurationMs = dur;
  }
  return out;
}
