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
})({"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/homepage.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_1.png":[["mozart_frontalesx_1.402c2455.png","plot/mozart-frontale-sx/mozart_frontalesx_1.png"],"plot/mozart-frontale-sx/mozart_frontalesx_1.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_2.png":[["mozart_frontalesx_2.1dbc995a.png","plot/mozart-frontale-sx/mozart_frontalesx_2.png"],"plot/mozart-frontale-sx/mozart_frontalesx_2.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_3.png":[["mozart_frontalesx_3.8f65834a.png","plot/mozart-frontale-sx/mozart_frontalesx_3.png"],"plot/mozart-frontale-sx/mozart_frontalesx_3.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_4.png":[["mozart_frontalesx_4.aa030403.png","plot/mozart-frontale-sx/mozart_frontalesx_4.png"],"plot/mozart-frontale-sx/mozart_frontalesx_4.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_5.png":[["mozart_frontalesx_5.ebf01bad.png","plot/mozart-frontale-sx/mozart_frontalesx_5.png"],"plot/mozart-frontale-sx/mozart_frontalesx_5.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_6.png":[["mozart_frontalesx_6.d227b2eb.png","plot/mozart-frontale-sx/mozart_frontalesx_6.png"],"plot/mozart-frontale-sx/mozart_frontalesx_6.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_7.png":[["mozart_frontalesx_7.b0c19bc1.png","plot/mozart-frontale-sx/mozart_frontalesx_7.png"],"plot/mozart-frontale-sx/mozart_frontalesx_7.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_8.png":[["mozart_frontalesx_8.ff41daac.png","plot/mozart-frontale-sx/mozart_frontalesx_8.png"],"plot/mozart-frontale-sx/mozart_frontalesx_8.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_9.png":[["mozart_frontalesx_9.b27cb1cb.png","plot/mozart-frontale-sx/mozart_frontalesx_9.png"],"plot/mozart-frontale-sx/mozart_frontalesx_9.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_10.png":[["mozart_frontalesx_10.ea75f38a.png","plot/mozart-frontale-sx/mozart_frontalesx_10.png"],"plot/mozart-frontale-sx/mozart_frontalesx_10.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_11.png":[["mozart_frontalesx_11.c1aa2875.png","plot/mozart-frontale-sx/mozart_frontalesx_11.png"],"plot/mozart-frontale-sx/mozart_frontalesx_11.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_12.png":[["mozart_frontalesx_12.4f688b71.png","plot/mozart-frontale-sx/mozart_frontalesx_12.png"],"plot/mozart-frontale-sx/mozart_frontalesx_12.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_13.png":[["mozart_frontalesx_13.9d87241f.png","plot/mozart-frontale-sx/mozart_frontalesx_13.png"],"plot/mozart-frontale-sx/mozart_frontalesx_13.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_14.png":[["mozart_frontalesx_14.06bab539.png","plot/mozart-frontale-sx/mozart_frontalesx_14.png"],"plot/mozart-frontale-sx/mozart_frontalesx_14.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\mozart-frontale-sx\\mozart_frontalesx_15.png":[["mozart_frontalesx_15.895b9167.png","plot/mozart-frontale-sx/mozart_frontalesx_15.png"],"plot/mozart-frontale-sx/mozart_frontalesx_15.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_1.png":[["beethoven_front_dx_1.468bcf3d.png","plot/beethoven-frontale-dx/beethoven_front_dx_1.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_1.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_2.png":[["beethoven_front_dx_2.6e36f50c.png","plot/beethoven-frontale-dx/beethoven_front_dx_2.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_2.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_3.png":[["beethoven_front_dx_3.a8613199.png","plot/beethoven-frontale-dx/beethoven_front_dx_3.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_3.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_4.png":[["beethoven_front_dx_4.702058e4.png","plot/beethoven-frontale-dx/beethoven_front_dx_4.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_4.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_5.png":[["beethoven_front_dx_5.be6d5b78.png","plot/beethoven-frontale-dx/beethoven_front_dx_5.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_5.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_6.png":[["beethoven_front_dx_6.84595b7a.png","plot/beethoven-frontale-dx/beethoven_front_dx_6.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_6.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_7.png":[["beethoven_front_dx_7.7939e8b7.png","plot/beethoven-frontale-dx/beethoven_front_dx_7.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_7.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_8.png":[["beethoven_front_dx_8.d85f1756.png","plot/beethoven-frontale-dx/beethoven_front_dx_8.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_8.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_9.png":[["beethoven_front_dx_9.0980b6e2.png","plot/beethoven-frontale-dx/beethoven_front_dx_9.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_9.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_10.png":[["beethoven_front_dx_10.a9c8d4e5.png","plot/beethoven-frontale-dx/beethoven_front_dx_10.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_10.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_11.png":[["beethoven_front_dx_11.e62776ce.png","plot/beethoven-frontale-dx/beethoven_front_dx_11.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_11.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_12.png":[["beethoven_front_dx_12.bc3fb02c.png","plot/beethoven-frontale-dx/beethoven_front_dx_12.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_12.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_13.png":[["beethoven_front_dx_13.84f14af4.png","plot/beethoven-frontale-dx/beethoven_front_dx_13.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_13.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_14.png":[["beethoven_front_dx_14.d24e2dba.png","plot/beethoven-frontale-dx/beethoven_front_dx_14.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_14.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_15.png":[["beethoven_front_dx_15.e667072a.png","plot/beethoven-frontale-dx/beethoven_front_dx_15.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_15.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_16.png":[["beethoven_front_dx_16.39276860.png","plot/beethoven-frontale-dx/beethoven_front_dx_16.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_16.png"],"C:\\Users\\pierl\\Desktop\\Actam\\ChordGame\\plot\\beethoven-frontale-dx\\beethoven_front_dx_17.png":[["beethoven_front_dx_17.8765a650.png","plot/beethoven-frontale-dx/beethoven_front_dx_17.png"],"plot/beethoven-frontale-dx/beethoven_front_dx_17.png"],"_css_loader":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55329" + '/');
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/homepage.88463a57.js.map