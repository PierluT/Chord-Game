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
})({"js/Player.js":[function(require,module,exports) {
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
var spriteWidth = 656;
var spriteHeight = 640;
var frameX = 0;
var frameY = 0;
var gameFrame = 0;
var staggerFrame = 8;
/*import { c,canvas,rispostaGiusta } from "./script.js";*/
var Player = /*#__PURE__*/function () {
  //proprietà del giocatore
  function Player(position) {
    _classCallCheck(this, Player);
    this.playerImage = new Image();
    this.playerImage.src = "";
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
      c.fillStyle = 'red';
      //c.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
      c.drawImage(this.playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "selectPlayerAnimation",
    value: function selectPlayerAnimation() {
      switch (choosenAvatar) {
        case 'mozart':
          this.playerImage.src = srcPlayerImages[0];
          break;
        case 'beethoven':
          this.playerImage.src = srcPlayerImages[1];
          break;
      }
      if (gameFrame % staggerFrame == 0) {
        if (frameX < 38) frameX++;else frameX = 0;
      }
      gameFrame++;
    }

    //metodo per modificare le coordinate
  }, {
    key: "update",
    value: function update() {
      this.selectPlayerAnimation();
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.applyGravity();
    }
  }, {
    key: "applyGravity",
    value: function applyGravity() {
      // TO DO: SISTEMARE LA GRAVITA' QUANDO RISPOSTA GIUSTA E' TRUE O FALSE
      if (this.position.y + this.height + this.velocity.y < canvas.height && rispostaGiusta == true) {
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
      if (count < arrayBlocchi.length && rispostaGiusta == false) {
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
        rispostaGiusta = false;
        console.log(rispostaGiusta);
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
  }]);
  return Player;
}();
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/Player.js"], null)
//# sourceMappingURL=/Player.4079b299.js.map