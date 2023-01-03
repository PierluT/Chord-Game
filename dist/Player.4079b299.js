// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/collisionBlock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collisionBlock = void 0;
var _script = require("./script.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var collisionBlock = /*#__PURE__*/function () {
  //poi la dovrò settare random
  function collisionBlock() {
    _classCallCheck(this, collisionBlock);
    this.width = 200;
    this.height = 90;
    this.position = {
      x: Math.random() * (_script.canvas.width - this.width),
      y: 0
    };
    this.velocity = {
      x: 0,
      y: 2
    };
    //booleano per collisione
    this.markedToCollision = false;
    this.chord = _script.chordSignature;
    this.image = new Image();
    this.image.src = _script.scrImages[Math.floor(Math.random() * _script.scrImages.length)];
  }
  _createClass(collisionBlock, [{
    key: "draw",
    value: function draw() {
      _script.c.beginPath();
      //serve?
      _script.c.strokeRect(this.position.x, this.position.y, this.width, this.height);
      _script.c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
      //inserico la sigla sopra al blocco 
      _script.c.fillText(this.chord, this.position.x + 50 + _script.textWidth / 2, this.position.y);
    }
  }, {
    key: "update",
    value: function update() {
      //se io premo sulla tastiera i blocchi cominciano a scendere
      if (_script.primaNota == true) {
        //comincia a scendere
        this.position.y += this.velocity.y;
        if (this.position.y > 750) {
          //this.markedToDelete = true; 
          _script.chordBlockArray.shift();
        }
      }
    }
  }, {
    key: "disappearChord",
    value: function disappearChord() {
      this.chord = "";
    }
  }]);
  return collisionBlock;
}();
exports.collisionBlock = collisionBlock;
},{"./script.js":"js/script.js"}],"node_modules/@tonaljs/core/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.altToAcc = exports.accToAlt = void 0;
exports.coordToInterval = coordToInterval;
exports.coordToNote = coordToNote;
exports.decode = decode;
exports.deprecate = deprecate;
exports.distance = distance;
exports.encode = encode;
exports.fillStr = void 0;
exports.interval = interval;
exports.isNamed = isNamed;
exports.isPitch = isPitch;
exports.note = note;
exports.stepToLetter = void 0;
exports.tokenizeInterval = tokenizeInterval;
exports.tokenizeNote = tokenizeNote;
exports.transpose = transpose;
// src/utils.ts
var fillStr = (s, n) => Array(Math.abs(n) + 1).join(s);
exports.fillStr = fillStr;
function deprecate(original, alternative, fn) {
  return function (...args) {
    console.warn(`${original} is deprecated. Use ${alternative}.`);
    return fn.apply(this, args);
  };
}

// src/named.ts
function isNamed(src) {
  return src !== null && typeof src === "object" && typeof src.name === "string" ? true : false;
}

// src/pitch.ts
function isPitch(pitch) {
  return pitch !== null && typeof pitch === "object" && typeof pitch.step === "number" && typeof pitch.alt === "number" ? true : false;
}
var FIFTHS = [0, 2, 4, -1, 1, 3, 5];
var STEPS_TO_OCTS = FIFTHS.map(fifths => Math.floor(fifths * 7 / 12));
function encode(pitch) {
  const {
    step,
    alt,
    oct,
    dir = 1
  } = pitch;
  const f = FIFTHS[step] + 7 * alt;
  if (oct === void 0) {
    return [dir * f];
  }
  const o = oct - STEPS_TO_OCTS[step] - 4 * alt;
  return [dir * f, dir * o];
}
var FIFTHS_TO_STEPS = [3, 0, 4, 1, 5, 2, 6];
function decode(coord) {
  const [f, o, dir] = coord;
  const step = FIFTHS_TO_STEPS[unaltered(f)];
  const alt = Math.floor((f + 1) / 7);
  if (o === void 0) {
    return {
      step,
      alt,
      dir
    };
  }
  const oct = o + 4 * alt + STEPS_TO_OCTS[step];
  return {
    step,
    alt,
    oct,
    dir
  };
}
function unaltered(f) {
  const i = (f + 1) % 7;
  return i < 0 ? 7 + i : i;
}

// src/note.ts
var NoNote = {
  empty: true,
  name: "",
  pc: "",
  acc: ""
};
var cache = /* @__PURE__ */new Map();
var stepToLetter = step => "CDEFGAB".charAt(step);
exports.stepToLetter = stepToLetter;
var altToAcc = alt => alt < 0 ? fillStr("b", -alt) : fillStr("#", alt);
exports.altToAcc = altToAcc;
var accToAlt = acc => acc[0] === "b" ? -acc.length : acc.length;
exports.accToAlt = accToAlt;
function note(src) {
  const stringSrc = JSON.stringify(src);
  const cached = cache.get(stringSrc);
  if (cached) {
    return cached;
  }
  const value = typeof src === "string" ? parse(src) : isPitch(src) ? note(pitchName(src)) : isNamed(src) ? note(src.name) : NoNote;
  cache.set(stringSrc, value);
  return value;
}
var REGEX = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
function tokenizeNote(str) {
  const m = REGEX.exec(str);
  return [m[1].toUpperCase(), m[2].replace(/x/g, "##"), m[3], m[4]];
}
function coordToNote(noteCoord) {
  return note(decode(noteCoord));
}
var mod = (n, m) => (n % m + m) % m;
var SEMI = [0, 2, 4, 5, 7, 9, 11];
function parse(noteName) {
  const tokens = tokenizeNote(noteName);
  if (tokens[0] === "" || tokens[3] !== "") {
    return NoNote;
  }
  const letter = tokens[0];
  const acc = tokens[1];
  const octStr = tokens[2];
  const step = (letter.charCodeAt(0) + 3) % 7;
  const alt = accToAlt(acc);
  const oct = octStr.length ? +octStr : void 0;
  const coord = encode({
    step,
    alt,
    oct
  });
  const name = letter + acc + octStr;
  const pc = letter + acc;
  const chroma = (SEMI[step] + alt + 120) % 12;
  const height = oct === void 0 ? mod(SEMI[step] + alt, 12) - 12 * 99 : SEMI[step] + alt + 12 * (oct + 1);
  const midi = height >= 0 && height <= 127 ? height : null;
  const freq = oct === void 0 ? null : Math.pow(2, (height - 69) / 12) * 440;
  return {
    empty: false,
    acc,
    alt,
    chroma,
    coord,
    freq,
    height,
    letter,
    midi,
    name,
    oct,
    pc,
    step
  };
}
function pitchName(props) {
  const {
    step,
    alt,
    oct
  } = props;
  const letter = stepToLetter(step);
  if (!letter) {
    return "";
  }
  const pc = letter + altToAcc(alt);
  return oct || oct === 0 ? pc + oct : pc;
}

// src/interval.ts
var NoInterval = {
  empty: true,
  name: "",
  acc: ""
};
var INTERVAL_TONAL_REGEX = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
var INTERVAL_SHORTHAND_REGEX = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
var REGEX2 = new RegExp("^" + INTERVAL_TONAL_REGEX + "|" + INTERVAL_SHORTHAND_REGEX + "$");
function tokenizeInterval(str) {
  const m = REGEX2.exec(`${str}`);
  if (m === null) {
    return ["", ""];
  }
  return m[1] ? [m[1], m[2]] : [m[4], m[3]];
}
var cache2 = {};
function interval(src) {
  return typeof src === "string" ? cache2[src] || (cache2[src] = parse2(src)) : isPitch(src) ? interval(pitchName2(src)) : isNamed(src) ? interval(src.name) : NoInterval;
}
var SIZES = [0, 2, 4, 5, 7, 9, 11];
var TYPES = "PMMPPMM";
function parse2(str) {
  const tokens = tokenizeInterval(str);
  if (tokens[0] === "") {
    return NoInterval;
  }
  const num = +tokens[0];
  const q = tokens[1];
  const step = (Math.abs(num) - 1) % 7;
  const t = TYPES[step];
  if (t === "M" && q === "P") {
    return NoInterval;
  }
  const type = t === "M" ? "majorable" : "perfectable";
  const name = "" + num + q;
  const dir = num < 0 ? -1 : 1;
  const simple = num === 8 || num === -8 ? num : dir * (step + 1);
  const alt = qToAlt(type, q);
  const oct = Math.floor((Math.abs(num) - 1) / 7);
  const semitones = dir * (SIZES[step] + alt + 12 * oct);
  const chroma = (dir * (SIZES[step] + alt) % 12 + 12) % 12;
  const coord = encode({
    step,
    alt,
    oct,
    dir
  });
  return {
    empty: false,
    name,
    num,
    q,
    step,
    alt,
    dir,
    type,
    simple,
    semitones,
    chroma,
    coord,
    oct
  };
}
function coordToInterval(coord, forceDescending) {
  const [f, o = 0] = coord;
  const isDescending = f * 7 + o * 12 < 0;
  const ivl = forceDescending || isDescending ? [-f, -o, -1] : [f, o, 1];
  return interval(decode(ivl));
}
function qToAlt(type, q) {
  return q === "M" && type === "majorable" || q === "P" && type === "perfectable" ? 0 : q === "m" && type === "majorable" ? -1 : /^A+$/.test(q) ? q.length : /^d+$/.test(q) ? -1 * (type === "perfectable" ? q.length : q.length + 1) : 0;
}
function pitchName2(props) {
  const {
    step,
    alt,
    oct = 0,
    dir
  } = props;
  if (!dir) {
    return "";
  }
  const calcNum = step + 1 + 7 * oct;
  const num = calcNum === 0 ? step + 1 : calcNum;
  const d = dir < 0 ? "-" : "";
  const type = TYPES[step] === "M" ? "majorable" : "perfectable";
  const name = d + num + altToQ(type, alt);
  return name;
}
function altToQ(type, alt) {
  if (alt === 0) {
    return type === "majorable" ? "M" : "P";
  } else if (alt === -1 && type === "majorable") {
    return "m";
  } else if (alt > 0) {
    return fillStr("A", alt);
  } else {
    return fillStr("d", type === "perfectable" ? alt : alt + 1);
  }
}

// src/distance.ts
function transpose(noteName, intervalName) {
  const note2 = note(noteName);
  const interval2 = interval(intervalName);
  if (note2.empty || interval2.empty) {
    return "";
  }
  const noteCoord = note2.coord;
  const intervalCoord = interval2.coord;
  const tr = noteCoord.length === 1 ? [noteCoord[0] + intervalCoord[0]] : [noteCoord[0] + intervalCoord[0], noteCoord[1] + intervalCoord[1]];
  return coordToNote(tr).name;
}
function distance(fromNote, toNote) {
  const from = note(fromNote);
  const to = note(toNote);
  if (from.empty || to.empty) {
    return "";
  }
  const fcoord = from.coord;
  const tcoord = to.coord;
  const fifths = tcoord[0] - fcoord[0];
  const octs = fcoord.length === 2 && tcoord.length === 2 ? tcoord[1] - fcoord[1] : -Math.floor(fifths * 7 / 12);
  const forceDescending = to.height === from.height && to.midi !== null && from.midi !== null && from.step > to.step;
  return coordToInterval([fifths, octs], forceDescending).name;
}
},{}],"node_modules/@tonaljs/abc-notation/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abcToScientificNotation = abcToScientificNotation;
exports.default = void 0;
exports.distance = distance;
exports.scientificToAbcNotation = scientificToAbcNotation;
exports.tokenize = tokenize;
exports.transpose = transpose;
var _core = require("@tonaljs/core");
// index.ts

var fillStr = (character, times) => Array(times + 1).join(character);
var REGEX = /^(_{1,}|=|\^{1,}|)([abcdefgABCDEFG])([,']*)$/;
function tokenize(str) {
  const m = REGEX.exec(str);
  if (!m) {
    return ["", "", ""];
  }
  return [m[1], m[2], m[3]];
}
function abcToScientificNotation(str) {
  const [acc, letter, oct] = tokenize(str);
  if (letter === "") {
    return "";
  }
  let o = 4;
  for (let i = 0; i < oct.length; i++) {
    o += oct.charAt(i) === "," ? -1 : 1;
  }
  const a = acc[0] === "_" ? acc.replace(/_/g, "b") : acc[0] === "^" ? acc.replace(/\^/g, "#") : "";
  return letter.charCodeAt(0) > 96 ? letter.toUpperCase() + a + (o + 1) : letter + a + o;
}
function scientificToAbcNotation(str) {
  const n = (0, _core.note)(str);
  if (n.empty || !n.oct && n.oct !== 0) {
    return "";
  }
  const {
    letter,
    acc,
    oct
  } = n;
  const a = acc[0] === "b" ? acc.replace(/b/g, "_") : acc.replace(/#/g, "^");
  const l = oct > 4 ? letter.toLowerCase() : letter;
  const o = oct === 5 ? "" : oct > 4 ? fillStr("'", oct - 5) : fillStr(",", 4 - oct);
  return a + l + o;
}
function transpose(note2, interval) {
  return scientificToAbcNotation((0, _core.transpose)(abcToScientificNotation(note2), interval));
}
function distance(from, to) {
  return (0, _core.distance)(abcToScientificNotation(from), abcToScientificNotation(to));
}
var abc_notation_default = {
  abcToScientificNotation,
  scientificToAbcNotation,
  tokenize,
  transpose,
  distance
};
exports.default = abc_notation_default;
},{"@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs"}],"node_modules/@tonaljs/array/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compact = compact;
exports.permutations = permutations;
exports.range = range;
exports.rotate = rotate;
exports.shuffle = shuffle;
exports.sortedNoteNames = sortedNoteNames;
exports.sortedUniqNoteNames = sortedUniqNoteNames;
var _core = require("@tonaljs/core");
// index.ts

var isArray = Array.isArray;
function ascR(b, n) {
  const a = [];
  for (; n--; a[n] = n + b);
  return a;
}
function descR(b, n) {
  const a = [];
  for (; n--; a[n] = b - n);
  return a;
}
function range(from, to) {
  return from < to ? ascR(from, to - from + 1) : descR(from, from - to + 1);
}
function rotate(times, arr) {
  const len = arr.length;
  const n = (times % len + len) % len;
  return arr.slice(n, len).concat(arr.slice(0, n));
}
function compact(arr) {
  return arr.filter(n => n === 0 || n);
}
function sortedNoteNames(notes) {
  const valid = notes.map(n => (0, _core.note)(n)).filter(n => !n.empty);
  return valid.sort((a, b) => a.height - b.height).map(n => n.name);
}
function sortedUniqNoteNames(arr) {
  return sortedNoteNames(arr).filter((n, i, a) => i === 0 || n !== a[i - 1]);
}
function shuffle(arr, rnd = Math.random) {
  let i;
  let t;
  let m = arr.length;
  while (m) {
    i = Math.floor(rnd() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}
function permutations(arr) {
  if (arr.length === 0) {
    return [[]];
  }
  return permutations(arr.slice(1)).reduce((acc, perm) => {
    return acc.concat(arr.map((e, pos) => {
      const newPerm = perm.slice();
      newPerm.splice(pos, 0, arr[0]);
      return newPerm;
    }));
  }, []);
}
},{"@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs"}],"node_modules/@tonaljs/collection/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compact = compact;
exports.default = void 0;
exports.permutations = permutations;
exports.range = range;
exports.rotate = rotate;
exports.shuffle = shuffle;
// index.ts
function ascR(b, n) {
  const a = [];
  for (; n--; a[n] = n + b);
  return a;
}
function descR(b, n) {
  const a = [];
  for (; n--; a[n] = b - n);
  return a;
}
function range(from, to) {
  return from < to ? ascR(from, to - from + 1) : descR(from, from - to + 1);
}
function rotate(times, arr) {
  const len = arr.length;
  const n = (times % len + len) % len;
  return arr.slice(n, len).concat(arr.slice(0, n));
}
function compact(arr) {
  return arr.filter(n => n === 0 || n);
}
function shuffle(arr, rnd = Math.random) {
  let i;
  let t;
  let m = arr.length;
  while (m) {
    i = Math.floor(rnd() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}
function permutations(arr) {
  if (arr.length === 0) {
    return [[]];
  }
  return permutations(arr.slice(1)).reduce((acc, perm) => {
    return acc.concat(arr.map((e, pos) => {
      const newPerm = perm.slice();
      newPerm.splice(pos, 0, arr[0]);
      return newPerm;
    }));
  }, []);
}
var collection_default = {
  compact,
  permutations,
  range,
  rotate,
  shuffle
};
exports.default = collection_default;
},{}],"node_modules/@tonaljs/pcset/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyPcset = void 0;
exports.chromaToIntervals = chromaToIntervals;
exports.chromas = chromas;
exports.default = void 0;
exports.filter = filter;
exports.get = get;
exports.includes = void 0;
exports.isEqual = isEqual;
exports.isNoteIncludedIn = isNoteIncludedIn;
exports.isSubsetOf = isSubsetOf;
exports.isSupersetOf = isSupersetOf;
exports.modes = modes;
exports.pcset = void 0;
var _collection = require("@tonaljs/collection");
var _core = require("@tonaljs/core");
// index.ts

var EmptyPcset = {
  empty: true,
  name: "",
  setNum: 0,
  chroma: "000000000000",
  normalized: "000000000000",
  intervals: []
};
exports.EmptyPcset = EmptyPcset;
var setNumToChroma = num2 => Number(num2).toString(2);
var chromaToNumber = chroma2 => parseInt(chroma2, 2);
var REGEX = /^[01]{12}$/;
function isChroma(set) {
  return REGEX.test(set);
}
var isPcsetNum = set => typeof set === "number" && set >= 0 && set <= 4095;
var isPcset = set => set && isChroma(set.chroma);
var cache = {
  [EmptyPcset.chroma]: EmptyPcset
};
function get(src) {
  const chroma2 = isChroma(src) ? src : isPcsetNum(src) ? setNumToChroma(src) : Array.isArray(src) ? listToChroma(src) : isPcset(src) ? src.chroma : EmptyPcset.chroma;
  return cache[chroma2] = cache[chroma2] || chromaToPcset(chroma2);
}
var pcset = (0, _core.deprecate)("Pcset.pcset", "Pcset.get", get);
exports.pcset = pcset;
var chroma = set => get(set).chroma;
var intervals = set => get(set).intervals;
var num = set => get(set).setNum;
var IVLS = ["1P", "2m", "2M", "3m", "3M", "4P", "5d", "5P", "6m", "6M", "7m", "7M"];
function chromaToIntervals(chroma2) {
  const intervals2 = [];
  for (let i = 0; i < 12; i++) {
    if (chroma2.charAt(i) === "1") intervals2.push(IVLS[i]);
  }
  return intervals2;
}
function chromas() {
  return (0, _collection.range)(2048, 4095).map(setNumToChroma);
}
function modes(set, normalize = true) {
  const pcs = get(set);
  const binary = pcs.chroma.split("");
  return (0, _collection.compact)(binary.map((_, i) => {
    const r = (0, _collection.rotate)(i, binary);
    return normalize && r[0] === "0" ? null : r.join("");
  }));
}
function isEqual(s1, s2) {
  return get(s1).setNum === get(s2).setNum;
}
function isSubsetOf(set) {
  const s = get(set).setNum;
  return notes => {
    const o = get(notes).setNum;
    return s && s !== o && (o & s) === o;
  };
}
function isSupersetOf(set) {
  const s = get(set).setNum;
  return notes => {
    const o = get(notes).setNum;
    return s && s !== o && (o | s) === o;
  };
}
function isNoteIncludedIn(set) {
  const s = get(set);
  return noteName => {
    const n = (0, _core.note)(noteName);
    return s && !n.empty && s.chroma.charAt(n.chroma) === "1";
  };
}
var includes = isNoteIncludedIn;
exports.includes = includes;
function filter(set) {
  const isIncluded = isNoteIncludedIn(set);
  return notes => {
    return notes.filter(isIncluded);
  };
}
var pcset_default = {
  get,
  chroma,
  num,
  intervals,
  chromas,
  isSupersetOf,
  isSubsetOf,
  isNoteIncludedIn,
  isEqual,
  filter,
  modes,
  pcset
};
exports.default = pcset_default;
function chromaRotations(chroma2) {
  const binary = chroma2.split("");
  return binary.map((_, i) => (0, _collection.rotate)(i, binary).join(""));
}
function chromaToPcset(chroma2) {
  const setNum = chromaToNumber(chroma2);
  const normalizedNum = chromaRotations(chroma2).map(chromaToNumber).filter(n => n >= 2048).sort()[0];
  const normalized = setNumToChroma(normalizedNum);
  const intervals2 = chromaToIntervals(chroma2);
  return {
    empty: false,
    name: "",
    setNum,
    chroma: chroma2,
    normalized,
    intervals: intervals2
  };
}
function listToChroma(set) {
  if (set.length === 0) {
    return EmptyPcset.chroma;
  }
  let pitch;
  const binary = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < set.length; i++) {
    pitch = (0, _core.note)(set[i]);
    if (pitch.empty) pitch = (0, _core.interval)(set[i]);
    if (!pitch.empty) binary[pitch.chroma] = 1;
  }
  return binary.join("");
}
},{"@tonaljs/collection":"node_modules/@tonaljs/collection/dist/index.mjs","@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs"}],"node_modules/@tonaljs/chord-type/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.addAlias = addAlias;
exports.all = all;
exports.entries = exports.default = exports.chordType = void 0;
exports.get = get;
exports.keys = keys;
exports.names = names;
exports.removeAll = removeAll;
exports.symbols = symbols;
var _core = require("@tonaljs/core");
var _pcset = require("@tonaljs/pcset");
// index.ts

// data.ts
var CHORDS = [["1P 3M 5P", "major", "M ^  maj"], ["1P 3M 5P 7M", "major seventh", "maj7 \u0394 ma7 M7 Maj7 ^7"], ["1P 3M 5P 7M 9M", "major ninth", "maj9 \u03949 ^9"], ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"], ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"], ["1P 3M 5P 6M 9M", "sixth/ninth", "6/9 69 M69"], ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"], ["1P 3M 5P 7M 11A", "major seventh sharp eleventh", "maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"], ["1P 3m 5P", "minor", "m min -"], ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"], ["1P 3m 5P 7M", "minor/major seventh", "m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7"], ["1P 3m 5P 6M", "minor sixth", "m6 -6"], ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"], ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"], ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"], ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"], ["1P 3m 5d", "diminished", "dim \xB0 o"], ["1P 3m 5d 7d", "diminished seventh", "dim7 \xB07 o7"], ["1P 3m 5d 7m", "half-diminished", "m7b5 \xF8 -7b5 h7 h"], ["1P 3M 5P 7m", "dominant seventh", "7 dom"], ["1P 3M 5P 7m 9M", "dominant ninth", "9"], ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"], ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"], ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"], ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"], ["1P 3M 7m 9m", "altered", "alt7"], ["1P 4P 5P", "suspended fourth", "sus4 sus"], ["1P 2M 5P", "suspended second", "sus2"], ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"], ["1P 5P 7m 9M 11P", "eleventh", "11"], ["1P 4P 5P 7m 9m", "suspended fourth flat ninth", "b9sus phryg 7b9sus 7b9sus4"], ["1P 5P", "fifth", "5"], ["1P 3M 5A", "augmented", "aug + +5 ^#5"], ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"], ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"], ["1P 3M 5P 7M 9M 11A", "major sharp eleventh (lydian)", "maj9#11 \u03949#11 ^9#11"], ["1P 2M 4P 5P", "", "sus24 sus4add9"], ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"], ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"], ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"], ["1P 3M 5A 7m 9M", "", "9#5 9+"], ["1P 3M 5A 7m 9M 11A", "", "9#5#11"], ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"], ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"], ["1P 3M 5A 9A", "", "+add#9"], ["1P 3M 5A 9M", "", "M#5add9 +add9"], ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"], ["1P 3M 5P 6M 7M 9M", "", "M7add13"], ["1P 3M 5P 6M 9M 11A", "", "69#11"], ["1P 3m 5P 6M 9M", "", "m69 -69"], ["1P 3M 5P 6m 7m", "", "7b6"], ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"], ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"], ["1P 3M 5P 7M 9m", "", "M7b9"], ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"], ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"], ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"], ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"], ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"], ["1P 3M 5P 7m 9A 13M", "", "13#9"], ["1P 3M 5P 7m 9A 13m", "", "7#9b13"], ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"], ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"], ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"], ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"], ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"], ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"], ["1P 3M 5P 7m 9m 13M", "", "13b9"], ["1P 3M 5P 7m 9m 13m", "", "7b9b13"], ["1P 3M 5P 7m 9m 9A", "", "7b9#9"], ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"], ["1P 3M 5P 9m", "", "Maddb9"], ["1P 3M 5d", "", "Mb5"], ["1P 3M 5d 6M 7m 9M", "", "13b5"], ["1P 3M 5d 7M", "", "M7b5"], ["1P 3M 5d 7M 9M", "", "M9b5"], ["1P 3M 5d 7m", "", "7b5"], ["1P 3M 5d 7m 9M", "", "9b5"], ["1P 3M 7m", "", "7no5"], ["1P 3M 7m 13m", "", "7b13"], ["1P 3M 7m 9M", "", "9no5"], ["1P 3M 7m 9M 13M", "", "13no5"], ["1P 3M 7m 9M 13m", "", "9b13"], ["1P 3m 4P 5P", "", "madd4"], ["1P 3m 5P 6m 7M", "", "mMaj7b6"], ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"], ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"], ["1P 3m 5P 9M", "", "madd9"], ["1P 3m 5d 6M 7M", "", "o7M7"], ["1P 3m 5d 7M", "", "oM7"], ["1P 3m 6m 7M", "", "mb6M7"], ["1P 3m 6m 7m", "", "m7#5"], ["1P 3m 6m 7m 9M", "", "m9#5"], ["1P 3m 5A 7m 9M 11P", "", "m11A"], ["1P 3m 6m 9m", "", "mb6b9"], ["1P 2M 3m 5d 7m", "", "m9b5"], ["1P 4P 5A 7M", "", "M7#5sus4"], ["1P 4P 5A 7M 9M", "", "M9#5sus4"], ["1P 4P 5A 7m", "", "7#5sus4"], ["1P 4P 5P 7M", "", "M7sus4"], ["1P 4P 5P 7M 9M", "", "M9sus4"], ["1P 4P 5P 7m 9M", "", "9sus4 9sus"], ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"], ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"], ["1P 4P 7m 10m", "", "4 quartal"], ["1P 5P 7m 9m 11P", "", "11b9"]];
var data_default = CHORDS;

// index.ts
var NoChordType = {
  ..._pcset.EmptyPcset,
  name: "",
  quality: "Unknown",
  intervals: [],
  aliases: []
};
var dictionary = [];
var index = {};
function get(type) {
  return index[type] || NoChordType;
}
var chordType = (0, _core.deprecate)("ChordType.chordType", "ChordType.get", get);
exports.chordType = chordType;
function names() {
  return dictionary.map(chord => chord.name).filter(x => x);
}
function symbols() {
  return dictionary.map(chord => chord.aliases[0]).filter(x => x);
}
function keys() {
  return Object.keys(index);
}
function all() {
  return dictionary.slice();
}
var entries = (0, _core.deprecate)("ChordType.entries", "ChordType.all", all);
exports.entries = entries;
function removeAll() {
  dictionary = [];
  index = {};
}
function add(intervals, aliases, fullName) {
  const quality = getQuality(intervals);
  const chord = {
    ...(0, _pcset.get)(intervals),
    name: fullName || "",
    quality,
    intervals,
    aliases
  };
  dictionary.push(chord);
  if (chord.name) {
    index[chord.name] = chord;
  }
  index[chord.setNum] = chord;
  index[chord.chroma] = chord;
  chord.aliases.forEach(alias => addAlias(chord, alias));
}
function addAlias(chord, alias) {
  index[alias] = chord;
}
function getQuality(intervals) {
  const has = interval => intervals.indexOf(interval) !== -1;
  return has("5A") ? "Augmented" : has("3M") ? "Major" : has("5d") ? "Diminished" : has("3m") ? "Minor" : "Unknown";
}
data_default.forEach(([ivls, fullName, names2]) => add(ivls.split(" "), names2.split(" "), fullName));
dictionary.sort((a, b) => a.setNum - b.setNum);
var chord_type_default = {
  names,
  symbols,
  get,
  all,
  add,
  removeAll,
  keys,
  entries,
  chordType
};
exports.default = chord_type_default;
},{"@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/pcset":"node_modules/@tonaljs/pcset/dist/index.mjs"}],"node_modules/@tonaljs/chord-detect/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.detect = detect;
var _chordType = require("@tonaljs/chord-type");
var _core = require("@tonaljs/core");
var _pcset = require("@tonaljs/pcset");
// index.ts

var namedSet = notes => {
  const pcToName = notes.reduce((record, n) => {
    const chroma = (0, _core.note)(n).chroma;
    if (chroma !== void 0) {
      record[chroma] = record[chroma] || (0, _core.note)(n).name;
    }
    return record;
  }, {});
  return chroma => pcToName[chroma];
};
function detect(source, options = {}) {
  const notes = source.map(n => (0, _core.note)(n).pc).filter(x => x);
  if (_core.note.length === 0) {
    return [];
  }
  const found = findMatches(notes, 1, options);
  return found.filter(chord => chord.weight).sort((a, b) => b.weight - a.weight).map(chord => chord.name);
}
var BITMASK = {
  anyThirds: 384,
  perfectFifth: 16,
  nonPerfectFifths: 40,
  anySeventh: 3
};
var testChromaNumber = bitmask => chromaNumber => Boolean(chromaNumber & bitmask);
var hasAnyThird = testChromaNumber(BITMASK.anyThirds);
var hasPerfectFifth = testChromaNumber(BITMASK.perfectFifth);
var hasAnySeventh = testChromaNumber(BITMASK.anySeventh);
var hasNonPerfectFifth = testChromaNumber(BITMASK.nonPerfectFifths);
function hasAnyThirdAndPerfectFifthAndAnySeventh(chordType) {
  const chromaNumber = parseInt(chordType.chroma, 2);
  return hasAnyThird(chromaNumber) && hasPerfectFifth(chromaNumber) && hasAnySeventh(chromaNumber);
}
function withPerfectFifth(chroma) {
  const chromaNumber = parseInt(chroma, 2);
  return hasNonPerfectFifth(chromaNumber) ? chroma : (chromaNumber | 16).toString(2);
}
function findMatches(notes, weight, options) {
  const tonic = notes[0];
  const tonicChroma = (0, _core.note)(tonic).chroma;
  const noteName = namedSet(notes);
  const allModes = (0, _pcset.modes)(notes, false);
  const found = [];
  allModes.forEach((mode, index) => {
    const modeWithPerfectFifth = options.assumePerfectFifth && withPerfectFifth(mode);
    const chordTypes = (0, _chordType.all)().filter(chordType => {
      if (options.assumePerfectFifth && hasAnyThirdAndPerfectFifthAndAnySeventh(chordType)) {
        return chordType.chroma === modeWithPerfectFifth;
      }
      return chordType.chroma === mode;
    });
    chordTypes.forEach(chordType => {
      const chordName = chordType.aliases[0];
      const baseNote = noteName(index);
      const isInversion = index !== tonicChroma;
      if (isInversion) {
        found.push({
          weight: 0.5 * weight,
          name: `${baseNote}${chordName}/${tonic}`
        });
      } else {
        found.push({
          weight: 1 * weight,
          name: `${baseNote}${chordName}`
        });
      }
    });
  });
  return found;
}
var chord_detect_default = {
  detect
};
exports.default = chord_detect_default;
},{"@tonaljs/chord-type":"node_modules/@tonaljs/chord-type/dist/index.mjs","@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/pcset":"node_modules/@tonaljs/pcset/dist/index.mjs"}],"node_modules/@tonaljs/scale-type/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoScaleType = void 0;
exports.add = add;
exports.addAlias = addAlias;
exports.all = all;
exports.entries = exports.default = void 0;
exports.get = get;
exports.keys = keys;
exports.names = names;
exports.removeAll = removeAll;
exports.scaleType = void 0;
var _core = require("@tonaljs/core");
var _pcset = require("@tonaljs/pcset");
// index.ts

// data.ts
var SCALES = [["1P 2M 3M 5P 6M", "major pentatonic", "pentatonic"], ["1P 3M 4P 5P 7M", "ionian pentatonic"], ["1P 3M 4P 5P 7m", "mixolydian pentatonic", "indian"], ["1P 2M 4P 5P 6M", "ritusen"], ["1P 2M 4P 5P 7m", "egyptian"], ["1P 3M 4P 5d 7m", "neopolitan major pentatonic"], ["1P 3m 4P 5P 6m", "vietnamese 1"], ["1P 2m 3m 5P 6m", "pelog"], ["1P 2m 4P 5P 6m", "kumoijoshi"], ["1P 2M 3m 5P 6m", "hirajoshi"], ["1P 2m 4P 5d 7m", "iwato"], ["1P 2m 4P 5P 7m", "in-sen"], ["1P 3M 4A 5P 7M", "lydian pentatonic", "chinese"], ["1P 3m 4P 6m 7m", "malkos raga"], ["1P 3m 4P 5d 7m", "locrian pentatonic", "minor seven flat five pentatonic"], ["1P 3m 4P 5P 7m", "minor pentatonic", "vietnamese 2"], ["1P 3m 4P 5P 6M", "minor six pentatonic"], ["1P 2M 3m 5P 6M", "flat three pentatonic", "kumoi"], ["1P 2M 3M 5P 6m", "flat six pentatonic"], ["1P 2m 3M 5P 6M", "scriabin"], ["1P 3M 5d 6m 7m", "whole tone pentatonic"], ["1P 3M 4A 5A 7M", "lydian #5P pentatonic"], ["1P 3M 4A 5P 7m", "lydian dominant pentatonic"], ["1P 3m 4P 5P 7M", "minor #7M pentatonic"], ["1P 3m 4d 5d 7m", "super locrian pentatonic"], ["1P 2M 3m 4P 5P 7M", "minor hexatonic"], ["1P 2A 3M 5P 5A 7M", "augmented"], ["1P 2M 3m 3M 5P 6M", "major blues"], ["1P 2M 4P 5P 6M 7m", "piongio"], ["1P 2m 3M 4A 6M 7m", "prometheus neopolitan"], ["1P 2M 3M 4A 6M 7m", "prometheus"], ["1P 2m 3M 5d 6m 7m", "mystery #1"], ["1P 2m 3M 4P 5A 6M", "six tone symmetric"], ["1P 2M 3M 4A 5A 6A", "whole tone", "messiaen's mode #1"], ["1P 2m 4P 4A 5P 7M", "messiaen's mode #5"], ["1P 3m 4P 5d 5P 7m", "minor blues", "blues"], ["1P 2M 3M 4P 5d 6m 7m", "locrian major", "arabian"], ["1P 2m 3M 4A 5P 6m 7M", "double harmonic lydian"], ["1P 2M 3m 4P 5P 6m 7M", "harmonic minor"], ["1P 2m 2A 3M 4A 6m 7m", "altered", "super locrian", "diminished whole tone", "pomeroy"], ["1P 2M 3m 4P 5d 6m 7m", "locrian #2", "half-diminished", "aeolian b5"], ["1P 2M 3M 4P 5P 6m 7m", "mixolydian b6", "melodic minor fifth mode", "hindu"], ["1P 2M 3M 4A 5P 6M 7m", "lydian dominant", "lydian b7", "overtone"], ["1P 2M 3M 4A 5P 6M 7M", "lydian"], ["1P 2M 3M 4A 5A 6M 7M", "lydian augmented"], ["1P 2m 3m 4P 5P 6M 7m", "dorian b2", "phrygian #6", "melodic minor second mode"], ["1P 2M 3m 4P 5P 6M 7M", "melodic minor"], ["1P 2m 3m 4P 5d 6m 7m", "locrian"], ["1P 2m 3m 4d 5d 6m 7d", "ultralocrian", "superlocrian bb7", "superlocrian diminished"], ["1P 2m 3m 4P 5d 6M 7m", "locrian 6", "locrian natural 6", "locrian sharp 6"], ["1P 2A 3M 4P 5P 5A 7M", "augmented heptatonic"], ["1P 2M 3m 4A 5P 6M 7m", "dorian #4", "ukrainian dorian", "romanian minor", "altered dorian"], ["1P 2M 3m 4A 5P 6M 7M", "lydian diminished"], ["1P 2m 3m 4P 5P 6m 7m", "phrygian"], ["1P 2M 3M 4A 5A 7m 7M", "leading whole tone"], ["1P 2M 3M 4A 5P 6m 7m", "lydian minor"], ["1P 2m 3M 4P 5P 6m 7m", "phrygian dominant", "spanish", "phrygian major"], ["1P 2m 3m 4P 5P 6m 7M", "balinese"], ["1P 2m 3m 4P 5P 6M 7M", "neopolitan major"], ["1P 2M 3m 4P 5P 6m 7m", "aeolian", "minor"], ["1P 2M 3M 4P 5P 6m 7M", "harmonic major"], ["1P 2m 3M 4P 5P 6m 7M", "double harmonic major", "gypsy"], ["1P 2M 3m 4P 5P 6M 7m", "dorian"], ["1P 2M 3m 4A 5P 6m 7M", "hungarian minor"], ["1P 2A 3M 4A 5P 6M 7m", "hungarian major"], ["1P 2m 3M 4P 5d 6M 7m", "oriental"], ["1P 2m 3m 3M 4A 5P 7m", "flamenco"], ["1P 2m 3m 4A 5P 6m 7M", "todi raga"], ["1P 2M 3M 4P 5P 6M 7m", "mixolydian", "dominant"], ["1P 2m 3M 4P 5d 6m 7M", "persian"], ["1P 2M 3M 4P 5P 6M 7M", "major", "ionian"], ["1P 2m 3M 5d 6m 7m 7M", "enigmatic"], ["1P 2M 3M 4P 5A 6M 7M", "major augmented", "major #5", "ionian augmented", "ionian #5"], ["1P 2A 3M 4A 5P 6M 7M", "lydian #9"], ["1P 2m 2M 4P 4A 5P 6m 7M", "messiaen's mode #4"], ["1P 2m 3M 4P 4A 5P 6m 7M", "purvi raga"], ["1P 2m 3m 3M 4P 5P 6m 7m", "spanish heptatonic"], ["1P 2M 3M 4P 5P 6M 7m 7M", "bebop"], ["1P 2M 3m 3M 4P 5P 6M 7m", "bebop minor"], ["1P 2M 3M 4P 5P 5A 6M 7M", "bebop major"], ["1P 2m 3m 4P 5d 5P 6m 7m", "bebop locrian"], ["1P 2M 3m 4P 5P 6m 7m 7M", "minor bebop"], ["1P 2M 3m 4P 5d 6m 6M 7M", "diminished", "whole-half diminished"], ["1P 2M 3M 4P 5d 5P 6M 7M", "ichikosucho"], ["1P 2M 3m 4P 5P 6m 6M 7M", "minor six diminished"], ["1P 2m 3m 3M 4A 5P 6M 7m", "half-whole diminished", "dominant diminished", "messiaen's mode #2"], ["1P 3m 3M 4P 5P 6M 7m 7M", "kafi raga"], ["1P 2M 3M 4P 4A 5A 6A 7M", "messiaen's mode #6"], ["1P 2M 3m 3M 4P 5d 5P 6M 7m", "composite blues"], ["1P 2M 3m 3M 4A 5P 6m 7m 7M", "messiaen's mode #3"], ["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M", "messiaen's mode #7"], ["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M", "chromatic"]];
var data_default = SCALES;

// index.ts
var NoScaleType = {
  ..._pcset.EmptyPcset,
  intervals: [],
  aliases: []
};
exports.NoScaleType = NoScaleType;
var dictionary = [];
var index = {};
function names() {
  return dictionary.map(scale => scale.name);
}
function get(type) {
  return index[type] || NoScaleType;
}
var scaleType = (0, _core.deprecate)("ScaleDictionary.scaleType", "ScaleType.get", get);
exports.scaleType = scaleType;
function all() {
  return dictionary.slice();
}
var entries = (0, _core.deprecate)("ScaleDictionary.entries", "ScaleType.all", all);
exports.entries = entries;
function keys() {
  return Object.keys(index);
}
function removeAll() {
  dictionary = [];
  index = {};
}
function add(intervals, name, aliases = []) {
  const scale = {
    ...(0, _pcset.get)(intervals),
    name,
    intervals,
    aliases
  };
  dictionary.push(scale);
  index[scale.name] = scale;
  index[scale.setNum] = scale;
  index[scale.chroma] = scale;
  scale.aliases.forEach(alias => addAlias(scale, alias));
  return scale;
}
function addAlias(scale, alias) {
  index[alias] = scale;
}
data_default.forEach(([ivls, name, ...aliases]) => add(ivls.split(" "), name, aliases));
var scale_type_default = {
  names,
  get,
  all,
  add,
  removeAll,
  keys,
  entries,
  scaleType
};
exports.default = scale_type_default;
},{"@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/pcset":"node_modules/@tonaljs/pcset/dist/index.mjs"}],"node_modules/@tonaljs/chord/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chord = void 0;
exports.chordScales = chordScales;
exports.default = void 0;
Object.defineProperty(exports, "detect", {
  enumerable: true,
  get: function () {
    return _chordDetect.detect;
  }
});
exports.extended = extended;
exports.get = get;
exports.getChord = getChord;
exports.reduced = reduced;
exports.tokenize = tokenize;
exports.transpose = transpose;
var _chordDetect = require("@tonaljs/chord-detect");
var _chordType = require("@tonaljs/chord-type");
var _core = require("@tonaljs/core");
var _pcset = require("@tonaljs/pcset");
var _scaleType = require("@tonaljs/scale-type");
// index.ts

var NoChord = {
  empty: true,
  name: "",
  symbol: "",
  root: "",
  rootDegree: 0,
  type: "",
  tonic: null,
  setNum: NaN,
  quality: "Unknown",
  chroma: "",
  normalized: "",
  aliases: [],
  notes: [],
  intervals: []
};
var NUM_TYPES = /^(6|64|7|9|11|13)$/;
function tokenize(name) {
  const [letter, acc, oct, type] = (0, _core.tokenizeNote)(name);
  if (letter === "") {
    return ["", name];
  }
  if (letter === "A" && type === "ug") {
    return ["", "aug"];
  }
  if (!type && (oct === "4" || oct === "5")) {
    return [letter + acc, oct];
  }
  if (NUM_TYPES.test(oct)) {
    return [letter + acc, oct + type];
  } else {
    return [letter + acc + oct, type];
  }
}
function get(src) {
  if (src === "") {
    return NoChord;
  }
  if (Array.isArray(src) && src.length === 2) {
    return getChord(src[1], src[0]);
  } else {
    const [tonic, type] = tokenize(src);
    const chord2 = getChord(type, tonic);
    return chord2.empty ? getChord(src) : chord2;
  }
}
function getChord(typeName, optionalTonic, optionalRoot) {
  const type = (0, _chordType.get)(typeName);
  const tonic = (0, _core.note)(optionalTonic || "");
  const root = (0, _core.note)(optionalRoot || "");
  if (type.empty || optionalTonic && tonic.empty || optionalRoot && root.empty) {
    return NoChord;
  }
  const rootInterval = (0, _core.distance)(tonic.pc, root.pc);
  const rootDegree = type.intervals.indexOf(rootInterval) + 1;
  if (!root.empty && !rootDegree) {
    return NoChord;
  }
  const intervals = Array.from(type.intervals);
  for (let i = 1; i < rootDegree; i++) {
    const num = intervals[0][0];
    const quality = intervals[0][1];
    const newNum = parseInt(num, 10) + 7;
    intervals.push(`${newNum}${quality}`);
    intervals.shift();
  }
  const notes = tonic.empty ? [] : intervals.map(i => (0, _core.transpose)(tonic, i));
  typeName = type.aliases.indexOf(typeName) !== -1 ? typeName : type.aliases[0];
  const symbol = `${tonic.empty ? "" : tonic.pc}${typeName}${root.empty || rootDegree <= 1 ? "" : "/" + root.pc}`;
  const name = `${optionalTonic ? tonic.pc + " " : ""}${type.name}${rootDegree > 1 && optionalRoot ? " over " + root.pc : ""}`;
  return {
    ...type,
    name,
    symbol,
    type: type.name,
    root: root.name,
    intervals,
    rootDegree,
    tonic: tonic.name,
    notes
  };
}
var chord = (0, _core.deprecate)("Chord.chord", "Chord.get", get);
exports.chord = chord;
function transpose(chordName, interval) {
  const [tonic, type] = tokenize(chordName);
  if (!tonic) {
    return chordName;
  }
  return (0, _core.transpose)(tonic, interval) + type;
}
function chordScales(name) {
  const s = get(name);
  const isChordIncluded = (0, _pcset.isSupersetOf)(s.chroma);
  return (0, _scaleType.all)().filter(scale => isChordIncluded(scale.chroma)).map(scale => scale.name);
}
function extended(chordName) {
  const s = get(chordName);
  const isSuperset = (0, _pcset.isSupersetOf)(s.chroma);
  return (0, _chordType.all)().filter(chord2 => isSuperset(chord2.chroma)).map(chord2 => s.tonic + chord2.aliases[0]);
}
function reduced(chordName) {
  const s = get(chordName);
  const isSubset = (0, _pcset.isSubsetOf)(s.chroma);
  return (0, _chordType.all)().filter(chord2 => isSubset(chord2.chroma)).map(chord2 => s.tonic + chord2.aliases[0]);
}
var chord_default = {
  getChord,
  get,
  detect: _chordDetect.detect,
  chordScales,
  extended,
  reduced,
  tokenize,
  transpose,
  chord
};
exports.default = chord_default;
},{"@tonaljs/chord-detect":"node_modules/@tonaljs/chord-detect/dist/index.mjs","@tonaljs/chord-type":"node_modules/@tonaljs/chord-type/dist/index.mjs","@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/pcset":"node_modules/@tonaljs/pcset/dist/index.mjs","@tonaljs/scale-type":"node_modules/@tonaljs/scale-type/dist/index.mjs"}],"node_modules/@tonaljs/duration-value/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fraction = exports.default = void 0;
exports.get = get;
exports.names = names;
exports.shorthands = shorthands;
exports.value = void 0;
// data.ts
var DATA = [[0.125, "dl", ["large", "duplex longa", "maxima", "octuple", "octuple whole"]], [0.25, "l", ["long", "longa"]], [0.5, "d", ["double whole", "double", "breve"]], [1, "w", ["whole", "semibreve"]], [2, "h", ["half", "minim"]], [4, "q", ["quarter", "crotchet"]], [8, "e", ["eighth", "quaver"]], [16, "s", ["sixteenth", "semiquaver"]], [32, "t", ["thirty-second", "demisemiquaver"]], [64, "sf", ["sixty-fourth", "hemidemisemiquaver"]], [128, "h", ["hundred twenty-eighth"]], [256, "th", ["two hundred fifty-sixth"]]];
var data_default = DATA;

// index.ts
var VALUES = [];
data_default.forEach(([denominator, shorthand, names2]) => add(denominator, shorthand, names2));
var NoDuration = {
  empty: true,
  name: "",
  value: 0,
  fraction: [0, 0],
  shorthand: "",
  dots: "",
  names: []
};
function names() {
  return VALUES.reduce((names2, duration) => {
    duration.names.forEach(name => names2.push(name));
    return names2;
  }, []);
}
function shorthands() {
  return VALUES.map(dur => dur.shorthand);
}
var REGEX = /^([^.]+)(\.*)$/;
function get(name) {
  const [_, simple, dots] = REGEX.exec(name) || [];
  const base = VALUES.find(dur => dur.shorthand === simple || dur.names.includes(simple));
  if (!base) {
    return NoDuration;
  }
  const fraction2 = calcDots(base.fraction, dots.length);
  const value2 = fraction2[0] / fraction2[1];
  return {
    ...base,
    name,
    dots,
    value: value2,
    fraction: fraction2
  };
}
var value = name => get(name).value;
exports.value = value;
var fraction = name => get(name).fraction;
exports.fraction = fraction;
var duration_value_default = {
  names,
  shorthands,
  get,
  value,
  fraction
};
exports.default = duration_value_default;
function add(denominator, shorthand, names2) {
  VALUES.push({
    empty: false,
    dots: "",
    name: "",
    value: 1 / denominator,
    fraction: denominator < 1 ? [1 / denominator, 1] : [1, denominator],
    shorthand,
    names: names2
  });
}
function calcDots(fraction2, dots) {
  const pow = Math.pow(2, dots);
  let numerator = fraction2[0] * pow;
  let denominator = fraction2[1] * pow;
  const base = numerator;
  for (let i = 0; i < dots; i++) {
    numerator += base / Math.pow(2, i + 1);
  }
  while (numerator % 2 === 0 && denominator % 2 === 0) {
    numerator /= 2;
    denominator /= 2;
  }
  return [numerator, denominator];
}
},{}],"node_modules/@tonaljs/interval/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distance = exports.default = exports.addTo = exports.add = void 0;
exports.fromSemitones = fromSemitones;
exports.get = void 0;
exports.invert = invert;
exports.name = void 0;
exports.names = names;
exports.semitones = exports.quality = exports.num = void 0;
exports.simplify = simplify;
exports.substract = void 0;
exports.transposeFifths = transposeFifths;
var _core = require("@tonaljs/core");
// index.ts

function names() {
  return "1P 2M 3M 4P 5P 6m 7m".split(" ");
}
var get = _core.interval;
exports.get = get;
var name = name2 => (0, _core.interval)(name2).name;
exports.name = name;
var semitones = name2 => (0, _core.interval)(name2).semitones;
exports.semitones = semitones;
var quality = name2 => (0, _core.interval)(name2).q;
exports.quality = quality;
var num = name2 => (0, _core.interval)(name2).num;
exports.num = num;
function simplify(name2) {
  const i = (0, _core.interval)(name2);
  return i.empty ? "" : i.simple + i.q;
}
function invert(name2) {
  const i = (0, _core.interval)(name2);
  if (i.empty) {
    return "";
  }
  const step = (7 - i.step) % 7;
  const alt = i.type === "perfectable" ? -i.alt : -(i.alt + 1);
  return (0, _core.interval)({
    step,
    alt,
    oct: i.oct,
    dir: i.dir
  }).name;
}
var IN = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7];
var IQ = "P m M m M P d P m M m M".split(" ");
function fromSemitones(semitones2) {
  const d = semitones2 < 0 ? -1 : 1;
  const n = Math.abs(semitones2);
  const c = n % 12;
  const o = Math.floor(n / 12);
  return d * (IN[c] + 7 * o) + IQ[c];
}
var distance = _core.distance;
exports.distance = distance;
var add = combinator((a, b) => [a[0] + b[0], a[1] + b[1]]);
exports.add = add;
var addTo = interval => other => add(interval, other);
exports.addTo = addTo;
var substract = combinator((a, b) => [a[0] - b[0], a[1] - b[1]]);
exports.substract = substract;
function transposeFifths(interval, fifths) {
  const ivl = get(interval);
  if (ivl.empty) return "";
  const [nFifths, nOcts, dir] = ivl.coord;
  return (0, _core.coordToInterval)([nFifths + fifths, nOcts, dir]).name;
}
var interval_default = {
  names,
  get,
  name,
  num,
  semitones,
  quality,
  fromSemitones,
  distance,
  invert,
  simplify,
  add,
  addTo,
  substract,
  transposeFifths
};
exports.default = interval_default;
function combinator(fn) {
  return (a, b) => {
    const coordA = (0, _core.interval)(a).coord;
    const coordB = (0, _core.interval)(b).coord;
    if (coordA && coordB) {
      const coord = fn(coordA, coordB);
      return (0, _core.coordToInterval)(coord).name;
    }
  };
}
},{"@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs"}],"node_modules/@tonaljs/midi/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.freqToMidi = freqToMidi;
exports.isMidi = isMidi;
exports.midiToFreq = midiToFreq;
exports.midiToNoteName = midiToNoteName;
exports.toMidi = toMidi;
var _core = require("@tonaljs/core");
// index.ts

function isMidi(arg) {
  return +arg >= 0 && +arg <= 127;
}
function toMidi(note) {
  if (isMidi(note)) {
    return +note;
  }
  const n = (0, _core.note)(note);
  return n.empty ? null : n.midi;
}
function midiToFreq(midi, tuning = 440) {
  return Math.pow(2, (midi - 69) / 12) * tuning;
}
var L2 = Math.log(2);
var L440 = Math.log(440);
function freqToMidi(freq) {
  const v = 12 * (Math.log(freq) - L440) / L2 + 69;
  return Math.round(v * 100) / 100;
}
var SHARPS = "C C# D D# E F F# G G# A A# B".split(" ");
var FLATS = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
function midiToNoteName(midi, options = {}) {
  if (isNaN(midi) || midi === -Infinity || midi === Infinity) return "";
  midi = Math.round(midi);
  const pcs = options.sharps === true ? SHARPS : FLATS;
  const pc = pcs[midi % 12];
  if (options.pitchClass) {
    return pc;
  }
  const o = Math.floor(midi / 12) - 1;
  return pc + o;
}
var midi_default = {
  isMidi,
  toMidi,
  midiToFreq,
  midiToNoteName,
  freqToMidi
};
exports.default = midi_default;
},{"@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs"}],"node_modules/@tonaljs/note/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.descending = exports.default = exports.chroma = exports.ascending = exports.accidentals = void 0;
exports.enharmonic = enharmonic;
exports.freq = void 0;
exports.fromFreq = fromFreq;
exports.fromFreqSharps = fromFreqSharps;
exports.fromMidi = fromMidi;
exports.fromMidiSharps = fromMidiSharps;
exports.name = exports.midi = exports.get = void 0;
exports.names = names;
exports.simplify = exports.pitchClass = exports.octave = void 0;
exports.sortedNames = sortedNames;
exports.sortedUniqNames = sortedUniqNames;
exports.transposeBy = exports.transpose = exports.trFrom = exports.trFifths = exports.trBy = exports.tr = void 0;
exports.transposeFifths = transposeFifths;
exports.transposeFrom = void 0;
var _core = require("@tonaljs/core");
var _midi = require("@tonaljs/midi");
// index.ts

var NAMES = ["C", "D", "E", "F", "G", "A", "B"];
var toName = n => n.name;
var onlyNotes = array => array.map(_core.note).filter(n => !n.empty);
function names(array) {
  if (array === void 0) {
    return NAMES.slice();
  } else if (!Array.isArray(array)) {
    return [];
  } else {
    return onlyNotes(array).map(toName);
  }
}
var get = _core.note;
exports.get = get;
var name = note => get(note).name;
exports.name = name;
var pitchClass = note => get(note).pc;
exports.pitchClass = pitchClass;
var accidentals = note => get(note).acc;
exports.accidentals = accidentals;
var octave = note => get(note).oct;
exports.octave = octave;
var midi = note => get(note).midi;
exports.midi = midi;
var freq = note => get(note).freq;
exports.freq = freq;
var chroma = note => get(note).chroma;
exports.chroma = chroma;
function fromMidi(midi2) {
  return (0, _midi.midiToNoteName)(midi2);
}
function fromFreq(freq2) {
  return (0, _midi.midiToNoteName)((0, _midi.freqToMidi)(freq2));
}
function fromFreqSharps(freq2) {
  return (0, _midi.midiToNoteName)((0, _midi.freqToMidi)(freq2), {
    sharps: true
  });
}
function fromMidiSharps(midi2) {
  return (0, _midi.midiToNoteName)(midi2, {
    sharps: true
  });
}
var transpose = _core.transpose;
exports.transpose = transpose;
var tr = _core.transpose;
exports.tr = tr;
var transposeBy = interval => note => transpose(note, interval);
exports.transposeBy = transposeBy;
var trBy = transposeBy;
exports.trBy = trBy;
var transposeFrom = note => interval => transpose(note, interval);
exports.transposeFrom = transposeFrom;
var trFrom = transposeFrom;
exports.trFrom = trFrom;
function transposeFifths(noteName, fifths) {
  const note = get(noteName);
  if (note.empty) {
    return "";
  }
  const [nFifths, nOcts] = note.coord;
  const transposed = nOcts === void 0 ? (0, _core.coordToNote)([nFifths + fifths]) : (0, _core.coordToNote)([nFifths + fifths, nOcts]);
  return transposed.name;
}
var trFifths = transposeFifths;
exports.trFifths = trFifths;
var ascending = (a, b) => a.height - b.height;
exports.ascending = ascending;
var descending = (a, b) => b.height - a.height;
exports.descending = descending;
function sortedNames(notes, comparator) {
  comparator = comparator || ascending;
  return onlyNotes(notes).sort(comparator).map(toName);
}
function sortedUniqNames(notes) {
  return sortedNames(notes, ascending).filter((n, i, a) => i === 0 || n !== a[i - 1]);
}
var simplify = noteName => {
  const note = get(noteName);
  if (note.empty) {
    return "";
  }
  return (0, _midi.midiToNoteName)(note.midi || note.chroma, {
    sharps: note.alt > 0,
    pitchClass: note.midi === null
  });
};
exports.simplify = simplify;
function enharmonic(noteName, destName) {
  const src = get(noteName);
  if (src.empty) {
    return "";
  }
  const dest = get(destName || (0, _midi.midiToNoteName)(src.midi || src.chroma, {
    sharps: src.alt < 0,
    pitchClass: true
  }));
  if (dest.empty || dest.chroma !== src.chroma) {
    return "";
  }
  if (src.oct === void 0) {
    return dest.pc;
  }
  const srcChroma = src.chroma - src.alt;
  const destChroma = dest.chroma - dest.alt;
  const destOctOffset = srcChroma > 11 || destChroma < 0 ? -1 : srcChroma < 0 || destChroma > 11 ? 1 : 0;
  const destOct = src.oct + destOctOffset;
  return dest.pc + destOct;
}
var note_default = {
  names,
  get,
  name,
  pitchClass,
  accidentals,
  octave,
  midi,
  ascending,
  descending,
  sortedNames,
  sortedUniqNames,
  fromMidi,
  fromMidiSharps,
  freq,
  fromFreq,
  fromFreqSharps,
  chroma,
  transpose,
  tr,
  transposeBy,
  trBy,
  transposeFrom,
  trFrom,
  transposeFifths,
  trFifths,
  simplify,
  enharmonic
};
exports.default = note_default;
},{"@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/midi":"node_modules/@tonaljs/midi/dist/index.mjs"}],"node_modules/@tonaljs/roman-numeral/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.get = get;
exports.names = names;
exports.tokenize = tokenize;
var _core = require("@tonaljs/core");
// index.ts

var NoRomanNumeral = {
  empty: true,
  name: "",
  chordType: ""
};
var cache = {};
function get(src) {
  return typeof src === "string" ? cache[src] || (cache[src] = parse(src)) : typeof src === "number" ? get(NAMES[src] || "") : (0, _core.isPitch)(src) ? fromPitch(src) : (0, _core.isNamed)(src) ? get(src.name) : NoRomanNumeral;
}
var romanNumeral = (0, _core.deprecate)("RomanNumeral.romanNumeral", "RomanNumeral.get", get);
function names(major = true) {
  return (major ? NAMES : NAMES_MINOR).slice();
}
function fromPitch(pitch) {
  return get((0, _core.altToAcc)(pitch.alt) + NAMES[pitch.step]);
}
var REGEX = /^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;
function tokenize(str) {
  return REGEX.exec(str) || ["", "", "", ""];
}
var ROMANS = "I II III IV V VI VII";
var NAMES = ROMANS.split(" ");
var NAMES_MINOR = ROMANS.toLowerCase().split(" ");
function parse(src) {
  const [name, acc, roman, chordType] = tokenize(src);
  if (!roman) {
    return NoRomanNumeral;
  }
  const upperRoman = roman.toUpperCase();
  const step = NAMES.indexOf(upperRoman);
  const alt = (0, _core.accToAlt)(acc);
  const dir = 1;
  return {
    empty: false,
    name,
    roman,
    interval: (0, _core.interval)({
      step,
      alt,
      dir
    }).name,
    acc,
    chordType,
    alt,
    step,
    major: roman === upperRoman,
    oct: 0,
    dir
  };
}
var roman_numeral_default = {
  names,
  get,
  romanNumeral
};
exports.default = roman_numeral_default;
},{"@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs"}],"node_modules/@tonaljs/key/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.majorKey = majorKey;
exports.majorTonicFromKeySignature = majorTonicFromKeySignature;
exports.minorKey = minorKey;
var _core = require("@tonaljs/core");
var _note = require("@tonaljs/note");
var _romanNumeral = require("@tonaljs/roman-numeral");
// index.ts

var Empty = Object.freeze([]);
var NoKey = {
  type: "major",
  tonic: "",
  alteration: 0,
  keySignature: ""
};
var NoKeyScale = {
  tonic: "",
  grades: Empty,
  intervals: Empty,
  scale: Empty,
  chords: Empty,
  chordsHarmonicFunction: Empty,
  chordScales: Empty
};
var NoMajorKey = {
  ...NoKey,
  ...NoKeyScale,
  type: "major",
  minorRelative: "",
  scale: Empty,
  secondaryDominants: Empty,
  secondaryDominantsMinorRelative: Empty,
  substituteDominants: Empty,
  substituteDominantsMinorRelative: Empty
};
var NoMinorKey = {
  ...NoKey,
  type: "minor",
  relativeMajor: "",
  natural: NoKeyScale,
  harmonic: NoKeyScale,
  melodic: NoKeyScale
};
var mapScaleToType = (scale, list, sep = "") => list.map((type, i) => `${scale[i]}${sep}${type}`);
function keyScale(grades, chords, harmonicFunctions, chordScales) {
  return tonic => {
    const intervals = grades.map(gr => (0, _romanNumeral.get)(gr).interval || "");
    const scale = intervals.map(interval => (0, _core.transpose)(tonic, interval));
    return {
      tonic,
      grades,
      intervals,
      scale,
      chords: mapScaleToType(scale, chords),
      chordsHarmonicFunction: harmonicFunctions.slice(),
      chordScales: mapScaleToType(scale, chordScales, " ")
    };
  };
}
var distInFifths = (from, to) => {
  const f = (0, _core.note)(from);
  const t = (0, _core.note)(to);
  return f.empty || t.empty ? 0 : t.coord[0] - f.coord[0];
};
var MajorScale = keyScale("I II III IV V VI VII".split(" "), "maj7 m7 m7 maj7 7 m7 m7b5".split(" "), "T SD T SD D T D".split(" "), "major,dorian,phrygian,lydian,mixolydian,minor,locrian".split(","));
var NaturalScale = keyScale("I II bIII IV V bVI bVII".split(" "), "m7 m7b5 maj7 m7 m7 maj7 7".split(" "), "T SD T SD D SD SD".split(" "), "minor,locrian,major,dorian,phrygian,lydian,mixolydian".split(","));
var HarmonicScale = keyScale("I II bIII IV V bVI VII".split(" "), "mMaj7 m7b5 +maj7 m7 7 maj7 o7".split(" "), "T SD T SD D SD D".split(" "), "harmonic minor,locrian 6,major augmented,lydian diminished,phrygian dominant,lydian #9,ultralocrian".split(","));
var MelodicScale = keyScale("I II bIII IV V VI VII".split(" "), "m6 m7 +maj7 7 7 m7b5 m7b5".split(" "), "T SD T SD D  ".split(" "), "melodic minor,dorian b2,lydian augmented,lydian dominant,mixolydian b6,locrian #2,altered".split(","));
function majorKey(tonic) {
  const pc = (0, _core.note)(tonic).pc;
  if (!pc) return NoMajorKey;
  const keyScale2 = MajorScale(pc);
  const alteration = distInFifths("C", pc);
  const romanInTonic = src => {
    const r = (0, _romanNumeral.get)(src);
    if (r.empty) return "";
    return (0, _core.transpose)(tonic, r.interval) + r.chordType;
  };
  return {
    ...keyScale2,
    type: "major",
    minorRelative: (0, _core.transpose)(pc, "-3m"),
    alteration,
    keySignature: (0, _core.altToAcc)(alteration),
    secondaryDominants: "- VI7 VII7 I7 II7 III7 -".split(" ").map(romanInTonic),
    secondaryDominantsMinorRelative: "- IIIm7b5 IV#m7 Vm7 VIm7 VIIm7b5 -".split(" ").map(romanInTonic),
    substituteDominants: "- bIII7 IV7 bV7 bVI7 bVII7 -".split(" ").map(romanInTonic),
    substituteDominantsMinorRelative: "- IIIm7 Im7 IIbm7 VIm7 IVm7 -".split(" ").map(romanInTonic)
  };
}
function minorKey(tnc) {
  const pc = (0, _core.note)(tnc).pc;
  if (!pc) return NoMinorKey;
  const alteration = distInFifths("C", pc) - 3;
  return {
    type: "minor",
    tonic: pc,
    relativeMajor: (0, _core.transpose)(pc, "3m"),
    alteration,
    keySignature: (0, _core.altToAcc)(alteration),
    natural: NaturalScale(pc),
    harmonic: HarmonicScale(pc),
    melodic: MelodicScale(pc)
  };
}
function majorTonicFromKeySignature(sig) {
  if (typeof sig === "number") {
    return (0, _note.transposeFifths)("C", sig);
  } else if (typeof sig === "string" && /^b+|#+$/.test(sig)) {
    return (0, _note.transposeFifths)("C", (0, _core.accToAlt)(sig));
  }
  return null;
}
var key_default = {
  majorKey,
  majorTonicFromKeySignature,
  minorKey
};
exports.default = key_default;
},{"@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/note":"node_modules/@tonaljs/note/dist/index.mjs","@tonaljs/roman-numeral":"node_modules/@tonaljs/roman-numeral/dist/index.mjs"}],"node_modules/@tonaljs/mode/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = all;
exports.default = void 0;
exports.distance = distance;
exports.entries = void 0;
exports.get = get;
exports.mode = void 0;
exports.names = names;
exports.notes = notes;
exports.relativeTonic = relativeTonic;
exports.triads = exports.seventhChords = void 0;
var _collection = require("@tonaljs/collection");
var _core = require("@tonaljs/core");
var _interval = require("@tonaljs/interval");
var _pcset = require("@tonaljs/pcset");
var _scaleType = require("@tonaljs/scale-type");
// index.ts

var MODES = [[0, 2773, 0, "ionian", "", "Maj7", "major"], [1, 2902, 2, "dorian", "m", "m7"], [2, 3418, 4, "phrygian", "m", "m7"], [3, 2741, -1, "lydian", "", "Maj7"], [4, 2774, 1, "mixolydian", "", "7"], [5, 2906, 3, "aeolian", "m", "m7", "minor"], [6, 3434, 5, "locrian", "dim", "m7b5"]];
var NoMode = {
  ..._pcset.EmptyPcset,
  name: "",
  alt: 0,
  modeNum: NaN,
  triad: "",
  seventh: "",
  aliases: []
};
var modes = MODES.map(toMode);
var index = {};
modes.forEach(mode2 => {
  index[mode2.name] = mode2;
  mode2.aliases.forEach(alias => {
    index[alias] = mode2;
  });
});
function get(name) {
  return typeof name === "string" ? index[name.toLowerCase()] || NoMode : name && name.name ? get(name.name) : NoMode;
}
var mode = (0, _core.deprecate)("Mode.mode", "Mode.get", get);
exports.mode = mode;
function all() {
  return modes.slice();
}
var entries = (0, _core.deprecate)("Mode.mode", "Mode.all", all);
exports.entries = entries;
function names() {
  return modes.map(mode2 => mode2.name);
}
function toMode(mode2) {
  const [modeNum, setNum, alt, name, triad, seventh, alias] = mode2;
  const aliases = alias ? [alias] : [];
  const chroma = Number(setNum).toString(2);
  const intervals = (0, _scaleType.get)(name).intervals;
  return {
    empty: false,
    intervals,
    modeNum,
    chroma,
    normalized: chroma,
    name,
    setNum,
    alt,
    triad,
    seventh,
    aliases
  };
}
function notes(modeName, tonic) {
  return get(modeName).intervals.map(ivl => (0, _core.transpose)(tonic, ivl));
}
function chords(chords2) {
  return (modeName, tonic) => {
    const mode2 = get(modeName);
    if (mode2.empty) return [];
    const triads2 = (0, _collection.rotate)(mode2.modeNum, chords2);
    const tonics = mode2.intervals.map(i => (0, _core.transpose)(tonic, i));
    return triads2.map((triad, i) => tonics[i] + triad);
  };
}
var triads = chords(MODES.map(x => x[4]));
exports.triads = triads;
var seventhChords = chords(MODES.map(x => x[5]));
exports.seventhChords = seventhChords;
function distance(destination, source) {
  const from = get(source);
  const to = get(destination);
  if (from.empty || to.empty) return "";
  return (0, _interval.simplify)((0, _interval.transposeFifths)("1P", to.alt - from.alt));
}
function relativeTonic(destination, source, tonic) {
  return (0, _core.transpose)(tonic, distance(destination, source));
}
var mode_default = {
  get,
  names,
  all,
  distance,
  relativeTonic,
  notes,
  triads,
  seventhChords,
  entries,
  mode
};
exports.default = mode_default;
},{"@tonaljs/collection":"node_modules/@tonaljs/collection/dist/index.mjs","@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/interval":"node_modules/@tonaljs/interval/dist/index.mjs","@tonaljs/pcset":"node_modules/@tonaljs/pcset/dist/index.mjs","@tonaljs/scale-type":"node_modules/@tonaljs/scale-type/dist/index.mjs"}],"node_modules/@tonaljs/progression/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.fromRomanNumerals = fromRomanNumerals;
exports.toRomanNumerals = toRomanNumerals;
var _chord = require("@tonaljs/chord");
var _core = require("@tonaljs/core");
var _romanNumeral = require("@tonaljs/roman-numeral");
// index.ts

function fromRomanNumerals(tonic, chords) {
  const romanNumerals = chords.map(_romanNumeral.get);
  return romanNumerals.map(rn => (0, _core.transpose)(tonic, (0, _core.interval)(rn)) + rn.chordType);
}
function toRomanNumerals(tonic, chords) {
  return chords.map(chord => {
    const [note, chordType] = (0, _chord.tokenize)(chord);
    const intervalName = (0, _core.distance)(tonic, note);
    const roman = (0, _romanNumeral.get)((0, _core.interval)(intervalName));
    return roman.name + chordType;
  });
}
var progression_default = {
  fromRomanNumerals,
  toRomanNumerals
};
exports.default = progression_default;
},{"@tonaljs/chord":"node_modules/@tonaljs/chord/dist/index.mjs","@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/roman-numeral":"node_modules/@tonaljs/roman-numeral/dist/index.mjs"}],"node_modules/@tonaljs/range/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chromatic = chromatic;
exports.default = void 0;
exports.numeric = numeric;
var _collection = require("@tonaljs/collection");
var _midi = require("@tonaljs/midi");
// index.ts

function numeric(notes) {
  const midi = (0, _collection.compact)(notes.map(_midi.toMidi));
  if (!notes.length || midi.length !== notes.length) {
    return [];
  }
  return midi.reduce((result, note) => {
    const last = result[result.length - 1];
    return result.concat((0, _collection.range)(last, note).slice(1));
  }, [midi[0]]);
}
function chromatic(notes, options) {
  return numeric(notes).map(midi => (0, _midi.midiToNoteName)(midi, options));
}
var range_default = {
  numeric,
  chromatic
};
exports.default = range_default;
},{"@tonaljs/collection":"node_modules/@tonaljs/collection/dist/index.mjs","@tonaljs/midi":"node_modules/@tonaljs/midi/dist/index.mjs"}],"node_modules/@tonaljs/scale/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.extended = extended;
exports.get = get;
exports.modeNames = modeNames;
exports.names = void 0;
exports.rangeOf = rangeOf;
exports.reduced = reduced;
exports.scale = void 0;
exports.scaleChords = scaleChords;
exports.scaleNotes = scaleNotes;
exports.tokenize = tokenize;
var _chordType = require("@tonaljs/chord-type");
var _collection = require("@tonaljs/collection");
var _core = require("@tonaljs/core");
var _note = require("@tonaljs/note");
var _pcset = require("@tonaljs/pcset");
var _scaleType = require("@tonaljs/scale-type");
// index.ts

var NoScale = {
  empty: true,
  name: "",
  type: "",
  tonic: null,
  setNum: NaN,
  chroma: "",
  normalized: "",
  aliases: [],
  notes: [],
  intervals: []
};
function tokenize(name) {
  if (typeof name !== "string") {
    return ["", ""];
  }
  const i = name.indexOf(" ");
  const tonic = (0, _core.note)(name.substring(0, i));
  if (tonic.empty) {
    const n = (0, _core.note)(name);
    return n.empty ? ["", name] : [n.name, ""];
  }
  const type = name.substring(tonic.name.length + 1);
  return [tonic.name, type.length ? type : ""];
}
var names = _scaleType.names;
exports.names = names;
function get(src) {
  const tokens = Array.isArray(src) ? src : tokenize(src);
  const tonic = (0, _core.note)(tokens[0]).name;
  const st = (0, _scaleType.get)(tokens[1]);
  if (st.empty) {
    return NoScale;
  }
  const type = st.name;
  const notes = tonic ? st.intervals.map(i => (0, _core.transpose)(tonic, i)) : [];
  const name = tonic ? tonic + " " + type : type;
  return {
    ...st,
    name,
    type,
    tonic,
    notes
  };
}
var scale = (0, _core.deprecate)("Scale.scale", "Scale.get", get);
exports.scale = scale;
function scaleChords(name) {
  const s = get(name);
  const inScale = (0, _pcset.isSubsetOf)(s.chroma);
  return (0, _chordType.all)().filter(chord => inScale(chord.chroma)).map(chord => chord.aliases[0]);
}
function extended(name) {
  const s = get(name);
  const isSuperset = (0, _pcset.isSupersetOf)(s.chroma);
  return (0, _scaleType.all)().filter(scale2 => isSuperset(scale2.chroma)).map(scale2 => scale2.name);
}
function reduced(name) {
  const isSubset = (0, _pcset.isSubsetOf)(get(name).chroma);
  return (0, _scaleType.all)().filter(scale2 => isSubset(scale2.chroma)).map(scale2 => scale2.name);
}
function scaleNotes(notes) {
  const pcset = notes.map(n => (0, _core.note)(n).pc).filter(x => x);
  const tonic = pcset[0];
  const scale2 = (0, _note.sortedUniqNames)(pcset);
  return (0, _collection.rotate)(scale2.indexOf(tonic), scale2);
}
function modeNames(name) {
  const s = get(name);
  if (s.empty) {
    return [];
  }
  const tonics = s.tonic ? s.notes : s.intervals;
  return (0, _pcset.modes)(s.chroma).map((chroma, i) => {
    const modeName = get(chroma).name;
    return modeName ? [tonics[i], modeName] : ["", ""];
  }).filter(x => x[0]);
}
function getNoteNameOf(scale2) {
  const names2 = Array.isArray(scale2) ? scaleNotes(scale2) : get(scale2).notes;
  const chromas = names2.map(name => (0, _core.note)(name).chroma);
  return noteOrMidi => {
    const currNote = typeof noteOrMidi === "number" ? (0, _core.note)((0, _note.fromMidi)(noteOrMidi)) : (0, _core.note)(noteOrMidi);
    const height = currNote.height;
    if (height === void 0) return void 0;
    const chroma = height % 12;
    const position = chromas.indexOf(chroma);
    if (position === -1) return void 0;
    return (0, _note.enharmonic)(currNote.name, names2[position]);
  };
}
function rangeOf(scale2) {
  const getName = getNoteNameOf(scale2);
  return (fromNote, toNote) => {
    const from = (0, _core.note)(fromNote).height;
    const to = (0, _core.note)(toNote).height;
    if (from === void 0 || to === void 0) return [];
    return (0, _collection.range)(from, to).map(getName).filter(x => x);
  };
}
var scale_default = {
  get,
  names,
  extended,
  modeNames,
  reduced,
  scaleChords,
  scaleNotes,
  tokenize,
  rangeOf,
  scale
};
exports.default = scale_default;
},{"@tonaljs/chord-type":"node_modules/@tonaljs/chord-type/dist/index.mjs","@tonaljs/collection":"node_modules/@tonaljs/collection/dist/index.mjs","@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/note":"node_modules/@tonaljs/note/dist/index.mjs","@tonaljs/pcset":"node_modules/@tonaljs/pcset/dist/index.mjs","@tonaljs/scale-type":"node_modules/@tonaljs/scale-type/dist/index.mjs"}],"node_modules/@tonaljs/time-signature/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.get = get;
exports.names = names;
exports.parse = parse;
// index.ts
var NONE = {
  empty: true,
  name: "",
  upper: void 0,
  lower: void 0,
  type: void 0,
  additive: []
};
var NAMES = ["4/4", "3/4", "2/4", "2/2", "12/8", "9/8", "6/8", "3/8"];
function names() {
  return NAMES.slice();
}
var REGEX = /^(\d*\d(?:\+\d)*)\/(\d+)$/;
var CACHE = /* @__PURE__ */new Map();
function get(literal) {
  const stringifiedLiteral = JSON.stringify(literal);
  const cached = CACHE.get(stringifiedLiteral);
  if (cached) {
    return cached;
  }
  const ts = build(parse(literal));
  CACHE.set(stringifiedLiteral, ts);
  return ts;
}
function parse(literal) {
  if (typeof literal === "string") {
    const [_, up2, low] = REGEX.exec(literal) || [];
    return parse([up2, low]);
  }
  const [up, down] = literal;
  const denominator = +down;
  if (typeof up === "number") {
    return [up, denominator];
  }
  const list = up.split("+").map(n => +n);
  return list.length === 1 ? [list[0], denominator] : [list, denominator];
}
var time_signature_default = {
  names,
  parse,
  get
};
exports.default = time_signature_default;
var isPowerOfTwo = x => Math.log(x) / Math.log(2) % 1 === 0;
function build([up, down]) {
  const upper = Array.isArray(up) ? up.reduce((a, b) => a + b, 0) : up;
  const lower = down;
  if (upper === 0 || lower === 0) {
    return NONE;
  }
  const name = Array.isArray(up) ? `${up.join("+")}/${down}` : `${up}/${down}`;
  const additive = Array.isArray(up) ? up : [];
  const type = lower === 4 || lower === 2 ? "simple" : lower === 8 && upper % 3 === 0 ? "compound" : isPowerOfTwo(lower) ? "irregular" : "irrational";
  return {
    empty: false,
    name,
    type,
    upper,
    lower,
    additive
  };
}
},{}],"node_modules/tonal/dist/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ChordDictionary: true,
  PcSet: true,
  ScaleDictionary: true,
  Tonal: true,
  AbcNotation: true,
  Array: true,
  Chord: true,
  ChordType: true,
  Collection: true,
  Core: true,
  DurationValue: true,
  Interval: true,
  Key: true,
  Midi: true,
  Mode: true,
  Note: true,
  Pcset: true,
  Progression: true,
  Range: true,
  RomanNumeral: true,
  Scale: true,
  ScaleType: true,
  TimeSignature: true
};
Object.defineProperty(exports, "AbcNotation", {
  enumerable: true,
  get: function () {
    return _abcNotation.default;
  }
});
exports.Array = void 0;
Object.defineProperty(exports, "Chord", {
  enumerable: true,
  get: function () {
    return _chord.default;
  }
});
exports.ChordDictionary = void 0;
Object.defineProperty(exports, "ChordType", {
  enumerable: true,
  get: function () {
    return _chordType.default;
  }
});
Object.defineProperty(exports, "Collection", {
  enumerable: true,
  get: function () {
    return _collection.default;
  }
});
exports.Core = void 0;
Object.defineProperty(exports, "DurationValue", {
  enumerable: true,
  get: function () {
    return _durationValue.default;
  }
});
Object.defineProperty(exports, "Interval", {
  enumerable: true,
  get: function () {
    return _interval.default;
  }
});
Object.defineProperty(exports, "Key", {
  enumerable: true,
  get: function () {
    return _key.default;
  }
});
Object.defineProperty(exports, "Midi", {
  enumerable: true,
  get: function () {
    return _midi.default;
  }
});
Object.defineProperty(exports, "Mode", {
  enumerable: true,
  get: function () {
    return _mode.default;
  }
});
Object.defineProperty(exports, "Note", {
  enumerable: true,
  get: function () {
    return _note.default;
  }
});
exports.PcSet = void 0;
Object.defineProperty(exports, "Pcset", {
  enumerable: true,
  get: function () {
    return _pcset.default;
  }
});
Object.defineProperty(exports, "Progression", {
  enumerable: true,
  get: function () {
    return _progression.default;
  }
});
Object.defineProperty(exports, "Range", {
  enumerable: true,
  get: function () {
    return _range.default;
  }
});
Object.defineProperty(exports, "RomanNumeral", {
  enumerable: true,
  get: function () {
    return _romanNumeral.default;
  }
});
Object.defineProperty(exports, "Scale", {
  enumerable: true,
  get: function () {
    return _scale.default;
  }
});
exports.ScaleDictionary = void 0;
Object.defineProperty(exports, "ScaleType", {
  enumerable: true,
  get: function () {
    return _scaleType.default;
  }
});
Object.defineProperty(exports, "TimeSignature", {
  enumerable: true,
  get: function () {
    return _timeSignature.default;
  }
});
exports.Tonal = void 0;
var _abcNotation = _interopRequireDefault(require("@tonaljs/abc-notation"));
var Array = _interopRequireWildcard(require("@tonaljs/array"));
exports.Array = Array;
var _chord = _interopRequireDefault(require("@tonaljs/chord"));
var _chordType = _interopRequireDefault(require("@tonaljs/chord-type"));
var _collection = _interopRequireDefault(require("@tonaljs/collection"));
var Core = _interopRequireWildcard(require("@tonaljs/core"));
exports.Core = Core;
Object.keys(Core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === Core[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return Core[key];
    }
  });
});
var _durationValue = _interopRequireDefault(require("@tonaljs/duration-value"));
var _interval = _interopRequireDefault(require("@tonaljs/interval"));
var _key = _interopRequireDefault(require("@tonaljs/key"));
var _midi = _interopRequireDefault(require("@tonaljs/midi"));
var _mode = _interopRequireDefault(require("@tonaljs/mode"));
var _note = _interopRequireDefault(require("@tonaljs/note"));
var _pcset = _interopRequireDefault(require("@tonaljs/pcset"));
var _progression = _interopRequireDefault(require("@tonaljs/progression"));
var _range = _interopRequireDefault(require("@tonaljs/range"));
var _romanNumeral = _interopRequireDefault(require("@tonaljs/roman-numeral"));
var _scale = _interopRequireDefault(require("@tonaljs/scale"));
var _scaleType = _interopRequireDefault(require("@tonaljs/scale-type"));
var _timeSignature = _interopRequireDefault(require("@tonaljs/time-signature"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// index.ts

var Tonal = Core;
exports.Tonal = Tonal;
var PcSet = _pcset.default;
exports.PcSet = PcSet;
var ChordDictionary = _chordType.default;
exports.ChordDictionary = ChordDictionary;
var ScaleDictionary = _scaleType.default;
exports.ScaleDictionary = ScaleDictionary;
},{"@tonaljs/abc-notation":"node_modules/@tonaljs/abc-notation/dist/index.mjs","@tonaljs/array":"node_modules/@tonaljs/array/dist/index.mjs","@tonaljs/chord":"node_modules/@tonaljs/chord/dist/index.mjs","@tonaljs/chord-type":"node_modules/@tonaljs/chord-type/dist/index.mjs","@tonaljs/collection":"node_modules/@tonaljs/collection/dist/index.mjs","@tonaljs/core":"node_modules/@tonaljs/core/dist/index.mjs","@tonaljs/duration-value":"node_modules/@tonaljs/duration-value/dist/index.mjs","@tonaljs/interval":"node_modules/@tonaljs/interval/dist/index.mjs","@tonaljs/key":"node_modules/@tonaljs/key/dist/index.mjs","@tonaljs/midi":"node_modules/@tonaljs/midi/dist/index.mjs","@tonaljs/mode":"node_modules/@tonaljs/mode/dist/index.mjs","@tonaljs/note":"node_modules/@tonaljs/note/dist/index.mjs","@tonaljs/pcset":"node_modules/@tonaljs/pcset/dist/index.mjs","@tonaljs/progression":"node_modules/@tonaljs/progression/dist/index.mjs","@tonaljs/range":"node_modules/@tonaljs/range/dist/index.mjs","@tonaljs/roman-numeral":"node_modules/@tonaljs/roman-numeral/dist/index.mjs","@tonaljs/scale":"node_modules/@tonaljs/scale/dist/index.mjs","@tonaljs/scale-type":"node_modules/@tonaljs/scale-type/dist/index.mjs","@tonaljs/time-signature":"node_modules/@tonaljs/time-signature/dist/index.mjs"}],"js/script.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textWidth = exports.scrImages = exports.rispostaGiusta = exports.primaNota = exports.chordSignature = exports.chordBlockArray = exports.canvas = exports.c = void 0;
var _Player = require("./Player.js");
var _collisionBlock = require("./collisionBlock.js");
var _tonal = require("tonal");
var canvas = document.getElementById('gameSet');
exports.canvas = canvas;
var c = canvas.getContext('2d');
exports.c = c;
canvas.width = 1024;
canvas.height = 750;
var gravity = 0.5;

// TEST TONAL.JS

console.log(_tonal.Chord.get("Cadd9"));

//const colorGreen = 'rgba(75,192,192,1)';
c.font = "italic bolder 50px Arial";
//array provvisorio con elenco sigle accordi
var chordSignature = "C";
//larghezza testo
exports.chordSignature = chordSignature;
var textWidth = c.measureText(chordSignature).width;
exports.textWidth = textWidth;
var scrImages = ['img/assets/block1_cut.png', 'img/assets/block2_cut.png'];

//blocchi che verranno disegnati dopo 
exports.scrImages = scrImages;
var chordBlockArray = [];
exports.chordBlockArray = chordBlockArray;
var timeToNextBlock = 0;
//variabile che andremo a modificare con il knob della MIDI, ora è impostato a 4 sceondi
var blockInterval = 4000;
var lastBlockTime = 0;
var primaNota = false;
exports.primaNota = primaNota;
var gameOver = false;
var rispostaGiusta = false;
exports.rispostaGiusta = rispostaGiusta;
var V0X_MAX = 1.1; // initial velocity (m/s)
var V0Y_MAX = 1;
var vox_MODIFIER;
var deltaTime;
var player = new _Player.Player({
  x: 450,
  y: 0
});

//blocchi di partenza
var block1 = new _collisionBlock.collisionBlock();
block1.position.x = 100;
block1.position.y = 100;
var block2 = new _collisionBlock.collisionBlock();
block2.position.x = 700;
block2.position.y = 300;
var block3 = new _collisionBlock.collisionBlock();
block3.position.x = 100;
block3.position.y = 500;
chordBlockArray.push(block3);
chordBlockArray.push(block2);
chordBlockArray.push(block1);

//saranno le nostre giusto e sbagliato
var keys = {
  d: {
    pressed: false
  },
  a: {
    pressed: false
  }
};
//il timestamp mi serve per controllare il refresh automatico della animate.
function animate(timestamp) {
  c.clearRect(0, 0, canvas.width, canvas.height);
  deltaTime = timestamp - lastBlockTime;
  lastBlockTime = timestamp;
  timeToNextBlock += deltaTime;
  //giocatore
  player.update();
  if (primaNota == true && timeToNextBlock > blockInterval) {
    chordBlockArray.push(new _collisionBlock.collisionBlock());
    timeToNextBlock = 0;
  }
  ;
  [].concat(chordBlockArray).forEach(function (block) {
    return block.draw();
  });
  [].concat(chordBlockArray).forEach(function (block) {
    return block.update();
  });
  player.chechForVerticalCollision(chordBlockArray);
  //stampa dell'array aggiornato nel quale ho solamente i blocchi visibili nel canvas.
  //console.log(chordBlockArray)
  if (rispostaGiusta) {
    player.automaticJump(vox_MODIFIER, V0Y_MAX);
  }

  //se tengo premuto continua ad andarea destra,altrimenti si stoppa 
  //perchè la velocità viene risettata a 0
  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 1;
  } else if (keys.a.pressed) {
    player.velocity.x = -1;
  }
  //richiama ogni volta la funzione
  window.requestAnimationFrame(animate);
}
animate(0);
//in base a ciò che premo nella tastiera
window.addEventListener('keydown', function (event) {
  exports.primaNota = primaNota = true;

  //Al posto delle lettere ci andranno le risposte esatte o sbagliate
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      break;
    case 's':
      keys.a.pressed = true;
      break;
    case 'w':
      player.velocity.y = -20;
      break;
    case 'l':
      var nextBlockPosition = player.computeNextBlockDistance();
      var nextBlockX = nextBlockPosition.xDestinationNextBlock;
      var xDistance = nextBlockX - player.position.x;
      vox_MODIFIER = V0X_MAX * (xDistance / canvas.width);
      exports.rispostaGiusta = rispostaGiusta = true;
      console.log(rispostaGiusta);
      break;
  }
});

//per aggiornare lo status delle keys
window.addEventListener('keyup', function (event) {
  //Al posto delle lettere ci andranno le risposte esatte o sbagliate
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 's':
      keys.a.pressed = false;
      break;
    case 'w':
      player.velocity.y = -10;
      break;
  }
});
},{"./Player.js":"js/Player.js","./collisionBlock.js":"js/collisionBlock.js","tonal":"node_modules/tonal/dist/index.mjs"}],"js/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;
var _script = require("./script.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// threshold per la distanza tra il player e il nextblock
var deltaPixel = 38;
// threshold per i movimenti su asse x in automatic jump
var move_threshold = 5;
var Player = /*#__PURE__*/function () {
  //proprietà del giocatore
  function Player(position) {
    _classCallCheck(this, Player);
    //this.image = new Image();
    //this.image.src;
    this.position = position;
    //velocità di caduta per simulazione gravità
    this.velocity = {
      x: 0,
      y: 0.8
    };
    this.height = 100;
    this.width = 100;
  }
  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      _script.c.fillStyle = 'red';
      _script.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    //metodo per modificare le coordinate
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.applyGravity();
    }
  }, {
    key: "applyGravity",
    value: function applyGravity() {
      // TO DO: SISTEMARE LA GRAVITA' QUANDO RISPOSTA GIUSTA E' TRUE O FALSE
      if (this.position.y + this.height + this.velocity.y < _script.canvas.height && _script.rispostaGiusta == true) {
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
      }
    }
  }, {
    key: "chechForVerticalCollision",
    value: function chechForVerticalCollision(arrayBlocchi) {
      var count;
      var nextBlock;
      for (var i = 0; i < arrayBlocchi.length; i++) {
        nextBlock = arrayBlocchi[i];

        // HO ALZATO IL CONTROLLO DELLA COLLISIONE SULLE Y DI 10 PX
        if (this.position.x >= nextBlock.position.x && this.position.x + this.width <= nextBlock.position.x + nextBlock.width && this.position.y + this.height >= nextBlock.position.y - 10 && this.position.y < nextBlock.position.y) {
          count = i;
          break;
        }
      }
      if (count < arrayBlocchi.length && _script.rispostaGiusta == false) {
        //variabili per gestione salto automatico
        var posizioneAtterraggioX;
        var posizioneAtterraggioY;
        posizioneAtterraggioY = nextBlock.position.y - nextBlock.height;
        posizioneAtterraggioX = nextBlock.position.x + nextBlock.width / 2 - this.width / 2;
        //cade al centro del blocco
        this.position.y = posizioneAtterraggioY;
        this.position.x = posizioneAtterraggioX;
        this.checkedCollision(nextBlock);
      }
    }
  }, {
    key: "checkedCollision",
    value: function checkedCollision(nextBlock) {
      nextBlock.markedToCollision = true;
      nextBlock.disappearChord();
    }
  }, {
    key: "automaticJump",
    value: function automaticJump(vox, voy) {
      var nextBlockPosition = this.computeNextBlockDistance();
      var nextBlockX = nextBlockPosition.xDestinationNextBlock;
      var nextBlockY = nextBlockPosition.yDestinationNextBlock;

      //calcolo le distanze tra partenza e arrivo
      var xDistance = nextBlockX - this.position.x;
      var yDistance = nextBlockY - this.position.y;

      // equazioni del moto
      // deltaTime = 16  
      // TO DO: v0x dovrebbe dipendere dalla distanza tra player e nextblock
      if (Math.abs(xDistance) > move_threshold) {
        this.position.x += vox * deltaTime;
      } else if (Math.abs(xDistance) <= move_threshold) {
        this.position.x += 0;
      }
      this.position.y -= voy * deltaTime;
      var deltaDistance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

      // CONTROLLA CHE LA DISTANZA DEL PLAYER DAL BLOCCO SIA INFERIORE A deltaPixel
      // e setta rispostaGiusta = false ---> 1 - permette la collisione 2 - ferma la gravità (da sistemare)
      if (deltaDistance < deltaPixel) {
        _script.rispostaGiusta = (false, function () {
          throw new Error('"' + "rispostaGiusta" + '" is read-only.');
        }());
        console.log(_script.rispostaGiusta);
      }
    }
  }, {
    key: "computeNextBlockDistance",
    value: function computeNextBlockDistance() {
      //trova il primo che ha markedtocollision = false (ovvero il prossimo su cui saltare)
      var nextBlockToJump = chordBlockArray.find(function (block) {
        return block.markedToCollision == false;
      });
      var xDestinationNextBlock = nextBlockToJump.position.x + nextBlockToJump.width / 2 - this.width / 2;
      var yDestinationNextBlock = nextBlockToJump.position.y - nextBlockToJump.height;
      return {
        xDestinationNextBlock: xDestinationNextBlock,
        yDestinationNextBlock: yDestinationNextBlock
      };
    }
    /*
    selectPlayerAnimation() {
        if(srcPlayer == 'mozart'){
            this.image.src = '/img/Mozart/mozart_spritesheet_completo.png';
        } else 
        
    }   
    */
  }]);
  return Player;
}();
exports.Player = Player;
},{"./script.js":"js/script.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54218" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/Player.js"], null)
//# sourceMappingURL=/Player.4079b299.js.map