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
})({"js/script.js":[function(require,module,exports) {
/*
import {Player} from './Player.js'
import { collisionBlock} from './collisionBlock.js'

*/
var canvas = document.getElementById('gameSet');
var c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 750;
var gravity = 0.5;

// TEST TONAL.JS
//import { Chord } from "tonal";
//console.log(Chord.get("Cadd9"));

//const colorGreen = 'rgba(75,192,192,1)';
c.font = "italic bolder 50px Arial";
//array provvisorio con elenco sigle accordi

var chordSignature = "C";
//larghezza testo

var textWidth = c.measureText(chordSignature).width;
var scrImages = ['./img/assets/block1_cut.png', './img/assets/block2_cut.png'];
var srcPlayerImages = ['./img/Mozart/mozart_spritesheet_completo.png', './img/Beethoven/beethoven_spritesheet_completo.png'];

//blocchi che verranno disegnati dopo 
var chordBlockArray = [];
var timeToNextBlock = 0;
//variabile che andremo a modificare con il knob della MIDI, ora è impostato a 4 sceondi
var blockInterval = 4000;
var lastBlockTime = 0;
var primaNota = false;
var gameOver = false;
var rispostaGiusta = false;
var V0X_MAX = 1.1; // initial velocity (m/s)
var V0Y_MAX = 1;
var vox_MODIFIER;
var deltaTime;
var player = new Player({
  x: 450,
  y: 0
});

//blocchi di partenza
var block1 = new collisionBlock();
block1.position.x = 100;
block1.position.y = 100;
var block2 = new collisionBlock();
block2.position.x = 700;
block2.position.y = 300;
var block3 = new collisionBlock();
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
    chordBlockArray.push(new collisionBlock());
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
  primaNota = true;

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
      rispostaGiusta = true;
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
console.log(srcPlayerImages[1]);
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49880" + '/');
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map