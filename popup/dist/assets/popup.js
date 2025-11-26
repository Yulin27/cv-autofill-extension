(function () {
  const C = document.createElement("link").relList;
  if (C && C.supports && C.supports("modulepreload")) return;
  for (const j of document.querySelectorAll('link[rel="modulepreload"]')) y(j);
  new MutationObserver((j) => {
    for (const Y of j)
      if (Y.type === "childList")
        for (const F of Y.addedNodes)
          F.tagName === "LINK" && F.rel === "modulepreload" && y(F);
  }).observe(document, { childList: !0, subtree: !0 });
  function H(j) {
    const Y = {};
    return (
      j.integrity && (Y.integrity = j.integrity),
      j.referrerPolicy && (Y.referrerPolicy = j.referrerPolicy),
      j.crossOrigin === "use-credentials"
        ? (Y.credentials = "include")
        : j.crossOrigin === "anonymous"
        ? (Y.credentials = "omit")
        : (Y.credentials = "same-origin"),
      Y
    );
  }
  function y(j) {
    if (j.ep) return;
    j.ep = !0;
    const Y = H(j);
    fetch(j.href, Y);
  }
})();
function xd(z) {
  return z && z.__esModule && Object.prototype.hasOwnProperty.call(z, "default")
    ? z.default
    : z;
}
var cf = { exports: {} },
  zu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var rd;
function em() {
  if (rd) return zu;
  rd = 1;
  var z = Symbol.for("react.transitional.element"),
    C = Symbol.for("react.fragment");
  function H(y, j, Y) {
    var F = null;
    if (
      (Y !== void 0 && (F = "" + Y),
      j.key !== void 0 && (F = "" + j.key),
      "key" in j)
    ) {
      Y = {};
      for (var ul in j) ul !== "key" && (Y[ul] = j[ul]);
    } else Y = j;
    return (
      (j = Y.ref),
      { $$typeof: z, type: y, key: F, ref: j !== void 0 ? j : null, props: Y }
    );
  }
  return (zu.Fragment = C), (zu.jsx = H), (zu.jsxs = H), zu;
}
var gd;
function um() {
  return gd || ((gd = 1), (cf.exports = em())), cf.exports;
}
var _ = um(),
  ff = { exports: {} },
  Q = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sd;
function nm() {
  if (Sd) return Q;
  Sd = 1;
  var z = Symbol.for("react.transitional.element"),
    C = Symbol.for("react.portal"),
    H = Symbol.for("react.fragment"),
    y = Symbol.for("react.strict_mode"),
    j = Symbol.for("react.profiler"),
    Y = Symbol.for("react.consumer"),
    F = Symbol.for("react.context"),
    ul = Symbol.for("react.forward_ref"),
    N = Symbol.for("react.suspense"),
    E = Symbol.for("react.memo"),
    B = Symbol.for("react.lazy"),
    T = Symbol.for("react.activity"),
    ll = Symbol.iterator;
  function Ul(o) {
    return o === null || typeof o != "object"
      ? null
      : ((o = (ll && o[ll]) || o["@@iterator"]),
        typeof o == "function" ? o : null);
  }
  var ml = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    bl = Object.assign,
    Ql = {};
  function tl(o, A, O) {
    (this.props = o),
      (this.context = A),
      (this.refs = Ql),
      (this.updater = O || ml);
  }
  (tl.prototype.isReactComponent = {}),
    (tl.prototype.setState = function (o, A) {
      if (typeof o != "object" && typeof o != "function" && o != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, o, A, "setState");
    }),
    (tl.prototype.forceUpdate = function (o) {
      this.updater.enqueueForceUpdate(this, o, "forceUpdate");
    });
  function pl() {}
  pl.prototype = tl.prototype;
  function _l(o, A, O) {
    (this.props = o),
      (this.context = A),
      (this.refs = Ql),
      (this.updater = O || ml);
  }
  var Jl = (_l.prototype = new pl());
  (Jl.constructor = _l), bl(Jl, tl.prototype), (Jl.isPureReactComponent = !0);
  var Xl = Array.isArray;
  function wl() {}
  var W = { H: null, A: null, T: null, S: null },
    kl = Object.prototype.hasOwnProperty;
  function Ot(o, A, O) {
    var x = O.ref;
    return {
      $$typeof: z,
      type: o,
      key: A,
      ref: x !== void 0 ? x : null,
      props: O,
    };
  }
  function Va(o, A) {
    return Ot(o.type, A, o.props);
  }
  function Dt(o) {
    return typeof o == "object" && o !== null && o.$$typeof === z;
  }
  function Wl(o) {
    var A = { "=": "=0", ":": "=2" };
    return (
      "$" +
      o.replace(/[=:]/g, function (O) {
        return A[O];
      })
    );
  }
  var Ea = /\/+/g;
  function Ht(o, A) {
    return typeof o == "object" && o !== null && o.key != null
      ? Wl("" + o.key)
      : A.toString(36);
  }
  function Et(o) {
    switch (o.status) {
      case "fulfilled":
        return o.value;
      case "rejected":
        throw o.reason;
      default:
        switch (
          (typeof o.status == "string"
            ? o.then(wl, wl)
            : ((o.status = "pending"),
              o.then(
                function (A) {
                  o.status === "pending" &&
                    ((o.status = "fulfilled"), (o.value = A));
                },
                function (A) {
                  o.status === "pending" &&
                    ((o.status = "rejected"), (o.reason = A));
                }
              )),
          o.status)
        ) {
          case "fulfilled":
            return o.value;
          case "rejected":
            throw o.reason;
        }
    }
    throw o;
  }
  function S(o, A, O, x, X) {
    var L = typeof o;
    (L === "undefined" || L === "boolean") && (o = null);
    var el = !1;
    if (o === null) el = !0;
    else
      switch (L) {
        case "bigint":
        case "string":
        case "number":
          el = !0;
          break;
        case "object":
          switch (o.$$typeof) {
            case z:
            case C:
              el = !0;
              break;
            case B:
              return (el = o._init), S(el(o._payload), A, O, x, X);
          }
      }
    if (el)
      return (
        (X = X(o)),
        (el = x === "" ? "." + Ht(o, 0) : x),
        Xl(X)
          ? ((O = ""),
            el != null && (O = el.replace(Ea, "$&/") + "/"),
            S(X, A, O, "", function (De) {
              return De;
            }))
          : X != null &&
            (Dt(X) &&
              (X = Va(
                X,
                O +
                  (X.key == null || (o && o.key === X.key)
                    ? ""
                    : ("" + X.key).replace(Ea, "$&/") + "/") +
                  el
              )),
            A.push(X)),
        1
      );
    el = 0;
    var Ll = x === "" ? "." : x + ":";
    if (Xl(o))
      for (var zl = 0; zl < o.length; zl++)
        (x = o[zl]), (L = Ll + Ht(x, zl)), (el += S(x, A, O, L, X));
    else if (((zl = Ul(o)), typeof zl == "function"))
      for (o = zl.call(o), zl = 0; !(x = o.next()).done; )
        (x = x.value), (L = Ll + Ht(x, zl++)), (el += S(x, A, O, L, X));
    else if (L === "object") {
      if (typeof o.then == "function") return S(Et(o), A, O, x, X);
      throw (
        ((A = String(o)),
        Error(
          "Objects are not valid as a React child (found: " +
            (A === "[object Object]"
              ? "object with keys {" + Object.keys(o).join(", ") + "}"
              : A) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return el;
  }
  function M(o, A, O) {
    if (o == null) return o;
    var x = [],
      X = 0;
    return (
      S(o, x, "", "", function (L) {
        return A.call(O, L, X++);
      }),
      x
    );
  }
  function G(o) {
    if (o._status === -1) {
      var A = o._result;
      (A = A()),
        A.then(
          function (O) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 1), (o._result = O));
          },
          function (O) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 2), (o._result = O));
          }
        ),
        o._status === -1 && ((o._status = 0), (o._result = A));
    }
    if (o._status === 1) return o._result.default;
    throw o._result;
  }
  var il =
      typeof reportError == "function"
        ? reportError
        : function (o) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var A = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof o == "object" &&
                  o !== null &&
                  typeof o.message == "string"
                    ? String(o.message)
                    : String(o),
                error: o,
              });
              if (!window.dispatchEvent(A)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", o);
              return;
            }
            console.error(o);
          },
    dl = {
      map: M,
      forEach: function (o, A, O) {
        M(
          o,
          function () {
            A.apply(this, arguments);
          },
          O
        );
      },
      count: function (o) {
        var A = 0;
        return (
          M(o, function () {
            A++;
          }),
          A
        );
      },
      toArray: function (o) {
        return (
          M(o, function (A) {
            return A;
          }) || []
        );
      },
      only: function (o) {
        if (!Dt(o))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return o;
      },
    };
  return (
    (Q.Activity = T),
    (Q.Children = dl),
    (Q.Component = tl),
    (Q.Fragment = H),
    (Q.Profiler = j),
    (Q.PureComponent = _l),
    (Q.StrictMode = y),
    (Q.Suspense = N),
    (Q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W),
    (Q.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (o) {
        return W.H.useMemoCache(o);
      },
    }),
    (Q.cache = function (o) {
      return function () {
        return o.apply(null, arguments);
      };
    }),
    (Q.cacheSignal = function () {
      return null;
    }),
    (Q.cloneElement = function (o, A, O) {
      if (o == null)
        throw Error(
          "The argument must be a React element, but you passed " + o + "."
        );
      var x = bl({}, o.props),
        X = o.key;
      if (A != null)
        for (L in (A.key !== void 0 && (X = "" + A.key), A))
          !kl.call(A, L) ||
            L === "key" ||
            L === "__self" ||
            L === "__source" ||
            (L === "ref" && A.ref === void 0) ||
            (x[L] = A[L]);
      var L = arguments.length - 2;
      if (L === 1) x.children = O;
      else if (1 < L) {
        for (var el = Array(L), Ll = 0; Ll < L; Ll++)
          el[Ll] = arguments[Ll + 2];
        x.children = el;
      }
      return Ot(o.type, X, x);
    }),
    (Q.createContext = function (o) {
      return (
        (o = {
          $$typeof: F,
          _currentValue: o,
          _currentValue2: o,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (o.Provider = o),
        (o.Consumer = { $$typeof: Y, _context: o }),
        o
      );
    }),
    (Q.createElement = function (o, A, O) {
      var x,
        X = {},
        L = null;
      if (A != null)
        for (x in (A.key !== void 0 && (L = "" + A.key), A))
          kl.call(A, x) &&
            x !== "key" &&
            x !== "__self" &&
            x !== "__source" &&
            (X[x] = A[x]);
      var el = arguments.length - 2;
      if (el === 1) X.children = O;
      else if (1 < el) {
        for (var Ll = Array(el), zl = 0; zl < el; zl++)
          Ll[zl] = arguments[zl + 2];
        X.children = Ll;
      }
      if (o && o.defaultProps)
        for (x in ((el = o.defaultProps), el))
          X[x] === void 0 && (X[x] = el[x]);
      return Ot(o, L, X);
    }),
    (Q.createRef = function () {
      return { current: null };
    }),
    (Q.forwardRef = function (o) {
      return { $$typeof: ul, render: o };
    }),
    (Q.isValidElement = Dt),
    (Q.lazy = function (o) {
      return { $$typeof: B, _payload: { _status: -1, _result: o }, _init: G };
    }),
    (Q.memo = function (o, A) {
      return { $$typeof: E, type: o, compare: A === void 0 ? null : A };
    }),
    (Q.startTransition = function (o) {
      var A = W.T,
        O = {};
      W.T = O;
      try {
        var x = o(),
          X = W.S;
        X !== null && X(O, x),
          typeof x == "object" &&
            x !== null &&
            typeof x.then == "function" &&
            x.then(wl, il);
      } catch (L) {
        il(L);
      } finally {
        A !== null && O.types !== null && (A.types = O.types), (W.T = A);
      }
    }),
    (Q.unstable_useCacheRefresh = function () {
      return W.H.useCacheRefresh();
    }),
    (Q.use = function (o) {
      return W.H.use(o);
    }),
    (Q.useActionState = function (o, A, O) {
      return W.H.useActionState(o, A, O);
    }),
    (Q.useCallback = function (o, A) {
      return W.H.useCallback(o, A);
    }),
    (Q.useContext = function (o) {
      return W.H.useContext(o);
    }),
    (Q.useDebugValue = function () {}),
    (Q.useDeferredValue = function (o, A) {
      return W.H.useDeferredValue(o, A);
    }),
    (Q.useEffect = function (o, A) {
      return W.H.useEffect(o, A);
    }),
    (Q.useEffectEvent = function (o) {
      return W.H.useEffectEvent(o);
    }),
    (Q.useId = function () {
      return W.H.useId();
    }),
    (Q.useImperativeHandle = function (o, A, O) {
      return W.H.useImperativeHandle(o, A, O);
    }),
    (Q.useInsertionEffect = function (o, A) {
      return W.H.useInsertionEffect(o, A);
    }),
    (Q.useLayoutEffect = function (o, A) {
      return W.H.useLayoutEffect(o, A);
    }),
    (Q.useMemo = function (o, A) {
      return W.H.useMemo(o, A);
    }),
    (Q.useOptimistic = function (o, A) {
      return W.H.useOptimistic(o, A);
    }),
    (Q.useReducer = function (o, A, O) {
      return W.H.useReducer(o, A, O);
    }),
    (Q.useRef = function (o) {
      return W.H.useRef(o);
    }),
    (Q.useState = function (o) {
      return W.H.useState(o);
    }),
    (Q.useSyncExternalStore = function (o, A, O) {
      return W.H.useSyncExternalStore(o, A, O);
    }),
    (Q.useTransition = function () {
      return W.H.useTransition();
    }),
    (Q.version = "19.2.0"),
    Q
  );
}
var bd;
function mf() {
  return bd || ((bd = 1), (ff.exports = nm())), ff.exports;
}
var Nl = mf();
const cm = xd(Nl);
var sf = { exports: {} },
  Au = {},
  of = { exports: {} },
  df = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var pd;
function im() {
  return (
    pd ||
      ((pd = 1),
      (function (z) {
        function C(S, M) {
          var G = S.length;
          S.push(M);
          l: for (; 0 < G; ) {
            var il = (G - 1) >>> 1,
              dl = S[il];
            if (0 < j(dl, M)) (S[il] = M), (S[G] = dl), (G = il);
            else break l;
          }
        }
        function H(S) {
          return S.length === 0 ? null : S[0];
        }
        function y(S) {
          if (S.length === 0) return null;
          var M = S[0],
            G = S.pop();
          if (G !== M) {
            S[0] = G;
            l: for (var il = 0, dl = S.length, o = dl >>> 1; il < o; ) {
              var A = 2 * (il + 1) - 1,
                O = S[A],
                x = A + 1,
                X = S[x];
              if (0 > j(O, G))
                x < dl && 0 > j(X, O)
                  ? ((S[il] = X), (S[x] = G), (il = x))
                  : ((S[il] = O), (S[A] = G), (il = A));
              else if (x < dl && 0 > j(X, G)) (S[il] = X), (S[x] = G), (il = x);
              else break l;
            }
          }
          return M;
        }
        function j(S, M) {
          var G = S.sortIndex - M.sortIndex;
          return G !== 0 ? G : S.id - M.id;
        }
        if (
          ((z.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var Y = performance;
          z.unstable_now = function () {
            return Y.now();
          };
        } else {
          var F = Date,
            ul = F.now();
          z.unstable_now = function () {
            return F.now() - ul;
          };
        }
        var N = [],
          E = [],
          B = 1,
          T = null,
          ll = 3,
          Ul = !1,
          ml = !1,
          bl = !1,
          Ql = !1,
          tl = typeof setTimeout == "function" ? setTimeout : null,
          pl = typeof clearTimeout == "function" ? clearTimeout : null,
          _l = typeof setImmediate < "u" ? setImmediate : null;
        function Jl(S) {
          for (var M = H(E); M !== null; ) {
            if (M.callback === null) y(E);
            else if (M.startTime <= S)
              y(E), (M.sortIndex = M.expirationTime), C(N, M);
            else break;
            M = H(E);
          }
        }
        function Xl(S) {
          if (((bl = !1), Jl(S), !ml))
            if (H(N) !== null) (ml = !0), wl || ((wl = !0), Wl());
            else {
              var M = H(E);
              M !== null && Et(Xl, M.startTime - S);
            }
        }
        var wl = !1,
          W = -1,
          kl = 5,
          Ot = -1;
        function Va() {
          return Ql ? !0 : !(z.unstable_now() - Ot < kl);
        }
        function Dt() {
          if (((Ql = !1), wl)) {
            var S = z.unstable_now();
            Ot = S;
            var M = !0;
            try {
              l: {
                (ml = !1), bl && ((bl = !1), pl(W), (W = -1)), (Ul = !0);
                var G = ll;
                try {
                  t: {
                    for (
                      Jl(S), T = H(N);
                      T !== null && !(T.expirationTime > S && Va());

                    ) {
                      var il = T.callback;
                      if (typeof il == "function") {
                        (T.callback = null), (ll = T.priorityLevel);
                        var dl = il(T.expirationTime <= S);
                        if (((S = z.unstable_now()), typeof dl == "function")) {
                          (T.callback = dl), Jl(S), (M = !0);
                          break t;
                        }
                        T === H(N) && y(N), Jl(S);
                      } else y(N);
                      T = H(N);
                    }
                    if (T !== null) M = !0;
                    else {
                      var o = H(E);
                      o !== null && Et(Xl, o.startTime - S), (M = !1);
                    }
                  }
                  break l;
                } finally {
                  (T = null), (ll = G), (Ul = !1);
                }
                M = void 0;
              }
            } finally {
              M ? Wl() : (wl = !1);
            }
          }
        }
        var Wl;
        if (typeof _l == "function")
          Wl = function () {
            _l(Dt);
          };
        else if (typeof MessageChannel < "u") {
          var Ea = new MessageChannel(),
            Ht = Ea.port2;
          (Ea.port1.onmessage = Dt),
            (Wl = function () {
              Ht.postMessage(null);
            });
        } else
          Wl = function () {
            tl(Dt, 0);
          };
        function Et(S, M) {
          W = tl(function () {
            S(z.unstable_now());
          }, M);
        }
        (z.unstable_IdlePriority = 5),
          (z.unstable_ImmediatePriority = 1),
          (z.unstable_LowPriority = 4),
          (z.unstable_NormalPriority = 3),
          (z.unstable_Profiling = null),
          (z.unstable_UserBlockingPriority = 2),
          (z.unstable_cancelCallback = function (S) {
            S.callback = null;
          }),
          (z.unstable_forceFrameRate = function (S) {
            0 > S || 125 < S
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (kl = 0 < S ? Math.floor(1e3 / S) : 5);
          }),
          (z.unstable_getCurrentPriorityLevel = function () {
            return ll;
          }),
          (z.unstable_next = function (S) {
            switch (ll) {
              case 1:
              case 2:
              case 3:
                var M = 3;
                break;
              default:
                M = ll;
            }
            var G = ll;
            ll = M;
            try {
              return S();
            } finally {
              ll = G;
            }
          }),
          (z.unstable_requestPaint = function () {
            Ql = !0;
          }),
          (z.unstable_runWithPriority = function (S, M) {
            switch (S) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                S = 3;
            }
            var G = ll;
            ll = S;
            try {
              return M();
            } finally {
              ll = G;
            }
          }),
          (z.unstable_scheduleCallback = function (S, M, G) {
            var il = z.unstable_now();
            switch (
              (typeof G == "object" && G !== null
                ? ((G = G.delay),
                  (G = typeof G == "number" && 0 < G ? il + G : il))
                : (G = il),
              S)
            ) {
              case 1:
                var dl = -1;
                break;
              case 2:
                dl = 250;
                break;
              case 5:
                dl = 1073741823;
                break;
              case 4:
                dl = 1e4;
                break;
              default:
                dl = 5e3;
            }
            return (
              (dl = G + dl),
              (S = {
                id: B++,
                callback: M,
                priorityLevel: S,
                startTime: G,
                expirationTime: dl,
                sortIndex: -1,
              }),
              G > il
                ? ((S.sortIndex = G),
                  C(E, S),
                  H(N) === null &&
                    S === H(E) &&
                    (bl ? (pl(W), (W = -1)) : (bl = !0), Et(Xl, G - il)))
                : ((S.sortIndex = dl),
                  C(N, S),
                  ml || Ul || ((ml = !0), wl || ((wl = !0), Wl()))),
              S
            );
          }),
          (z.unstable_shouldYield = Va),
          (z.unstable_wrapCallback = function (S) {
            var M = ll;
            return function () {
              var G = ll;
              ll = M;
              try {
                return S.apply(this, arguments);
              } finally {
                ll = G;
              }
            };
          });
      })(df)),
    df
  );
}
var zd;
function fm() {
  return zd || ((zd = 1), (of.exports = im())), of.exports;
}
var yf = { exports: {} },
  Zl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ad;
function sm() {
  if (Ad) return Zl;
  Ad = 1;
  var z = mf();
  function C(N) {
    var E = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var B = 2; B < arguments.length; B++)
        E += "&args[]=" + encodeURIComponent(arguments[B]);
    }
    return (
      "Minified React error #" +
      N +
      "; visit " +
      E +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function H() {}
  var y = {
      d: {
        f: H,
        r: function () {
          throw Error(C(522));
        },
        D: H,
        C: H,
        L: H,
        m: H,
        X: H,
        S: H,
        M: H,
      },
      p: 0,
      findDOMNode: null,
    },
    j = Symbol.for("react.portal");
  function Y(N, E, B) {
    var T =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: j,
      key: T == null ? null : "" + T,
      children: N,
      containerInfo: E,
      implementation: B,
    };
  }
  var F = z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function ul(N, E) {
    if (N === "font") return "";
    if (typeof E == "string") return E === "use-credentials" ? E : "";
  }
  return (
    (Zl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = y),
    (Zl.createPortal = function (N, E) {
      var B =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!E || (E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11))
        throw Error(C(299));
      return Y(N, E, null, B);
    }),
    (Zl.flushSync = function (N) {
      var E = F.T,
        B = y.p;
      try {
        if (((F.T = null), (y.p = 2), N)) return N();
      } finally {
        (F.T = E), (y.p = B), y.d.f();
      }
    }),
    (Zl.preconnect = function (N, E) {
      typeof N == "string" &&
        (E
          ? ((E = E.crossOrigin),
            (E =
              typeof E == "string"
                ? E === "use-credentials"
                  ? E
                  : ""
                : void 0))
          : (E = null),
        y.d.C(N, E));
    }),
    (Zl.prefetchDNS = function (N) {
      typeof N == "string" && y.d.D(N);
    }),
    (Zl.preinit = function (N, E) {
      if (typeof N == "string" && E && typeof E.as == "string") {
        var B = E.as,
          T = ul(B, E.crossOrigin),
          ll = typeof E.integrity == "string" ? E.integrity : void 0,
          Ul = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
        B === "style"
          ? y.d.S(N, typeof E.precedence == "string" ? E.precedence : void 0, {
              crossOrigin: T,
              integrity: ll,
              fetchPriority: Ul,
            })
          : B === "script" &&
            y.d.X(N, {
              crossOrigin: T,
              integrity: ll,
              fetchPriority: Ul,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
      }
    }),
    (Zl.preinitModule = function (N, E) {
      if (typeof N == "string")
        if (typeof E == "object" && E !== null) {
          if (E.as == null || E.as === "script") {
            var B = ul(E.as, E.crossOrigin);
            y.d.M(N, {
              crossOrigin: B,
              integrity: typeof E.integrity == "string" ? E.integrity : void 0,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
          }
        } else E == null && y.d.M(N);
    }),
    (Zl.preload = function (N, E) {
      if (
        typeof N == "string" &&
        typeof E == "object" &&
        E !== null &&
        typeof E.as == "string"
      ) {
        var B = E.as,
          T = ul(B, E.crossOrigin);
        y.d.L(N, B, {
          crossOrigin: T,
          integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          nonce: typeof E.nonce == "string" ? E.nonce : void 0,
          type: typeof E.type == "string" ? E.type : void 0,
          fetchPriority:
            typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
          referrerPolicy:
            typeof E.referrerPolicy == "string" ? E.referrerPolicy : void 0,
          imageSrcSet:
            typeof E.imageSrcSet == "string" ? E.imageSrcSet : void 0,
          imageSizes: typeof E.imageSizes == "string" ? E.imageSizes : void 0,
          media: typeof E.media == "string" ? E.media : void 0,
        });
      }
    }),
    (Zl.preloadModule = function (N, E) {
      if (typeof N == "string")
        if (E) {
          var B = ul(E.as, E.crossOrigin);
          y.d.m(N, {
            as: typeof E.as == "string" && E.as !== "script" ? E.as : void 0,
            crossOrigin: B,
            integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          });
        } else y.d.m(N);
    }),
    (Zl.requestFormReset = function (N) {
      y.d.r(N);
    }),
    (Zl.unstable_batchedUpdates = function (N, E) {
      return N(E);
    }),
    (Zl.useFormState = function (N, E, B) {
      return F.H.useFormState(N, E, B);
    }),
    (Zl.useFormStatus = function () {
      return F.H.useHostTransitionStatus();
    }),
    (Zl.version = "19.2.0"),
    Zl
  );
}
var Ed;
function om() {
  if (Ed) return yf.exports;
  Ed = 1;
  function z() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(z);
      } catch (C) {
        console.error(C);
      }
  }
  return z(), (yf.exports = sm()), yf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _d;
function dm() {
  if (_d) return Au;
  _d = 1;
  var z = fm(),
    C = mf(),
    H = om();
  function y(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      l +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function j(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function Y(l) {
    var t = l,
      a = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do (t = l), (t.flags & 4098) !== 0 && (a = t.return), (l = t.return);
      while (l);
    }
    return t.tag === 3 ? a : null;
  }
  function F(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function ul(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function N(l) {
    if (Y(l) !== l) throw Error(y(188));
  }
  function E(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = Y(l)), t === null)) throw Error(y(188));
      return t !== l ? null : l;
    }
    for (var a = l, e = t; ; ) {
      var u = a.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((e = u.return), e !== null)) {
          a = e;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === a) return N(u), l;
          if (n === e) return N(u), t;
          n = n.sibling;
        }
        throw Error(y(188));
      }
      if (a.return !== e.return) (a = u), (e = n);
      else {
        for (var c = !1, i = u.child; i; ) {
          if (i === a) {
            (c = !0), (a = u), (e = n);
            break;
          }
          if (i === e) {
            (c = !0), (e = u), (a = n);
            break;
          }
          i = i.sibling;
        }
        if (!c) {
          for (i = n.child; i; ) {
            if (i === a) {
              (c = !0), (a = n), (e = u);
              break;
            }
            if (i === e) {
              (c = !0), (e = n), (a = u);
              break;
            }
            i = i.sibling;
          }
          if (!c) throw Error(y(189));
        }
      }
      if (a.alternate !== e) throw Error(y(190));
    }
    if (a.tag !== 3) throw Error(y(188));
    return a.stateNode.current === a ? l : t;
  }
  function B(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (((t = B(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  var T = Object.assign,
    ll = Symbol.for("react.element"),
    Ul = Symbol.for("react.transitional.element"),
    ml = Symbol.for("react.portal"),
    bl = Symbol.for("react.fragment"),
    Ql = Symbol.for("react.strict_mode"),
    tl = Symbol.for("react.profiler"),
    pl = Symbol.for("react.consumer"),
    _l = Symbol.for("react.context"),
    Jl = Symbol.for("react.forward_ref"),
    Xl = Symbol.for("react.suspense"),
    wl = Symbol.for("react.suspense_list"),
    W = Symbol.for("react.memo"),
    kl = Symbol.for("react.lazy"),
    Ot = Symbol.for("react.activity"),
    Va = Symbol.for("react.memo_cache_sentinel"),
    Dt = Symbol.iterator;
  function Wl(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (Dt && l[Dt]) || l["@@iterator"]),
        typeof l == "function" ? l : null);
  }
  var Ea = Symbol.for("react.client.reference");
  function Ht(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ea ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case bl:
        return "Fragment";
      case tl:
        return "Profiler";
      case Ql:
        return "StrictMode";
      case Xl:
        return "Suspense";
      case wl:
        return "SuspenseList";
      case Ot:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case ml:
          return "Portal";
        case _l:
          return l.displayName || "Context";
        case pl:
          return (l._context.displayName || "Context") + ".Consumer";
        case Jl:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case W:
          return (
            (t = l.displayName || null), t !== null ? t : Ht(l.type) || "Memo"
          );
        case kl:
          (t = l._payload), (l = l._init);
          try {
            return Ht(l(t));
          } catch {}
      }
    return null;
  }
  var Et = Array.isArray,
    S = C.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    M = H.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    G = { pending: !1, data: null, method: null, action: null },
    il = [],
    dl = -1;
  function o(l) {
    return { current: l };
  }
  function A(l) {
    0 > dl || ((l.current = il[dl]), (il[dl] = null), dl--);
  }
  function O(l, t) {
    dl++, (il[dl] = l.current), (l.current = t);
  }
  var x = o(null),
    X = o(null),
    L = o(null),
    el = o(null);
  function Ll(l, t) {
    switch ((O(L, t), O(X, l), O(x, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Go(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI)))
          (t = Go(t)), (l = Qo(t, l));
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    A(x), O(x, l);
  }
  function zl() {
    A(x), A(X), A(L);
  }
  function De(l) {
    l.memoizedState !== null && O(el, l);
    var t = x.current,
      a = Qo(t, l.type);
    t !== a && (O(X, l), O(x, a));
  }
  function Eu(l) {
    X.current === l && (A(x), A(X)),
      el.current === l && (A(el), (gu._currentValue = G));
  }
  var Zn, vf;
  function _a(l) {
    if (Zn === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        (Zn = (t && t[1]) || ""),
          (vf =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      Zn +
      l +
      vf
    );
  }
  var Vn = !1;
  function Ln(l, t) {
    if (!l || Vn) return "";
    Vn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var e = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var p = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(p.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(p, []);
                } catch (r) {
                  var h = r;
                }
                Reflect.construct(l, [], p);
              } else {
                try {
                  p.call();
                } catch (r) {
                  h = r;
                }
                l.call(p.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (r) {
                h = r;
              }
              (p = l()) &&
                typeof p.catch == "function" &&
                p.catch(function () {});
            }
          } catch (r) {
            if (r && h && typeof r.stack == "string") return [r.stack, h.stack];
          }
          return [null, null];
        },
      };
      e.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        e.DetermineComponentFrameRoot,
        "name"
      );
      u &&
        u.configurable &&
        Object.defineProperty(e.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = e.DetermineComponentFrameRoot(),
        c = n[0],
        i = n[1];
      if (c && i) {
        var f = c.split(`
`),
          v = i.split(`
`);
        for (
          u = e = 0;
          e < f.length && !f[e].includes("DetermineComponentFrameRoot");

        )
          e++;
        for (; u < v.length && !v[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (e === f.length || u === v.length)
          for (
            e = f.length - 1, u = v.length - 1;
            1 <= e && 0 <= u && f[e] !== v[u];

          )
            u--;
        for (; 1 <= e && 0 <= u; e--, u--)
          if (f[e] !== v[u]) {
            if (e !== 1 || u !== 1)
              do
                if ((e--, u--, 0 > u || f[e] !== v[u])) {
                  var g =
                    `
` + f[e].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      g.includes("<anonymous>") &&
                      (g = g.replace("<anonymous>", l.displayName)),
                    g
                  );
                }
              while (1 <= e && 0 <= u);
            break;
          }
      }
    } finally {
      (Vn = !1), (Error.prepareStackTrace = a);
    }
    return (a = l ? l.displayName || l.name : "") ? _a(a) : "";
  }
  function jd(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return _a(l.type);
      case 16:
        return _a("Lazy");
      case 13:
        return l.child !== t && t !== null
          ? _a("Suspense Fallback")
          : _a("Suspense");
      case 19:
        return _a("SuspenseList");
      case 0:
      case 15:
        return Ln(l.type, !1);
      case 11:
        return Ln(l.type.render, !1);
      case 1:
        return Ln(l.type, !0);
      case 31:
        return _a("Activity");
      default:
        return "";
    }
  }
  function hf(l) {
    try {
      var t = "",
        a = null;
      do (t += jd(l, a)), (a = l), (l = l.return);
      while (l);
      return t;
    } catch (e) {
      return (
        `
Error generating stack: ` +
        e.message +
        `
` +
        e.stack
      );
    }
  }
  var Kn = Object.prototype.hasOwnProperty,
    Jn = z.unstable_scheduleCallback,
    wn = z.unstable_cancelCallback,
    Rd = z.unstable_shouldYield,
    qd = z.unstable_requestPaint,
    et = z.unstable_now,
    Yd = z.unstable_getCurrentPriorityLevel,
    rf = z.unstable_ImmediatePriority,
    gf = z.unstable_UserBlockingPriority,
    _u = z.unstable_NormalPriority,
    Bd = z.unstable_LowPriority,
    Sf = z.unstable_IdlePriority,
    Gd = z.log,
    Qd = z.unstable_setDisableYieldValue,
    Ne = null,
    ut = null;
  function It(l) {
    if (
      (typeof Gd == "function" && Qd(l),
      ut && typeof ut.setStrictMode == "function")
    )
      try {
        ut.setStrictMode(Ne, l);
      } catch {}
  }
  var nt = Math.clz32 ? Math.clz32 : Vd,
    Xd = Math.log,
    Zd = Math.LN2;
  function Vd(l) {
    return (l >>>= 0), l === 0 ? 32 : (31 - ((Xd(l) / Zd) | 0)) | 0;
  }
  var Tu = 256,
    Mu = 262144,
    Ou = 4194304;
  function Ta(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Du(l, t, a) {
    var e = l.pendingLanes;
    if (e === 0) return 0;
    var u = 0,
      n = l.suspendedLanes,
      c = l.pingedLanes;
    l = l.warmLanes;
    var i = e & 134217727;
    return (
      i !== 0
        ? ((e = i & ~n),
          e !== 0
            ? (u = Ta(e))
            : ((c &= i),
              c !== 0
                ? (u = Ta(c))
                : a || ((a = i & ~l), a !== 0 && (u = Ta(a)))))
        : ((i = e & ~n),
          i !== 0
            ? (u = Ta(i))
            : c !== 0
            ? (u = Ta(c))
            : a || ((a = e & ~l), a !== 0 && (u = Ta(a)))),
      u === 0
        ? 0
        : t !== 0 &&
          t !== u &&
          (t & n) === 0 &&
          ((n = u & -u),
          (a = t & -t),
          n >= a || (n === 32 && (a & 4194048) !== 0))
        ? t
        : u
    );
  }
  function xe(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Ld(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function bf() {
    var l = Ou;
    return (Ou <<= 1), (Ou & 62914560) === 0 && (Ou = 4194304), l;
  }
  function kn(l) {
    for (var t = [], a = 0; 31 > a; a++) t.push(l);
    return t;
  }
  function Ue(l, t) {
    (l.pendingLanes |= t),
      t !== 268435456 &&
        ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0));
  }
  function Kd(l, t, a, e, u, n) {
    var c = l.pendingLanes;
    (l.pendingLanes = a),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= a),
      (l.entangledLanes &= a),
      (l.errorRecoveryDisabledLanes &= a),
      (l.shellSuspendCounter = 0);
    var i = l.entanglements,
      f = l.expirationTimes,
      v = l.hiddenUpdates;
    for (a = c & ~a; 0 < a; ) {
      var g = 31 - nt(a),
        p = 1 << g;
      (i[g] = 0), (f[g] = -1);
      var h = v[g];
      if (h !== null)
        for (v[g] = null, g = 0; g < h.length; g++) {
          var r = h[g];
          r !== null && (r.lane &= -536870913);
        }
      a &= ~p;
    }
    e !== 0 && pf(l, e, 0),
      n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t));
  }
  function pf(l, t, a) {
    (l.pendingLanes |= t), (l.suspendedLanes &= ~t);
    var e = 31 - nt(t);
    (l.entangledLanes |= t),
      (l.entanglements[e] = l.entanglements[e] | 1073741824 | (a & 261930));
  }
  function zf(l, t) {
    var a = (l.entangledLanes |= t);
    for (l = l.entanglements; a; ) {
      var e = 31 - nt(a),
        u = 1 << e;
      (u & t) | (l[e] & t) && (l[e] |= t), (a &= ~u);
    }
  }
  function Af(l, t) {
    var a = t & -t;
    return (
      (a = (a & 42) !== 0 ? 1 : Wn(a)),
      (a & (l.suspendedLanes | t)) !== 0 ? 0 : a
    );
  }
  function Wn(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function $n(l) {
    return (
      (l &= -l),
      2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Ef() {
    var l = M.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : sd(l.type));
  }
  function _f(l, t) {
    var a = M.p;
    try {
      return (M.p = l), t();
    } finally {
      M.p = a;
    }
  }
  var Pt = Math.random().toString(36).slice(2),
    jl = "__reactFiber$" + Pt,
    $l = "__reactProps$" + Pt,
    La = "__reactContainer$" + Pt,
    Fn = "__reactEvents$" + Pt,
    Jd = "__reactListeners$" + Pt,
    wd = "__reactHandles$" + Pt,
    Tf = "__reactResources$" + Pt,
    Ce = "__reactMarker$" + Pt;
  function In(l) {
    delete l[jl], delete l[$l], delete l[Fn], delete l[Jd], delete l[wd];
  }
  function Ka(l) {
    var t = l[jl];
    if (t) return t;
    for (var a = l.parentNode; a; ) {
      if ((t = a[La] || a[jl])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (l = wo(l); l !== null; ) {
            if ((a = l[jl])) return a;
            l = wo(l);
          }
        return t;
      }
      (l = a), (a = l.parentNode);
    }
    return null;
  }
  function Ja(l) {
    if ((l = l[jl] || l[La])) {
      var t = l.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return l;
    }
    return null;
  }
  function He(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(y(33));
  }
  function wa(l) {
    var t = l[Tf];
    return (
      t ||
        (t = l[Tf] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Cl(l) {
    l[Ce] = !0;
  }
  var Mf = new Set(),
    Of = {};
  function Ma(l, t) {
    ka(l, t), ka(l + "Capture", t);
  }
  function ka(l, t) {
    for (Of[l] = t, l = 0; l < t.length; l++) Mf.add(t[l]);
  }
  var kd = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Df = {},
    Nf = {};
  function Wd(l) {
    return Kn.call(Nf, l)
      ? !0
      : Kn.call(Df, l)
      ? !1
      : kd.test(l)
      ? (Nf[l] = !0)
      : ((Df[l] = !0), !1);
  }
  function Nu(l, t, a) {
    if (Wd(t))
      if (a === null) l.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var e = t.toLowerCase().slice(0, 5);
            if (e !== "data-" && e !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + a);
      }
  }
  function xu(l, t, a) {
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + a);
    }
  }
  function jt(l, t, a, e) {
    if (e === null) l.removeAttribute(a);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttributeNS(t, a, "" + e);
    }
  }
  function mt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function xf(l) {
    var t = l.type;
    return (
      (l = l.nodeName) &&
      l.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function $d(l, t, a) {
    var e = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (
      !l.hasOwnProperty(t) &&
      typeof e < "u" &&
      typeof e.get == "function" &&
      typeof e.set == "function"
    ) {
      var u = e.get,
        n = e.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (c) {
            (a = "" + c), n.call(this, c);
          },
        }),
        Object.defineProperty(l, t, { enumerable: e.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (c) {
            a = "" + c;
          },
          stopTracking: function () {
            (l._valueTracker = null), delete l[t];
          },
        }
      );
    }
  }
  function Pn(l) {
    if (!l._valueTracker) {
      var t = xf(l) ? "checked" : "value";
      l._valueTracker = $d(l, t, "" + l[t]);
    }
  }
  function Uf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      e = "";
    return (
      l && (e = xf(l) ? (l.checked ? "true" : "false") : l.value),
      (l = e),
      l !== a ? (t.setValue(l), !0) : !1
    );
  }
  function Uu(l) {
    if (
      ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
    )
      return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Fd = /[\n"\\]/g;
  function vt(l) {
    return l.replace(Fd, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function lc(l, t, a, e, u, n, c, i) {
    (l.name = ""),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (l.type = c)
        : l.removeAttribute("type"),
      t != null
        ? c === "number"
          ? ((t === 0 && l.value === "") || l.value != t) &&
            (l.value = "" + mt(t))
          : l.value !== "" + mt(t) && (l.value = "" + mt(t))
        : (c !== "submit" && c !== "reset") || l.removeAttribute("value"),
      t != null
        ? tc(l, c, mt(t))
        : a != null
        ? tc(l, c, mt(a))
        : e != null && l.removeAttribute("value"),
      u == null && n != null && (l.defaultChecked = !!n),
      u != null &&
        (l.checked = u && typeof u != "function" && typeof u != "symbol"),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (l.name = "" + mt(i))
        : l.removeAttribute("name");
  }
  function Cf(l, t, a, e, u, n, c, i) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (l.type = n),
      t != null || a != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || t != null)) {
        Pn(l);
        return;
      }
      (a = a != null ? "" + mt(a) : ""),
        (t = t != null ? "" + mt(t) : a),
        i || t === l.value || (l.value = t),
        (l.defaultValue = t);
    }
    (e = e ?? u),
      (e = typeof e != "function" && typeof e != "symbol" && !!e),
      (l.checked = i ? l.checked : !!e),
      (l.defaultChecked = !!e),
      c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (l.name = c),
      Pn(l);
  }
  function tc(l, t, a) {
    (t === "number" && Uu(l.ownerDocument) === l) ||
      l.defaultValue === "" + a ||
      (l.defaultValue = "" + a);
  }
  function Wa(l, t, a, e) {
    if (((l = l.options), t)) {
      t = {};
      for (var u = 0; u < a.length; u++) t["$" + a[u]] = !0;
      for (a = 0; a < l.length; a++)
        (u = t.hasOwnProperty("$" + l[a].value)),
          l[a].selected !== u && (l[a].selected = u),
          u && e && (l[a].defaultSelected = !0);
    } else {
      for (a = "" + mt(a), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === a) {
          (l[u].selected = !0), e && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Hf(l, t, a) {
    if (
      t != null &&
      ((t = "" + mt(t)), t !== l.value && (l.value = t), a == null)
    ) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = a != null ? "" + mt(a) : "";
  }
  function jf(l, t, a, e) {
    if (t == null) {
      if (e != null) {
        if (a != null) throw Error(y(92));
        if (Et(e)) {
          if (1 < e.length) throw Error(y(93));
          e = e[0];
        }
        a = e;
      }
      a == null && (a = ""), (t = a);
    }
    (a = mt(t)),
      (l.defaultValue = a),
      (e = l.textContent),
      e === a && e !== "" && e !== null && (l.value = e),
      Pn(l);
  }
  function $a(l, t) {
    if (t) {
      var a = l.firstChild;
      if (a && a === l.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var Id = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Rf(l, t, a) {
    var e = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? e
        ? l.setProperty(t, "")
        : t === "float"
        ? (l.cssFloat = "")
        : (l[t] = "")
      : e
      ? l.setProperty(t, a)
      : typeof a != "number" || a === 0 || Id.has(t)
      ? t === "float"
        ? (l.cssFloat = a)
        : (l[t] = ("" + a).trim())
      : (l[t] = a + "px");
  }
  function qf(l, t, a) {
    if (t != null && typeof t != "object") throw Error(y(62));
    if (((l = l.style), a != null)) {
      for (var e in a)
        !a.hasOwnProperty(e) ||
          (t != null && t.hasOwnProperty(e)) ||
          (e.indexOf("--") === 0
            ? l.setProperty(e, "")
            : e === "float"
            ? (l.cssFloat = "")
            : (l[e] = ""));
      for (var u in t)
        (e = t[u]), t.hasOwnProperty(u) && a[u] !== e && Rf(l, u, e);
    } else for (var n in t) t.hasOwnProperty(n) && Rf(l, n, t[n]);
  }
  function ac(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Pd = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    l1 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Cu(l) {
    return l1.test("" + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  function Rt() {}
  var ec = null;
  function uc(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var Fa = null,
    Ia = null;
  function Yf(l) {
    var t = Ja(l);
    if (t && (l = t.stateNode)) {
      var a = l[$l] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case "input":
          if (
            (lc(
              l,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === "radio" && t != null)
          ) {
            for (a = l; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + vt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var e = a[t];
              if (e !== l && e.form === l.form) {
                var u = e[$l] || null;
                if (!u) throw Error(y(90));
                lc(
                  e,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              (e = a[t]), e.form === l.form && Uf(e);
          }
          break l;
        case "textarea":
          Hf(l, a.value, a.defaultValue);
          break l;
        case "select":
          (t = a.value), t != null && Wa(l, !!a.multiple, t, !1);
      }
    }
  }
  var nc = !1;
  function Bf(l, t, a) {
    if (nc) return l(t, a);
    nc = !0;
    try {
      var e = l(t);
      return e;
    } finally {
      if (
        ((nc = !1),
        (Fa !== null || Ia !== null) &&
          (pn(), Fa && ((t = Fa), (l = Ia), (Ia = Fa = null), Yf(t), l)))
      )
        for (t = 0; t < l.length; t++) Yf(l[t]);
    }
  }
  function je(l, t) {
    var a = l.stateNode;
    if (a === null) return null;
    var e = a[$l] || null;
    if (e === null) return null;
    a = e[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (e = !e.disabled) ||
          ((l = l.type),
          (e = !(
            l === "button" ||
            l === "input" ||
            l === "select" ||
            l === "textarea"
          ))),
          (l = !e);
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (a && typeof a != "function") throw Error(y(231, t, typeof a));
    return a;
  }
  var qt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    cc = !1;
  if (qt)
    try {
      var Re = {};
      Object.defineProperty(Re, "passive", {
        get: function () {
          cc = !0;
        },
      }),
        window.addEventListener("test", Re, Re),
        window.removeEventListener("test", Re, Re);
    } catch {
      cc = !1;
    }
  var la = null,
    ic = null,
    Hu = null;
  function Gf() {
    if (Hu) return Hu;
    var l,
      t = ic,
      a = t.length,
      e,
      u = "value" in la ? la.value : la.textContent,
      n = u.length;
    for (l = 0; l < a && t[l] === u[l]; l++);
    var c = a - l;
    for (e = 1; e <= c && t[a - e] === u[n - e]; e++);
    return (Hu = u.slice(l, 1 < e ? 1 - e : void 0));
  }
  function ju(l) {
    var t = l.keyCode;
    return (
      "charCode" in l
        ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
        : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function Ru() {
    return !0;
  }
  function Qf() {
    return !1;
  }
  function Fl(l) {
    function t(a, e, u, n, c) {
      (this._reactName = a),
        (this._targetInst = u),
        (this.type = e),
        (this.nativeEvent = n),
        (this.target = c),
        (this.currentTarget = null);
      for (var i in l)
        l.hasOwnProperty(i) && ((a = l[i]), (this[i] = a ? a(n) : n[i]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? Ru
          : Qf),
        (this.isPropagationStopped = Qf),
        this
      );
    }
    return (
      T(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = Ru));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = Ru));
        },
        persist: function () {},
        isPersistent: Ru,
      }),
      t
    );
  }
  var Oa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    qu = Fl(Oa),
    qe = T({}, Oa, { view: 0, detail: 0 }),
    t1 = Fl(qe),
    fc,
    sc,
    Ye,
    Yu = T({}, qe, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: dc,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return "movementX" in l
          ? l.movementX
          : (l !== Ye &&
              (Ye && l.type === "mousemove"
                ? ((fc = l.screenX - Ye.screenX), (sc = l.screenY - Ye.screenY))
                : (sc = fc = 0),
              (Ye = l)),
            fc);
      },
      movementY: function (l) {
        return "movementY" in l ? l.movementY : sc;
      },
    }),
    Xf = Fl(Yu),
    a1 = T({}, Yu, { dataTransfer: 0 }),
    e1 = Fl(a1),
    u1 = T({}, qe, { relatedTarget: 0 }),
    oc = Fl(u1),
    n1 = T({}, Oa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    c1 = Fl(n1),
    i1 = T({}, Oa, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    f1 = Fl(i1),
    s1 = T({}, Oa, { data: 0 }),
    Zf = Fl(s1),
    o1 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    d1 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    y1 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function m1(l) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(l)
      : (l = y1[l])
      ? !!t[l]
      : !1;
  }
  function dc() {
    return m1;
  }
  var v1 = T({}, qe, {
      key: function (l) {
        if (l.key) {
          var t = o1[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = ju(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
          ? d1[l.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: dc,
      charCode: function (l) {
        return l.type === "keypress" ? ju(l) : 0;
      },
      keyCode: function (l) {
        return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === "keypress"
          ? ju(l)
          : l.type === "keydown" || l.type === "keyup"
          ? l.keyCode
          : 0;
      },
    }),
    h1 = Fl(v1),
    r1 = T({}, Yu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Vf = Fl(r1),
    g1 = T({}, qe, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: dc,
    }),
    S1 = Fl(g1),
    b1 = T({}, Oa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    p1 = Fl(b1),
    z1 = T({}, Yu, {
      deltaX: function (l) {
        return "deltaX" in l
          ? l.deltaX
          : "wheelDeltaX" in l
          ? -l.wheelDeltaX
          : 0;
      },
      deltaY: function (l) {
        return "deltaY" in l
          ? l.deltaY
          : "wheelDeltaY" in l
          ? -l.wheelDeltaY
          : "wheelDelta" in l
          ? -l.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    A1 = Fl(z1),
    E1 = T({}, Oa, { newState: 0, oldState: 0 }),
    _1 = Fl(E1),
    T1 = [9, 13, 27, 32],
    yc = qt && "CompositionEvent" in window,
    Be = null;
  qt && "documentMode" in document && (Be = document.documentMode);
  var M1 = qt && "TextEvent" in window && !Be,
    Lf = qt && (!yc || (Be && 8 < Be && 11 >= Be)),
    Kf = " ",
    Jf = !1;
  function wf(l, t) {
    switch (l) {
      case "keyup":
        return T1.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function kf(l) {
    return (l = l.detail), typeof l == "object" && "data" in l ? l.data : null;
  }
  var Pa = !1;
  function O1(l, t) {
    switch (l) {
      case "compositionend":
        return kf(t);
      case "keypress":
        return t.which !== 32 ? null : ((Jf = !0), Kf);
      case "textInput":
        return (l = t.data), l === Kf && Jf ? null : l;
      default:
        return null;
    }
  }
  function D1(l, t) {
    if (Pa)
      return l === "compositionend" || (!yc && wf(l, t))
        ? ((l = Gf()), (Hu = ic = la = null), (Pa = !1), l)
        : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Lf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var N1 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Wf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!N1[l.type] : t === "textarea";
  }
  function $f(l, t, a, e) {
    Fa ? (Ia ? Ia.push(e) : (Ia = [e])) : (Fa = e),
      (t = On(t, "onChange")),
      0 < t.length &&
        ((a = new qu("onChange", "change", null, a, e)),
        l.push({ event: a, listeners: t }));
  }
  var Ge = null,
    Qe = null;
  function x1(l) {
    Ho(l, 0);
  }
  function Bu(l) {
    var t = He(l);
    if (Uf(t)) return l;
  }
  function Ff(l, t) {
    if (l === "change") return t;
  }
  var If = !1;
  if (qt) {
    var mc;
    if (qt) {
      var vc = "oninput" in document;
      if (!vc) {
        var Pf = document.createElement("div");
        Pf.setAttribute("oninput", "return;"),
          (vc = typeof Pf.oninput == "function");
      }
      mc = vc;
    } else mc = !1;
    If = mc && (!document.documentMode || 9 < document.documentMode);
  }
  function ls() {
    Ge && (Ge.detachEvent("onpropertychange", ts), (Qe = Ge = null));
  }
  function ts(l) {
    if (l.propertyName === "value" && Bu(Qe)) {
      var t = [];
      $f(t, Qe, l, uc(l)), Bf(x1, t);
    }
  }
  function U1(l, t, a) {
    l === "focusin"
      ? (ls(), (Ge = t), (Qe = a), Ge.attachEvent("onpropertychange", ts))
      : l === "focusout" && ls();
  }
  function C1(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Bu(Qe);
  }
  function H1(l, t) {
    if (l === "click") return Bu(t);
  }
  function j1(l, t) {
    if (l === "input" || l === "change") return Bu(t);
  }
  function R1(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var ct = typeof Object.is == "function" ? Object.is : R1;
  function Xe(l, t) {
    if (ct(l, t)) return !0;
    if (
      typeof l != "object" ||
      l === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var a = Object.keys(l),
      e = Object.keys(t);
    if (a.length !== e.length) return !1;
    for (e = 0; e < a.length; e++) {
      var u = a[e];
      if (!Kn.call(t, u) || !ct(l[u], t[u])) return !1;
    }
    return !0;
  }
  function as(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function es(l, t) {
    var a = as(l);
    l = 0;
    for (var e; a; ) {
      if (a.nodeType === 3) {
        if (((e = l + a.textContent.length), l <= t && e >= t))
          return { node: a, offset: t - l };
        l = e;
      }
      l: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break l;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = as(a);
    }
  }
  function us(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? us(l, t.parentNode)
        : "contains" in l
        ? l.contains(t)
        : l.compareDocumentPosition
        ? !!(l.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function ns(l) {
    l =
      l != null &&
      l.ownerDocument != null &&
      l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = Uu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) l = t.contentWindow;
      else break;
      t = Uu(l.document);
    }
    return t;
  }
  function hc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (l.type === "text" ||
          l.type === "search" ||
          l.type === "tel" ||
          l.type === "url" ||
          l.type === "password")) ||
        t === "textarea" ||
        l.contentEditable === "true")
    );
  }
  var q1 = qt && "documentMode" in document && 11 >= document.documentMode,
    le = null,
    rc = null,
    Ze = null,
    gc = !1;
  function cs(l, t, a) {
    var e =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    gc ||
      le == null ||
      le !== Uu(e) ||
      ((e = le),
      "selectionStart" in e && hc(e)
        ? (e = { start: e.selectionStart, end: e.selectionEnd })
        : ((e = (
            (e.ownerDocument && e.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (e = {
            anchorNode: e.anchorNode,
            anchorOffset: e.anchorOffset,
            focusNode: e.focusNode,
            focusOffset: e.focusOffset,
          })),
      (Ze && Xe(Ze, e)) ||
        ((Ze = e),
        (e = On(rc, "onSelect")),
        0 < e.length &&
          ((t = new qu("onSelect", "select", null, t, a)),
          l.push({ event: t, listeners: e }),
          (t.target = le))));
  }
  function Da(l, t) {
    var a = {};
    return (
      (a[l.toLowerCase()] = t.toLowerCase()),
      (a["Webkit" + l] = "webkit" + t),
      (a["Moz" + l] = "moz" + t),
      a
    );
  }
  var te = {
      animationend: Da("Animation", "AnimationEnd"),
      animationiteration: Da("Animation", "AnimationIteration"),
      animationstart: Da("Animation", "AnimationStart"),
      transitionrun: Da("Transition", "TransitionRun"),
      transitionstart: Da("Transition", "TransitionStart"),
      transitioncancel: Da("Transition", "TransitionCancel"),
      transitionend: Da("Transition", "TransitionEnd"),
    },
    Sc = {},
    is = {};
  qt &&
    ((is = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete te.animationend.animation,
      delete te.animationiteration.animation,
      delete te.animationstart.animation),
    "TransitionEvent" in window || delete te.transitionend.transition);
  function Na(l) {
    if (Sc[l]) return Sc[l];
    if (!te[l]) return l;
    var t = te[l],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in is) return (Sc[l] = t[a]);
    return l;
  }
  var fs = Na("animationend"),
    ss = Na("animationiteration"),
    os = Na("animationstart"),
    Y1 = Na("transitionrun"),
    B1 = Na("transitionstart"),
    G1 = Na("transitioncancel"),
    ds = Na("transitionend"),
    ys = new Map(),
    bc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  bc.push("scrollEnd");
  function _t(l, t) {
    ys.set(l, t), Ma(t, [l]);
  }
  var Gu =
      typeof reportError == "function"
        ? reportError
        : function (l) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof l == "object" &&
                  l !== null &&
                  typeof l.message == "string"
                    ? String(l.message)
                    : String(l),
                error: l,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", l);
              return;
            }
            console.error(l);
          },
    ht = [],
    ae = 0,
    pc = 0;
  function Qu() {
    for (var l = ae, t = (pc = ae = 0); t < l; ) {
      var a = ht[t];
      ht[t++] = null;
      var e = ht[t];
      ht[t++] = null;
      var u = ht[t];
      ht[t++] = null;
      var n = ht[t];
      if (((ht[t++] = null), e !== null && u !== null)) {
        var c = e.pending;
        c === null ? (u.next = u) : ((u.next = c.next), (c.next = u)),
          (e.pending = u);
      }
      n !== 0 && ms(a, u, n);
    }
  }
  function Xu(l, t, a, e) {
    (ht[ae++] = l),
      (ht[ae++] = t),
      (ht[ae++] = a),
      (ht[ae++] = e),
      (pc |= e),
      (l.lanes |= e),
      (l = l.alternate),
      l !== null && (l.lanes |= e);
  }
  function zc(l, t, a, e) {
    return Xu(l, t, a, e), Zu(l);
  }
  function xa(l, t) {
    return Xu(l, null, null, t), Zu(l);
  }
  function ms(l, t, a) {
    l.lanes |= a;
    var e = l.alternate;
    e !== null && (e.lanes |= a);
    for (var u = !1, n = l.return; n !== null; )
      (n.childLanes |= a),
        (e = n.alternate),
        e !== null && (e.childLanes |= a),
        n.tag === 22 &&
          ((l = n.stateNode), l === null || l._visibility & 1 || (u = !0)),
        (l = n),
        (n = n.return);
    return l.tag === 3
      ? ((n = l.stateNode),
        u &&
          t !== null &&
          ((u = 31 - nt(a)),
          (l = n.hiddenUpdates),
          (e = l[u]),
          e === null ? (l[u] = [t]) : e.push(t),
          (t.lane = a | 536870912)),
        n)
      : null;
  }
  function Zu(l) {
    if (50 < ou) throw ((ou = 0), (xi = null), Error(y(185)));
    for (var t = l.return; t !== null; ) (l = t), (t = l.return);
    return l.tag === 3 ? l.stateNode : null;
  }
  var ee = {};
  function Q1(l, t, a, e) {
    (this.tag = l),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = e),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function it(l, t, a, e) {
    return new Q1(l, t, a, e);
  }
  function Ac(l) {
    return (l = l.prototype), !(!l || !l.isReactComponent);
  }
  function Yt(l, t) {
    var a = l.alternate;
    return (
      a === null
        ? ((a = it(l.tag, t, l.key, l.mode)),
          (a.elementType = l.elementType),
          (a.type = l.type),
          (a.stateNode = l.stateNode),
          (a.alternate = l),
          (l.alternate = a))
        : ((a.pendingProps = t),
          (a.type = l.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = l.flags & 65011712),
      (a.childLanes = l.childLanes),
      (a.lanes = l.lanes),
      (a.child = l.child),
      (a.memoizedProps = l.memoizedProps),
      (a.memoizedState = l.memoizedState),
      (a.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = l.sibling),
      (a.index = l.index),
      (a.ref = l.ref),
      (a.refCleanup = l.refCleanup),
      a
    );
  }
  function vs(l, t) {
    l.flags &= 65011714;
    var a = l.alternate;
    return (
      a === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = a.childLanes),
          (l.lanes = a.lanes),
          (l.child = a.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = a.memoizedProps),
          (l.memoizedState = a.memoizedState),
          (l.updateQueue = a.updateQueue),
          (l.type = a.type),
          (t = a.dependencies),
          (l.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function Vu(l, t, a, e, u, n) {
    var c = 0;
    if (((e = l), typeof l == "function")) Ac(l) && (c = 1);
    else if (typeof l == "string")
      c = Ky(l, a, x.current)
        ? 26
        : l === "html" || l === "head" || l === "body"
        ? 27
        : 5;
    else
      l: switch (l) {
        case Ot:
          return (l = it(31, a, t, u)), (l.elementType = Ot), (l.lanes = n), l;
        case bl:
          return Ua(a.children, u, n, t);
        case Ql:
          (c = 8), (u |= 24);
          break;
        case tl:
          return (
            (l = it(12, a, t, u | 2)), (l.elementType = tl), (l.lanes = n), l
          );
        case Xl:
          return (l = it(13, a, t, u)), (l.elementType = Xl), (l.lanes = n), l;
        case wl:
          return (l = it(19, a, t, u)), (l.elementType = wl), (l.lanes = n), l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case _l:
                c = 10;
                break l;
              case pl:
                c = 9;
                break l;
              case Jl:
                c = 11;
                break l;
              case W:
                c = 14;
                break l;
              case kl:
                (c = 16), (e = null);
                break l;
            }
          (c = 29),
            (a = Error(y(130, l === null ? "null" : typeof l, ""))),
            (e = null);
      }
    return (
      (t = it(c, a, t, u)), (t.elementType = l), (t.type = e), (t.lanes = n), t
    );
  }
  function Ua(l, t, a, e) {
    return (l = it(7, l, e, t)), (l.lanes = a), l;
  }
  function Ec(l, t, a) {
    return (l = it(6, l, null, t)), (l.lanes = a), l;
  }
  function hs(l) {
    var t = it(18, null, null, 0);
    return (t.stateNode = l), t;
  }
  function _c(l, t, a) {
    return (
      (t = it(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: l.containerInfo,
        pendingChildren: null,
        implementation: l.implementation,
      }),
      t
    );
  }
  var rs = new WeakMap();
  function rt(l, t) {
    if (typeof l == "object" && l !== null) {
      var a = rs.get(l);
      return a !== void 0
        ? a
        : ((t = { value: l, source: t, stack: hf(t) }), rs.set(l, t), t);
    }
    return { value: l, source: t, stack: hf(t) };
  }
  var ue = [],
    ne = 0,
    Lu = null,
    Ve = 0,
    gt = [],
    St = 0,
    ta = null,
    Nt = 1,
    xt = "";
  function Bt(l, t) {
    (ue[ne++] = Ve), (ue[ne++] = Lu), (Lu = l), (Ve = t);
  }
  function gs(l, t, a) {
    (gt[St++] = Nt), (gt[St++] = xt), (gt[St++] = ta), (ta = l);
    var e = Nt;
    l = xt;
    var u = 32 - nt(e) - 1;
    (e &= ~(1 << u)), (a += 1);
    var n = 32 - nt(t) + u;
    if (30 < n) {
      var c = u - (u % 5);
      (n = (e & ((1 << c) - 1)).toString(32)),
        (e >>= c),
        (u -= c),
        (Nt = (1 << (32 - nt(t) + u)) | (a << u) | e),
        (xt = n + l);
    } else (Nt = (1 << n) | (a << u) | e), (xt = l);
  }
  function Tc(l) {
    l.return !== null && (Bt(l, 1), gs(l, 1, 0));
  }
  function Mc(l) {
    for (; l === Lu; )
      (Lu = ue[--ne]), (ue[ne] = null), (Ve = ue[--ne]), (ue[ne] = null);
    for (; l === ta; )
      (ta = gt[--St]),
        (gt[St] = null),
        (xt = gt[--St]),
        (gt[St] = null),
        (Nt = gt[--St]),
        (gt[St] = null);
  }
  function Ss(l, t) {
    (gt[St++] = Nt),
      (gt[St++] = xt),
      (gt[St++] = ta),
      (Nt = t.id),
      (xt = t.overflow),
      (ta = l);
  }
  var Rl = null,
    vl = null,
    $ = !1,
    aa = null,
    bt = !1,
    Oc = Error(y(519));
  function ea(l) {
    var t = Error(
      y(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (Le(rt(t, l)), Oc);
  }
  function bs(l) {
    var t = l.stateNode,
      a = l.type,
      e = l.memoizedProps;
    switch (((t[jl] = l), (t[$l] = e), a)) {
      case "dialog":
        J("cancel", t), J("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        J("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < yu.length; a++) J(yu[a], t);
        break;
      case "source":
        J("error", t);
        break;
      case "img":
      case "image":
      case "link":
        J("error", t), J("load", t);
        break;
      case "details":
        J("toggle", t);
        break;
      case "input":
        J("invalid", t),
          Cf(
            t,
            e.value,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name,
            !0
          );
        break;
      case "select":
        J("invalid", t);
        break;
      case "textarea":
        J("invalid", t), jf(t, e.value, e.defaultValue, e.children);
    }
    (a = e.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      t.textContent === "" + a ||
      e.suppressHydrationWarning === !0 ||
      Yo(t.textContent, a)
        ? (e.popover != null && (J("beforetoggle", t), J("toggle", t)),
          e.onScroll != null && J("scroll", t),
          e.onScrollEnd != null && J("scrollend", t),
          e.onClick != null && (t.onclick = Rt),
          (t = !0))
        : (t = !1),
      t || ea(l, !0);
  }
  function ps(l) {
    for (Rl = l.return; Rl; )
      switch (Rl.tag) {
        case 5:
        case 31:
        case 13:
          bt = !1;
          return;
        case 27:
        case 3:
          bt = !0;
          return;
        default:
          Rl = Rl.return;
      }
  }
  function ce(l) {
    if (l !== Rl) return !1;
    if (!$) return ps(l), ($ = !0), !1;
    var t = l.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = l.type),
          (a =
            !(a !== "form" && a !== "button") || Ki(l.type, l.memoizedProps))),
        (a = !a)),
      a && vl && ea(l),
      ps(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(y(317));
      vl = Jo(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(y(317));
      vl = Jo(l);
    } else
      t === 27
        ? ((t = vl), ga(l.type) ? ((l = $i), ($i = null), (vl = l)) : (vl = t))
        : (vl = Rl ? zt(l.stateNode.nextSibling) : null);
    return !0;
  }
  function Ca() {
    (vl = Rl = null), ($ = !1);
  }
  function Dc() {
    var l = aa;
    return (
      l !== null &&
        (tt === null ? (tt = l) : tt.push.apply(tt, l), (aa = null)),
      l
    );
  }
  function Le(l) {
    aa === null ? (aa = [l]) : aa.push(l);
  }
  var Nc = o(null),
    Ha = null,
    Gt = null;
  function ua(l, t, a) {
    O(Nc, t._currentValue), (t._currentValue = a);
  }
  function Qt(l) {
    (l._currentValue = Nc.current), A(Nc);
  }
  function xc(l, t, a) {
    for (; l !== null; ) {
      var e = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), e !== null && (e.childLanes |= t))
          : e !== null && (e.childLanes & t) !== t && (e.childLanes |= t),
        l === a)
      )
        break;
      l = l.return;
    }
  }
  function Uc(l, t, a, e) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var i = n;
          n = u;
          for (var f = 0; f < t.length; f++)
            if (i.context === t[f]) {
              (n.lanes |= a),
                (i = n.alternate),
                i !== null && (i.lanes |= a),
                xc(n.return, a, l),
                e || (c = null);
              break l;
            }
          n = i.next;
        }
      } else if (u.tag === 18) {
        if (((c = u.return), c === null)) throw Error(y(341));
        (c.lanes |= a),
          (n = c.alternate),
          n !== null && (n.lanes |= a),
          xc(c, a, l),
          (c = null);
      } else c = u.child;
      if (c !== null) c.return = u;
      else
        for (c = u; c !== null; ) {
          if (c === l) {
            c = null;
            break;
          }
          if (((u = c.sibling), u !== null)) {
            (u.return = c.return), (c = u);
            break;
          }
          c = c.return;
        }
      u = c;
    }
  }
  function ie(l, t, a, e) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var c = u.alternate;
        if (c === null) throw Error(y(387));
        if (((c = c.memoizedProps), c !== null)) {
          var i = u.type;
          ct(u.pendingProps.value, c.value) ||
            (l !== null ? l.push(i) : (l = [i]));
        }
      } else if (u === el.current) {
        if (((c = u.alternate), c === null)) throw Error(y(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (l !== null ? l.push(gu) : (l = [gu]));
      }
      u = u.return;
    }
    l !== null && Uc(t, l, a, e), (t.flags |= 262144);
  }
  function Ku(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ct(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function ja(l) {
    (Ha = l),
      (Gt = null),
      (l = l.dependencies),
      l !== null && (l.firstContext = null);
  }
  function ql(l) {
    return zs(Ha, l);
  }
  function Ju(l, t) {
    return Ha === null && ja(l), zs(l, t);
  }
  function zs(l, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Gt === null)) {
      if (l === null) throw Error(y(308));
      (Gt = t),
        (l.dependencies = { lanes: 0, firstContext: t }),
        (l.flags |= 524288);
    } else Gt = Gt.next = t;
    return a;
  }
  var X1 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, e) {
                  l.push(e);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                l.forEach(function (a) {
                  return a();
                });
            };
          },
    Z1 = z.unstable_scheduleCallback,
    V1 = z.unstable_NormalPriority,
    Tl = {
      $$typeof: _l,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Cc() {
    return { controller: new X1(), data: new Map(), refCount: 0 };
  }
  function Ke(l) {
    l.refCount--,
      l.refCount === 0 &&
        Z1(V1, function () {
          l.controller.abort();
        });
  }
  var Je = null,
    Hc = 0,
    fe = 0,
    se = null;
  function L1(l, t) {
    if (Je === null) {
      var a = (Je = []);
      (Hc = 0),
        (fe = qi()),
        (se = {
          status: "pending",
          value: void 0,
          then: function (e) {
            a.push(e);
          },
        });
    }
    return Hc++, t.then(As, As), t;
  }
  function As() {
    if (--Hc === 0 && Je !== null) {
      se !== null && (se.status = "fulfilled");
      var l = Je;
      (Je = null), (fe = 0), (se = null);
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function K1(l, t) {
    var a = [],
      e = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          a.push(u);
        },
      };
    return (
      l.then(
        function () {
          (e.status = "fulfilled"), (e.value = t);
          for (var u = 0; u < a.length; u++) (0, a[u])(t);
        },
        function (u) {
          for (e.status = "rejected", e.reason = u, u = 0; u < a.length; u++)
            (0, a[u])(void 0);
        }
      ),
      e
    );
  }
  var Es = S.S;
  S.S = function (l, t) {
    (co = et()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        L1(l, t),
      Es !== null && Es(l, t);
  };
  var Ra = o(null);
  function jc() {
    var l = Ra.current;
    return l !== null ? l : yl.pooledCache;
  }
  function wu(l, t) {
    t === null ? O(Ra, Ra.current) : O(Ra, t.pool);
  }
  function _s() {
    var l = jc();
    return l === null ? null : { parent: Tl._currentValue, pool: l };
  }
  var oe = Error(y(460)),
    Rc = Error(y(474)),
    ku = Error(y(542)),
    Wu = { then: function () {} };
  function Ts(l) {
    return (l = l.status), l === "fulfilled" || l === "rejected";
  }
  function Ms(l, t, a) {
    switch (
      ((a = l[a]),
      a === void 0 ? l.push(t) : a !== t && (t.then(Rt, Rt), (t = a)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((l = t.reason), Ds(l), l);
      default:
        if (typeof t.status == "string") t.then(Rt, Rt);
        else {
          if (((l = yl), l !== null && 100 < l.shellSuspendCounter))
            throw Error(y(482));
          (l = t),
            (l.status = "pending"),
            l.then(
              function (e) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "fulfilled"), (u.value = e);
                }
              },
              function (e) {
                if (t.status === "pending") {
                  var u = t;
                  (u.status = "rejected"), (u.reason = e);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((l = t.reason), Ds(l), l);
        }
        throw ((Ya = t), oe);
    }
  }
  function qa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function"
        ? ((Ya = a), oe)
        : a;
    }
  }
  var Ya = null;
  function Os() {
    if (Ya === null) throw Error(y(459));
    var l = Ya;
    return (Ya = null), l;
  }
  function Ds(l) {
    if (l === oe || l === ku) throw Error(y(483));
  }
  var de = null,
    we = 0;
  function $u(l) {
    var t = we;
    return (we += 1), de === null && (de = []), Ms(de, l, t);
  }
  function ke(l, t) {
    (t = t.props.ref), (l.ref = t !== void 0 ? t : null);
  }
  function Fu(l, t) {
    throw t.$$typeof === ll
      ? Error(y(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          y(
            31,
            l === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : l
          )
        ));
  }
  function Ns(l) {
    function t(d, s) {
      if (l) {
        var m = d.deletions;
        m === null ? ((d.deletions = [s]), (d.flags |= 16)) : m.push(s);
      }
    }
    function a(d, s) {
      if (!l) return null;
      for (; s !== null; ) t(d, s), (s = s.sibling);
      return null;
    }
    function e(d) {
      for (var s = new Map(); d !== null; )
        d.key !== null ? s.set(d.key, d) : s.set(d.index, d), (d = d.sibling);
      return s;
    }
    function u(d, s) {
      return (d = Yt(d, s)), (d.index = 0), (d.sibling = null), d;
    }
    function n(d, s, m) {
      return (
        (d.index = m),
        l
          ? ((m = d.alternate),
            m !== null
              ? ((m = m.index), m < s ? ((d.flags |= 67108866), s) : m)
              : ((d.flags |= 67108866), s))
          : ((d.flags |= 1048576), s)
      );
    }
    function c(d) {
      return l && d.alternate === null && (d.flags |= 67108866), d;
    }
    function i(d, s, m, b) {
      return s === null || s.tag !== 6
        ? ((s = Ec(m, d.mode, b)), (s.return = d), s)
        : ((s = u(s, m)), (s.return = d), s);
    }
    function f(d, s, m, b) {
      var R = m.type;
      return R === bl
        ? g(d, s, m.props.children, b, m.key)
        : s !== null &&
          (s.elementType === R ||
            (typeof R == "object" &&
              R !== null &&
              R.$$typeof === kl &&
              qa(R) === s.type))
        ? ((s = u(s, m.props)), ke(s, m), (s.return = d), s)
        : ((s = Vu(m.type, m.key, m.props, null, d.mode, b)),
          ke(s, m),
          (s.return = d),
          s);
    }
    function v(d, s, m, b) {
      return s === null ||
        s.tag !== 4 ||
        s.stateNode.containerInfo !== m.containerInfo ||
        s.stateNode.implementation !== m.implementation
        ? ((s = _c(m, d.mode, b)), (s.return = d), s)
        : ((s = u(s, m.children || [])), (s.return = d), s);
    }
    function g(d, s, m, b, R) {
      return s === null || s.tag !== 7
        ? ((s = Ua(m, d.mode, b, R)), (s.return = d), s)
        : ((s = u(s, m)), (s.return = d), s);
    }
    function p(d, s, m) {
      if (
        (typeof s == "string" && s !== "") ||
        typeof s == "number" ||
        typeof s == "bigint"
      )
        return (s = Ec("" + s, d.mode, m)), (s.return = d), s;
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case Ul:
            return (
              (m = Vu(s.type, s.key, s.props, null, d.mode, m)),
              ke(m, s),
              (m.return = d),
              m
            );
          case ml:
            return (s = _c(s, d.mode, m)), (s.return = d), s;
          case kl:
            return (s = qa(s)), p(d, s, m);
        }
        if (Et(s) || Wl(s))
          return (s = Ua(s, d.mode, m, null)), (s.return = d), s;
        if (typeof s.then == "function") return p(d, $u(s), m);
        if (s.$$typeof === _l) return p(d, Ju(d, s), m);
        Fu(d, s);
      }
      return null;
    }
    function h(d, s, m, b) {
      var R = s !== null ? s.key : null;
      if (
        (typeof m == "string" && m !== "") ||
        typeof m == "number" ||
        typeof m == "bigint"
      )
        return R !== null ? null : i(d, s, "" + m, b);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case Ul:
            return m.key === R ? f(d, s, m, b) : null;
          case ml:
            return m.key === R ? v(d, s, m, b) : null;
          case kl:
            return (m = qa(m)), h(d, s, m, b);
        }
        if (Et(m) || Wl(m)) return R !== null ? null : g(d, s, m, b, null);
        if (typeof m.then == "function") return h(d, s, $u(m), b);
        if (m.$$typeof === _l) return h(d, s, Ju(d, m), b);
        Fu(d, m);
      }
      return null;
    }
    function r(d, s, m, b, R) {
      if (
        (typeof b == "string" && b !== "") ||
        typeof b == "number" ||
        typeof b == "bigint"
      )
        return (d = d.get(m) || null), i(s, d, "" + b, R);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Ul:
            return (
              (d = d.get(b.key === null ? m : b.key) || null), f(s, d, b, R)
            );
          case ml:
            return (
              (d = d.get(b.key === null ? m : b.key) || null), v(s, d, b, R)
            );
          case kl:
            return (b = qa(b)), r(d, s, m, b, R);
        }
        if (Et(b) || Wl(b)) return (d = d.get(m) || null), g(s, d, b, R, null);
        if (typeof b.then == "function") return r(d, s, m, $u(b), R);
        if (b.$$typeof === _l) return r(d, s, m, Ju(s, b), R);
        Fu(s, b);
      }
      return null;
    }
    function D(d, s, m, b) {
      for (
        var R = null, I = null, U = s, V = (s = 0), k = null;
        U !== null && V < m.length;
        V++
      ) {
        U.index > V ? ((k = U), (U = null)) : (k = U.sibling);
        var P = h(d, U, m[V], b);
        if (P === null) {
          U === null && (U = k);
          break;
        }
        l && U && P.alternate === null && t(d, U),
          (s = n(P, s, V)),
          I === null ? (R = P) : (I.sibling = P),
          (I = P),
          (U = k);
      }
      if (V === m.length) return a(d, U), $ && Bt(d, V), R;
      if (U === null) {
        for (; V < m.length; V++)
          (U = p(d, m[V], b)),
            U !== null &&
              ((s = n(U, s, V)),
              I === null ? (R = U) : (I.sibling = U),
              (I = U));
        return $ && Bt(d, V), R;
      }
      for (U = e(U); V < m.length; V++)
        (k = r(U, d, V, m[V], b)),
          k !== null &&
            (l && k.alternate !== null && U.delete(k.key === null ? V : k.key),
            (s = n(k, s, V)),
            I === null ? (R = k) : (I.sibling = k),
            (I = k));
      return (
        l &&
          U.forEach(function (Aa) {
            return t(d, Aa);
          }),
        $ && Bt(d, V),
        R
      );
    }
    function q(d, s, m, b) {
      if (m == null) throw Error(y(151));
      for (
        var R = null, I = null, U = s, V = (s = 0), k = null, P = m.next();
        U !== null && !P.done;
        V++, P = m.next()
      ) {
        U.index > V ? ((k = U), (U = null)) : (k = U.sibling);
        var Aa = h(d, U, P.value, b);
        if (Aa === null) {
          U === null && (U = k);
          break;
        }
        l && U && Aa.alternate === null && t(d, U),
          (s = n(Aa, s, V)),
          I === null ? (R = Aa) : (I.sibling = Aa),
          (I = Aa),
          (U = k);
      }
      if (P.done) return a(d, U), $ && Bt(d, V), R;
      if (U === null) {
        for (; !P.done; V++, P = m.next())
          (P = p(d, P.value, b)),
            P !== null &&
              ((s = n(P, s, V)),
              I === null ? (R = P) : (I.sibling = P),
              (I = P));
        return $ && Bt(d, V), R;
      }
      for (U = e(U); !P.done; V++, P = m.next())
        (P = r(U, d, V, P.value, b)),
          P !== null &&
            (l && P.alternate !== null && U.delete(P.key === null ? V : P.key),
            (s = n(P, s, V)),
            I === null ? (R = P) : (I.sibling = P),
            (I = P));
      return (
        l &&
          U.forEach(function (am) {
            return t(d, am);
          }),
        $ && Bt(d, V),
        R
      );
    }
    function ol(d, s, m, b) {
      if (
        (typeof m == "object" &&
          m !== null &&
          m.type === bl &&
          m.key === null &&
          (m = m.props.children),
        typeof m == "object" && m !== null)
      ) {
        switch (m.$$typeof) {
          case Ul:
            l: {
              for (var R = m.key; s !== null; ) {
                if (s.key === R) {
                  if (((R = m.type), R === bl)) {
                    if (s.tag === 7) {
                      a(d, s.sibling),
                        (b = u(s, m.props.children)),
                        (b.return = d),
                        (d = b);
                      break l;
                    }
                  } else if (
                    s.elementType === R ||
                    (typeof R == "object" &&
                      R !== null &&
                      R.$$typeof === kl &&
                      qa(R) === s.type)
                  ) {
                    a(d, s.sibling),
                      (b = u(s, m.props)),
                      ke(b, m),
                      (b.return = d),
                      (d = b);
                    break l;
                  }
                  a(d, s);
                  break;
                } else t(d, s);
                s = s.sibling;
              }
              m.type === bl
                ? ((b = Ua(m.props.children, d.mode, b, m.key)),
                  (b.return = d),
                  (d = b))
                : ((b = Vu(m.type, m.key, m.props, null, d.mode, b)),
                  ke(b, m),
                  (b.return = d),
                  (d = b));
            }
            return c(d);
          case ml:
            l: {
              for (R = m.key; s !== null; ) {
                if (s.key === R)
                  if (
                    s.tag === 4 &&
                    s.stateNode.containerInfo === m.containerInfo &&
                    s.stateNode.implementation === m.implementation
                  ) {
                    a(d, s.sibling),
                      (b = u(s, m.children || [])),
                      (b.return = d),
                      (d = b);
                    break l;
                  } else {
                    a(d, s);
                    break;
                  }
                else t(d, s);
                s = s.sibling;
              }
              (b = _c(m, d.mode, b)), (b.return = d), (d = b);
            }
            return c(d);
          case kl:
            return (m = qa(m)), ol(d, s, m, b);
        }
        if (Et(m)) return D(d, s, m, b);
        if (Wl(m)) {
          if (((R = Wl(m)), typeof R != "function")) throw Error(y(150));
          return (m = R.call(m)), q(d, s, m, b);
        }
        if (typeof m.then == "function") return ol(d, s, $u(m), b);
        if (m.$$typeof === _l) return ol(d, s, Ju(d, m), b);
        Fu(d, m);
      }
      return (typeof m == "string" && m !== "") ||
        typeof m == "number" ||
        typeof m == "bigint"
        ? ((m = "" + m),
          s !== null && s.tag === 6
            ? (a(d, s.sibling), (b = u(s, m)), (b.return = d), (d = b))
            : (a(d, s), (b = Ec(m, d.mode, b)), (b.return = d), (d = b)),
          c(d))
        : a(d, s);
    }
    return function (d, s, m, b) {
      try {
        we = 0;
        var R = ol(d, s, m, b);
        return (de = null), R;
      } catch (U) {
        if (U === oe || U === ku) throw U;
        var I = it(29, U, null, d.mode);
        return (I.lanes = b), (I.return = d), I;
      } finally {
      }
    };
  }
  var Ba = Ns(!0),
    xs = Ns(!1),
    na = !1;
  function qc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Yc(l, t) {
    (l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        });
  }
  function ca(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ia(l, t, a) {
    var e = l.updateQueue;
    if (e === null) return null;
    if (((e = e.shared), (al & 2) !== 0)) {
      var u = e.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (e.pending = t),
        (t = Zu(l)),
        ms(l, null, a),
        t
      );
    }
    return Xu(l, e, t, a), Zu(l);
  }
  function We(l, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
    ) {
      var e = t.lanes;
      (e &= l.pendingLanes), (a |= e), (t.lanes = a), zf(l, a);
    }
  }
  function Bc(l, t) {
    var a = l.updateQueue,
      e = l.alternate;
    if (e !== null && ((e = e.updateQueue), a === e)) {
      var u = null,
        n = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var c = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          n === null ? (u = n = c) : (n = n.next = c), (a = a.next);
        } while (a !== null);
        n === null ? (u = n = t) : (n = n.next = t);
      } else u = n = t;
      (a = {
        baseState: e.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: e.shared,
        callbacks: e.callbacks,
      }),
        (l.updateQueue = a);
      return;
    }
    (l = a.lastBaseUpdate),
      l === null ? (a.firstBaseUpdate = t) : (l.next = t),
      (a.lastBaseUpdate = t);
  }
  var Gc = !1;
  function $e() {
    if (Gc) {
      var l = se;
      if (l !== null) throw l;
    }
  }
  function Fe(l, t, a, e) {
    Gc = !1;
    var u = l.updateQueue;
    na = !1;
    var n = u.firstBaseUpdate,
      c = u.lastBaseUpdate,
      i = u.shared.pending;
    if (i !== null) {
      u.shared.pending = null;
      var f = i,
        v = f.next;
      (f.next = null), c === null ? (n = v) : (c.next = v), (c = f);
      var g = l.alternate;
      g !== null &&
        ((g = g.updateQueue),
        (i = g.lastBaseUpdate),
        i !== c &&
          (i === null ? (g.firstBaseUpdate = v) : (i.next = v),
          (g.lastBaseUpdate = f)));
    }
    if (n !== null) {
      var p = u.baseState;
      (c = 0), (g = v = f = null), (i = n);
      do {
        var h = i.lane & -536870913,
          r = h !== i.lane;
        if (r ? (w & h) === h : (e & h) === h) {
          h !== 0 && h === fe && (Gc = !0),
            g !== null &&
              (g = g.next =
                {
                  lane: 0,
                  tag: i.tag,
                  payload: i.payload,
                  callback: null,
                  next: null,
                });
          l: {
            var D = l,
              q = i;
            h = t;
            var ol = a;
            switch (q.tag) {
              case 1:
                if (((D = q.payload), typeof D == "function")) {
                  p = D.call(ol, p, h);
                  break l;
                }
                p = D;
                break l;
              case 3:
                D.flags = (D.flags & -65537) | 128;
              case 0:
                if (
                  ((D = q.payload),
                  (h = typeof D == "function" ? D.call(ol, p, h) : D),
                  h == null)
                )
                  break l;
                p = T({}, p, h);
                break l;
              case 2:
                na = !0;
            }
          }
          (h = i.callback),
            h !== null &&
              ((l.flags |= 64),
              r && (l.flags |= 8192),
              (r = u.callbacks),
              r === null ? (u.callbacks = [h]) : r.push(h));
        } else
          (r = {
            lane: h,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          }),
            g === null ? ((v = g = r), (f = p)) : (g = g.next = r),
            (c |= h);
        if (((i = i.next), i === null)) {
          if (((i = u.shared.pending), i === null)) break;
          (r = i),
            (i = r.next),
            (r.next = null),
            (u.lastBaseUpdate = r),
            (u.shared.pending = null);
        }
      } while (!0);
      g === null && (f = p),
        (u.baseState = f),
        (u.firstBaseUpdate = v),
        (u.lastBaseUpdate = g),
        n === null && (u.shared.lanes = 0),
        (ya |= c),
        (l.lanes = c),
        (l.memoizedState = p);
    }
  }
  function Us(l, t) {
    if (typeof l != "function") throw Error(y(191, l));
    l.call(t);
  }
  function Cs(l, t) {
    var a = l.callbacks;
    if (a !== null)
      for (l.callbacks = null, l = 0; l < a.length; l++) Us(a[l], t);
  }
  var ye = o(null),
    Iu = o(0);
  function Hs(l, t) {
    (l = Wt), O(Iu, l), O(ye, t), (Wt = l | t.baseLanes);
  }
  function Qc() {
    O(Iu, Wt), O(ye, ye.current);
  }
  function Xc() {
    (Wt = Iu.current), A(ye), A(Iu);
  }
  var ft = o(null),
    pt = null;
  function fa(l) {
    var t = l.alternate;
    O(Al, Al.current & 1),
      O(ft, l),
      pt === null &&
        (t === null || ye.current !== null || t.memoizedState !== null) &&
        (pt = l);
  }
  function Zc(l) {
    O(Al, Al.current), O(ft, l), pt === null && (pt = l);
  }
  function js(l) {
    l.tag === 22
      ? (O(Al, Al.current), O(ft, l), pt === null && (pt = l))
      : sa();
  }
  function sa() {
    O(Al, Al.current), O(ft, ft.current);
  }
  function st(l) {
    A(ft), pt === l && (pt = null), A(Al);
  }
  var Al = o(0);
  function Pu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || ki(a) || Wi(a)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var Xt = 0,
    Z = null,
    fl = null,
    Ml = null,
    ln = !1,
    me = !1,
    Ga = !1,
    tn = 0,
    Ie = 0,
    ve = null,
    J1 = 0;
  function gl() {
    throw Error(y(321));
  }
  function Vc(l, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < l.length; a++)
      if (!ct(l[a], t[a])) return !1;
    return !0;
  }
  function Lc(l, t, a, e, u, n) {
    return (
      (Xt = n),
      (Z = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (S.H = l === null || l.memoizedState === null ? g0 : ni),
      (Ga = !1),
      (n = a(e, u)),
      (Ga = !1),
      me && (n = qs(t, a, e, u)),
      Rs(l),
      n
    );
  }
  function Rs(l) {
    S.H = tu;
    var t = fl !== null && fl.next !== null;
    if (((Xt = 0), (Ml = fl = Z = null), (ln = !1), (Ie = 0), (ve = null), t))
      throw Error(y(300));
    l === null ||
      Ol ||
      ((l = l.dependencies), l !== null && Ku(l) && (Ol = !0));
  }
  function qs(l, t, a, e) {
    Z = l;
    var u = 0;
    do {
      if ((me && (ve = null), (Ie = 0), (me = !1), 25 <= u))
        throw Error(y(301));
      if (((u += 1), (Ml = fl = null), l.updateQueue != null)) {
        var n = l.updateQueue;
        (n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0);
      }
      (S.H = S0), (n = t(a, e));
    } while (me);
    return n;
  }
  function w1() {
    var l = S.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? Pe(t) : t),
      (l = l.useState()[0]),
      (fl !== null ? fl.memoizedState : null) !== l && (Z.flags |= 1024),
      t
    );
  }
  function Kc() {
    var l = tn !== 0;
    return (tn = 0), l;
  }
  function Jc(l, t, a) {
    (t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~a);
  }
  function wc(l) {
    if (ln) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), (l = l.next);
      }
      ln = !1;
    }
    (Xt = 0), (Ml = fl = Z = null), (me = !1), (Ie = tn = 0), (ve = null);
  }
  function Kl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Ml === null ? (Z.memoizedState = Ml = l) : (Ml = Ml.next = l), Ml;
  }
  function El() {
    if (fl === null) {
      var l = Z.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = fl.next;
    var t = Ml === null ? Z.memoizedState : Ml.next;
    if (t !== null) (Ml = t), (fl = l);
    else {
      if (l === null)
        throw Z.alternate === null ? Error(y(467)) : Error(y(310));
      (fl = l),
        (l = {
          memoizedState: fl.memoizedState,
          baseState: fl.baseState,
          baseQueue: fl.baseQueue,
          queue: fl.queue,
          next: null,
        }),
        Ml === null ? (Z.memoizedState = Ml = l) : (Ml = Ml.next = l);
    }
    return Ml;
  }
  function an() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pe(l) {
    var t = Ie;
    return (
      (Ie += 1),
      ve === null && (ve = []),
      (l = Ms(ve, l, t)),
      (t = Z),
      (Ml === null ? t.memoizedState : Ml.next) === null &&
        ((t = t.alternate),
        (S.H = t === null || t.memoizedState === null ? g0 : ni)),
      l
    );
  }
  function en(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Pe(l);
      if (l.$$typeof === _l) return ql(l);
    }
    throw Error(y(438, String(l)));
  }
  function kc(l) {
    var t = null,
      a = Z.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var e = Z.alternate;
      e !== null &&
        ((e = e.updateQueue),
        e !== null &&
          ((e = e.memoCache),
          e != null &&
            (t = {
              data: e.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = an()), (Z.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(l), e = 0; e < l; e++) a[e] = Va;
    return t.index++, a;
  }
  function Zt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function un(l) {
    var t = El();
    return Wc(t, fl, l);
  }
  function Wc(l, t, a) {
    var e = l.queue;
    if (e === null) throw Error(y(311));
    e.lastRenderedReducer = a;
    var u = l.baseQueue,
      n = e.pending;
    if (n !== null) {
      if (u !== null) {
        var c = u.next;
        (u.next = n.next), (n.next = c);
      }
      (t.baseQueue = u = n), (e.pending = null);
    }
    if (((n = l.baseState), u === null)) l.memoizedState = n;
    else {
      t = u.next;
      var i = (c = null),
        f = null,
        v = t,
        g = !1;
      do {
        var p = v.lane & -536870913;
        if (p !== v.lane ? (w & p) === p : (Xt & p) === p) {
          var h = v.revertLane;
          if (h === 0)
            f !== null &&
              (f = f.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: v.action,
                  hasEagerState: v.hasEagerState,
                  eagerState: v.eagerState,
                  next: null,
                }),
              p === fe && (g = !0);
          else if ((Xt & h) === h) {
            (v = v.next), h === fe && (g = !0);
            continue;
          } else
            (p = {
              lane: 0,
              revertLane: v.revertLane,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null,
            }),
              f === null ? ((i = f = p), (c = n)) : (f = f.next = p),
              (Z.lanes |= h),
              (ya |= h);
          (p = v.action),
            Ga && a(n, p),
            (n = v.hasEagerState ? v.eagerState : a(n, p));
        } else
          (h = {
            lane: p,
            revertLane: v.revertLane,
            gesture: v.gesture,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null,
          }),
            f === null ? ((i = f = h), (c = n)) : (f = f.next = h),
            (Z.lanes |= p),
            (ya |= p);
        v = v.next;
      } while (v !== null && v !== t);
      if (
        (f === null ? (c = n) : (f.next = i),
        !ct(n, l.memoizedState) && ((Ol = !0), g && ((a = se), a !== null)))
      )
        throw a;
      (l.memoizedState = n),
        (l.baseState = c),
        (l.baseQueue = f),
        (e.lastRenderedState = n);
    }
    return u === null && (e.lanes = 0), [l.memoizedState, e.dispatch];
  }
  function $c(l) {
    var t = El(),
      a = t.queue;
    if (a === null) throw Error(y(311));
    a.lastRenderedReducer = l;
    var e = a.dispatch,
      u = a.pending,
      n = t.memoizedState;
    if (u !== null) {
      a.pending = null;
      var c = (u = u.next);
      do (n = l(n, c.action)), (c = c.next);
      while (c !== u);
      ct(n, t.memoizedState) || (Ol = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (a.lastRenderedState = n);
    }
    return [n, e];
  }
  function Ys(l, t, a) {
    var e = Z,
      u = El(),
      n = $;
    if (n) {
      if (a === void 0) throw Error(y(407));
      a = a();
    } else a = t();
    var c = !ct((fl || u).memoizedState, a);
    if (
      (c && ((u.memoizedState = a), (Ol = !0)),
      (u = u.queue),
      Pc(Qs.bind(null, e, u, l), [l]),
      u.getSnapshot !== t || c || (Ml !== null && Ml.memoizedState.tag & 1))
    ) {
      if (
        ((e.flags |= 2048),
        he(9, { destroy: void 0 }, Gs.bind(null, e, u, a, t), null),
        yl === null)
      )
        throw Error(y(349));
      n || (Xt & 127) !== 0 || Bs(e, t, a);
    }
    return a;
  }
  function Bs(l, t, a) {
    (l.flags |= 16384),
      (l = { getSnapshot: t, value: a }),
      (t = Z.updateQueue),
      t === null
        ? ((t = an()), (Z.updateQueue = t), (t.stores = [l]))
        : ((a = t.stores), a === null ? (t.stores = [l]) : a.push(l));
  }
  function Gs(l, t, a, e) {
    (t.value = a), (t.getSnapshot = e), Xs(t) && Zs(l);
  }
  function Qs(l, t, a) {
    return a(function () {
      Xs(t) && Zs(l);
    });
  }
  function Xs(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var a = t();
      return !ct(l, a);
    } catch {
      return !0;
    }
  }
  function Zs(l) {
    var t = xa(l, 2);
    t !== null && at(t, l, 2);
  }
  function Fc(l) {
    var t = Kl();
    if (typeof l == "function") {
      var a = l;
      if (((l = a()), Ga)) {
        It(!0);
        try {
          a();
        } finally {
          It(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Zt,
        lastRenderedState: l,
      }),
      t
    );
  }
  function Vs(l, t, a, e) {
    return (l.baseState = a), Wc(l, fl, typeof e == "function" ? e : Zt);
  }
  function k1(l, t, a, e, u) {
    if (fn(l)) throw Error(y(485));
    if (((l = t.action), l !== null)) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (c) {
          n.listeners.push(c);
        },
      };
      S.T !== null ? a(!0) : (n.isTransition = !1),
        e(n),
        (a = t.pending),
        a === null
          ? ((n.next = t.pending = n), Ls(t, n))
          : ((n.next = a.next), (t.pending = a.next = n));
    }
  }
  function Ls(l, t) {
    var a = t.action,
      e = t.payload,
      u = l.state;
    if (t.isTransition) {
      var n = S.T,
        c = {};
      S.T = c;
      try {
        var i = a(u, e),
          f = S.S;
        f !== null && f(c, i), Ks(l, t, i);
      } catch (v) {
        Ic(l, t, v);
      } finally {
        n !== null && c.types !== null && (n.types = c.types), (S.T = n);
      }
    } else
      try {
        (n = a(u, e)), Ks(l, t, n);
      } catch (v) {
        Ic(l, t, v);
      }
  }
  function Ks(l, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (e) {
            Js(l, t, e);
          },
          function (e) {
            return Ic(l, t, e);
          }
        )
      : Js(l, t, a);
  }
  function Js(l, t, a) {
    (t.status = "fulfilled"),
      (t.value = a),
      ws(t),
      (l.state = a),
      (t = l.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (l.pending = null) : ((a = a.next), (t.next = a), Ls(l, a)));
  }
  function Ic(l, t, a) {
    var e = l.pending;
    if (((l.pending = null), e !== null)) {
      e = e.next;
      do (t.status = "rejected"), (t.reason = a), ws(t), (t = t.next);
      while (t !== e);
    }
    l.action = null;
  }
  function ws(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function ks(l, t) {
    return t;
  }
  function Ws(l, t) {
    if ($) {
      var a = yl.formState;
      if (a !== null) {
        l: {
          var e = Z;
          if ($) {
            if (vl) {
              t: {
                for (var u = vl, n = bt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (((u = zt(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                (n = u.data), (u = n === "F!" || n === "F" ? u : null);
              }
              if (u) {
                (vl = zt(u.nextSibling)), (e = u.data === "F!");
                break l;
              }
            }
            ea(e);
          }
          e = !1;
        }
        e && (t = a[0]);
      }
    }
    return (
      (a = Kl()),
      (a.memoizedState = a.baseState = t),
      (e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ks,
        lastRenderedState: t,
      }),
      (a.queue = e),
      (a = v0.bind(null, Z, e)),
      (e.dispatch = a),
      (e = Fc(!1)),
      (n = ui.bind(null, Z, !1, e.queue)),
      (e = Kl()),
      (u = { state: t, dispatch: null, action: l, pending: null }),
      (e.queue = u),
      (a = k1.bind(null, Z, u, n, a)),
      (u.dispatch = a),
      (e.memoizedState = l),
      [t, a, !1]
    );
  }
  function $s(l) {
    var t = El();
    return Fs(t, fl, l);
  }
  function Fs(l, t, a) {
    if (
      ((t = Wc(l, t, ks)[0]),
      (l = un(Zt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var e = Pe(t);
      } catch (c) {
        throw c === oe ? ku : c;
      }
    else e = t;
    t = El();
    var u = t.queue,
      n = u.dispatch;
    return (
      a !== t.memoizedState &&
        ((Z.flags |= 2048),
        he(9, { destroy: void 0 }, W1.bind(null, u, a), null)),
      [e, n, l]
    );
  }
  function W1(l, t) {
    l.action = t;
  }
  function Is(l) {
    var t = El(),
      a = fl;
    if (a !== null) return Fs(t, a, l);
    El(), (t = t.memoizedState), (a = El());
    var e = a.queue.dispatch;
    return (a.memoizedState = l), [t, e, !1];
  }
  function he(l, t, a, e) {
    return (
      (l = { tag: l, create: a, deps: e, inst: t, next: null }),
      (t = Z.updateQueue),
      t === null && ((t = an()), (Z.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = l.next = l)
        : ((e = a.next), (a.next = l), (l.next = e), (t.lastEffect = l)),
      l
    );
  }
  function Ps() {
    return El().memoizedState;
  }
  function nn(l, t, a, e) {
    var u = Kl();
    (Z.flags |= l),
      (u.memoizedState = he(
        1 | t,
        { destroy: void 0 },
        a,
        e === void 0 ? null : e
      ));
  }
  function cn(l, t, a, e) {
    var u = El();
    e = e === void 0 ? null : e;
    var n = u.memoizedState.inst;
    fl !== null && e !== null && Vc(e, fl.memoizedState.deps)
      ? (u.memoizedState = he(t, n, a, e))
      : ((Z.flags |= l), (u.memoizedState = he(1 | t, n, a, e)));
  }
  function l0(l, t) {
    nn(8390656, 8, l, t);
  }
  function Pc(l, t) {
    cn(2048, 8, l, t);
  }
  function $1(l) {
    Z.flags |= 4;
    var t = Z.updateQueue;
    if (t === null) (t = an()), (Z.updateQueue = t), (t.events = [l]);
    else {
      var a = t.events;
      a === null ? (t.events = [l]) : a.push(l);
    }
  }
  function t0(l) {
    var t = El().memoizedState;
    return (
      $1({ ref: t, nextImpl: l }),
      function () {
        if ((al & 2) !== 0) throw Error(y(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function a0(l, t) {
    return cn(4, 2, l, t);
  }
  function e0(l, t) {
    return cn(4, 4, l, t);
  }
  function u0(l, t) {
    if (typeof t == "function") {
      l = l();
      var a = t(l);
      return function () {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function n0(l, t, a) {
    (a = a != null ? a.concat([l]) : null), cn(4, 4, u0.bind(null, t, l), a);
  }
  function li() {}
  function c0(l, t) {
    var a = El();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    return t !== null && Vc(t, e[1]) ? e[0] : ((a.memoizedState = [l, t]), l);
  }
  function i0(l, t) {
    var a = El();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    if (t !== null && Vc(t, e[1])) return e[0];
    if (((e = l()), Ga)) {
      It(!0);
      try {
        l();
      } finally {
        It(!1);
      }
    }
    return (a.memoizedState = [e, t]), e;
  }
  function ti(l, t, a) {
    return a === void 0 || ((Xt & 1073741824) !== 0 && (w & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = a), (l = fo()), (Z.lanes |= l), (ya |= l), a);
  }
  function f0(l, t, a, e) {
    return ct(a, t)
      ? a
      : ye.current !== null
      ? ((l = ti(l, a, e)), ct(l, t) || (Ol = !0), l)
      : (Xt & 42) === 0 || ((Xt & 1073741824) !== 0 && (w & 261930) === 0)
      ? ((Ol = !0), (l.memoizedState = a))
      : ((l = fo()), (Z.lanes |= l), (ya |= l), t);
  }
  function s0(l, t, a, e, u) {
    var n = M.p;
    M.p = n !== 0 && 8 > n ? n : 8;
    var c = S.T,
      i = {};
    (S.T = i), ui(l, !1, t, a);
    try {
      var f = u(),
        v = S.S;
      if (
        (v !== null && v(i, f),
        f !== null && typeof f == "object" && typeof f.then == "function")
      ) {
        var g = K1(f, e);
        lu(l, t, g, yt(l));
      } else lu(l, t, e, yt(l));
    } catch (p) {
      lu(l, t, { then: function () {}, status: "rejected", reason: p }, yt());
    } finally {
      (M.p = n),
        c !== null && i.types !== null && (c.types = i.types),
        (S.T = c);
    }
  }
  function F1() {}
  function ai(l, t, a, e) {
    if (l.tag !== 5) throw Error(y(476));
    var u = o0(l).queue;
    s0(
      l,
      u,
      t,
      G,
      a === null
        ? F1
        : function () {
            return d0(l), a(e);
          }
    );
  }
  function o0(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: G,
      baseState: G,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Zt,
        lastRenderedState: G,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Zt,
          lastRenderedState: a,
        },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function d0(l) {
    var t = o0(l);
    t.next === null && (t = l.alternate.memoizedState),
      lu(l, t.next.queue, {}, yt());
  }
  function ei() {
    return ql(gu);
  }
  function y0() {
    return El().memoizedState;
  }
  function m0() {
    return El().memoizedState;
  }
  function I1(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = yt();
          l = ca(a);
          var e = ia(t, l, a);
          e !== null && (at(e, t, a), We(e, t, a)),
            (t = { cache: Cc() }),
            (l.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function P1(l, t, a) {
    var e = yt();
    (a = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      fn(l)
        ? h0(t, a)
        : ((a = zc(l, t, a, e)), a !== null && (at(a, l, e), r0(a, t, e)));
  }
  function v0(l, t, a) {
    var e = yt();
    lu(l, t, a, e);
  }
  function lu(l, t, a, e) {
    var u = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (fn(l)) h0(t, u);
    else {
      var n = l.alternate;
      if (
        l.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = t.lastRenderedReducer), n !== null)
      )
        try {
          var c = t.lastRenderedState,
            i = n(c, a);
          if (((u.hasEagerState = !0), (u.eagerState = i), ct(i, c)))
            return Xu(l, t, u, 0), yl === null && Qu(), !1;
        } catch {
        } finally {
        }
      if (((a = zc(l, t, u, e)), a !== null))
        return at(a, l, e), r0(a, t, e), !0;
    }
    return !1;
  }
  function ui(l, t, a, e) {
    if (
      ((e = {
        lane: 2,
        revertLane: qi(),
        gesture: null,
        action: e,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      fn(l))
    ) {
      if (t) throw Error(y(479));
    } else (t = zc(l, a, e, 2)), t !== null && at(t, l, 2);
  }
  function fn(l) {
    var t = l.alternate;
    return l === Z || (t !== null && t === Z);
  }
  function h0(l, t) {
    me = ln = !0;
    var a = l.pending;
    a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (l.pending = t);
  }
  function r0(l, t, a) {
    if ((a & 4194048) !== 0) {
      var e = t.lanes;
      (e &= l.pendingLanes), (a |= e), (t.lanes = a), zf(l, a);
    }
  }
  var tu = {
    readContext: ql,
    use: en,
    useCallback: gl,
    useContext: gl,
    useEffect: gl,
    useImperativeHandle: gl,
    useLayoutEffect: gl,
    useInsertionEffect: gl,
    useMemo: gl,
    useReducer: gl,
    useRef: gl,
    useState: gl,
    useDebugValue: gl,
    useDeferredValue: gl,
    useTransition: gl,
    useSyncExternalStore: gl,
    useId: gl,
    useHostTransitionStatus: gl,
    useFormState: gl,
    useActionState: gl,
    useOptimistic: gl,
    useMemoCache: gl,
    useCacheRefresh: gl,
  };
  tu.useEffectEvent = gl;
  var g0 = {
      readContext: ql,
      use: en,
      useCallback: function (l, t) {
        return (Kl().memoizedState = [l, t === void 0 ? null : t]), l;
      },
      useContext: ql,
      useEffect: l0,
      useImperativeHandle: function (l, t, a) {
        (a = a != null ? a.concat([l]) : null),
          nn(4194308, 4, u0.bind(null, t, l), a);
      },
      useLayoutEffect: function (l, t) {
        return nn(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        nn(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var a = Kl();
        t = t === void 0 ? null : t;
        var e = l();
        if (Ga) {
          It(!0);
          try {
            l();
          } finally {
            It(!1);
          }
        }
        return (a.memoizedState = [e, t]), e;
      },
      useReducer: function (l, t, a) {
        var e = Kl();
        if (a !== void 0) {
          var u = a(t);
          if (Ga) {
            It(!0);
            try {
              a(t);
            } finally {
              It(!1);
            }
          }
        } else u = t;
        return (
          (e.memoizedState = e.baseState = u),
          (l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: l,
            lastRenderedState: u,
          }),
          (e.queue = l),
          (l = l.dispatch = P1.bind(null, Z, l)),
          [e.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = Kl();
        return (l = { current: l }), (t.memoizedState = l);
      },
      useState: function (l) {
        l = Fc(l);
        var t = l.queue,
          a = v0.bind(null, Z, t);
        return (t.dispatch = a), [l.memoizedState, a];
      },
      useDebugValue: li,
      useDeferredValue: function (l, t) {
        var a = Kl();
        return ti(a, l, t);
      },
      useTransition: function () {
        var l = Fc(!1);
        return (
          (l = s0.bind(null, Z, l.queue, !0, !1)),
          (Kl().memoizedState = l),
          [!1, l]
        );
      },
      useSyncExternalStore: function (l, t, a) {
        var e = Z,
          u = Kl();
        if ($) {
          if (a === void 0) throw Error(y(407));
          a = a();
        } else {
          if (((a = t()), yl === null)) throw Error(y(349));
          (w & 127) !== 0 || Bs(e, t, a);
        }
        u.memoizedState = a;
        var n = { value: a, getSnapshot: t };
        return (
          (u.queue = n),
          l0(Qs.bind(null, e, n, l), [l]),
          (e.flags |= 2048),
          he(9, { destroy: void 0 }, Gs.bind(null, e, n, a, t), null),
          a
        );
      },
      useId: function () {
        var l = Kl(),
          t = yl.identifierPrefix;
        if ($) {
          var a = xt,
            e = Nt;
          (a = (e & ~(1 << (32 - nt(e) - 1))).toString(32) + a),
            (t = "_" + t + "R_" + a),
            (a = tn++),
            0 < a && (t += "H" + a.toString(32)),
            (t += "_");
        } else (a = J1++), (t = "_" + t + "r_" + a.toString(32) + "_");
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: ei,
      useFormState: Ws,
      useActionState: Ws,
      useOptimistic: function (l) {
        var t = Kl();
        t.memoizedState = t.baseState = l;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = a), (t = ui.bind(null, Z, !0, a)), (a.dispatch = t), [l, t]
        );
      },
      useMemoCache: kc,
      useCacheRefresh: function () {
        return (Kl().memoizedState = I1.bind(null, Z));
      },
      useEffectEvent: function (l) {
        var t = Kl(),
          a = { impl: l };
        return (
          (t.memoizedState = a),
          function () {
            if ((al & 2) !== 0) throw Error(y(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ni = {
      readContext: ql,
      use: en,
      useCallback: c0,
      useContext: ql,
      useEffect: Pc,
      useImperativeHandle: n0,
      useInsertionEffect: a0,
      useLayoutEffect: e0,
      useMemo: i0,
      useReducer: un,
      useRef: Ps,
      useState: function () {
        return un(Zt);
      },
      useDebugValue: li,
      useDeferredValue: function (l, t) {
        var a = El();
        return f0(a, fl.memoizedState, l, t);
      },
      useTransition: function () {
        var l = un(Zt)[0],
          t = El().memoizedState;
        return [typeof l == "boolean" ? l : Pe(l), t];
      },
      useSyncExternalStore: Ys,
      useId: y0,
      useHostTransitionStatus: ei,
      useFormState: $s,
      useActionState: $s,
      useOptimistic: function (l, t) {
        var a = El();
        return Vs(a, fl, l, t);
      },
      useMemoCache: kc,
      useCacheRefresh: m0,
    };
  ni.useEffectEvent = t0;
  var S0 = {
    readContext: ql,
    use: en,
    useCallback: c0,
    useContext: ql,
    useEffect: Pc,
    useImperativeHandle: n0,
    useInsertionEffect: a0,
    useLayoutEffect: e0,
    useMemo: i0,
    useReducer: $c,
    useRef: Ps,
    useState: function () {
      return $c(Zt);
    },
    useDebugValue: li,
    useDeferredValue: function (l, t) {
      var a = El();
      return fl === null ? ti(a, l, t) : f0(a, fl.memoizedState, l, t);
    },
    useTransition: function () {
      var l = $c(Zt)[0],
        t = El().memoizedState;
      return [typeof l == "boolean" ? l : Pe(l), t];
    },
    useSyncExternalStore: Ys,
    useId: y0,
    useHostTransitionStatus: ei,
    useFormState: Is,
    useActionState: Is,
    useOptimistic: function (l, t) {
      var a = El();
      return fl !== null
        ? Vs(a, fl, l, t)
        : ((a.baseState = l), [l, a.queue.dispatch]);
    },
    useMemoCache: kc,
    useCacheRefresh: m0,
  };
  S0.useEffectEvent = t0;
  function ci(l, t, a, e) {
    (t = l.memoizedState),
      (a = a(e, t)),
      (a = a == null ? t : T({}, t, a)),
      (l.memoizedState = a),
      l.lanes === 0 && (l.updateQueue.baseState = a);
  }
  var ii = {
    enqueueSetState: function (l, t, a) {
      l = l._reactInternals;
      var e = yt(),
        u = ca(e);
      (u.payload = t),
        a != null && (u.callback = a),
        (t = ia(l, u, e)),
        t !== null && (at(t, l, e), We(t, l, e));
    },
    enqueueReplaceState: function (l, t, a) {
      l = l._reactInternals;
      var e = yt(),
        u = ca(e);
      (u.tag = 1),
        (u.payload = t),
        a != null && (u.callback = a),
        (t = ia(l, u, e)),
        t !== null && (at(t, l, e), We(t, l, e));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var a = yt(),
        e = ca(a);
      (e.tag = 2),
        t != null && (e.callback = t),
        (t = ia(l, e, a)),
        t !== null && (at(t, l, a), We(t, l, a));
    },
  };
  function b0(l, t, a, e, u, n, c) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == "function"
        ? l.shouldComponentUpdate(e, n, c)
        : t.prototype && t.prototype.isPureReactComponent
        ? !Xe(a, e) || !Xe(u, n)
        : !0
    );
  }
  function p0(l, t, a, e) {
    (l = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(a, e),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(a, e),
      t.state !== l && ii.enqueueReplaceState(t, t.state, null);
  }
  function Qa(l, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var e in t) e !== "ref" && (a[e] = t[e]);
    }
    if ((l = l.defaultProps)) {
      a === t && (a = T({}, a));
      for (var u in l) a[u] === void 0 && (a[u] = l[u]);
    }
    return a;
  }
  function z0(l) {
    Gu(l);
  }
  function A0(l) {
    console.error(l);
  }
  function E0(l) {
    Gu(l);
  }
  function sn(l, t) {
    try {
      var a = l.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function _0(l, t, a) {
    try {
      var e = l.onCaughtError;
      e(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function fi(l, t, a) {
    return (
      (a = ca(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        sn(l, t);
      }),
      a
    );
  }
  function T0(l) {
    return (l = ca(l)), (l.tag = 3), l;
  }
  function M0(l, t, a, e) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = e.value;
      (l.payload = function () {
        return u(n);
      }),
        (l.callback = function () {
          _0(t, a, e);
        });
    }
    var c = a.stateNode;
    c !== null &&
      typeof c.componentDidCatch == "function" &&
      (l.callback = function () {
        _0(t, a, e),
          typeof u != "function" &&
            (ma === null ? (ma = new Set([this])) : ma.add(this));
        var i = e.stack;
        this.componentDidCatch(e.value, {
          componentStack: i !== null ? i : "",
        });
      });
  }
  function ly(l, t, a, e, u) {
    if (
      ((a.flags |= 32768),
      e !== null && typeof e == "object" && typeof e.then == "function")
    ) {
      if (
        ((t = a.alternate),
        t !== null && ie(t, a, u, !0),
        (a = ft.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              pt === null ? zn() : a.alternate === null && Sl === 0 && (Sl = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = u),
              e === Wu
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([e])) : t.add(e),
                  Hi(l, e, u)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              e === Wu
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([e]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([e])) : a.add(e)),
                  Hi(l, e, u)),
              !1
            );
        }
        throw Error(y(435, a.tag));
      }
      return Hi(l, e, u), zn(), !1;
    }
    if ($)
      return (
        (t = ft.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            e !== Oc && ((l = Error(y(422), { cause: e })), Le(rt(l, a))))
          : (e !== Oc && ((t = Error(y(423), { cause: e })), Le(rt(t, a))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (u &= -u),
            (l.lanes |= u),
            (e = rt(e, a)),
            (u = fi(l.stateNode, e, u)),
            Bc(l, u),
            Sl !== 4 && (Sl = 2)),
        !1
      );
    var n = Error(y(520), { cause: e });
    if (
      ((n = rt(n, a)),
      su === null ? (su = [n]) : su.push(n),
      Sl !== 4 && (Sl = 2),
      t === null)
    )
      return !0;
    (e = rt(e, a)), (a = t);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (l = u & -u),
            (a.lanes |= l),
            (l = fi(a.stateNode, e, l)),
            Bc(a, l),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (n = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (ma === null || !ma.has(n)))))
          )
            return (
              (a.flags |= 65536),
              (u &= -u),
              (a.lanes |= u),
              (u = T0(u)),
              M0(u, l, a, e),
              Bc(a, u),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var si = Error(y(461)),
    Ol = !1;
  function Yl(l, t, a, e) {
    t.child = l === null ? xs(t, null, a, e) : Ba(t, l.child, a, e);
  }
  function O0(l, t, a, e, u) {
    a = a.render;
    var n = t.ref;
    if ("ref" in e) {
      var c = {};
      for (var i in e) i !== "ref" && (c[i] = e[i]);
    } else c = e;
    return (
      ja(t),
      (e = Lc(l, t, a, c, n, u)),
      (i = Kc()),
      l !== null && !Ol
        ? (Jc(l, t, u), Vt(l, t, u))
        : ($ && i && Tc(t), (t.flags |= 1), Yl(l, t, e, u), t.child)
    );
  }
  function D0(l, t, a, e, u) {
    if (l === null) {
      var n = a.type;
      return typeof n == "function" &&
        !Ac(n) &&
        n.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = n), N0(l, t, n, e, u))
        : ((l = Vu(a.type, null, e, t, t.mode, u)),
          (l.ref = t.ref),
          (l.return = t),
          (t.child = l));
    }
    if (((n = l.child), !gi(l, u))) {
      var c = n.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : Xe), a(c, e) && l.ref === t.ref)
      )
        return Vt(l, t, u);
    }
    return (
      (t.flags |= 1),
      (l = Yt(n, e)),
      (l.ref = t.ref),
      (l.return = t),
      (t.child = l)
    );
  }
  function N0(l, t, a, e, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Xe(n, e) && l.ref === t.ref)
        if (((Ol = !1), (t.pendingProps = e = n), gi(l, u)))
          (l.flags & 131072) !== 0 && (Ol = !0);
        else return (t.lanes = l.lanes), Vt(l, t, u);
    }
    return oi(l, t, a, e, u);
  }
  function x0(l, t, a, e) {
    var u = e.children,
      n = l !== null ? l.memoizedState : null;
    if (
      (l === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | a : a), l !== null)) {
          for (e = t.child = l.child, u = 0; e !== null; )
            (u = u | e.lanes | e.childLanes), (e = e.sibling);
          e = u & ~n;
        } else (e = 0), (t.child = null);
        return U0(l, t, n, a, e);
      }
      if ((a & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && wu(t, n !== null ? n.cachePool : null),
          n !== null ? Hs(t, n) : Qc(),
          js(t);
      else
        return (
          (e = t.lanes = 536870912),
          U0(l, t, n !== null ? n.baseLanes | a : a, a, e)
        );
    } else
      n !== null
        ? (wu(t, n.cachePool), Hs(t, n), sa(), (t.memoizedState = null))
        : (l !== null && wu(t, null), Qc(), sa());
    return Yl(l, t, u, a), t.child;
  }
  function au(l, t) {
    return (
      (l !== null && l.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function U0(l, t, a, e, u) {
    var n = jc();
    return (
      (n = n === null ? null : { parent: Tl._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: a, cachePool: n }),
      l !== null && wu(t, null),
      Qc(),
      js(t),
      l !== null && ie(l, t, e, !0),
      (t.childLanes = u),
      null
    );
  }
  function on(l, t) {
    return (
      (t = yn({ mode: t.mode, children: t.children }, l.mode)),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function C0(l, t, a) {
    return (
      Ba(t, l.child, null, a),
      (l = on(t, t.pendingProps)),
      (l.flags |= 2),
      st(t),
      (t.memoizedState = null),
      l
    );
  }
  function ty(l, t, a) {
    var e = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if ($) {
        if (e.mode === "hidden")
          return (l = on(t, e)), (t.lanes = 536870912), au(null, l);
        if (
          (Zc(t),
          (l = vl)
            ? ((l = Ko(l, bt)),
              (l = l !== null && l.data === "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: ta !== null ? { id: Nt, overflow: xt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = hs(l)),
                (a.return = t),
                (t.child = a),
                (Rl = t),
                (vl = null)))
            : (l = null),
          l === null)
        )
          throw ea(t);
        return (t.lanes = 536870912), null;
      }
      return on(t, e);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if ((Zc(t), u))
        if (t.flags & 256) (t.flags &= -257), (t = C0(l, t, a));
        else if (t.memoizedState !== null)
          (t.child = l.child), (t.flags |= 128), (t = null);
        else throw Error(y(558));
      else if (
        (Ol || ie(l, t, a, !1), (u = (a & l.childLanes) !== 0), Ol || u)
      ) {
        if (
          ((e = yl),
          e !== null && ((c = Af(e, a)), c !== 0 && c !== n.retryLane))
        )
          throw ((n.retryLane = c), xa(l, c), at(e, l, c), si);
        zn(), (t = C0(l, t, a));
      } else
        (l = n.treeContext),
          (vl = zt(c.nextSibling)),
          (Rl = t),
          ($ = !0),
          (aa = null),
          (bt = !1),
          l !== null && Ss(t, l),
          (t = on(t, e)),
          (t.flags |= 4096);
      return t;
    }
    return (
      (l = Yt(l.child, { mode: e.mode, children: e.children })),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function dn(l, t) {
    var a = t.ref;
    if (a === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(y(284));
      (l === null || l.ref !== a) && (t.flags |= 4194816);
    }
  }
  function oi(l, t, a, e, u) {
    return (
      ja(t),
      (a = Lc(l, t, a, e, void 0, u)),
      (e = Kc()),
      l !== null && !Ol
        ? (Jc(l, t, u), Vt(l, t, u))
        : ($ && e && Tc(t), (t.flags |= 1), Yl(l, t, a, u), t.child)
    );
  }
  function H0(l, t, a, e, u, n) {
    return (
      ja(t),
      (t.updateQueue = null),
      (a = qs(t, e, a, u)),
      Rs(l),
      (e = Kc()),
      l !== null && !Ol
        ? (Jc(l, t, n), Vt(l, t, n))
        : ($ && e && Tc(t), (t.flags |= 1), Yl(l, t, a, n), t.child)
    );
  }
  function j0(l, t, a, e, u) {
    if ((ja(t), t.stateNode === null)) {
      var n = ee,
        c = a.contextType;
      typeof c == "object" && c !== null && (n = ql(c)),
        (n = new a(e, n)),
        (t.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = ii),
        (t.stateNode = n),
        (n._reactInternals = t),
        (n = t.stateNode),
        (n.props = e),
        (n.state = t.memoizedState),
        (n.refs = {}),
        qc(t),
        (c = a.contextType),
        (n.context = typeof c == "object" && c !== null ? ql(c) : ee),
        (n.state = t.memoizedState),
        (c = a.getDerivedStateFromProps),
        typeof c == "function" && (ci(t, a, c, e), (n.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((c = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          c !== n.state && ii.enqueueReplaceState(n, n.state, null),
          Fe(t, e, n, u),
          $e(),
          (n.state = t.memoizedState)),
        typeof n.componentDidMount == "function" && (t.flags |= 4194308),
        (e = !0);
    } else if (l === null) {
      n = t.stateNode;
      var i = t.memoizedProps,
        f = Qa(a, i);
      n.props = f;
      var v = n.context,
        g = a.contextType;
      (c = ee), typeof g == "object" && g !== null && (c = ql(g));
      var p = a.getDerivedStateFromProps;
      (g =
        typeof p == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (i = t.pendingProps !== i),
        g ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i || v !== c) && p0(t, n, e, c)),
        (na = !1);
      var h = t.memoizedState;
      (n.state = h),
        Fe(t, e, n, u),
        $e(),
        (v = t.memoizedState),
        i || h !== v || na
          ? (typeof p == "function" && (ci(t, a, p, e), (v = t.memoizedState)),
            (f = na || b0(t, a, f, e, h, v, c))
              ? (g ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = e),
                (t.memoizedState = v)),
            (n.props = e),
            (n.state = v),
            (n.context = c),
            (e = f))
          : (typeof n.componentDidMount == "function" && (t.flags |= 4194308),
            (e = !1));
    } else {
      (n = t.stateNode),
        Yc(l, t),
        (c = t.memoizedProps),
        (g = Qa(a, c)),
        (n.props = g),
        (p = t.pendingProps),
        (h = n.context),
        (v = a.contextType),
        (f = ee),
        typeof v == "object" && v !== null && (f = ql(v)),
        (i = a.getDerivedStateFromProps),
        (v =
          typeof i == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((c !== p || h !== f) && p0(t, n, e, f)),
        (na = !1),
        (h = t.memoizedState),
        (n.state = h),
        Fe(t, e, n, u),
        $e();
      var r = t.memoizedState;
      c !== p ||
      h !== r ||
      na ||
      (l !== null && l.dependencies !== null && Ku(l.dependencies))
        ? (typeof i == "function" && (ci(t, a, i, e), (r = t.memoizedState)),
          (g =
            na ||
            b0(t, a, g, e, h, r, f) ||
            (l !== null && l.dependencies !== null && Ku(l.dependencies)))
            ? (v ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" &&
                  n.componentWillUpdate(e, r, f),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(e, r, f)),
              typeof n.componentDidUpdate == "function" && (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (c === l.memoizedProps && h === l.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (c === l.memoizedProps && h === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = e),
              (t.memoizedState = r)),
          (n.props = e),
          (n.state = r),
          (n.context = f),
          (e = g))
        : (typeof n.componentDidUpdate != "function" ||
            (c === l.memoizedProps && h === l.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (c === l.memoizedProps && h === l.memoizedState) ||
            (t.flags |= 1024),
          (e = !1));
    }
    return (
      (n = e),
      dn(l, t),
      (e = (t.flags & 128) !== 0),
      n || e
        ? ((n = t.stateNode),
          (a =
            e && typeof a.getDerivedStateFromError != "function"
              ? null
              : n.render()),
          (t.flags |= 1),
          l !== null && e
            ? ((t.child = Ba(t, l.child, null, u)),
              (t.child = Ba(t, null, a, u)))
            : Yl(l, t, a, u),
          (t.memoizedState = n.state),
          (l = t.child))
        : (l = Vt(l, t, u)),
      l
    );
  }
  function R0(l, t, a, e) {
    return Ca(), (t.flags |= 256), Yl(l, t, a, e), t.child;
  }
  var di = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function yi(l) {
    return { baseLanes: l, cachePool: _s() };
  }
  function mi(l, t, a) {
    return (l = l !== null ? l.childLanes & ~a : 0), t && (l |= dt), l;
  }
  function q0(l, t, a) {
    var e = t.pendingProps,
      u = !1,
      n = (t.flags & 128) !== 0,
      c;
    if (
      ((c = n) ||
        (c =
          l !== null && l.memoizedState === null ? !1 : (Al.current & 2) !== 0),
      c && ((u = !0), (t.flags &= -129)),
      (c = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if ($) {
        if (
          (u ? fa(t) : sa(),
          (l = vl)
            ? ((l = Ko(l, bt)),
              (l = l !== null && l.data !== "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: ta !== null ? { id: Nt, overflow: xt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = hs(l)),
                (a.return = t),
                (t.child = a),
                (Rl = t),
                (vl = null)))
            : (l = null),
          l === null)
        )
          throw ea(t);
        return Wi(l) ? (t.lanes = 32) : (t.lanes = 536870912), null;
      }
      var i = e.children;
      return (
        (e = e.fallback),
        u
          ? (sa(),
            (u = t.mode),
            (i = yn({ mode: "hidden", children: i }, u)),
            (e = Ua(e, u, a, null)),
            (i.return = t),
            (e.return = t),
            (i.sibling = e),
            (t.child = i),
            (e = t.child),
            (e.memoizedState = yi(a)),
            (e.childLanes = mi(l, c, a)),
            (t.memoizedState = di),
            au(null, e))
          : (fa(t), vi(t, i))
      );
    }
    var f = l.memoizedState;
    if (f !== null && ((i = f.dehydrated), i !== null)) {
      if (n)
        t.flags & 256
          ? (fa(t), (t.flags &= -257), (t = hi(l, t, a)))
          : t.memoizedState !== null
          ? (sa(), (t.child = l.child), (t.flags |= 128), (t = null))
          : (sa(),
            (i = e.fallback),
            (u = t.mode),
            (e = yn({ mode: "visible", children: e.children }, u)),
            (i = Ua(i, u, a, null)),
            (i.flags |= 2),
            (e.return = t),
            (i.return = t),
            (e.sibling = i),
            (t.child = e),
            Ba(t, l.child, null, a),
            (e = t.child),
            (e.memoizedState = yi(a)),
            (e.childLanes = mi(l, c, a)),
            (t.memoizedState = di),
            (t = au(null, e)));
      else if ((fa(t), Wi(i))) {
        if (((c = i.nextSibling && i.nextSibling.dataset), c)) var v = c.dgst;
        (c = v),
          (e = Error(y(419))),
          (e.stack = ""),
          (e.digest = c),
          Le({ value: e, source: null, stack: null }),
          (t = hi(l, t, a));
      } else if (
        (Ol || ie(l, t, a, !1), (c = (a & l.childLanes) !== 0), Ol || c)
      ) {
        if (
          ((c = yl),
          c !== null && ((e = Af(c, a)), e !== 0 && e !== f.retryLane))
        )
          throw ((f.retryLane = e), xa(l, e), at(c, l, e), si);
        ki(i) || zn(), (t = hi(l, t, a));
      } else
        ki(i)
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = f.treeContext),
            (vl = zt(i.nextSibling)),
            (Rl = t),
            ($ = !0),
            (aa = null),
            (bt = !1),
            l !== null && Ss(t, l),
            (t = vi(t, e.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (sa(),
        (i = e.fallback),
        (u = t.mode),
        (f = l.child),
        (v = f.sibling),
        (e = Yt(f, { mode: "hidden", children: e.children })),
        (e.subtreeFlags = f.subtreeFlags & 65011712),
        v !== null ? (i = Yt(v, i)) : ((i = Ua(i, u, a, null)), (i.flags |= 2)),
        (i.return = t),
        (e.return = t),
        (e.sibling = i),
        (t.child = e),
        au(null, e),
        (e = t.child),
        (i = l.child.memoizedState),
        i === null
          ? (i = yi(a))
          : ((u = i.cachePool),
            u !== null
              ? ((f = Tl._currentValue),
                (u = u.parent !== f ? { parent: f, pool: f } : u))
              : (u = _s()),
            (i = { baseLanes: i.baseLanes | a, cachePool: u })),
        (e.memoizedState = i),
        (e.childLanes = mi(l, c, a)),
        (t.memoizedState = di),
        au(l.child, e))
      : (fa(t),
        (a = l.child),
        (l = a.sibling),
        (a = Yt(a, { mode: "visible", children: e.children })),
        (a.return = t),
        (a.sibling = null),
        l !== null &&
          ((c = t.deletions),
          c === null ? ((t.deletions = [l]), (t.flags |= 16)) : c.push(l)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function vi(l, t) {
    return (
      (t = yn({ mode: "visible", children: t }, l.mode)),
      (t.return = l),
      (l.child = t)
    );
  }
  function yn(l, t) {
    return (l = it(22, l, null, t)), (l.lanes = 0), l;
  }
  function hi(l, t, a) {
    return (
      Ba(t, l.child, null, a),
      (l = vi(t, t.pendingProps.children)),
      (l.flags |= 2),
      (t.memoizedState = null),
      l
    );
  }
  function Y0(l, t, a) {
    l.lanes |= t;
    var e = l.alternate;
    e !== null && (e.lanes |= t), xc(l.return, t, a);
  }
  function ri(l, t, a, e, u, n) {
    var c = l.memoizedState;
    c === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: e,
          tail: a,
          tailMode: u,
          treeForkCount: n,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = e),
        (c.tail = a),
        (c.tailMode = u),
        (c.treeForkCount = n));
  }
  function B0(l, t, a) {
    var e = t.pendingProps,
      u = e.revealOrder,
      n = e.tail;
    e = e.children;
    var c = Al.current,
      i = (c & 2) !== 0;
    if (
      (i ? ((c = (c & 1) | 2), (t.flags |= 128)) : (c &= 1),
      O(Al, c),
      Yl(l, t, e, a),
      (e = $ ? Ve : 0),
      !i && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && Y0(l, a, t);
        else if (l.tag === 19) Y0(l, a, t);
        else if (l.child !== null) {
          (l.child.return = l), (l = l.child);
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break l;
          l = l.return;
        }
        (l.sibling.return = l.return), (l = l.sibling);
      }
    switch (u) {
      case "forwards":
        for (a = t.child, u = null; a !== null; )
          (l = a.alternate),
            l !== null && Pu(l) === null && (u = a),
            (a = a.sibling);
        (a = u),
          a === null
            ? ((u = t.child), (t.child = null))
            : ((u = a.sibling), (a.sibling = null)),
          ri(t, !1, u, a, n, e);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = t.child, t.child = null; u !== null; ) {
          if (((l = u.alternate), l !== null && Pu(l) === null)) {
            t.child = u;
            break;
          }
          (l = u.sibling), (u.sibling = a), (a = u), (u = l);
        }
        ri(t, !0, a, null, n, e);
        break;
      case "together":
        ri(t, !1, null, null, void 0, e);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Vt(l, t, a) {
    if (
      (l !== null && (t.dependencies = l.dependencies),
      (ya |= t.lanes),
      (a & t.childLanes) === 0)
    )
      if (l !== null) {
        if ((ie(l, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(y(153));
    if (t.child !== null) {
      for (
        l = t.child, a = Yt(l, l.pendingProps), t.child = a, a.return = t;
        l.sibling !== null;

      )
        (l = l.sibling),
          (a = a.sibling = Yt(l, l.pendingProps)),
          (a.return = t);
      a.sibling = null;
    }
    return t.child;
  }
  function gi(l, t) {
    return (l.lanes & t) !== 0
      ? !0
      : ((l = l.dependencies), !!(l !== null && Ku(l)));
  }
  function ay(l, t, a) {
    switch (t.tag) {
      case 3:
        Ll(t, t.stateNode.containerInfo),
          ua(t, Tl, l.memoizedState.cache),
          Ca();
        break;
      case 27:
      case 5:
        De(t);
        break;
      case 4:
        Ll(t, t.stateNode.containerInfo);
        break;
      case 10:
        ua(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return (t.flags |= 128), Zc(t), null;
        break;
      case 13:
        var e = t.memoizedState;
        if (e !== null)
          return e.dehydrated !== null
            ? (fa(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
            ? q0(l, t, a)
            : (fa(t), (l = Vt(l, t, a)), l !== null ? l.sibling : null);
        fa(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (
          ((e = (a & t.childLanes) !== 0),
          e || (ie(l, t, a, !1), (e = (a & t.childLanes) !== 0)),
          u)
        ) {
          if (e) return B0(l, t, a);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          O(Al, Al.current),
          e)
        )
          break;
        return null;
      case 22:
        return (t.lanes = 0), x0(l, t, a, t.pendingProps);
      case 24:
        ua(t, Tl, l.memoizedState.cache);
    }
    return Vt(l, t, a);
  }
  function G0(l, t, a) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) Ol = !0;
      else {
        if (!gi(l, a) && (t.flags & 128) === 0) return (Ol = !1), ay(l, t, a);
        Ol = (l.flags & 131072) !== 0;
      }
    else (Ol = !1), $ && (t.flags & 1048576) !== 0 && gs(t, Ve, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var e = t.pendingProps;
          if (((l = qa(t.elementType)), (t.type = l), typeof l == "function"))
            Ac(l)
              ? ((e = Qa(l, e)), (t.tag = 1), (t = j0(null, t, l, e, a)))
              : ((t.tag = 0), (t = oi(null, t, l, e, a)));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === Jl) {
                (t.tag = 11), (t = O0(null, t, l, e, a));
                break l;
              } else if (u === W) {
                (t.tag = 14), (t = D0(null, t, l, e, a));
                break l;
              }
            }
            throw ((t = Ht(l) || l), Error(y(306, t, "")));
          }
        }
        return t;
      case 0:
        return oi(l, t, t.type, t.pendingProps, a);
      case 1:
        return (e = t.type), (u = Qa(e, t.pendingProps)), j0(l, t, e, u, a);
      case 3:
        l: {
          if ((Ll(t, t.stateNode.containerInfo), l === null))
            throw Error(y(387));
          e = t.pendingProps;
          var n = t.memoizedState;
          (u = n.element), Yc(l, t), Fe(t, e, null, a);
          var c = t.memoizedState;
          if (
            ((e = c.cache),
            ua(t, Tl, e),
            e !== n.cache && Uc(t, [Tl], a, !0),
            $e(),
            (e = c.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: e, isDehydrated: !1, cache: c.cache }),
              (t.updateQueue.baseState = n),
              (t.memoizedState = n),
              t.flags & 256)
            ) {
              t = R0(l, t, e, a);
              break l;
            } else if (e !== u) {
              (u = rt(Error(y(424)), t)), Le(u), (t = R0(l, t, e, a));
              break l;
            } else {
              switch (((l = t.stateNode.containerInfo), l.nodeType)) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (
                vl = zt(l.firstChild),
                  Rl = t,
                  $ = !0,
                  aa = null,
                  bt = !0,
                  a = xs(t, null, e, a),
                  t.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
            }
          else {
            if ((Ca(), e === u)) {
              t = Vt(l, t, a);
              break l;
            }
            Yl(l, t, e, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          dn(l, t),
          l === null
            ? (a = Fo(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : $ ||
                ((a = t.type),
                (l = t.pendingProps),
                (e = Dn(L.current).createElement(a)),
                (e[jl] = t),
                (e[$l] = l),
                Bl(e, a, l),
                Cl(e),
                (t.stateNode = e))
            : (t.memoizedState = Fo(
                t.type,
                l.memoizedProps,
                t.pendingProps,
                l.memoizedState
              )),
          null
        );
      case 27:
        return (
          De(t),
          l === null &&
            $ &&
            ((e = t.stateNode = ko(t.type, t.pendingProps, L.current)),
            (Rl = t),
            (bt = !0),
            (u = vl),
            ga(t.type) ? (($i = u), (vl = zt(e.firstChild))) : (vl = u)),
          Yl(l, t, t.pendingProps.children, a),
          dn(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            $ &&
            ((u = e = vl) &&
              ((e = Cy(e, t.type, t.pendingProps, bt)),
              e !== null
                ? ((t.stateNode = e),
                  (Rl = t),
                  (vl = zt(e.firstChild)),
                  (bt = !1),
                  (u = !0))
                : (u = !1)),
            u || ea(t)),
          De(t),
          (u = t.type),
          (n = t.pendingProps),
          (c = l !== null ? l.memoizedProps : null),
          (e = n.children),
          Ki(u, n) ? (e = null) : c !== null && Ki(u, c) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = Lc(l, t, w1, null, null, a)), (gu._currentValue = u)),
          dn(l, t),
          Yl(l, t, e, a),
          t.child
        );
      case 6:
        return (
          l === null &&
            $ &&
            ((l = a = vl) &&
              ((a = Hy(a, t.pendingProps, bt)),
              a !== null
                ? ((t.stateNode = a), (Rl = t), (vl = null), (l = !0))
                : (l = !1)),
            l || ea(t)),
          null
        );
      case 13:
        return q0(l, t, a);
      case 4:
        return (
          Ll(t, t.stateNode.containerInfo),
          (e = t.pendingProps),
          l === null ? (t.child = Ba(t, null, e, a)) : Yl(l, t, e, a),
          t.child
        );
      case 11:
        return O0(l, t, t.type, t.pendingProps, a);
      case 7:
        return Yl(l, t, t.pendingProps, a), t.child;
      case 8:
        return Yl(l, t, t.pendingProps.children, a), t.child;
      case 12:
        return Yl(l, t, t.pendingProps.children, a), t.child;
      case 10:
        return (
          (e = t.pendingProps),
          ua(t, t.type, e.value),
          Yl(l, t, e.children, a),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (e = t.pendingProps.children),
          ja(t),
          (u = ql(u)),
          (e = e(u)),
          (t.flags |= 1),
          Yl(l, t, e, a),
          t.child
        );
      case 14:
        return D0(l, t, t.type, t.pendingProps, a);
      case 15:
        return N0(l, t, t.type, t.pendingProps, a);
      case 19:
        return B0(l, t, a);
      case 31:
        return ty(l, t, a);
      case 22:
        return x0(l, t, a, t.pendingProps);
      case 24:
        return (
          ja(t),
          (e = ql(Tl)),
          l === null
            ? ((u = jc()),
              u === null &&
                ((u = yl),
                (n = Cc()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= a),
                (u = n)),
              (t.memoizedState = { parent: e, cache: u }),
              qc(t),
              ua(t, Tl, u))
            : ((l.lanes & a) !== 0 && (Yc(l, t), Fe(t, null, null, a), $e()),
              (u = l.memoizedState),
              (n = t.memoizedState),
              u.parent !== e
                ? ((u = { parent: e, cache: e }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  ua(t, Tl, e))
                : ((e = n.cache),
                  ua(t, Tl, e),
                  e !== u.cache && Uc(t, [Tl], a, !0))),
          Yl(l, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(y(156, t.tag));
  }
  function Lt(l) {
    l.flags |= 4;
  }
  function Si(l, t, a, e, u) {
    if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
      if (((l.flags |= 16777216), (u & 335544128) === u))
        if (l.stateNode.complete) l.flags |= 8192;
        else if (mo()) l.flags |= 8192;
        else throw ((Ya = Wu), Rc);
    } else l.flags &= -16777217;
  }
  function Q0(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (((l.flags |= 16777216), !ad(t)))
      if (mo()) l.flags |= 8192;
      else throw ((Ya = Wu), Rc);
  }
  function mn(l, t) {
    t !== null && (l.flags |= 4),
      l.flags & 16384 &&
        ((t = l.tag !== 22 ? bf() : 536870912), (l.lanes |= t), (be |= t));
  }
  function eu(l, t) {
    if (!$)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), (t = t.sibling);
          a === null ? (l.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = l.tail;
          for (var e = null; a !== null; )
            a.alternate !== null && (e = a), (a = a.sibling);
          e === null
            ? t || l.tail === null
              ? (l.tail = null)
              : (l.tail.sibling = null)
            : (e.sibling = null);
      }
  }
  function hl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      a = 0,
      e = 0;
    if (t)
      for (var u = l.child; u !== null; )
        (a |= u.lanes | u.childLanes),
          (e |= u.subtreeFlags & 65011712),
          (e |= u.flags & 65011712),
          (u.return = l),
          (u = u.sibling);
    else
      for (u = l.child; u !== null; )
        (a |= u.lanes | u.childLanes),
          (e |= u.subtreeFlags),
          (e |= u.flags),
          (u.return = l),
          (u = u.sibling);
    return (l.subtreeFlags |= e), (l.childLanes = a), t;
  }
  function ey(l, t, a) {
    var e = t.pendingProps;
    switch ((Mc(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return hl(t), null;
      case 1:
        return hl(t), null;
      case 3:
        return (
          (a = t.stateNode),
          (e = null),
          l !== null && (e = l.memoizedState.cache),
          t.memoizedState.cache !== e && (t.flags |= 2048),
          Qt(Tl),
          zl(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (l === null || l.child === null) &&
            (ce(t)
              ? Lt(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Dc())),
          hl(t),
          null
        );
      case 26:
        var u = t.type,
          n = t.memoizedState;
        return (
          l === null
            ? (Lt(t),
              n !== null ? (hl(t), Q0(t, n)) : (hl(t), Si(t, u, null, e, a)))
            : n
            ? n !== l.memoizedState
              ? (Lt(t), hl(t), Q0(t, n))
              : (hl(t), (t.flags &= -16777217))
            : ((l = l.memoizedProps),
              l !== e && Lt(t),
              hl(t),
              Si(t, u, l, e, a)),
          null
        );
      case 27:
        if (
          (Eu(t),
          (a = L.current),
          (u = t.type),
          l !== null && t.stateNode != null)
        )
          l.memoizedProps !== e && Lt(t);
        else {
          if (!e) {
            if (t.stateNode === null) throw Error(y(166));
            return hl(t), null;
          }
          (l = x.current),
            ce(t) ? bs(t) : ((l = ko(u, e, a)), (t.stateNode = l), Lt(t));
        }
        return hl(t), null;
      case 5:
        if ((Eu(t), (u = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== e && Lt(t);
        else {
          if (!e) {
            if (t.stateNode === null) throw Error(y(166));
            return hl(t), null;
          }
          if (((n = x.current), ce(t))) bs(t);
          else {
            var c = Dn(L.current);
            switch (n) {
              case 1:
                n = c.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                n = c.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    n = c.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    n = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    (n = c.createElement("div")),
                      (n.innerHTML = "<script></script>"),
                      (n = n.removeChild(n.firstChild));
                    break;
                  case "select":
                    (n =
                      typeof e.is == "string"
                        ? c.createElement("select", { is: e.is })
                        : c.createElement("select")),
                      e.multiple
                        ? (n.multiple = !0)
                        : e.size && (n.size = e.size);
                    break;
                  default:
                    n =
                      typeof e.is == "string"
                        ? c.createElement(u, { is: e.is })
                        : c.createElement(u);
                }
            }
            (n[jl] = t), (n[$l] = e);
            l: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6) n.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                (c.child.return = c), (c = c.child);
                continue;
              }
              if (c === t) break l;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t) break l;
                c = c.return;
              }
              (c.sibling.return = c.return), (c = c.sibling);
            }
            t.stateNode = n;
            l: switch ((Bl(n, u, e), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!e.autoFocus;
                break l;
              case "img":
                e = !0;
                break l;
              default:
                e = !1;
            }
            e && Lt(t);
          }
        }
        return (
          hl(t),
          Si(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, a),
          null
        );
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== e && Lt(t);
        else {
          if (typeof e != "string" && t.stateNode === null) throw Error(y(166));
          if (((l = L.current), ce(t))) {
            if (
              ((l = t.stateNode),
              (a = t.memoizedProps),
              (e = null),
              (u = Rl),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  e = u.memoizedProps;
              }
            (l[jl] = t),
              (l = !!(
                l.nodeValue === a ||
                (e !== null && e.suppressHydrationWarning === !0) ||
                Yo(l.nodeValue, a)
              )),
              l || ea(t, !0);
          } else (l = Dn(l).createTextNode(e)), (l[jl] = t), (t.stateNode = l);
        }
        return hl(t), null;
      case 31:
        if (((a = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((e = ce(t)), a !== null)) {
            if (l === null) {
              if (!e) throw Error(y(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(y(557));
              l[jl] = t;
            } else
              Ca(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            hl(t), (l = !1);
          } else
            (a = Dc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = a),
              (l = !0);
          if (!l) return t.flags & 256 ? (st(t), t) : (st(t), null);
          if ((t.flags & 128) !== 0) throw Error(y(558));
        }
        return hl(t), null;
      case 13:
        if (
          ((e = t.memoizedState),
          l === null ||
            (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((u = ce(t)), e !== null && e.dehydrated !== null)) {
            if (l === null) {
              if (!u) throw Error(y(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(y(317));
              u[jl] = t;
            } else
              Ca(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            hl(t), (u = !1);
          } else
            (u = Dc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = u),
              (u = !0);
          if (!u) return t.flags & 256 ? (st(t), t) : (st(t), null);
        }
        return (
          st(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = e !== null),
              (l = l !== null && l.memoizedState !== null),
              a &&
                ((e = t.child),
                (u = null),
                e.alternate !== null &&
                  e.alternate.memoizedState !== null &&
                  e.alternate.memoizedState.cachePool !== null &&
                  (u = e.alternate.memoizedState.cachePool.pool),
                (n = null),
                e.memoizedState !== null &&
                  e.memoizedState.cachePool !== null &&
                  (n = e.memoizedState.cachePool.pool),
                n !== u && (e.flags |= 2048)),
              a !== l && a && (t.child.flags |= 8192),
              mn(t, t.updateQueue),
              hl(t),
              null)
        );
      case 4:
        return zl(), l === null && Qi(t.stateNode.containerInfo), hl(t), null;
      case 10:
        return Qt(t.type), hl(t), null;
      case 19:
        if ((A(Al), (e = t.memoizedState), e === null)) return hl(t), null;
        if (((u = (t.flags & 128) !== 0), (n = e.rendering), n === null))
          if (u) eu(e, !1);
          else {
            if (Sl !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null; ) {
                if (((n = Pu(l)), n !== null)) {
                  for (
                    t.flags |= 128,
                      eu(e, !1),
                      l = n.updateQueue,
                      t.updateQueue = l,
                      mn(t, l),
                      t.subtreeFlags = 0,
                      l = a,
                      a = t.child;
                    a !== null;

                  )
                    vs(a, l), (a = a.sibling);
                  return (
                    O(Al, (Al.current & 1) | 2),
                    $ && Bt(t, e.treeForkCount),
                    t.child
                  );
                }
                l = l.sibling;
              }
            e.tail !== null &&
              et() > Sn &&
              ((t.flags |= 128), (u = !0), eu(e, !1), (t.lanes = 4194304));
          }
        else {
          if (!u)
            if (((l = Pu(n)), l !== null)) {
              if (
                ((t.flags |= 128),
                (u = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                mn(t, l),
                eu(e, !0),
                e.tail === null &&
                  e.tailMode === "hidden" &&
                  !n.alternate &&
                  !$)
              )
                return hl(t), null;
            } else
              2 * et() - e.renderingStartTime > Sn &&
                a !== 536870912 &&
                ((t.flags |= 128), (u = !0), eu(e, !1), (t.lanes = 4194304));
          e.isBackwards
            ? ((n.sibling = t.child), (t.child = n))
            : ((l = e.last),
              l !== null ? (l.sibling = n) : (t.child = n),
              (e.last = n));
        }
        return e.tail !== null
          ? ((l = e.tail),
            (e.rendering = l),
            (e.tail = l.sibling),
            (e.renderingStartTime = et()),
            (l.sibling = null),
            (a = Al.current),
            O(Al, u ? (a & 1) | 2 : a & 1),
            $ && Bt(t, e.treeForkCount),
            l)
          : (hl(t), null);
      case 22:
      case 23:
        return (
          st(t),
          Xc(),
          (e = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== e && (t.flags |= 8192)
            : e && (t.flags |= 8192),
          e
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (hl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : hl(t),
          (a = t.updateQueue),
          a !== null && mn(t, a.retryQueue),
          (a = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (a = l.memoizedState.cachePool.pool),
          (e = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (e = t.memoizedState.cachePool.pool),
          e !== a && (t.flags |= 2048),
          l !== null && A(Ra),
          null
        );
      case 24:
        return (
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Qt(Tl),
          hl(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(y(156, t.tag));
  }
  function uy(l, t) {
    switch ((Mc(t), t.tag)) {
      case 1:
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 3:
        return (
          Qt(Tl),
          zl(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0
            ? ((t.flags = (l & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Eu(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if ((st(t), t.alternate === null)) throw Error(y(340));
          Ca();
        }
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 13:
        if (
          (st(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(y(340));
          Ca();
        }
        return (
          (l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 19:
        return A(Al), null;
      case 4:
        return zl(), null;
      case 10:
        return Qt(t.type), null;
      case 22:
      case 23:
        return (
          st(t),
          Xc(),
          l !== null && A(Ra),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return Qt(Tl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function X0(l, t) {
    switch ((Mc(t), t.tag)) {
      case 3:
        Qt(Tl), zl();
        break;
      case 26:
      case 27:
      case 5:
        Eu(t);
        break;
      case 4:
        zl();
        break;
      case 31:
        t.memoizedState !== null && st(t);
        break;
      case 13:
        st(t);
        break;
      case 19:
        A(Al);
        break;
      case 10:
        Qt(t.type);
        break;
      case 22:
      case 23:
        st(t), Xc(), l !== null && A(Ra);
        break;
      case 24:
        Qt(Tl);
    }
  }
  function uu(l, t) {
    try {
      var a = t.updateQueue,
        e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var u = e.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            e = void 0;
            var n = a.create,
              c = a.inst;
            (e = n()), (c.destroy = e);
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (i) {
      cl(t, t.return, i);
    }
  }
  function oa(l, t, a) {
    try {
      var e = t.updateQueue,
        u = e !== null ? e.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            var c = e.inst,
              i = c.destroy;
            if (i !== void 0) {
              (c.destroy = void 0), (u = t);
              var f = a,
                v = i;
              try {
                v();
              } catch (g) {
                cl(u, f, g);
              }
            }
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (g) {
      cl(t, t.return, g);
    }
  }
  function Z0(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var a = l.stateNode;
      try {
        Cs(t, a);
      } catch (e) {
        cl(l, l.return, e);
      }
    }
  }
  function V0(l, t, a) {
    (a.props = Qa(l.type, l.memoizedProps)), (a.state = l.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (e) {
      cl(l, t, e);
    }
  }
  function nu(l, t) {
    try {
      var a = l.ref;
      if (a !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var e = l.stateNode;
            break;
          case 30:
            e = l.stateNode;
            break;
          default:
            e = l.stateNode;
        }
        typeof a == "function" ? (l.refCleanup = a(e)) : (a.current = e);
      }
    } catch (u) {
      cl(l, t, u);
    }
  }
  function Ut(l, t) {
    var a = l.ref,
      e = l.refCleanup;
    if (a !== null)
      if (typeof e == "function")
        try {
          e();
        } catch (u) {
          cl(l, t, u);
        } finally {
          (l.refCleanup = null),
            (l = l.alternate),
            l != null && (l.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          cl(l, t, u);
        }
      else a.current = null;
  }
  function L0(l) {
    var t = l.type,
      a = l.memoizedProps,
      e = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break l;
        case "img":
          a.src ? (e.src = a.src) : a.srcSet && (e.srcset = a.srcSet);
      }
    } catch (u) {
      cl(l, l.return, u);
    }
  }
  function bi(l, t, a) {
    try {
      var e = l.stateNode;
      My(e, l.type, a, t), (e[$l] = t);
    } catch (u) {
      cl(l, l.return, u);
    }
  }
  function K0(l) {
    return (
      l.tag === 5 ||
      l.tag === 3 ||
      l.tag === 26 ||
      (l.tag === 27 && ga(l.type)) ||
      l.tag === 4
    );
  }
  function pi(l) {
    l: for (;;) {
      for (; l.sibling === null; ) {
        if (l.return === null || K0(l.return)) return null;
        l = l.return;
      }
      for (
        l.sibling.return = l.return, l = l.sibling;
        l.tag !== 5 && l.tag !== 6 && l.tag !== 18;

      ) {
        if (
          (l.tag === 27 && ga(l.type)) ||
          l.flags & 2 ||
          l.child === null ||
          l.tag === 4
        )
          continue l;
        (l.child.return = l), (l = l.child);
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function zi(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      (l = l.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
              ? a.ownerDocument.body
              : a
            ).insertBefore(l, t)
          : ((t =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a),
            t.appendChild(l),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = Rt));
    else if (
      e !== 4 &&
      (e === 27 && ga(l.type) && ((a = l.stateNode), (t = null)),
      (l = l.child),
      l !== null)
    )
      for (zi(l, t, a), l = l.sibling; l !== null; )
        zi(l, t, a), (l = l.sibling);
  }
  function vn(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      (l = l.stateNode), t ? a.insertBefore(l, t) : a.appendChild(l);
    else if (
      e !== 4 &&
      (e === 27 && ga(l.type) && (a = l.stateNode), (l = l.child), l !== null)
    )
      for (vn(l, t, a), l = l.sibling; l !== null; )
        vn(l, t, a), (l = l.sibling);
  }
  function J0(l) {
    var t = l.stateNode,
      a = l.memoizedProps;
    try {
      for (var e = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Bl(t, e, a), (t[jl] = l), (t[$l] = a);
    } catch (n) {
      cl(l, l.return, n);
    }
  }
  var Kt = !1,
    Dl = !1,
    Ai = !1,
    w0 = typeof WeakSet == "function" ? WeakSet : Set,
    Hl = null;
  function ny(l, t) {
    if (((l = l.containerInfo), (Vi = Rn), (l = ns(l)), hc(l))) {
      if ("selectionStart" in l)
        var a = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          a = ((a = l.ownerDocument) && a.defaultView) || window;
          var e = a.getSelection && a.getSelection();
          if (e && e.rangeCount !== 0) {
            a = e.anchorNode;
            var u = e.anchorOffset,
              n = e.focusNode;
            e = e.focusOffset;
            try {
              a.nodeType, n.nodeType;
            } catch {
              a = null;
              break l;
            }
            var c = 0,
              i = -1,
              f = -1,
              v = 0,
              g = 0,
              p = l,
              h = null;
            t: for (;;) {
              for (
                var r;
                p !== a || (u !== 0 && p.nodeType !== 3) || (i = c + u),
                  p !== n || (e !== 0 && p.nodeType !== 3) || (f = c + e),
                  p.nodeType === 3 && (c += p.nodeValue.length),
                  (r = p.firstChild) !== null;

              )
                (h = p), (p = r);
              for (;;) {
                if (p === l) break t;
                if (
                  (h === a && ++v === u && (i = c),
                  h === n && ++g === e && (f = c),
                  (r = p.nextSibling) !== null)
                )
                  break;
                (p = h), (h = p.parentNode);
              }
              p = r;
            }
            a = i === -1 || f === -1 ? null : { start: i, end: f };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      Li = { focusedElem: l, selectionRange: a }, Rn = !1, Hl = t;
      Hl !== null;

    )
      if (
        ((t = Hl), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)
      )
        (l.return = t), (Hl = l);
      else
        for (; Hl !== null; ) {
          switch (((t = Hl), (n = t.alternate), (l = t.flags), t.tag)) {
            case 0:
              if (
                (l & 4) !== 0 &&
                ((l = t.updateQueue),
                (l = l !== null ? l.events : null),
                l !== null)
              )
                for (a = 0; a < l.length; a++)
                  (u = l[a]), (u.ref.impl = u.nextImpl);
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                (l = void 0),
                  (a = t),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (e = a.stateNode);
                try {
                  var D = Qa(a.type, u);
                  (l = e.getSnapshotBeforeUpdate(D, n)),
                    (e.__reactInternalSnapshotBeforeUpdate = l);
                } catch (q) {
                  cl(a, a.return, q);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (
                  ((l = t.stateNode.containerInfo), (a = l.nodeType), a === 9)
                )
                  wi(l);
                else if (a === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wi(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(y(163));
          }
          if (((l = t.sibling), l !== null)) {
            (l.return = t.return), (Hl = l);
            break;
          }
          Hl = t.return;
        }
  }
  function k0(l, t, a) {
    var e = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        wt(l, a), e & 4 && uu(5, a);
        break;
      case 1:
        if ((wt(l, a), e & 4))
          if (((l = a.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (c) {
              cl(a, a.return, c);
            }
          else {
            var u = Qa(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              cl(a, a.return, c);
            }
          }
        e & 64 && Z0(a), e & 512 && nu(a, a.return);
        break;
      case 3:
        if ((wt(l, a), e & 64 && ((l = a.updateQueue), l !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Cs(l, t);
          } catch (c) {
            cl(a, a.return, c);
          }
        }
        break;
      case 27:
        t === null && e & 4 && J0(a);
      case 26:
      case 5:
        wt(l, a), t === null && e & 4 && L0(a), e & 512 && nu(a, a.return);
        break;
      case 12:
        wt(l, a);
        break;
      case 31:
        wt(l, a), e & 4 && F0(l, a);
        break;
      case 13:
        wt(l, a),
          e & 4 && I0(l, a),
          e & 64 &&
            ((l = a.memoizedState),
            l !== null &&
              ((l = l.dehydrated),
              l !== null && ((a = vy.bind(null, a)), jy(l, a))));
        break;
      case 22:
        if (((e = a.memoizedState !== null || Kt), !e)) {
          (t = (t !== null && t.memoizedState !== null) || Dl), (u = Kt);
          var n = Dl;
          (Kt = e),
            (Dl = t) && !n ? kt(l, a, (a.subtreeFlags & 8772) !== 0) : wt(l, a),
            (Kt = u),
            (Dl = n);
        }
        break;
      case 30:
        break;
      default:
        wt(l, a);
    }
  }
  function W0(l) {
    var t = l.alternate;
    t !== null && ((l.alternate = null), W0(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && In(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null);
  }
  var rl = null,
    Il = !1;
  function Jt(l, t, a) {
    for (a = a.child; a !== null; ) $0(l, t, a), (a = a.sibling);
  }
  function $0(l, t, a) {
    if (ut && typeof ut.onCommitFiberUnmount == "function")
      try {
        ut.onCommitFiberUnmount(Ne, a);
      } catch {}
    switch (a.tag) {
      case 26:
        Dl || Ut(a, t),
          Jt(l, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        Dl || Ut(a, t);
        var e = rl,
          u = Il;
        ga(a.type) && ((rl = a.stateNode), (Il = !1)),
          Jt(l, t, a),
          vu(a.stateNode),
          (rl = e),
          (Il = u);
        break;
      case 5:
        Dl || Ut(a, t);
      case 6:
        if (
          ((e = rl),
          (u = Il),
          (rl = null),
          Jt(l, t, a),
          (rl = e),
          (Il = u),
          rl !== null)
        )
          if (Il)
            try {
              (rl.nodeType === 9
                ? rl.body
                : rl.nodeName === "HTML"
                ? rl.ownerDocument.body
                : rl
              ).removeChild(a.stateNode);
            } catch (n) {
              cl(a, t, n);
            }
          else
            try {
              rl.removeChild(a.stateNode);
            } catch (n) {
              cl(a, t, n);
            }
        break;
      case 18:
        rl !== null &&
          (Il
            ? ((l = rl),
              Vo(
                l.nodeType === 9
                  ? l.body
                  : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l,
                a.stateNode
              ),
              Oe(l))
            : Vo(rl, a.stateNode));
        break;
      case 4:
        (e = rl),
          (u = Il),
          (rl = a.stateNode.containerInfo),
          (Il = !0),
          Jt(l, t, a),
          (rl = e),
          (Il = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        oa(2, a, t), Dl || oa(4, a, t), Jt(l, t, a);
        break;
      case 1:
        Dl ||
          (Ut(a, t),
          (e = a.stateNode),
          typeof e.componentWillUnmount == "function" && V0(a, t, e)),
          Jt(l, t, a);
        break;
      case 21:
        Jt(l, t, a);
        break;
      case 22:
        (Dl = (e = Dl) || a.memoizedState !== null), Jt(l, t, a), (Dl = e);
        break;
      default:
        Jt(l, t, a);
    }
  }
  function F0(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
    ) {
      l = l.dehydrated;
      try {
        Oe(l);
      } catch (a) {
        cl(t, t.return, a);
      }
    }
  }
  function I0(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate),
      l !== null &&
        ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        Oe(l);
      } catch (a) {
        cl(t, t.return, a);
      }
  }
  function cy(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new w0()), t;
      case 22:
        return (
          (l = l.stateNode),
          (t = l._retryCache),
          t === null && (t = l._retryCache = new w0()),
          t
        );
      default:
        throw Error(y(435, l.tag));
    }
  }
  function hn(l, t) {
    var a = cy(l);
    t.forEach(function (e) {
      if (!a.has(e)) {
        a.add(e);
        var u = hy.bind(null, l, e);
        e.then(u, u);
      }
    });
  }
  function Pl(l, t) {
    var a = t.deletions;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = a[e],
          n = l,
          c = t,
          i = c;
        l: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (ga(i.type)) {
                (rl = i.stateNode), (Il = !1);
                break l;
              }
              break;
            case 5:
              (rl = i.stateNode), (Il = !1);
              break l;
            case 3:
            case 4:
              (rl = i.stateNode.containerInfo), (Il = !0);
              break l;
          }
          i = i.return;
        }
        if (rl === null) throw Error(y(160));
        $0(n, c, u),
          (rl = null),
          (Il = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null);
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) P0(t, l), (t = t.sibling);
  }
  var Tt = null;
  function P0(l, t) {
    var a = l.alternate,
      e = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Pl(t, l),
          lt(l),
          e & 4 && (oa(3, l, l.return), uu(3, l), oa(5, l, l.return));
        break;
      case 1:
        Pl(t, l),
          lt(l),
          e & 512 && (Dl || a === null || Ut(a, a.return)),
          e & 64 &&
            Kt &&
            ((l = l.updateQueue),
            l !== null &&
              ((e = l.callbacks),
              e !== null &&
                ((a = l.shared.hiddenCallbacks),
                (l.shared.hiddenCallbacks = a === null ? e : a.concat(e)))));
        break;
      case 26:
        var u = Tt;
        if (
          (Pl(t, l),
          lt(l),
          e & 512 && (Dl || a === null || Ut(a, a.return)),
          e & 4)
        ) {
          var n = a !== null ? a.memoizedState : null;
          if (((e = l.memoizedState), a === null))
            if (e === null)
              if (l.stateNode === null) {
                l: {
                  (e = l.type),
                    (a = l.memoizedProps),
                    (u = u.ownerDocument || u);
                  t: switch (e) {
                    case "title":
                      (n = u.getElementsByTagName("title")[0]),
                        (!n ||
                          n[Ce] ||
                          n[jl] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(e)),
                          u.head.insertBefore(
                            n,
                            u.querySelector("head > title")
                          )),
                        Bl(n, e, a),
                        (n[jl] = l),
                        Cl(n),
                        (e = n);
                      break l;
                    case "link":
                      var c = ld("link", "href", u).get(e + (a.href || ""));
                      if (c) {
                        for (var i = 0; i < c.length; i++)
                          if (
                            ((n = c[i]),
                            n.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              n.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              n.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              n.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      (n = u.createElement(e)),
                        Bl(n, e, a),
                        u.head.appendChild(n);
                      break;
                    case "meta":
                      if (
                        (c = ld("meta", "content", u).get(
                          e + (a.content || "")
                        ))
                      ) {
                        for (i = 0; i < c.length; i++)
                          if (
                            ((n = c[i]),
                            n.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              n.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              n.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              n.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              n.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      (n = u.createElement(e)),
                        Bl(n, e, a),
                        u.head.appendChild(n);
                      break;
                    default:
                      throw Error(y(468, e));
                  }
                  (n[jl] = l), Cl(n), (e = n);
                }
                l.stateNode = e;
              } else td(u, l.type, l.stateNode);
            else l.stateNode = Po(u, e, l.memoizedProps);
          else
            n !== e
              ? (n === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : n.count--,
                e === null
                  ? td(u, l.type, l.stateNode)
                  : Po(u, e, l.memoizedProps))
              : e === null &&
                l.stateNode !== null &&
                bi(l, l.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        Pl(t, l),
          lt(l),
          e & 512 && (Dl || a === null || Ut(a, a.return)),
          a !== null && e & 4 && bi(l, l.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (
          (Pl(t, l),
          lt(l),
          e & 512 && (Dl || a === null || Ut(a, a.return)),
          l.flags & 32)
        ) {
          u = l.stateNode;
          try {
            $a(u, "");
          } catch (D) {
            cl(l, l.return, D);
          }
        }
        e & 4 &&
          l.stateNode != null &&
          ((u = l.memoizedProps), bi(l, u, a !== null ? a.memoizedProps : u)),
          e & 1024 && (Ai = !0);
        break;
      case 6:
        if ((Pl(t, l), lt(l), e & 4)) {
          if (l.stateNode === null) throw Error(y(162));
          (e = l.memoizedProps), (a = l.stateNode);
          try {
            a.nodeValue = e;
          } catch (D) {
            cl(l, l.return, D);
          }
        }
        break;
      case 3:
        if (
          ((Un = null),
          (u = Tt),
          (Tt = Nn(t.containerInfo)),
          Pl(t, l),
          (Tt = u),
          lt(l),
          e & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Oe(t.containerInfo);
          } catch (D) {
            cl(l, l.return, D);
          }
        Ai && ((Ai = !1), lo(l));
        break;
      case 4:
        (e = Tt),
          (Tt = Nn(l.stateNode.containerInfo)),
          Pl(t, l),
          lt(l),
          (Tt = e);
        break;
      case 12:
        Pl(t, l), lt(l);
        break;
      case 31:
        Pl(t, l),
          lt(l),
          e & 4 &&
            ((e = l.updateQueue),
            e !== null && ((l.updateQueue = null), hn(l, e)));
        break;
      case 13:
        Pl(t, l),
          lt(l),
          l.child.flags & 8192 &&
            (l.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (gn = et()),
          e & 4 &&
            ((e = l.updateQueue),
            e !== null && ((l.updateQueue = null), hn(l, e)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = a !== null && a.memoizedState !== null,
          v = Kt,
          g = Dl;
        if (
          ((Kt = v || u),
          (Dl = g || f),
          Pl(t, l),
          (Dl = g),
          (Kt = v),
          lt(l),
          e & 8192)
        )
          l: for (
            t = l.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (a === null || f || Kt || Dl || Xa(l)),
              a = null,
              t = l;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                f = a = t;
                try {
                  if (((n = f.stateNode), u))
                    (c = n.style),
                      typeof c.setProperty == "function"
                        ? c.setProperty("display", "none", "important")
                        : (c.display = "none");
                  else {
                    i = f.stateNode;
                    var p = f.memoizedProps.style,
                      h =
                        p != null && p.hasOwnProperty("display")
                          ? p.display
                          : null;
                    i.style.display =
                      h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                  }
                } catch (D) {
                  cl(f, f.return, D);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (D) {
                  cl(f, f.return, D);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                f = t;
                try {
                  var r = f.stateNode;
                  u ? Lo(r, !0) : Lo(f.stateNode, !1);
                } catch (D) {
                  cl(f, f.return, D);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === l) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              a === t && (a = null), (t = t.return);
            }
            a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        e & 4 &&
          ((e = l.updateQueue),
          e !== null &&
            ((a = e.retryQueue),
            a !== null && ((e.retryQueue = null), hn(l, a))));
        break;
      case 19:
        Pl(t, l),
          lt(l),
          e & 4 &&
            ((e = l.updateQueue),
            e !== null && ((l.updateQueue = null), hn(l, e)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Pl(t, l), lt(l);
    }
  }
  function lt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var a, e = l.return; e !== null; ) {
          if (K0(e)) {
            a = e;
            break;
          }
          e = e.return;
        }
        if (a == null) throw Error(y(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode,
              n = pi(l);
            vn(l, n, u);
            break;
          case 5:
            var c = a.stateNode;
            a.flags & 32 && ($a(c, ""), (a.flags &= -33));
            var i = pi(l);
            vn(l, i, c);
            break;
          case 3:
          case 4:
            var f = a.stateNode.containerInfo,
              v = pi(l);
            zi(l, v, f);
            break;
          default:
            throw Error(y(161));
        }
      } catch (g) {
        cl(l, l.return, g);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function lo(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        lo(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (l = l.sibling);
      }
  }
  function wt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) k0(l, t.alternate, t), (t = t.sibling);
  }
  function Xa(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oa(4, t, t.return), Xa(t);
          break;
        case 1:
          Ut(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && V0(t, t.return, a),
            Xa(t);
          break;
        case 27:
          vu(t.stateNode);
        case 26:
        case 5:
          Ut(t, t.return), Xa(t);
          break;
        case 22:
          t.memoizedState === null && Xa(t);
          break;
        case 30:
          Xa(t);
          break;
        default:
          Xa(t);
      }
      l = l.sibling;
    }
  }
  function kt(l, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var e = t.alternate,
        u = l,
        n = t,
        c = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          kt(u, n, a), uu(4, n);
          break;
        case 1:
          if (
            (kt(u, n, a),
            (e = n),
            (u = e.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (v) {
              cl(e, e.return, v);
            }
          if (((e = n), (u = e.updateQueue), u !== null)) {
            var i = e.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  Us(f[u], i);
            } catch (v) {
              cl(e, e.return, v);
            }
          }
          a && c & 64 && Z0(n), nu(n, n.return);
          break;
        case 27:
          J0(n);
        case 26:
        case 5:
          kt(u, n, a), a && e === null && c & 4 && L0(n), nu(n, n.return);
          break;
        case 12:
          kt(u, n, a);
          break;
        case 31:
          kt(u, n, a), a && c & 4 && F0(u, n);
          break;
        case 13:
          kt(u, n, a), a && c & 4 && I0(u, n);
          break;
        case 22:
          n.memoizedState === null && kt(u, n, a), nu(n, n.return);
          break;
        case 30:
          break;
        default:
          kt(u, n, a);
      }
      t = t.sibling;
    }
  }
  function Ei(l, t) {
    var a = null;
    l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (a = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
      l !== a && (l != null && l.refCount++, a != null && Ke(a));
  }
  function _i(l, t) {
    (l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && Ke(l));
  }
  function Mt(l, t, a, e) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) to(l, t, a, e), (t = t.sibling);
  }
  function to(l, t, a, e) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Mt(l, t, a, e), u & 2048 && uu(9, t);
        break;
      case 1:
        Mt(l, t, a, e);
        break;
      case 3:
        Mt(l, t, a, e),
          u & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && Ke(l)));
        break;
      case 12:
        if (u & 2048) {
          Mt(l, t, a, e), (l = t.stateNode);
          try {
            var n = t.memoizedProps,
              c = n.id,
              i = n.onPostCommit;
            typeof i == "function" &&
              i(
                c,
                t.alternate === null ? "mount" : "update",
                l.passiveEffectDuration,
                -0
              );
          } catch (f) {
            cl(t, t.return, f);
          }
        } else Mt(l, t, a, e);
        break;
      case 31:
        Mt(l, t, a, e);
        break;
      case 13:
        Mt(l, t, a, e);
        break;
      case 23:
        break;
      case 22:
        (n = t.stateNode),
          (c = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? Mt(l, t, a, e)
              : cu(l, t)
            : n._visibility & 2
            ? Mt(l, t, a, e)
            : ((n._visibility |= 2),
              re(l, t, a, e, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Ei(c, t);
        break;
      case 24:
        Mt(l, t, a, e), u & 2048 && _i(t.alternate, t);
        break;
      default:
        Mt(l, t, a, e);
    }
  }
  function re(l, t, a, e, u) {
    for (
      u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;

    ) {
      var n = l,
        c = t,
        i = a,
        f = e,
        v = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          re(n, c, i, f, u), uu(8, c);
          break;
        case 23:
          break;
        case 22:
          var g = c.stateNode;
          c.memoizedState !== null
            ? g._visibility & 2
              ? re(n, c, i, f, u)
              : cu(n, c)
            : ((g._visibility |= 2), re(n, c, i, f, u)),
            u && v & 2048 && Ei(c.alternate, c);
          break;
        case 24:
          re(n, c, i, f, u), u && v & 2048 && _i(c.alternate, c);
          break;
        default:
          re(n, c, i, f, u);
      }
      t = t.sibling;
    }
  }
  function cu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = l,
          e = t,
          u = e.flags;
        switch (e.tag) {
          case 22:
            cu(a, e), u & 2048 && Ei(e.alternate, e);
            break;
          case 24:
            cu(a, e), u & 2048 && _i(e.alternate, e);
            break;
          default:
            cu(a, e);
        }
        t = t.sibling;
      }
  }
  var iu = 8192;
  function ge(l, t, a) {
    if (l.subtreeFlags & iu)
      for (l = l.child; l !== null; ) ao(l, t, a), (l = l.sibling);
  }
  function ao(l, t, a) {
    switch (l.tag) {
      case 26:
        ge(l, t, a),
          l.flags & iu &&
            l.memoizedState !== null &&
            Jy(a, Tt, l.memoizedState, l.memoizedProps);
        break;
      case 5:
        ge(l, t, a);
        break;
      case 3:
      case 4:
        var e = Tt;
        (Tt = Nn(l.stateNode.containerInfo)), ge(l, t, a), (Tt = e);
        break;
      case 22:
        l.memoizedState === null &&
          ((e = l.alternate),
          e !== null && e.memoizedState !== null
            ? ((e = iu), (iu = 16777216), ge(l, t, a), (iu = e))
            : ge(l, t, a));
        break;
      default:
        ge(l, t, a);
    }
  }
  function eo(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do (t = l.sibling), (l.sibling = null), (l = t);
      while (l !== null);
    }
  }
  function fu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          (Hl = e), no(e, l);
        }
      eo(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) uo(l), (l = l.sibling);
  }
  function uo(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        fu(l), l.flags & 2048 && oa(9, l, l.return);
        break;
      case 3:
        fu(l);
        break;
      case 12:
        fu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null &&
        t._visibility & 2 &&
        (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), rn(l))
          : fu(l);
        break;
      default:
        fu(l);
    }
  }
  function rn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          (Hl = e), no(e, l);
        }
      eo(l);
    }
    for (l = l.child; l !== null; ) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          oa(8, t, t.return), rn(t);
          break;
        case 22:
          (a = t.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), rn(t));
          break;
        default:
          rn(t);
      }
      l = l.sibling;
    }
  }
  function no(l, t) {
    for (; Hl !== null; ) {
      var a = Hl;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          oa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var e = a.memoizedState.cachePool.pool;
            e != null && e.refCount++;
          }
          break;
        case 24:
          Ke(a.memoizedState.cache);
      }
      if (((e = a.child), e !== null)) (e.return = a), (Hl = e);
      else
        l: for (a = l; Hl !== null; ) {
          e = Hl;
          var u = e.sibling,
            n = e.return;
          if ((W0(e), e === a)) {
            Hl = null;
            break l;
          }
          if (u !== null) {
            (u.return = n), (Hl = u);
            break l;
          }
          Hl = n;
        }
    }
  }
  var iy = {
      getCacheForType: function (l) {
        var t = ql(Tl),
          a = t.data.get(l);
        return a === void 0 && ((a = l()), t.data.set(l, a)), a;
      },
      cacheSignal: function () {
        return ql(Tl).controller.signal;
      },
    },
    fy = typeof WeakMap == "function" ? WeakMap : Map,
    al = 0,
    yl = null,
    K = null,
    w = 0,
    nl = 0,
    ot = null,
    da = !1,
    Se = !1,
    Ti = !1,
    Wt = 0,
    Sl = 0,
    ya = 0,
    Za = 0,
    Mi = 0,
    dt = 0,
    be = 0,
    su = null,
    tt = null,
    Oi = !1,
    gn = 0,
    co = 0,
    Sn = 1 / 0,
    bn = null,
    ma = null,
    xl = 0,
    va = null,
    pe = null,
    $t = 0,
    Di = 0,
    Ni = null,
    io = null,
    ou = 0,
    xi = null;
  function yt() {
    return (al & 2) !== 0 && w !== 0 ? w & -w : S.T !== null ? qi() : Ef();
  }
  function fo() {
    if (dt === 0)
      if ((w & 536870912) === 0 || $) {
        var l = Mu;
        (Mu <<= 1), (Mu & 3932160) === 0 && (Mu = 262144), (dt = l);
      } else dt = 536870912;
    return (l = ft.current), l !== null && (l.flags |= 32), dt;
  }
  function at(l, t, a) {
    ((l === yl && (nl === 2 || nl === 9)) || l.cancelPendingCommit !== null) &&
      (ze(l, 0), ha(l, w, dt, !1)),
      Ue(l, a),
      ((al & 2) === 0 || l !== yl) &&
        (l === yl &&
          ((al & 2) === 0 && (Za |= a), Sl === 4 && ha(l, w, dt, !1)),
        Ct(l));
  }
  function so(l, t, a) {
    if ((al & 6) !== 0) throw Error(y(327));
    var e = (!a && (t & 127) === 0 && (t & l.expiredLanes) === 0) || xe(l, t),
      u = e ? dy(l, t) : Ci(l, t, !0),
      n = e;
    do {
      if (u === 0) {
        Se && !e && ha(l, t, 0, !1);
        break;
      } else {
        if (((a = l.current.alternate), n && !sy(a))) {
          (u = Ci(l, t, !1)), (n = !1);
          continue;
        }
        if (u === 2) {
          if (((n = t), l.errorRecoveryDisabledLanes & n)) var c = 0;
          else
            (c = l.pendingLanes & -536870913),
              (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0);
          if (c !== 0) {
            t = c;
            l: {
              var i = l;
              u = su;
              var f = i.current.memoizedState.isDehydrated;
              if ((f && (ze(i, c).flags |= 256), (c = Ci(i, c, !1)), c !== 2)) {
                if (Ti && !f) {
                  (i.errorRecoveryDisabledLanes |= n), (Za |= n), (u = 4);
                  break l;
                }
                (n = tt),
                  (tt = u),
                  n !== null && (tt === null ? (tt = n) : tt.push.apply(tt, n));
              }
              u = c;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          ze(l, 0), ha(l, t, 0, !0);
          break;
        }
        l: {
          switch (((e = l), (n = u), n)) {
            case 0:
            case 1:
              throw Error(y(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ha(e, t, dt, !da);
              break l;
            case 2:
              tt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(y(329));
          }
          if ((t & 62914560) === t && ((u = gn + 300 - et()), 10 < u)) {
            if ((ha(e, t, dt, !da), Du(e, 0, !0) !== 0)) break l;
            ($t = t),
              (e.timeoutHandle = Xo(
                oo.bind(
                  null,
                  e,
                  a,
                  tt,
                  bn,
                  Oi,
                  t,
                  dt,
                  Za,
                  be,
                  da,
                  n,
                  "Throttled",
                  -0,
                  0
                ),
                u
              ));
            break l;
          }
          oo(e, a, tt, bn, Oi, t, dt, Za, be, da, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ct(l);
  }
  function oo(l, t, a, e, u, n, c, i, f, v, g, p, h, r) {
    if (
      ((l.timeoutHandle = -1),
      (p = t.subtreeFlags),
      p & 8192 || (p & 16785408) === 16785408)
    ) {
      (p = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Rt,
      }),
        ao(t, n, p);
      var D =
        (n & 62914560) === n ? gn - et() : (n & 4194048) === n ? co - et() : 0;
      if (((D = wy(p, D)), D !== null)) {
        ($t = n),
          (l.cancelPendingCommit = D(
            bo.bind(null, l, t, n, a, e, u, c, i, f, g, p, null, h, r)
          )),
          ha(l, n, c, !v);
        return;
      }
    }
    bo(l, t, n, a, e, u, c, i, f);
  }
  function sy(l) {
    for (var t = l; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var e = 0; e < a.length; e++) {
          var u = a[e],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!ct(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        (a.return = t), (t = a);
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function ha(l, t, a, e) {
    (t &= ~Mi),
      (t &= ~Za),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      e && (l.warmLanes |= t),
      (e = l.expirationTimes);
    for (var u = t; 0 < u; ) {
      var n = 31 - nt(u),
        c = 1 << n;
      (e[n] = -1), (u &= ~c);
    }
    a !== 0 && pf(l, a, t);
  }
  function pn() {
    return (al & 6) === 0 ? (du(0), !1) : !0;
  }
  function Ui() {
    if (K !== null) {
      if (nl === 0) var l = K.return;
      else (l = K), (Gt = Ha = null), wc(l), (de = null), (we = 0), (l = K);
      for (; l !== null; ) X0(l.alternate, l), (l = l.return);
      K = null;
    }
  }
  function ze(l, t) {
    var a = l.timeoutHandle;
    a !== -1 && ((l.timeoutHandle = -1), Ny(a)),
      (a = l.cancelPendingCommit),
      a !== null && ((l.cancelPendingCommit = null), a()),
      ($t = 0),
      Ui(),
      (yl = l),
      (K = a = Yt(l.current, null)),
      (w = t),
      (nl = 0),
      (ot = null),
      (da = !1),
      (Se = xe(l, t)),
      (Ti = !1),
      (be = dt = Mi = Za = ya = Sl = 0),
      (tt = su = null),
      (Oi = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var e = l.entangledLanes;
    if (e !== 0)
      for (l = l.entanglements, e &= t; 0 < e; ) {
        var u = 31 - nt(e),
          n = 1 << u;
        (t |= l[u]), (e &= ~n);
      }
    return (Wt = t), Qu(), a;
  }
  function yo(l, t) {
    (Z = null),
      (S.H = tu),
      t === oe || t === ku
        ? ((t = Os()), (nl = 3))
        : t === Rc
        ? ((t = Os()), (nl = 4))
        : (nl =
            t === si
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (ot = t),
      K === null && ((Sl = 1), sn(l, rt(t, l.current)));
  }
  function mo() {
    var l = ft.current;
    return l === null
      ? !0
      : (w & 4194048) === w
      ? pt === null
      : (w & 62914560) === w || (w & 536870912) !== 0
      ? l === pt
      : !1;
  }
  function vo() {
    var l = S.H;
    return (S.H = tu), l === null ? tu : l;
  }
  function ho() {
    var l = S.A;
    return (S.A = iy), l;
  }
  function zn() {
    (Sl = 4),
      da || ((w & 4194048) !== w && ft.current !== null) || (Se = !0),
      ((ya & 134217727) === 0 && (Za & 134217727) === 0) ||
        yl === null ||
        ha(yl, w, dt, !1);
  }
  function Ci(l, t, a) {
    var e = al;
    al |= 2;
    var u = vo(),
      n = ho();
    (yl !== l || w !== t) && ((bn = null), ze(l, t)), (t = !1);
    var c = Sl;
    l: do
      try {
        if (nl !== 0 && K !== null) {
          var i = K,
            f = ot;
          switch (nl) {
            case 8:
              Ui(), (c = 6);
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              ft.current === null && (t = !0);
              var v = nl;
              if (((nl = 0), (ot = null), Ae(l, i, f, v), a && Se)) {
                c = 0;
                break l;
              }
              break;
            default:
              (v = nl), (nl = 0), (ot = null), Ae(l, i, f, v);
          }
        }
        oy(), (c = Sl);
        break;
      } catch (g) {
        yo(l, g);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (Gt = Ha = null),
      (al = e),
      (S.H = u),
      (S.A = n),
      K === null && ((yl = null), (w = 0), Qu()),
      c
    );
  }
  function oy() {
    for (; K !== null; ) ro(K);
  }
  function dy(l, t) {
    var a = al;
    al |= 2;
    var e = vo(),
      u = ho();
    yl !== l || w !== t
      ? ((bn = null), (Sn = et() + 500), ze(l, t))
      : (Se = xe(l, t));
    l: do
      try {
        if (nl !== 0 && K !== null) {
          t = K;
          var n = ot;
          t: switch (nl) {
            case 1:
              (nl = 0), (ot = null), Ae(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Ts(n)) {
                (nl = 0), (ot = null), go(t);
                break;
              }
              (t = function () {
                (nl !== 2 && nl !== 9) || yl !== l || (nl = 7), Ct(l);
              }),
                n.then(t, t);
              break l;
            case 3:
              nl = 7;
              break l;
            case 4:
              nl = 5;
              break l;
            case 7:
              Ts(n)
                ? ((nl = 0), (ot = null), go(t))
                : ((nl = 0), (ot = null), Ae(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (K.tag) {
                case 26:
                  c = K.memoizedState;
                case 5:
                case 27:
                  var i = K;
                  if (c ? ad(c) : i.stateNode.complete) {
                    (nl = 0), (ot = null);
                    var f = i.sibling;
                    if (f !== null) K = f;
                    else {
                      var v = i.return;
                      v !== null ? ((K = v), An(v)) : (K = null);
                    }
                    break t;
                  }
              }
              (nl = 0), (ot = null), Ae(l, t, n, 5);
              break;
            case 6:
              (nl = 0), (ot = null), Ae(l, t, n, 6);
              break;
            case 8:
              Ui(), (Sl = 6);
              break l;
            default:
              throw Error(y(462));
          }
        }
        yy();
        break;
      } catch (g) {
        yo(l, g);
      }
    while (!0);
    return (
      (Gt = Ha = null),
      (S.H = e),
      (S.A = u),
      (al = a),
      K !== null ? 0 : ((yl = null), (w = 0), Qu(), Sl)
    );
  }
  function yy() {
    for (; K !== null && !Rd(); ) ro(K);
  }
  function ro(l) {
    var t = G0(l.alternate, l, Wt);
    (l.memoizedProps = l.pendingProps), t === null ? An(l) : (K = t);
  }
  function go(l) {
    var t = l,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = H0(a, t, t.pendingProps, t.type, void 0, w);
        break;
      case 11:
        t = H0(a, t, t.pendingProps, t.type.render, t.ref, w);
        break;
      case 5:
        wc(t);
      default:
        X0(a, t), (t = K = vs(t, Wt)), (t = G0(a, t, Wt));
    }
    (l.memoizedProps = l.pendingProps), t === null ? An(l) : (K = t);
  }
  function Ae(l, t, a, e) {
    (Gt = Ha = null), wc(t), (de = null), (we = 0);
    var u = t.return;
    try {
      if (ly(l, u, t, a, w)) {
        (Sl = 1), sn(l, rt(a, l.current)), (K = null);
        return;
      }
    } catch (n) {
      if (u !== null) throw ((K = u), n);
      (Sl = 1), sn(l, rt(a, l.current)), (K = null);
      return;
    }
    t.flags & 32768
      ? ($ || e === 1
          ? (l = !0)
          : Se || (w & 536870912) !== 0
          ? (l = !1)
          : ((da = l = !0),
            (e === 2 || e === 9 || e === 3 || e === 6) &&
              ((e = ft.current),
              e !== null && e.tag === 13 && (e.flags |= 16384))),
        So(t, l))
      : An(t);
  }
  function An(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        So(t, da);
        return;
      }
      l = t.return;
      var a = ey(t.alternate, t, Wt);
      if (a !== null) {
        K = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        K = t;
        return;
      }
      K = t = l;
    } while (t !== null);
    Sl === 0 && (Sl = 5);
  }
  function So(l, t) {
    do {
      var a = uy(l.alternate, l);
      if (a !== null) {
        (a.flags &= 32767), (K = a);
        return;
      }
      if (
        ((a = l.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        K = l;
        return;
      }
      K = l = a;
    } while (l !== null);
    (Sl = 6), (K = null);
  }
  function bo(l, t, a, e, u, n, c, i, f) {
    l.cancelPendingCommit = null;
    do En();
    while (xl !== 0);
    if ((al & 6) !== 0) throw Error(y(327));
    if (t !== null) {
      if (t === l.current) throw Error(y(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= pc),
        Kd(l, a, n, c, i, f),
        l === yl && ((K = yl = null), (w = 0)),
        (pe = t),
        (va = l),
        ($t = a),
        (Di = n),
        (Ni = u),
        (io = e),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            ry(_u, function () {
              return _o(), null;
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (e = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || e)
      ) {
        (e = S.T), (S.T = null), (u = M.p), (M.p = 2), (c = al), (al |= 4);
        try {
          ny(l, t, a);
        } finally {
          (al = c), (M.p = u), (S.T = e);
        }
      }
      (xl = 1), po(), zo(), Ao();
    }
  }
  function po() {
    if (xl === 1) {
      xl = 0;
      var l = va,
        t = pe,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        (a = S.T), (S.T = null);
        var e = M.p;
        M.p = 2;
        var u = al;
        al |= 4;
        try {
          P0(t, l);
          var n = Li,
            c = ns(l.containerInfo),
            i = n.focusedElem,
            f = n.selectionRange;
          if (
            c !== i &&
            i &&
            i.ownerDocument &&
            us(i.ownerDocument.documentElement, i)
          ) {
            if (f !== null && hc(i)) {
              var v = f.start,
                g = f.end;
              if ((g === void 0 && (g = v), "selectionStart" in i))
                (i.selectionStart = v),
                  (i.selectionEnd = Math.min(g, i.value.length));
              else {
                var p = i.ownerDocument || document,
                  h = (p && p.defaultView) || window;
                if (h.getSelection) {
                  var r = h.getSelection(),
                    D = i.textContent.length,
                    q = Math.min(f.start, D),
                    ol = f.end === void 0 ? q : Math.min(f.end, D);
                  !r.extend && q > ol && ((c = ol), (ol = q), (q = c));
                  var d = es(i, q),
                    s = es(i, ol);
                  if (
                    d &&
                    s &&
                    (r.rangeCount !== 1 ||
                      r.anchorNode !== d.node ||
                      r.anchorOffset !== d.offset ||
                      r.focusNode !== s.node ||
                      r.focusOffset !== s.offset)
                  ) {
                    var m = p.createRange();
                    m.setStart(d.node, d.offset),
                      r.removeAllRanges(),
                      q > ol
                        ? (r.addRange(m), r.extend(s.node, s.offset))
                        : (m.setEnd(s.node, s.offset), r.addRange(m));
                  }
                }
              }
            }
            for (p = [], r = i; (r = r.parentNode); )
              r.nodeType === 1 &&
                p.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
            for (
              typeof i.focus == "function" && i.focus(), i = 0;
              i < p.length;
              i++
            ) {
              var b = p[i];
              (b.element.scrollLeft = b.left), (b.element.scrollTop = b.top);
            }
          }
          (Rn = !!Vi), (Li = Vi = null);
        } finally {
          (al = u), (M.p = e), (S.T = a);
        }
      }
      (l.current = t), (xl = 2);
    }
  }
  function zo() {
    if (xl === 2) {
      xl = 0;
      var l = va,
        t = pe,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        (a = S.T), (S.T = null);
        var e = M.p;
        M.p = 2;
        var u = al;
        al |= 4;
        try {
          k0(l, t.alternate, t);
        } finally {
          (al = u), (M.p = e), (S.T = a);
        }
      }
      xl = 3;
    }
  }
  function Ao() {
    if (xl === 4 || xl === 3) {
      (xl = 0), qd();
      var l = va,
        t = pe,
        a = $t,
        e = io;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (xl = 5)
        : ((xl = 0), (pe = va = null), Eo(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (
        (u === 0 && (ma = null),
        $n(a),
        (t = t.stateNode),
        ut && typeof ut.onCommitFiberRoot == "function")
      )
        try {
          ut.onCommitFiberRoot(Ne, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (e !== null) {
        (t = S.T), (u = M.p), (M.p = 2), (S.T = null);
        try {
          for (var n = l.onRecoverableError, c = 0; c < e.length; c++) {
            var i = e[c];
            n(i.value, { componentStack: i.stack });
          }
        } finally {
          (S.T = t), (M.p = u);
        }
      }
      ($t & 3) !== 0 && En(),
        Ct(l),
        (u = l.pendingLanes),
        (a & 261930) !== 0 && (u & 42) !== 0
          ? l === xi
            ? ou++
            : ((ou = 0), (xi = l))
          : (ou = 0),
        du(0);
    }
  }
  function Eo(l, t) {
    (l.pooledCacheLanes &= t) === 0 &&
      ((t = l.pooledCache), t != null && ((l.pooledCache = null), Ke(t)));
  }
  function En() {
    return po(), zo(), Ao(), _o();
  }
  function _o() {
    if (xl !== 5) return !1;
    var l = va,
      t = Di;
    Di = 0;
    var a = $n($t),
      e = S.T,
      u = M.p;
    try {
      (M.p = 32 > a ? 32 : a), (S.T = null), (a = Ni), (Ni = null);
      var n = va,
        c = $t;
      if (((xl = 0), (pe = va = null), ($t = 0), (al & 6) !== 0))
        throw Error(y(331));
      var i = al;
      if (
        ((al |= 4),
        uo(n.current),
        to(n, n.current, c, a),
        (al = i),
        du(0, !1),
        ut && typeof ut.onPostCommitFiberRoot == "function")
      )
        try {
          ut.onPostCommitFiberRoot(Ne, n);
        } catch {}
      return !0;
    } finally {
      (M.p = u), (S.T = e), Eo(l, t);
    }
  }
  function To(l, t, a) {
    (t = rt(a, t)),
      (t = fi(l.stateNode, t, 2)),
      (l = ia(l, t, 2)),
      l !== null && (Ue(l, 2), Ct(l));
  }
  function cl(l, t, a) {
    if (l.tag === 3) To(l, l, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          To(t, l, a);
          break;
        } else if (t.tag === 1) {
          var e = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof e.componentDidCatch == "function" &&
              (ma === null || !ma.has(e)))
          ) {
            (l = rt(a, l)),
              (a = T0(2)),
              (e = ia(t, a, 2)),
              e !== null && (M0(a, e, t, l), Ue(e, 2), Ct(e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Hi(l, t, a) {
    var e = l.pingCache;
    if (e === null) {
      e = l.pingCache = new fy();
      var u = new Set();
      e.set(t, u);
    } else (u = e.get(t)), u === void 0 && ((u = new Set()), e.set(t, u));
    u.has(a) ||
      ((Ti = !0), u.add(a), (l = my.bind(null, l, t, a)), t.then(l, l));
  }
  function my(l, t, a) {
    var e = l.pingCache;
    e !== null && e.delete(t),
      (l.pingedLanes |= l.suspendedLanes & a),
      (l.warmLanes &= ~a),
      yl === l &&
        (w & a) === a &&
        (Sl === 4 || (Sl === 3 && (w & 62914560) === w && 300 > et() - gn)
          ? (al & 2) === 0 && ze(l, 0)
          : (Mi |= a),
        be === w && (be = 0)),
      Ct(l);
  }
  function Mo(l, t) {
    t === 0 && (t = bf()), (l = xa(l, t)), l !== null && (Ue(l, t), Ct(l));
  }
  function vy(l) {
    var t = l.memoizedState,
      a = 0;
    t !== null && (a = t.retryLane), Mo(l, a);
  }
  function hy(l, t) {
    var a = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var e = l.stateNode,
          u = l.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        e = l.stateNode;
        break;
      case 22:
        e = l.stateNode._retryCache;
        break;
      default:
        throw Error(y(314));
    }
    e !== null && e.delete(t), Mo(l, a);
  }
  function ry(l, t) {
    return Jn(l, t);
  }
  var _n = null,
    Ee = null,
    ji = !1,
    Tn = !1,
    Ri = !1,
    ra = 0;
  function Ct(l) {
    l !== Ee &&
      l.next === null &&
      (Ee === null ? (_n = Ee = l) : (Ee = Ee.next = l)),
      (Tn = !0),
      ji || ((ji = !0), Sy());
  }
  function du(l, t) {
    if (!Ri && Tn) {
      Ri = !0;
      do
        for (var a = !1, e = _n; e !== null; ) {
          if (l !== 0) {
            var u = e.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = e.suspendedLanes,
                i = e.pingedLanes;
              (n = (1 << (31 - nt(42 | l) + 1)) - 1),
                (n &= u & ~(c & ~i)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0);
            }
            n !== 0 && ((a = !0), xo(e, n));
          } else
            (n = w),
              (n = Du(
                e,
                e === yl ? n : 0,
                e.cancelPendingCommit !== null || e.timeoutHandle !== -1
              )),
              (n & 3) === 0 || xe(e, n) || ((a = !0), xo(e, n));
          e = e.next;
        }
      while (a);
      Ri = !1;
    }
  }
  function gy() {
    Oo();
  }
  function Oo() {
    Tn = ji = !1;
    var l = 0;
    ra !== 0 && Dy() && (l = ra);
    for (var t = et(), a = null, e = _n; e !== null; ) {
      var u = e.next,
        n = Do(e, t);
      n === 0
        ? ((e.next = null),
          a === null ? (_n = u) : (a.next = u),
          u === null && (Ee = a))
        : ((a = e), (l !== 0 || (n & 3) !== 0) && (Tn = !0)),
        (e = u);
    }
    (xl !== 0 && xl !== 5) || du(l), ra !== 0 && (ra = 0);
  }
  function Do(l, t) {
    for (
      var a = l.suspendedLanes,
        e = l.pingedLanes,
        u = l.expirationTimes,
        n = l.pendingLanes & -62914561;
      0 < n;

    ) {
      var c = 31 - nt(n),
        i = 1 << c,
        f = u[c];
      f === -1
        ? ((i & a) === 0 || (i & e) !== 0) && (u[c] = Ld(i, t))
        : f <= t && (l.expiredLanes |= i),
        (n &= ~i);
    }
    if (
      ((t = yl),
      (a = w),
      (a = Du(
        l,
        l === t ? a : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1
      )),
      (e = l.callbackNode),
      a === 0 ||
        (l === t && (nl === 2 || nl === 9)) ||
        l.cancelPendingCommit !== null)
    )
      return (
        e !== null && e !== null && wn(e),
        (l.callbackNode = null),
        (l.callbackPriority = 0)
      );
    if ((a & 3) === 0 || xe(l, a)) {
      if (((t = a & -a), t === l.callbackPriority)) return t;
      switch ((e !== null && wn(e), $n(a))) {
        case 2:
        case 8:
          a = gf;
          break;
        case 32:
          a = _u;
          break;
        case 268435456:
          a = Sf;
          break;
        default:
          a = _u;
      }
      return (
        (e = No.bind(null, l)),
        (a = Jn(a, e)),
        (l.callbackPriority = t),
        (l.callbackNode = a),
        t
      );
    }
    return (
      e !== null && e !== null && wn(e),
      (l.callbackPriority = 2),
      (l.callbackNode = null),
      2
    );
  }
  function No(l, t) {
    if (xl !== 0 && xl !== 5)
      return (l.callbackNode = null), (l.callbackPriority = 0), null;
    var a = l.callbackNode;
    if (En() && l.callbackNode !== a) return null;
    var e = w;
    return (
      (e = Du(
        l,
        l === yl ? e : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1
      )),
      e === 0
        ? null
        : (so(l, e, t),
          Do(l, et()),
          l.callbackNode != null && l.callbackNode === a
            ? No.bind(null, l)
            : null)
    );
  }
  function xo(l, t) {
    if (En()) return null;
    so(l, t, !0);
  }
  function Sy() {
    xy(function () {
      (al & 6) !== 0 ? Jn(rf, gy) : Oo();
    });
  }
  function qi() {
    if (ra === 0) {
      var l = fe;
      l === 0 && ((l = Tu), (Tu <<= 1), (Tu & 261888) === 0 && (Tu = 256)),
        (ra = l);
    }
    return ra;
  }
  function Uo(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean"
      ? null
      : typeof l == "function"
      ? l
      : Cu("" + l);
  }
  function Co(l, t) {
    var a = t.ownerDocument.createElement("input");
    return (
      (a.name = t.name),
      (a.value = t.value),
      l.id && a.setAttribute("form", l.id),
      t.parentNode.insertBefore(a, t),
      (l = new FormData(l)),
      a.parentNode.removeChild(a),
      l
    );
  }
  function by(l, t, a, e, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var n = Uo((u[$l] || null).action),
        c = e.submitter;
      c &&
        ((t = (t = c[$l] || null)
          ? Uo(t.formAction)
          : c.getAttribute("formAction")),
        t !== null && ((n = t), (c = null)));
      var i = new qu("action", "action", null, e, u);
      l.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (e.defaultPrevented) {
                if (ra !== 0) {
                  var f = c ? Co(u, c) : new FormData(u);
                  ai(
                    a,
                    { pending: !0, data: f, method: u.method, action: n },
                    null,
                    f
                  );
                }
              } else
                typeof n == "function" &&
                  (i.preventDefault(),
                  (f = c ? Co(u, c) : new FormData(u)),
                  ai(
                    a,
                    { pending: !0, data: f, method: u.method, action: n },
                    n,
                    f
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Yi = 0; Yi < bc.length; Yi++) {
    var Bi = bc[Yi],
      py = Bi.toLowerCase(),
      zy = Bi[0].toUpperCase() + Bi.slice(1);
    _t(py, "on" + zy);
  }
  _t(fs, "onAnimationEnd"),
    _t(ss, "onAnimationIteration"),
    _t(os, "onAnimationStart"),
    _t("dblclick", "onDoubleClick"),
    _t("focusin", "onFocus"),
    _t("focusout", "onBlur"),
    _t(Y1, "onTransitionRun"),
    _t(B1, "onTransitionStart"),
    _t(G1, "onTransitionCancel"),
    _t(ds, "onTransitionEnd"),
    ka("onMouseEnter", ["mouseout", "mouseover"]),
    ka("onMouseLeave", ["mouseout", "mouseover"]),
    ka("onPointerEnter", ["pointerout", "pointerover"]),
    ka("onPointerLeave", ["pointerout", "pointerover"]),
    Ma(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Ma(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Ma("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ma(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Ma(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Ma(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var yu =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Ay = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(yu)
    );
  function Ho(l, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < l.length; a++) {
      var e = l[a],
        u = e.event;
      e = e.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var c = e.length - 1; 0 <= c; c--) {
            var i = e[c],
              f = i.instance,
              v = i.currentTarget;
            if (((i = i.listener), f !== n && u.isPropagationStopped()))
              break l;
            (n = i), (u.currentTarget = v);
            try {
              n(u);
            } catch (g) {
              Gu(g);
            }
            (u.currentTarget = null), (n = f);
          }
        else
          for (c = 0; c < e.length; c++) {
            if (
              ((i = e[c]),
              (f = i.instance),
              (v = i.currentTarget),
              (i = i.listener),
              f !== n && u.isPropagationStopped())
            )
              break l;
            (n = i), (u.currentTarget = v);
            try {
              n(u);
            } catch (g) {
              Gu(g);
            }
            (u.currentTarget = null), (n = f);
          }
      }
    }
  }
  function J(l, t) {
    var a = t[Fn];
    a === void 0 && (a = t[Fn] = new Set());
    var e = l + "__bubble";
    a.has(e) || (jo(t, l, 2, !1), a.add(e));
  }
  function Gi(l, t, a) {
    var e = 0;
    t && (e |= 4), jo(a, l, e, t);
  }
  var Mn = "_reactListening" + Math.random().toString(36).slice(2);
  function Qi(l) {
    if (!l[Mn]) {
      (l[Mn] = !0),
        Mf.forEach(function (a) {
          a !== "selectionchange" && (Ay.has(a) || Gi(a, !1, l), Gi(a, !0, l));
        });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Mn] || ((t[Mn] = !0), Gi("selectionchange", !1, t));
    }
  }
  function jo(l, t, a, e) {
    switch (sd(t)) {
      case 2:
        var u = $y;
        break;
      case 8:
        u = Fy;
        break;
      default:
        u = tf;
    }
    (a = u.bind(null, t, a, l)),
      (u = void 0),
      !cc ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      e
        ? u !== void 0
          ? l.addEventListener(t, a, { capture: !0, passive: u })
          : l.addEventListener(t, a, !0)
        : u !== void 0
        ? l.addEventListener(t, a, { passive: u })
        : l.addEventListener(t, a, !1);
  }
  function Xi(l, t, a, e, u) {
    var n = e;
    if ((t & 1) === 0 && (t & 2) === 0 && e !== null)
      l: for (;;) {
        if (e === null) return;
        var c = e.tag;
        if (c === 3 || c === 4) {
          var i = e.stateNode.containerInfo;
          if (i === u) break;
          if (c === 4)
            for (c = e.return; c !== null; ) {
              var f = c.tag;
              if ((f === 3 || f === 4) && c.stateNode.containerInfo === u)
                return;
              c = c.return;
            }
          for (; i !== null; ) {
            if (((c = Ka(i)), c === null)) return;
            if (((f = c.tag), f === 5 || f === 6 || f === 26 || f === 27)) {
              e = n = c;
              continue l;
            }
            i = i.parentNode;
          }
        }
        e = e.return;
      }
    Bf(function () {
      var v = n,
        g = uc(a),
        p = [];
      l: {
        var h = ys.get(l);
        if (h !== void 0) {
          var r = qu,
            D = l;
          switch (l) {
            case "keypress":
              if (ju(a) === 0) break l;
            case "keydown":
            case "keyup":
              r = h1;
              break;
            case "focusin":
              (D = "focus"), (r = oc);
              break;
            case "focusout":
              (D = "blur"), (r = oc);
              break;
            case "beforeblur":
            case "afterblur":
              r = oc;
              break;
            case "click":
              if (a.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              r = Xf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              r = e1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              r = S1;
              break;
            case fs:
            case ss:
            case os:
              r = c1;
              break;
            case ds:
              r = p1;
              break;
            case "scroll":
            case "scrollend":
              r = t1;
              break;
            case "wheel":
              r = A1;
              break;
            case "copy":
            case "cut":
            case "paste":
              r = f1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              r = Vf;
              break;
            case "toggle":
            case "beforetoggle":
              r = _1;
          }
          var q = (t & 4) !== 0,
            ol = !q && (l === "scroll" || l === "scrollend"),
            d = q ? (h !== null ? h + "Capture" : null) : h;
          q = [];
          for (var s = v, m; s !== null; ) {
            var b = s;
            if (
              ((m = b.stateNode),
              (b = b.tag),
              (b !== 5 && b !== 26 && b !== 27) ||
                m === null ||
                d === null ||
                ((b = je(s, d)), b != null && q.push(mu(s, b, m))),
              ol)
            )
              break;
            s = s.return;
          }
          0 < q.length &&
            ((h = new r(h, D, null, a, g)), p.push({ event: h, listeners: q }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((h = l === "mouseover" || l === "pointerover"),
            (r = l === "mouseout" || l === "pointerout"),
            h &&
              a !== ec &&
              (D = a.relatedTarget || a.fromElement) &&
              (Ka(D) || D[La]))
          )
            break l;
          if (
            (r || h) &&
            ((h =
              g.window === g
                ? g
                : (h = g.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
            r
              ? ((D = a.relatedTarget || a.toElement),
                (r = v),
                (D = D ? Ka(D) : null),
                D !== null &&
                  ((ol = Y(D)),
                  (q = D.tag),
                  D !== ol || (q !== 5 && q !== 27 && q !== 6)) &&
                  (D = null))
              : ((r = null), (D = v)),
            r !== D)
          ) {
            if (
              ((q = Xf),
              (b = "onMouseLeave"),
              (d = "onMouseEnter"),
              (s = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((q = Vf),
                (b = "onPointerLeave"),
                (d = "onPointerEnter"),
                (s = "pointer")),
              (ol = r == null ? h : He(r)),
              (m = D == null ? h : He(D)),
              (h = new q(b, s + "leave", r, a, g)),
              (h.target = ol),
              (h.relatedTarget = m),
              (b = null),
              Ka(g) === v &&
                ((q = new q(d, s + "enter", D, a, g)),
                (q.target = m),
                (q.relatedTarget = ol),
                (b = q)),
              (ol = b),
              r && D)
            )
              t: {
                for (q = Ey, d = r, s = D, m = 0, b = d; b; b = q(b)) m++;
                b = 0;
                for (var R = s; R; R = q(R)) b++;
                for (; 0 < m - b; ) (d = q(d)), m--;
                for (; 0 < b - m; ) (s = q(s)), b--;
                for (; m--; ) {
                  if (d === s || (s !== null && d === s.alternate)) {
                    q = d;
                    break t;
                  }
                  (d = q(d)), (s = q(s));
                }
                q = null;
              }
            else q = null;
            r !== null && Ro(p, h, r, q, !1),
              D !== null && ol !== null && Ro(p, ol, D, q, !0);
          }
        }
        l: {
          if (
            ((h = v ? He(v) : window),
            (r = h.nodeName && h.nodeName.toLowerCase()),
            r === "select" || (r === "input" && h.type === "file"))
          )
            var I = Ff;
          else if (Wf(h))
            if (If) I = j1;
            else {
              I = C1;
              var U = U1;
            }
          else
            (r = h.nodeName),
              !r ||
              r.toLowerCase() !== "input" ||
              (h.type !== "checkbox" && h.type !== "radio")
                ? v && ac(v.elementType) && (I = Ff)
                : (I = H1);
          if (I && (I = I(l, v))) {
            $f(p, I, a, g);
            break l;
          }
          U && U(l, h, v),
            l === "focusout" &&
              v &&
              h.type === "number" &&
              v.memoizedProps.value != null &&
              tc(h, "number", h.value);
        }
        switch (((U = v ? He(v) : window), l)) {
          case "focusin":
            (Wf(U) || U.contentEditable === "true") &&
              ((le = U), (rc = v), (Ze = null));
            break;
          case "focusout":
            Ze = rc = le = null;
            break;
          case "mousedown":
            gc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (gc = !1), cs(p, a, g);
            break;
          case "selectionchange":
            if (q1) break;
          case "keydown":
          case "keyup":
            cs(p, a, g);
        }
        var V;
        if (yc)
          l: {
            switch (l) {
              case "compositionstart":
                var k = "onCompositionStart";
                break l;
              case "compositionend":
                k = "onCompositionEnd";
                break l;
              case "compositionupdate":
                k = "onCompositionUpdate";
                break l;
            }
            k = void 0;
          }
        else
          Pa
            ? wf(l, a) && (k = "onCompositionEnd")
            : l === "keydown" &&
              a.keyCode === 229 &&
              (k = "onCompositionStart");
        k &&
          (Lf &&
            a.locale !== "ko" &&
            (Pa || k !== "onCompositionStart"
              ? k === "onCompositionEnd" && Pa && (V = Gf())
              : ((la = g),
                (ic = "value" in la ? la.value : la.textContent),
                (Pa = !0))),
          (U = On(v, k)),
          0 < U.length &&
            ((k = new Zf(k, l, null, a, g)),
            p.push({ event: k, listeners: U }),
            V ? (k.data = V) : ((V = kf(a)), V !== null && (k.data = V)))),
          (V = M1 ? O1(l, a) : D1(l, a)) &&
            ((k = On(v, "onBeforeInput")),
            0 < k.length &&
              ((U = new Zf("onBeforeInput", "beforeinput", null, a, g)),
              p.push({ event: U, listeners: k }),
              (U.data = V))),
          by(p, l, v, a, g);
      }
      Ho(p, t);
    });
  }
  function mu(l, t, a) {
    return { instance: l, listener: t, currentTarget: a };
  }
  function On(l, t) {
    for (var a = t + "Capture", e = []; l !== null; ) {
      var u = l,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = je(l, a)),
          u != null && e.unshift(mu(l, u, n)),
          (u = je(l, t)),
          u != null && e.push(mu(l, u, n))),
        l.tag === 3)
      )
        return e;
      l = l.return;
    }
    return [];
  }
  function Ey(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Ro(l, t, a, e, u) {
    for (var n = t._reactName, c = []; a !== null && a !== e; ) {
      var i = a,
        f = i.alternate,
        v = i.stateNode;
      if (((i = i.tag), f !== null && f === e)) break;
      (i !== 5 && i !== 26 && i !== 27) ||
        v === null ||
        ((f = v),
        u
          ? ((v = je(a, n)), v != null && c.unshift(mu(a, v, f)))
          : u || ((v = je(a, n)), v != null && c.push(mu(a, v, f)))),
        (a = a.return);
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var _y = /\r\n?/g,
    Ty = /\u0000|\uFFFD/g;
  function qo(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        _y,
        `
`
      )
      .replace(Ty, "");
  }
  function Yo(l, t) {
    return (t = qo(t)), qo(l) === t;
  }
  function sl(l, t, a, e, u, n) {
    switch (a) {
      case "children":
        typeof e == "string"
          ? t === "body" || (t === "textarea" && e === "") || $a(l, e)
          : (typeof e == "number" || typeof e == "bigint") &&
            t !== "body" &&
            $a(l, "" + e);
        break;
      case "className":
        xu(l, "class", e);
        break;
      case "tabIndex":
        xu(l, "tabindex", e);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        xu(l, a, e);
        break;
      case "style":
        qf(l, e, n);
        break;
      case "data":
        if (t !== "object") {
          xu(l, "data", e);
          break;
        }
      case "src":
      case "href":
        if (e === "" && (t !== "a" || a !== "href")) {
          l.removeAttribute(a);
          break;
        }
        if (
          e == null ||
          typeof e == "function" ||
          typeof e == "symbol" ||
          typeof e == "boolean"
        ) {
          l.removeAttribute(a);
          break;
        }
        (e = Cu("" + e)), l.setAttribute(a, e);
        break;
      case "action":
      case "formAction":
        if (typeof e == "function") {
          l.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" &&
            (a === "formAction"
              ? (t !== "input" && sl(l, t, "name", u.name, u, null),
                sl(l, t, "formEncType", u.formEncType, u, null),
                sl(l, t, "formMethod", u.formMethod, u, null),
                sl(l, t, "formTarget", u.formTarget, u, null))
              : (sl(l, t, "encType", u.encType, u, null),
                sl(l, t, "method", u.method, u, null),
                sl(l, t, "target", u.target, u, null)));
        if (e == null || typeof e == "symbol" || typeof e == "boolean") {
          l.removeAttribute(a);
          break;
        }
        (e = Cu("" + e)), l.setAttribute(a, e);
        break;
      case "onClick":
        e != null && (l.onclick = Rt);
        break;
      case "onScroll":
        e != null && J("scroll", l);
        break;
      case "onScrollEnd":
        e != null && J("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e)) throw Error(y(61));
          if (((a = e.__html), a != null)) {
            if (u.children != null) throw Error(y(60));
            l.innerHTML = a;
          }
        }
        break;
      case "multiple":
        l.multiple = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "muted":
        l.muted = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          e == null ||
          typeof e == "function" ||
          typeof e == "boolean" ||
          typeof e == "symbol"
        ) {
          l.removeAttribute("xlink:href");
          break;
        }
        (a = Cu("" + e)),
          l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        e != null && typeof e != "function" && typeof e != "symbol"
          ? l.setAttribute(a, "" + e)
          : l.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        e && typeof e != "function" && typeof e != "symbol"
          ? l.setAttribute(a, "")
          : l.removeAttribute(a);
        break;
      case "capture":
      case "download":
        e === !0
          ? l.setAttribute(a, "")
          : e !== !1 &&
            e != null &&
            typeof e != "function" &&
            typeof e != "symbol"
          ? l.setAttribute(a, e)
          : l.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        e != null &&
        typeof e != "function" &&
        typeof e != "symbol" &&
        !isNaN(e) &&
        1 <= e
          ? l.setAttribute(a, e)
          : l.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        e == null || typeof e == "function" || typeof e == "symbol" || isNaN(e)
          ? l.removeAttribute(a)
          : l.setAttribute(a, e);
        break;
      case "popover":
        J("beforetoggle", l), J("toggle", l), Nu(l, "popover", e);
        break;
      case "xlinkActuate":
        jt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", e);
        break;
      case "xlinkArcrole":
        jt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", e);
        break;
      case "xlinkRole":
        jt(l, "http://www.w3.org/1999/xlink", "xlink:role", e);
        break;
      case "xlinkShow":
        jt(l, "http://www.w3.org/1999/xlink", "xlink:show", e);
        break;
      case "xlinkTitle":
        jt(l, "http://www.w3.org/1999/xlink", "xlink:title", e);
        break;
      case "xlinkType":
        jt(l, "http://www.w3.org/1999/xlink", "xlink:type", e);
        break;
      case "xmlBase":
        jt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", e);
        break;
      case "xmlLang":
        jt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", e);
        break;
      case "xmlSpace":
        jt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", e);
        break;
      case "is":
        Nu(l, "is", e);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = Pd.get(a) || a), Nu(l, a, e));
    }
  }
  function Zi(l, t, a, e, u, n) {
    switch (a) {
      case "style":
        qf(l, e, n);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e)) throw Error(y(61));
          if (((a = e.__html), a != null)) {
            if (u.children != null) throw Error(y(60));
            l.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof e == "string"
          ? $a(l, e)
          : (typeof e == "number" || typeof e == "bigint") && $a(l, "" + e);
        break;
      case "onScroll":
        e != null && J("scroll", l);
        break;
      case "onScrollEnd":
        e != null && J("scrollend", l);
        break;
      case "onClick":
        e != null && (l.onclick = Rt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Of.hasOwnProperty(a))
          l: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((u = a.endsWith("Capture")),
              (t = a.slice(2, u ? a.length - 7 : void 0)),
              (n = l[$l] || null),
              (n = n != null ? n[a] : null),
              typeof n == "function" && l.removeEventListener(t, n, u),
              typeof e == "function")
            ) {
              typeof n != "function" &&
                n !== null &&
                (a in l
                  ? (l[a] = null)
                  : l.hasAttribute(a) && l.removeAttribute(a)),
                l.addEventListener(t, e, u);
              break l;
            }
            a in l
              ? (l[a] = e)
              : e === !0
              ? l.setAttribute(a, "")
              : Nu(l, a, e);
          }
    }
  }
  function Bl(l, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        J("error", l), J("load", l);
        var e = !1,
          u = !1,
          n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var c = a[n];
            if (c != null)
              switch (n) {
                case "src":
                  e = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(y(137, t));
                default:
                  sl(l, t, n, c, a, null);
              }
          }
        u && sl(l, t, "srcSet", a.srcSet, a, null),
          e && sl(l, t, "src", a.src, a, null);
        return;
      case "input":
        J("invalid", l);
        var i = (n = c = u = null),
          f = null,
          v = null;
        for (e in a)
          if (a.hasOwnProperty(e)) {
            var g = a[e];
            if (g != null)
              switch (e) {
                case "name":
                  u = g;
                  break;
                case "type":
                  c = g;
                  break;
                case "checked":
                  f = g;
                  break;
                case "defaultChecked":
                  v = g;
                  break;
                case "value":
                  n = g;
                  break;
                case "defaultValue":
                  i = g;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (g != null) throw Error(y(137, t));
                  break;
                default:
                  sl(l, t, e, g, a, null);
              }
          }
        Cf(l, n, i, f, v, c, u, !1);
        return;
      case "select":
        J("invalid", l), (e = c = n = null);
        for (u in a)
          if (a.hasOwnProperty(u) && ((i = a[u]), i != null))
            switch (u) {
              case "value":
                n = i;
                break;
              case "defaultValue":
                c = i;
                break;
              case "multiple":
                e = i;
              default:
                sl(l, t, u, i, a, null);
            }
        (t = n),
          (a = c),
          (l.multiple = !!e),
          t != null ? Wa(l, !!e, t, !1) : a != null && Wa(l, !!e, a, !0);
        return;
      case "textarea":
        J("invalid", l), (n = u = e = null);
        for (c in a)
          if (a.hasOwnProperty(c) && ((i = a[c]), i != null))
            switch (c) {
              case "value":
                e = i;
                break;
              case "defaultValue":
                u = i;
                break;
              case "children":
                n = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(y(91));
                break;
              default:
                sl(l, t, c, i, a, null);
            }
        jf(l, e, u, n);
        return;
      case "option":
        for (f in a)
          if (a.hasOwnProperty(f) && ((e = a[f]), e != null))
            switch (f) {
              case "selected":
                l.selected =
                  e && typeof e != "function" && typeof e != "symbol";
                break;
              default:
                sl(l, t, f, e, a, null);
            }
        return;
      case "dialog":
        J("beforetoggle", l), J("toggle", l), J("cancel", l), J("close", l);
        break;
      case "iframe":
      case "object":
        J("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < yu.length; e++) J(yu[e], l);
        break;
      case "image":
        J("error", l), J("load", l);
        break;
      case "details":
        J("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        J("error", l), J("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (v in a)
          if (a.hasOwnProperty(v) && ((e = a[v]), e != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(y(137, t));
              default:
                sl(l, t, v, e, a, null);
            }
        return;
      default:
        if (ac(t)) {
          for (g in a)
            a.hasOwnProperty(g) &&
              ((e = a[g]), e !== void 0 && Zi(l, t, g, e, a, void 0));
          return;
        }
    }
    for (i in a)
      a.hasOwnProperty(i) && ((e = a[i]), e != null && sl(l, t, i, e, a, null));
  }
  function My(l, t, a, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          n = null,
          c = null,
          i = null,
          f = null,
          v = null,
          g = null;
        for (r in a) {
          var p = a[r];
          if (a.hasOwnProperty(r) && p != null)
            switch (r) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = p;
              default:
                e.hasOwnProperty(r) || sl(l, t, r, null, e, p);
            }
        }
        for (var h in e) {
          var r = e[h];
          if (((p = a[h]), e.hasOwnProperty(h) && (r != null || p != null)))
            switch (h) {
              case "type":
                n = r;
                break;
              case "name":
                u = r;
                break;
              case "checked":
                v = r;
                break;
              case "defaultChecked":
                g = r;
                break;
              case "value":
                c = r;
                break;
              case "defaultValue":
                i = r;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(y(137, t));
                break;
              default:
                r !== p && sl(l, t, h, r, e, p);
            }
        }
        lc(l, c, i, f, v, g, n, u);
        return;
      case "select":
        r = c = i = h = null;
        for (n in a)
          if (((f = a[n]), a.hasOwnProperty(n) && f != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                r = f;
              default:
                e.hasOwnProperty(n) || sl(l, t, n, null, e, f);
            }
        for (u in e)
          if (
            ((n = e[u]),
            (f = a[u]),
            e.hasOwnProperty(u) && (n != null || f != null))
          )
            switch (u) {
              case "value":
                h = n;
                break;
              case "defaultValue":
                i = n;
                break;
              case "multiple":
                c = n;
              default:
                n !== f && sl(l, t, u, n, e, f);
            }
        (t = i),
          (a = c),
          (e = r),
          h != null
            ? Wa(l, !!a, h, !1)
            : !!e != !!a &&
              (t != null ? Wa(l, !!a, t, !0) : Wa(l, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        r = h = null;
        for (i in a)
          if (
            ((u = a[i]),
            a.hasOwnProperty(i) && u != null && !e.hasOwnProperty(i))
          )
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                sl(l, t, i, null, e, u);
            }
        for (c in e)
          if (
            ((u = e[c]),
            (n = a[c]),
            e.hasOwnProperty(c) && (u != null || n != null))
          )
            switch (c) {
              case "value":
                h = u;
                break;
              case "defaultValue":
                r = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(y(91));
                break;
              default:
                u !== n && sl(l, t, c, u, e, n);
            }
        Hf(l, h, r);
        return;
      case "option":
        for (var D in a)
          if (
            ((h = a[D]),
            a.hasOwnProperty(D) && h != null && !e.hasOwnProperty(D))
          )
            switch (D) {
              case "selected":
                l.selected = !1;
                break;
              default:
                sl(l, t, D, null, e, h);
            }
        for (f in e)
          if (
            ((h = e[f]),
            (r = a[f]),
            e.hasOwnProperty(f) && h !== r && (h != null || r != null))
          )
            switch (f) {
              case "selected":
                l.selected =
                  h && typeof h != "function" && typeof h != "symbol";
                break;
              default:
                sl(l, t, f, h, e, r);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var q in a)
          (h = a[q]),
            a.hasOwnProperty(q) &&
              h != null &&
              !e.hasOwnProperty(q) &&
              sl(l, t, q, null, e, h);
        for (v in e)
          if (
            ((h = e[v]),
            (r = a[v]),
            e.hasOwnProperty(v) && h !== r && (h != null || r != null))
          )
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(y(137, t));
                break;
              default:
                sl(l, t, v, h, e, r);
            }
        return;
      default:
        if (ac(t)) {
          for (var ol in a)
            (h = a[ol]),
              a.hasOwnProperty(ol) &&
                h !== void 0 &&
                !e.hasOwnProperty(ol) &&
                Zi(l, t, ol, void 0, e, h);
          for (g in e)
            (h = e[g]),
              (r = a[g]),
              !e.hasOwnProperty(g) ||
                h === r ||
                (h === void 0 && r === void 0) ||
                Zi(l, t, g, h, e, r);
          return;
        }
    }
    for (var d in a)
      (h = a[d]),
        a.hasOwnProperty(d) &&
          h != null &&
          !e.hasOwnProperty(d) &&
          sl(l, t, d, null, e, h);
    for (p in e)
      (h = e[p]),
        (r = a[p]),
        !e.hasOwnProperty(p) ||
          h === r ||
          (h == null && r == null) ||
          sl(l, t, p, h, e, r);
  }
  function Bo(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Oy() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var l = 0, t = 0, a = performance.getEntriesByType("resource"), e = 0;
        e < a.length;
        e++
      ) {
        var u = a[e],
          n = u.transferSize,
          c = u.initiatorType,
          i = u.duration;
        if (n && i && Bo(c)) {
          for (c = 0, i = u.responseEnd, e += 1; e < a.length; e++) {
            var f = a[e],
              v = f.startTime;
            if (v > i) break;
            var g = f.transferSize,
              p = f.initiatorType;
            g &&
              Bo(p) &&
              ((f = f.responseEnd), (c += g * (f < i ? 1 : (i - v) / (f - v))));
          }
          if ((--e, (t += (8 * (n + c)) / (u.duration / 1e3)), l++, 10 < l))
            break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection &&
      ((l = navigator.connection.downlink), typeof l == "number")
      ? l
      : 5;
  }
  var Vi = null,
    Li = null;
  function Dn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Go(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Qo(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Ki(l, t) {
    return (
      l === "textarea" ||
      l === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Ji = null;
  function Dy() {
    var l = window.event;
    return l && l.type === "popstate"
      ? l === Ji
        ? !1
        : ((Ji = l), !0)
      : ((Ji = null), !1);
  }
  var Xo = typeof setTimeout == "function" ? setTimeout : void 0,
    Ny = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Zo = typeof Promise == "function" ? Promise : void 0,
    xy =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Zo < "u"
        ? function (l) {
            return Zo.resolve(null).then(l).catch(Uy);
          }
        : Xo;
  function Uy(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function ga(l) {
    return l === "head";
  }
  function Vo(l, t) {
    var a = t,
      e = 0;
    do {
      var u = a.nextSibling;
      if ((l.removeChild(a), u && u.nodeType === 8))
        if (((a = u.data), a === "/$" || a === "/&")) {
          if (e === 0) {
            l.removeChild(u), Oe(t);
            return;
          }
          e--;
        } else if (
          a === "$" ||
          a === "$?" ||
          a === "$~" ||
          a === "$!" ||
          a === "&"
        )
          e++;
        else if (a === "html") vu(l.ownerDocument.documentElement);
        else if (a === "head") {
          (a = l.ownerDocument.head), vu(a);
          for (var n = a.firstChild; n; ) {
            var c = n.nextSibling,
              i = n.nodeName;
            n[Ce] ||
              i === "SCRIPT" ||
              i === "STYLE" ||
              (i === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(n),
              (n = c);
          }
        } else a === "body" && vu(l.ownerDocument.body);
      a = u;
    } while (a);
    Oe(t);
  }
  function Lo(l, t) {
    var a = l;
    l = 0;
    do {
      var e = a.nextSibling;
      if (
        (a.nodeType === 1
          ? t
            ? ((a._stashedDisplay = a.style.display),
              (a.style.display = "none"))
            : ((a.style.display = a._stashedDisplay || ""),
              a.getAttribute("style") === "" && a.removeAttribute("style"))
          : a.nodeType === 3 &&
            (t
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
              : (a.nodeValue = a._stashedText || "")),
        e && e.nodeType === 8)
      )
        if (((a = e.data), a === "/$")) {
          if (l === 0) break;
          l--;
        } else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || l++;
      a = e;
    } while (a);
  }
  function wi(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          wi(a), In(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(a);
    }
  }
  function Cy(l, t, a, e) {
    for (; l.nodeType === 1; ) {
      var u = a;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!e && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (e) {
        if (!l[Ce])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (
                ((n = l.getAttribute("rel")),
                n === "stylesheet" && l.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== u.rel ||
                l.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                l.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                l.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (
                ((n = l.getAttribute("src")),
                (n !== (u.src == null ? null : u.src) ||
                  l.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  l.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  l.hasAttribute("async") &&
                  !l.hasAttribute("itemprop"))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n) return l;
      } else return l;
      if (((l = zt(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function Hy(l, t, a) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !a) ||
        ((l = zt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function Ko(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !t) ||
        ((l = zt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function ki(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Wi(l) {
    return (
      l.data === "$!" ||
      (l.data === "$?" && l.ownerDocument.readyState !== "loading")
    );
  }
  function jy(l, t) {
    var a = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || a.readyState !== "loading") t();
    else {
      var e = function () {
        t(), a.removeEventListener("DOMContentLoaded", e);
      };
      a.addEventListener("DOMContentLoaded", e), (l._reactRetry = e);
    }
  }
  function zt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = l.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var $i = null;
  function Jo(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "/$" || a === "/&") {
          if (t === 0) return zt(l.nextSibling);
          t--;
        } else
          (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") ||
            t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function wo(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return l;
          t--;
        } else (a !== "/$" && a !== "/&") || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function ko(l, t, a) {
    switch (((t = Dn(a)), l)) {
      case "html":
        if (((l = t.documentElement), !l)) throw Error(y(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(y(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(y(454));
        return l;
      default:
        throw Error(y(451));
    }
  }
  function vu(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    In(l);
  }
  var At = new Map(),
    Wo = new Set();
  function Nn(l) {
    return typeof l.getRootNode == "function"
      ? l.getRootNode()
      : l.nodeType === 9
      ? l
      : l.ownerDocument;
  }
  var Ft = M.d;
  M.d = { f: Ry, r: qy, D: Yy, C: By, L: Gy, m: Qy, X: Zy, S: Xy, M: Vy };
  function Ry() {
    var l = Ft.f(),
      t = pn();
    return l || t;
  }
  function qy(l) {
    var t = Ja(l);
    t !== null && t.tag === 5 && t.type === "form" ? d0(t) : Ft.r(l);
  }
  var _e = typeof document > "u" ? null : document;
  function $o(l, t, a) {
    var e = _e;
    if (e && typeof t == "string" && t) {
      var u = vt(t);
      (u = 'link[rel="' + l + '"][href="' + u + '"]'),
        typeof a == "string" && (u += '[crossorigin="' + a + '"]'),
        Wo.has(u) ||
          (Wo.add(u),
          (l = { rel: l, crossOrigin: a, href: t }),
          e.querySelector(u) === null &&
            ((t = e.createElement("link")),
            Bl(t, "link", l),
            Cl(t),
            e.head.appendChild(t)));
    }
  }
  function Yy(l) {
    Ft.D(l), $o("dns-prefetch", l, null);
  }
  function By(l, t) {
    Ft.C(l, t), $o("preconnect", l, t);
  }
  function Gy(l, t, a) {
    Ft.L(l, t, a);
    var e = _e;
    if (e && l && t) {
      var u = 'link[rel="preload"][as="' + vt(t) + '"]';
      t === "image" && a && a.imageSrcSet
        ? ((u += '[imagesrcset="' + vt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (u += '[imagesizes="' + vt(a.imageSizes) + '"]'))
        : (u += '[href="' + vt(l) + '"]');
      var n = u;
      switch (t) {
        case "style":
          n = Te(l);
          break;
        case "script":
          n = Me(l);
      }
      At.has(n) ||
        ((l = T(
          {
            rel: "preload",
            href: t === "image" && a && a.imageSrcSet ? void 0 : l,
            as: t,
          },
          a
        )),
        At.set(n, l),
        e.querySelector(u) !== null ||
          (t === "style" && e.querySelector(hu(n))) ||
          (t === "script" && e.querySelector(ru(n))) ||
          ((t = e.createElement("link")),
          Bl(t, "link", l),
          Cl(t),
          e.head.appendChild(t)));
    }
  }
  function Qy(l, t) {
    Ft.m(l, t);
    var a = _e;
    if (a && l) {
      var e = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + vt(e) + '"][href="' + vt(l) + '"]',
        n = u;
      switch (e) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Me(l);
      }
      if (
        !At.has(n) &&
        ((l = T({ rel: "modulepreload", href: l }, t)),
        At.set(n, l),
        a.querySelector(u) === null)
      ) {
        switch (e) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(ru(n))) return;
        }
        (e = a.createElement("link")),
          Bl(e, "link", l),
          Cl(e),
          a.head.appendChild(e);
      }
    }
  }
  function Xy(l, t, a) {
    Ft.S(l, t, a);
    var e = _e;
    if (e && l) {
      var u = wa(e).hoistableStyles,
        n = Te(l);
      t = t || "default";
      var c = u.get(n);
      if (!c) {
        var i = { loading: 0, preload: null };
        if ((c = e.querySelector(hu(n)))) i.loading = 5;
        else {
          (l = T({ rel: "stylesheet", href: l, "data-precedence": t }, a)),
            (a = At.get(n)) && Fi(l, a);
          var f = (c = e.createElement("link"));
          Cl(f),
            Bl(f, "link", l),
            (f._p = new Promise(function (v, g) {
              (f.onload = v), (f.onerror = g);
            })),
            f.addEventListener("load", function () {
              i.loading |= 1;
            }),
            f.addEventListener("error", function () {
              i.loading |= 2;
            }),
            (i.loading |= 4),
            xn(c, t, e);
        }
        (c = { type: "stylesheet", instance: c, count: 1, state: i }),
          u.set(n, c);
      }
    }
  }
  function Zy(l, t) {
    Ft.X(l, t);
    var a = _e;
    if (a && l) {
      var e = wa(a).hoistableScripts,
        u = Me(l),
        n = e.get(u);
      n ||
        ((n = a.querySelector(ru(u))),
        n ||
          ((l = T({ src: l, async: !0 }, t)),
          (t = At.get(u)) && Ii(l, t),
          (n = a.createElement("script")),
          Cl(n),
          Bl(n, "link", l),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function Vy(l, t) {
    Ft.M(l, t);
    var a = _e;
    if (a && l) {
      var e = wa(a).hoistableScripts,
        u = Me(l),
        n = e.get(u);
      n ||
        ((n = a.querySelector(ru(u))),
        n ||
          ((l = T({ src: l, async: !0, type: "module" }, t)),
          (t = At.get(u)) && Ii(l, t),
          (n = a.createElement("script")),
          Cl(n),
          Bl(n, "link", l),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function Fo(l, t, a, e) {
    var u = (u = L.current) ? Nn(u) : null;
    if (!u) throw Error(y(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((t = Te(a.href)),
            (a = wa(u).hoistableStyles),
            (e = a.get(t)),
            e ||
              ((e = { type: "style", instance: null, count: 0, state: null }),
              a.set(t, e)),
            e)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          l = Te(a.href);
          var n = wa(u).hoistableStyles,
            c = n.get(l);
          if (
            (c ||
              ((u = u.ownerDocument || u),
              (c = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(l, c),
              (n = u.querySelector(hu(l))) &&
                !n._p &&
                ((c.instance = n), (c.state.loading = 5)),
              At.has(l) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                At.set(l, a),
                n || Ly(u, l, a, c.state))),
            t && e === null)
          )
            throw Error(y(528, ""));
          return c;
        }
        if (t && e !== null) throw Error(y(529, ""));
        return null;
      case "script":
        return (
          (t = a.async),
          (a = a.src),
          typeof a == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Me(a)),
              (a = wa(u).hoistableScripts),
              (e = a.get(t)),
              e ||
                ((e = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, e)),
              e)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(y(444, l));
    }
  }
  function Te(l) {
    return 'href="' + vt(l) + '"';
  }
  function hu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Io(l) {
    return T({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function Ly(l, t, a, e) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (e.loading = 1)
      : ((t = l.createElement("link")),
        (e.preload = t),
        t.addEventListener("load", function () {
          return (e.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (e.loading |= 2);
        }),
        Bl(t, "link", a),
        Cl(t),
        l.head.appendChild(t));
  }
  function Me(l) {
    return '[src="' + vt(l) + '"]';
  }
  function ru(l) {
    return "script[async]" + l;
  }
  function Po(l, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var e = l.querySelector('style[data-href~="' + vt(a.href) + '"]');
          if (e) return (t.instance = e), Cl(e), e;
          var u = T({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (e = (l.ownerDocument || l).createElement("style")),
            Cl(e),
            Bl(e, "style", u),
            xn(e, a.precedence, l),
            (t.instance = e)
          );
        case "stylesheet":
          u = Te(a.href);
          var n = l.querySelector(hu(u));
          if (n) return (t.state.loading |= 4), (t.instance = n), Cl(n), n;
          (e = Io(a)),
            (u = At.get(u)) && Fi(e, u),
            (n = (l.ownerDocument || l).createElement("link")),
            Cl(n);
          var c = n;
          return (
            (c._p = new Promise(function (i, f) {
              (c.onload = i), (c.onerror = f);
            })),
            Bl(n, "link", e),
            (t.state.loading |= 4),
            xn(n, a.precedence, l),
            (t.instance = n)
          );
        case "script":
          return (
            (n = Me(a.src)),
            (u = l.querySelector(ru(n)))
              ? ((t.instance = u), Cl(u), u)
              : ((e = a),
                (u = At.get(n)) && ((e = T({}, a)), Ii(e, u)),
                (l = l.ownerDocument || l),
                (u = l.createElement("script")),
                Cl(u),
                Bl(u, "link", e),
                l.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(y(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((e = t.instance), (t.state.loading |= 4), xn(e, a.precedence, l));
    return t.instance;
  }
  function xn(l, t, a) {
    for (
      var e = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        u = e.length ? e[e.length - 1] : null,
        n = u,
        c = 0;
      c < e.length;
      c++
    ) {
      var i = e[c];
      if (i.dataset.precedence === t) n = i;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(l, n.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(l, t.firstChild));
  }
  function Fi(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title);
  }
  function Ii(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity);
  }
  var Un = null;
  function ld(l, t, a) {
    if (Un === null) {
      var e = new Map(),
        u = (Un = new Map());
      u.set(a, e);
    } else (u = Un), (e = u.get(a)), e || ((e = new Map()), u.set(a, e));
    if (e.has(l)) return e;
    for (
      e.set(l, null), a = a.getElementsByTagName(l), u = 0;
      u < a.length;
      u++
    ) {
      var n = a[u];
      if (
        !(
          n[Ce] ||
          n[jl] ||
          (l === "link" && n.getAttribute("rel") === "stylesheet")
        ) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var i = e.get(c);
        i ? i.push(n) : e.set(c, [n]);
      }
    }
    return e;
  }
  function td(l, t, a) {
    (l = l.ownerDocument || l),
      l.head.insertBefore(
        a,
        t === "title" ? l.querySelector("head > title") : null
      );
  }
  function Ky(l, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (l = t.disabled), typeof t.precedence == "string" && l == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function ad(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Jy(l, t, a, e) {
    if (
      a.type === "stylesheet" &&
      (typeof e.media != "string" || matchMedia(e.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var u = Te(e.href),
          n = t.querySelector(hu(u));
        if (n) {
          (t = n._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = Cn.bind(l)), t.then(l, l)),
            (a.state.loading |= 4),
            (a.instance = n),
            Cl(n);
          return;
        }
        (n = t.ownerDocument || t),
          (e = Io(e)),
          (u = At.get(u)) && Fi(e, u),
          (n = n.createElement("link")),
          Cl(n);
        var c = n;
        (c._p = new Promise(function (i, f) {
          (c.onload = i), (c.onerror = f);
        })),
          Bl(n, "link", e),
          (a.instance = n);
      }
      l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (l.count++,
          (a = Cn.bind(l)),
          t.addEventListener("load", a),
          t.addEventListener("error", a));
    }
  }
  var Pi = 0;
  function wy(l, t) {
    return (
      l.stylesheets && l.count === 0 && jn(l, l.stylesheets),
      0 < l.count || 0 < l.imgCount
        ? function (a) {
            var e = setTimeout(function () {
              if ((l.stylesheets && jn(l, l.stylesheets), l.unsuspend)) {
                var n = l.unsuspend;
                (l.unsuspend = null), n();
              }
            }, 6e4 + t);
            0 < l.imgBytes && Pi === 0 && (Pi = 62500 * Oy());
            var u = setTimeout(function () {
              if (
                ((l.waitingForImages = !1),
                l.count === 0 &&
                  (l.stylesheets && jn(l, l.stylesheets), l.unsuspend))
              ) {
                var n = l.unsuspend;
                (l.unsuspend = null), n();
              }
            }, (l.imgBytes > Pi ? 50 : 800) + t);
            return (
              (l.unsuspend = a),
              function () {
                (l.unsuspend = null), clearTimeout(e), clearTimeout(u);
              }
            );
          }
        : null
    );
  }
  function Cn() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) jn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        (this.unsuspend = null), l();
      }
    }
  }
  var Hn = null;
  function jn(l, t) {
    (l.stylesheets = null),
      l.unsuspend !== null &&
        (l.count++,
        (Hn = new Map()),
        t.forEach(ky, l),
        (Hn = null),
        Cn.call(l));
  }
  function ky(l, t) {
    if (!(t.state.loading & 4)) {
      var a = Hn.get(l);
      if (a) var e = a.get(null);
      else {
        (a = new Map()), Hn.set(l, a);
        for (
          var u = l.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            n = 0;
          n < u.length;
          n++
        ) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") &&
            (a.set(c.dataset.precedence, c), (e = c));
        }
        e && a.set(null, e);
      }
      (u = t.instance),
        (c = u.getAttribute("data-precedence")),
        (n = a.get(c) || e),
        n === e && a.set(null, u),
        a.set(c, u),
        this.count++,
        (e = Cn.bind(this)),
        u.addEventListener("load", e),
        u.addEventListener("error", e),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l),
            l.insertBefore(u, l.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var gu = {
    $$typeof: _l,
    Provider: null,
    Consumer: null,
    _currentValue: G,
    _currentValue2: G,
    _threadCount: 0,
  };
  function Wy(l, t, a, e, u, n, c, i, f) {
    (this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = kn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = kn(0)),
      (this.hiddenUpdates = kn(null)),
      (this.identifierPrefix = e),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = c),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = f),
      (this.incompleteTransitions = new Map());
  }
  function ed(l, t, a, e, u, n, c, i, f, v, g, p) {
    return (
      (l = new Wy(l, t, a, c, f, v, g, p, i)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = it(3, null, null, t)),
      (l.current = n),
      (n.stateNode = l),
      (t = Cc()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (n.memoizedState = { element: e, isDehydrated: a, cache: t }),
      qc(n),
      l
    );
  }
  function ud(l) {
    return l ? ((l = ee), l) : ee;
  }
  function nd(l, t, a, e, u, n) {
    (u = ud(u)),
      e.context === null ? (e.context = u) : (e.pendingContext = u),
      (e = ca(t)),
      (e.payload = { element: a }),
      (n = n === void 0 ? null : n),
      n !== null && (e.callback = n),
      (a = ia(l, e, t)),
      a !== null && (at(a, l, t), We(a, l, t));
  }
  function cd(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var a = l.retryLane;
      l.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function lf(l, t) {
    cd(l, t), (l = l.alternate) && cd(l, t);
  }
  function id(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = xa(l, 67108864);
      t !== null && at(t, l, 67108864), lf(l, 67108864);
    }
  }
  function fd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = yt();
      t = Wn(t);
      var a = xa(l, t);
      a !== null && at(a, l, t), lf(l, t);
    }
  }
  var Rn = !0;
  function $y(l, t, a, e) {
    var u = S.T;
    S.T = null;
    var n = M.p;
    try {
      (M.p = 2), tf(l, t, a, e);
    } finally {
      (M.p = n), (S.T = u);
    }
  }
  function Fy(l, t, a, e) {
    var u = S.T;
    S.T = null;
    var n = M.p;
    try {
      (M.p = 8), tf(l, t, a, e);
    } finally {
      (M.p = n), (S.T = u);
    }
  }
  function tf(l, t, a, e) {
    if (Rn) {
      var u = af(e);
      if (u === null) Xi(l, t, e, qn, a), od(l, e);
      else if (Py(u, l, t, a, e)) e.stopPropagation();
      else if ((od(l, e), t & 4 && -1 < Iy.indexOf(l))) {
        for (; u !== null; ) {
          var n = Ja(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var c = Ta(n.pendingLanes);
                  if (c !== 0) {
                    var i = n;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var f = 1 << (31 - nt(c));
                      (i.entanglements[1] |= f), (c &= ~f);
                    }
                    Ct(n), (al & 6) === 0 && ((Sn = et() + 500), du(0));
                  }
                }
                break;
              case 31:
              case 13:
                (i = xa(n, 2)), i !== null && at(i, n, 2), pn(), lf(n, 2);
            }
          if (((n = af(e)), n === null && Xi(l, t, e, qn, a), n === u)) break;
          u = n;
        }
        u !== null && e.stopPropagation();
      } else Xi(l, t, e, null, a);
    }
  }
  function af(l) {
    return (l = uc(l)), ef(l);
  }
  var qn = null;
  function ef(l) {
    if (((qn = null), (l = Ka(l)), l !== null)) {
      var t = Y(l);
      if (t === null) l = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((l = F(t)), l !== null)) return l;
          l = null;
        } else if (a === 31) {
          if (((l = ul(t)), l !== null)) return l;
          l = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return (qn = l), null;
  }
  function sd(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Yd()) {
          case rf:
            return 2;
          case gf:
            return 8;
          case _u:
          case Bd:
            return 32;
          case Sf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var uf = !1,
    Sa = null,
    ba = null,
    pa = null,
    Su = new Map(),
    bu = new Map(),
    za = [],
    Iy =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function od(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Sa = null;
        break;
      case "dragenter":
      case "dragleave":
        ba = null;
        break;
      case "mouseover":
      case "mouseout":
        pa = null;
        break;
      case "pointerover":
      case "pointerout":
        Su.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bu.delete(t.pointerId);
    }
  }
  function pu(l, t, a, e, u, n) {
    return l === null || l.nativeEvent !== n
      ? ((l = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: e,
          nativeEvent: n,
          targetContainers: [u],
        }),
        t !== null && ((t = Ja(t)), t !== null && id(t)),
        l)
      : ((l.eventSystemFlags |= e),
        (t = l.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        l);
  }
  function Py(l, t, a, e, u) {
    switch (t) {
      case "focusin":
        return (Sa = pu(Sa, l, t, a, e, u)), !0;
      case "dragenter":
        return (ba = pu(ba, l, t, a, e, u)), !0;
      case "mouseover":
        return (pa = pu(pa, l, t, a, e, u)), !0;
      case "pointerover":
        var n = u.pointerId;
        return Su.set(n, pu(Su.get(n) || null, l, t, a, e, u)), !0;
      case "gotpointercapture":
        return (
          (n = u.pointerId), bu.set(n, pu(bu.get(n) || null, l, t, a, e, u)), !0
        );
    }
    return !1;
  }
  function dd(l) {
    var t = Ka(l.target);
    if (t !== null) {
      var a = Y(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = F(a)), t !== null)) {
            (l.blockedOn = t),
              _f(l.priority, function () {
                fd(a);
              });
            return;
          }
        } else if (t === 31) {
          if (((t = ul(a)), t !== null)) {
            (l.blockedOn = t),
              _f(l.priority, function () {
                fd(a);
              });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Yn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var a = af(l.nativeEvent);
      if (a === null) {
        a = l.nativeEvent;
        var e = new a.constructor(a.type, a);
        (ec = e), a.target.dispatchEvent(e), (ec = null);
      } else return (t = Ja(a)), t !== null && id(t), (l.blockedOn = a), !1;
      t.shift();
    }
    return !0;
  }
  function yd(l, t, a) {
    Yn(l) && a.delete(t);
  }
  function lm() {
    (uf = !1),
      Sa !== null && Yn(Sa) && (Sa = null),
      ba !== null && Yn(ba) && (ba = null),
      pa !== null && Yn(pa) && (pa = null),
      Su.forEach(yd),
      bu.forEach(yd);
  }
  function Bn(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null),
      uf ||
        ((uf = !0),
        z.unstable_scheduleCallback(z.unstable_NormalPriority, lm)));
  }
  var Gn = null;
  function md(l) {
    Gn !== l &&
      ((Gn = l),
      z.unstable_scheduleCallback(z.unstable_NormalPriority, function () {
        Gn === l && (Gn = null);
        for (var t = 0; t < l.length; t += 3) {
          var a = l[t],
            e = l[t + 1],
            u = l[t + 2];
          if (typeof e != "function") {
            if (ef(e || a) === null) continue;
            break;
          }
          var n = Ja(a);
          n !== null &&
            (l.splice(t, 3),
            (t -= 3),
            ai(n, { pending: !0, data: u, method: a.method, action: e }, e, u));
        }
      }));
  }
  function Oe(l) {
    function t(f) {
      return Bn(f, l);
    }
    Sa !== null && Bn(Sa, l),
      ba !== null && Bn(ba, l),
      pa !== null && Bn(pa, l),
      Su.forEach(t),
      bu.forEach(t);
    for (var a = 0; a < za.length; a++) {
      var e = za[a];
      e.blockedOn === l && (e.blockedOn = null);
    }
    for (; 0 < za.length && ((a = za[0]), a.blockedOn === null); )
      dd(a), a.blockedOn === null && za.shift();
    if (((a = (l.ownerDocument || l).$$reactFormReplay), a != null))
      for (e = 0; e < a.length; e += 3) {
        var u = a[e],
          n = a[e + 1],
          c = u[$l] || null;
        if (typeof n == "function") c || md(a);
        else if (c) {
          var i = null;
          if (n && n.hasAttribute("formAction")) {
            if (((u = n), (c = n[$l] || null))) i = c.formAction;
            else if (ef(u) !== null) continue;
          } else i = c.action;
          typeof i == "function" ? (a[e + 1] = i) : (a.splice(e, 3), (e -= 3)),
            md(a);
        }
      }
  }
  function vd() {
    function l(n) {
      n.canIntercept &&
        n.info === "react-transition" &&
        n.intercept({
          handler: function () {
            return new Promise(function (c) {
              return (u = c);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      u !== null && (u(), (u = null)), e || setTimeout(a, 20);
    }
    function a() {
      if (!e && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, {
            state: n.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var e = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", l),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(a, 100),
        function () {
          (e = !0),
            navigation.removeEventListener("navigate", l),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            u !== null && (u(), (u = null));
        }
      );
    }
  }
  function nf(l) {
    this._internalRoot = l;
  }
  (Qn.prototype.render = nf.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(y(409));
      var a = t.current,
        e = yt();
      nd(a, e, l, t, null, null);
    }),
    (Qn.prototype.unmount = nf.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          nd(l.current, 2, null, l, null, null), pn(), (t[La] = null);
        }
      });
  function Qn(l) {
    this._internalRoot = l;
  }
  Qn.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = Ef();
      l = { blockedOn: null, target: l, priority: t };
      for (var a = 0; a < za.length && t !== 0 && t < za[a].priority; a++);
      za.splice(a, 0, l), a === 0 && dd(l);
    }
  };
  var hd = C.version;
  if (hd !== "19.2.0") throw Error(y(527, hd, "19.2.0"));
  M.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(y(188))
        : ((l = Object.keys(l).join(",")), Error(y(268, l)));
    return (
      (l = E(t)),
      (l = l !== null ? B(l) : null),
      (l = l === null ? null : l.stateNode),
      l
    );
  };
  var tm = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: S,
    reconcilerVersion: "19.2.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xn.isDisabled && Xn.supportsFiber)
      try {
        (Ne = Xn.inject(tm)), (ut = Xn);
      } catch {}
  }
  return (
    (Au.createRoot = function (l, t) {
      if (!j(l)) throw Error(y(299));
      var a = !1,
        e = "",
        u = z0,
        n = A0,
        c = E0;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (e = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (n = t.onCaughtError),
          t.onRecoverableError !== void 0 && (c = t.onRecoverableError)),
        (t = ed(l, 1, !1, null, null, a, e, null, u, n, c, vd)),
        (l[La] = t.current),
        Qi(l),
        new nf(t)
      );
    }),
    (Au.hydrateRoot = function (l, t, a) {
      if (!j(l)) throw Error(y(299));
      var e = !1,
        u = "",
        n = z0,
        c = A0,
        i = E0,
        f = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (e = !0),
          a.identifierPrefix !== void 0 && (u = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (n = a.onUncaughtError),
          a.onCaughtError !== void 0 && (c = a.onCaughtError),
          a.onRecoverableError !== void 0 && (i = a.onRecoverableError),
          a.formState !== void 0 && (f = a.formState)),
        (t = ed(l, 1, !0, t, a ?? null, e, u, f, n, c, i, vd)),
        (t.context = ud(null)),
        (a = t.current),
        (e = yt()),
        (e = Wn(e)),
        (u = ca(e)),
        (u.callback = null),
        ia(a, u, e),
        (a = e),
        (t.current.lanes = a),
        Ue(t, a),
        Ct(t),
        (l[La] = t.current),
        Qi(l),
        new Qn(t)
      );
    }),
    (Au.version = "19.2.0"),
    Au
  );
}
var Td;
function ym() {
  if (Td) return sf.exports;
  Td = 1;
  function z() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(z);
      } catch (C) {
        console.error(C);
      }
  }
  return z(), (sf.exports = dm()), sf.exports;
}
var mm = ym();
const vm = xd(mm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hm = (z) => z.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  rm = (z) =>
    z.replace(/^([A-Z])|[\s-_]+(\w)/g, (C, H, y) =>
      y ? y.toUpperCase() : H.toLowerCase()
    ),
  Md = (z) => {
    const C = rm(z);
    return C.charAt(0).toUpperCase() + C.slice(1);
  },
  Ud = (...z) =>
    z
      .filter((C, H, y) => !!C && C.trim() !== "" && y.indexOf(C) === H)
      .join(" ")
      .trim(),
  gm = (z) => {
    for (const C in z)
      if (C.startsWith("aria-") || C === "role" || C === "title") return !0;
  };
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Sm = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bm = Nl.forwardRef(
  (
    {
      color: z = "currentColor",
      size: C = 24,
      strokeWidth: H = 2,
      absoluteStrokeWidth: y,
      className: j = "",
      children: Y,
      iconNode: F,
      ...ul
    },
    N
  ) =>
    Nl.createElement(
      "svg",
      {
        ref: N,
        ...Sm,
        width: C,
        height: C,
        stroke: z,
        strokeWidth: y ? (Number(H) * 24) / Number(C) : H,
        className: Ud("lucide", j),
        ...(!Y && !gm(ul) && { "aria-hidden": "true" }),
        ...ul,
      },
      [
        ...F.map(([E, B]) => Nl.createElement(E, B)),
        ...(Array.isArray(Y) ? Y : [Y]),
      ]
    )
);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gl = (z, C) => {
  const H = Nl.forwardRef(({ className: y, ...j }, Y) =>
    Nl.createElement(bm, {
      ref: Y,
      iconNode: C,
      className: Ud(`lucide-${hm(Md(z))}`, `lucide-${z}`, y),
      ...j,
    })
  );
  return (H.displayName = Md(z)), H;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pm = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]],
  zm = Gl("check", pm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Am = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
  ],
  Em = Gl("circle-alert", Am);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _m = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  Tm = Gl("circle-check-big", _m);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mm = [
    ["path", { d: "M12 13v8", key: "1l5pq0" }],
    [
      "path",
      {
        d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
        key: "1pljnt",
      },
    ],
    ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }],
  ],
  Om = Gl("cloud-upload", Mm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Dm = [
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M17 20v2", key: "1rnc9c" }],
    ["path", { d: "M17 2v2", key: "11trls" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M2 17h2", key: "7oei6x" }],
    ["path", { d: "M2 7h2", key: "asdhe0" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "M20 17h2", key: "1fpfkl" }],
    ["path", { d: "M20 7h2", key: "1o8tra" }],
    ["path", { d: "M7 20v2", key: "4gnj0m" }],
    ["path", { d: "M7 2v2", key: "1i4yhu" }],
    [
      "rect",
      { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" },
    ],
    [
      "rect",
      { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" },
    ],
  ],
  Nm = Gl("cpu", Dm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xm = [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
    ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
    ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }],
  ],
  Um = Gl("database", xm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Cm = [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
        key: "ct8e1f",
      },
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
        key: "13bj9a",
      },
    ],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ],
  Hm = Gl("eye-off", Cm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jm = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  Rm = Gl("eye", jm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qm = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6",
      },
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }],
  ],
  Ym = Gl("file-check", qm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Bm = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }],
  ],
  Gm = Gl("info", Bm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Qm = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  Xm = Gl("loader-circle", Qm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Zm = [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
        key: "1c8476",
      },
    ],
    ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
    ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }],
  ],
  Vm = Gl("save", Zm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Lm = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  Km = Gl("shield-check", Lm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Jm = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr",
      },
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }],
  ],
  wm = Gl("sparkles", Jm);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const km = [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq",
      },
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ],
  Wm = Gl("triangle-alert", km);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $m = [
    [
      "path",
      {
        d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
        key: "ul74o6",
      },
    ],
    ["path", { d: "m14 7 3 3", key: "1r5n42" }],
    ["path", { d: "M5 6v4", key: "ilb8ba" }],
    ["path", { d: "M19 14v4", key: "blhpug" }],
    ["path", { d: "M10 2v2", key: "7u0qdc" }],
    ["path", { d: "M7 8H3", key: "zfb6yr" }],
    ["path", { d: "M21 16h-4", key: "1cnmox" }],
    ["path", { d: "M11 3H9", key: "1obp7u" }],
  ],
  Fm = Gl("wand-sparkles", $m);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Im = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  Cd = Gl("x", Im),
  Pm = () =>
    _.jsx("header", {
      className:
        "bg-white border-b border-slate-200 p-5 sticky top-0 z-10 shadow-sm",
      children: _.jsxs("div", {
        className: "flex items-center space-x-3",
        children: [
          _.jsx("div", {
            className: "bg-indigo-600 p-2 rounded-lg shadow-md",
            children: _.jsx(wm, { className: "w-5 h-5 text-white" }),
          }),
          _.jsxs("div", {
            children: [
              _.jsx("h1", {
                className: "text-lg font-bold text-slate-800 leading-tight",
                children: "Auto-Fill Assistant",
              }),
              _.jsx("p", {
                className: "text-xs text-slate-500 font-medium",
                children: "Professional Form Filler",
              }),
            ],
          }),
        ],
      }),
    }),
  Vl = {
    API_KEY_OPENAI: "cv_assistant_api_key_openai",
    API_KEY_ANTHROPIC: "cv_assistant_api_key_anthropic",
    API_KEY_GROQ: "cv_assistant_api_key_groq",
    LLM_PROVIDER: "cv_assistant_provider",
    CV_DATA: "cv_assistant_data",
  },
  Od = 10,
  Dd = [
    { value: "openai", label: "OpenAI (GPT-4)" },
    { value: "anthropic", label: "Anthropic (Claude 3.5)" },
    { value: "groq", label: "Groq (Llama 3)" },
  ],
  lv = ({ config: z, onSave: C }) => {
    var Ul;
    const [H, y] = Nl.useState(z),
      [j, Y] = Nl.useState(!1),
      [F, ul] = Nl.useState(!1);
    Nl.useEffect(() => {
      y(z);
    }, [z]);
    const N = (ml) => {
        y((bl) => ({ ...bl, selectedProvider: ml.target.value })), ul(!0);
      },
      E = (ml) => {
        const { name: bl, value: Ql } = ml.target;
        y((tl) => ({ ...tl, [bl]: Ql })), ul(!0);
      },
      B = () => {
        C(H), ul(!1);
      },
      ll = (() => {
        switch (H.selectedProvider) {
          case "anthropic":
            return { name: "apiKeyAnthropic", placeholder: "sk-ant-..." };
          case "groq":
            return { name: "apiKeyGroq", placeholder: "gsk_..." };
          default:
            return { name: "apiKeyOpenAI", placeholder: "sk-..." };
        }
      })();
    return _.jsxs("div", {
      className:
        "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden",
      children: [
        _.jsxs("div", {
          className:
            "p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2",
          children: [
            _.jsx(Nm, { className: "w-4 h-4 text-indigo-600" }),
            _.jsx("h2", {
              className: "text-sm font-semibold text-slate-700",
              children: "Intelligence Provider",
            }),
          ],
        }),
        _.jsxs("div", {
          className: "p-4 space-y-4",
          children: [
            _.jsxs("div", {
              className: "space-y-1.5",
              children: [
                _.jsx("label", {
                  className:
                    "text-xs font-medium text-slate-600 uppercase tracking-wider",
                  children: "Select AI Model",
                }),
                _.jsxs("div", {
                  className: "relative",
                  children: [
                    _.jsx("select", {
                      value: H.selectedProvider,
                      onChange: N,
                      className:
                        "w-full pl-3 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow appearance-none",
                      children: Dd.map((ml) =>
                        _.jsx(
                          "option",
                          { value: ml.value, children: ml.label },
                          ml.value
                        )
                      ),
                    }),
                    _.jsx("div", {
                      className:
                        "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500",
                      children: _.jsx("svg", {
                        className: "fill-current h-4 w-4",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        children: _.jsx("path", {
                          d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z",
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
            _.jsxs("div", {
              className: "space-y-1.5",
              children: [
                _.jsxs("label", {
                  className:
                    "text-xs font-medium text-slate-600 uppercase tracking-wider",
                  children: [
                    (Ul = Dd.find((ml) => ml.value === H.selectedProvider)) ==
                    null
                      ? void 0
                      : Ul.label.split(" ")[0],
                    " API Key",
                  ],
                }),
                _.jsxs("div", {
                  className: "relative group",
                  children: [
                    _.jsx("input", {
                      type: j ? "text" : "password",
                      name: ll.name,
                      value: H[ll.name] || "",
                      onChange: E,
                      placeholder: ll.placeholder,
                      className:
                        "w-full pl-3 pr-10 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono",
                    }),
                    _.jsx("button", {
                      type: "button",
                      onClick: () => Y(!j),
                      className:
                        "absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600",
                      children: j
                        ? _.jsx(Hm, { className: "w-4 h-4" })
                        : _.jsx(Rm, { className: "w-4 h-4" }),
                    }),
                  ],
                }),
                _.jsx("p", {
                  className: "text-[10px] text-slate-400",
                  children: "Keys are stored locally on your device.",
                }),
              ],
            }),
            _.jsxs("button", {
              onClick: B,
              disabled: !F,
              className: `w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                F
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`,
              children: [
                _.jsx(Vm, { className: "w-4 h-4" }),
                _.jsx("span", { children: "Save Configuration" }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  tv = ({ onUpload: z, isLoading: C, hasExistingData: H, onClearData: y }) => {
    const [j, Y] = Nl.useState(!1),
      F = Nl.useRef(null),
      ul = (T) => {
        T.preventDefault(),
          T.stopPropagation(),
          T.type === "dragenter" || T.type === "dragover"
            ? Y(!0)
            : T.type === "dragleave" && Y(!1);
      },
      N = (T) => {
        T.preventDefault(),
          T.stopPropagation(),
          Y(!1),
          T.dataTransfer.files &&
            T.dataTransfer.files[0] &&
            B(T.dataTransfer.files[0]);
      },
      E = (T) => {
        T.target.files && T.target.files[0] && B(T.target.files[0]);
      },
      B = (T) => {
        if (T.type !== "application/pdf") {
          alert("Please upload a PDF file.");
          return;
        }
        if (T.size > Od * 1024 * 1024) {
          alert(`File size exceeds ${Od}MB.`);
          return;
        }
        z(T);
      };
    return H
      ? _.jsxs("div", {
          className:
            "bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between shadow-sm",
          children: [
            _.jsxs("div", {
              className: "flex items-center space-x-3",
              children: [
                _.jsx("div", {
                  className: "p-2 bg-emerald-100 rounded-full",
                  children: _.jsx(zm, {
                    className: "w-5 h-5 text-emerald-600",
                  }),
                }),
                _.jsxs("div", {
                  children: [
                    _.jsx("h3", {
                      className: "text-sm font-semibold text-emerald-800",
                      children: "CV Loaded",
                    }),
                    _.jsx("p", {
                      className: "text-xs text-emerald-600",
                      children: "Ready to auto-fill forms",
                    }),
                  ],
                }),
              ],
            }),
            _.jsx("button", {
              onClick: y,
              className:
                "p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors",
              title: "Clear Data",
              children: _.jsx(Cd, { className: "w-5 h-5" }),
            }),
          ],
        })
      : _.jsxs("div", {
          onDragEnter: ul,
          onDragLeave: ul,
          onDragOver: ul,
          onDrop: N,
          onClick: () => {
            var T;
            return !C && ((T = F.current) == null ? void 0 : T.click());
          },
          className: `
        relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
        ${C ? "bg-slate-50 border-slate-300 cursor-wait" : ""}
        ${
          j
            ? "border-indigo-500 bg-indigo-50 scale-[1.02] shadow-md"
            : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
        }
      `,
          children: [
            _.jsx("input", {
              type: "file",
              ref: F,
              onChange: E,
              accept: ".pdf",
              className: "hidden",
              disabled: C,
            }),
            _.jsxs("div", {
              className: "flex flex-col items-center space-y-3",
              children: [
                C
                  ? _.jsx("div", {
                      className: "animate-spin text-indigo-600",
                      children: _.jsx(Xm, { className: "w-10 h-10" }),
                    })
                  : _.jsx("div", {
                      className: `p-3 rounded-full ${
                        j ? "bg-indigo-200" : "bg-slate-100"
                      }`,
                      children: _.jsx(Om, {
                        className: `w-8 h-8 ${
                          j ? "text-indigo-600" : "text-slate-500"
                        }`,
                      }),
                    }),
                _.jsxs("div", {
                  className: "space-y-1",
                  children: [
                    _.jsx("h3", {
                      className: "text-sm font-semibold text-slate-700",
                      children: C ? "Analyzing Resume..." : "Upload your CV",
                    }),
                    _.jsx("p", {
                      className: "text-xs text-slate-500 max-w-[200px] mx-auto",
                      children: C
                        ? "Extracting experience and skills"
                        : "Drag & drop or click to browse (PDF only)",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
  },
  av = ({ toast: z, onClose: C }) => {
    Nl.useEffect(() => {
      const j = setTimeout(() => {
        C();
      }, 4e3);
      return () => clearTimeout(j);
    }, [z, C]);
    const H = {
        success: "bg-emerald-50 text-emerald-800 border-emerald-200",
        error: "bg-red-50 text-red-800 border-red-200",
        info: "bg-blue-50 text-blue-800 border-blue-200",
      },
      y = {
        success: _.jsx(Tm, { className: "w-5 h-5 text-emerald-500" }),
        error: _.jsx(Em, { className: "w-5 h-5 text-red-500" }),
        info: _.jsx(Gm, { className: "w-5 h-5 text-blue-500" }),
      };
    return _.jsxs("div", {
      className: `fixed bottom-4 left-4 right-4 z-50 flex items-start p-4 mb-4 rounded-lg border shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 ${
        H[z.type]
      }`,
      children: [
        _.jsx("div", {
          className: "flex-shrink-0 mr-3 mt-0.5",
          children: y[z.type],
        }),
        _.jsx("div", {
          className: "flex-1 text-sm font-medium",
          children: z.message,
        }),
        _.jsx("button", {
          onClick: C,
          className:
            "ml-3 inline-flex flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none",
          children: _.jsx(Cd, { className: "w-4 h-4" }),
        }),
      ],
    });
  },
  ev = async (z) =>
    typeof chrome < "u" && chrome.storage && chrome.storage.local
      ? await chrome.storage.local.get(z)
      : (console.warn("Chrome Storage API not available (Dev Mode)"), {}),
  Nd = async (z) => {
    typeof chrome < "u" && chrome.storage && chrome.storage.local
      ? await chrome.storage.local.set(z)
      : console.warn("Chrome Storage API not available (Dev Mode): Setting", z);
  },
  uv = async () => {
    typeof chrome < "u" && chrome.storage && chrome.storage.local
      ? await chrome.storage.local.clear()
      : console.warn("Chrome Storage API not available (Dev Mode): Cleared");
  },
  nv = async (z, C, H) =>
    typeof chrome < "u" && chrome.runtime
      ? await chrome.runtime.sendMessage({
          action: "parseCVFromPDF",
          pdfData: z,
          apiKey: C,
          provider: H,
        })
      : new Promise((y) =>
          setTimeout(
            () =>
              y({
                success: !0,
                cvData: { personalInfo: { fullName: "John Doe" } },
              }),
            2e3
          )
        ),
  cv = async () => {
    if (typeof chrome < "u" && chrome.tabs) {
      const [z] = await chrome.tabs.query({ active: !0, currentWindow: !0 });
      if (z != null && z.id)
        return await chrome.tabs.sendMessage(z.id, { action: "fillForm" });
    }
    return {
      success: !1,
      error: "No active tab found or not in extension mode",
    };
  },
  iv = () => {
    const [z, C] = Nl.useState({
        apiKeyOpenAI: "",
        apiKeyAnthropic: "",
        apiKeyGroq: "",
        selectedProvider: "openai",
      }),
      [H, y] = Nl.useState(null),
      [j, Y] = Nl.useState(!1),
      [F, ul] = Nl.useState(null),
      [N, E] = Nl.useState("upload");
    Nl.useEffect(() => {
      (async () => {
        const pl = await ev([
          Vl.API_KEY_OPENAI,
          Vl.API_KEY_ANTHROPIC,
          Vl.API_KEY_GROQ,
          Vl.LLM_PROVIDER,
          Vl.CV_DATA,
        ]);
        C({
          apiKeyOpenAI: pl[Vl.API_KEY_OPENAI] || "",
          apiKeyAnthropic: pl[Vl.API_KEY_ANTHROPIC] || "",
          apiKeyGroq: pl[Vl.API_KEY_GROQ] || "",
          selectedProvider: pl[Vl.LLM_PROVIDER] || "openai",
        }),
          pl[Vl.CV_DATA] && y(pl[Vl.CV_DATA]);
      })();
    }, []);
    const B = (tl, pl) => {
        ul({ id: Date.now().toString(), message: tl, type: pl });
      },
      T = async (tl) => {
        try {
          await Nd({
            [Vl.API_KEY_OPENAI]: tl.apiKeyOpenAI,
            [Vl.API_KEY_ANTHROPIC]: tl.apiKeyAnthropic,
            [Vl.API_KEY_GROQ]: tl.apiKeyGroq,
            [Vl.LLM_PROVIDER]: tl.selectedProvider,
          }),
            C(tl),
            B("Configuration saved successfully", "success");
        } catch {
          B("Failed to save configuration", "error");
        }
      },
      ll = Nl.useCallback(() => {
        switch (z.selectedProvider) {
          case "anthropic":
            return z.apiKeyAnthropic;
          case "groq":
            return z.apiKeyGroq;
          default:
            return z.apiKeyOpenAI;
        }
      }, [z]),
      Ul = async (tl) => {
        const pl = ll();
        if (!pl) {
          B(
            "Please configure an API key for the selected provider first",
            "error"
          );
          return;
        }
        Y(!0);
        try {
          const _l = await tl.arrayBuffer(),
            Jl = Array.from(new Uint8Array(_l)),
            Xl = await nv(Jl, pl, z.selectedProvider);
          Xl.success && Xl.cvData
            ? (y(Xl.cvData),
              await Nd({ [Vl.CV_DATA]: Xl.cvData }),
              B("CV processed and saved!", "success"))
            : B(Xl.error || "Failed to process CV", "error");
        } catch (_l) {
          B(_l.message || "Error uploading file", "error");
        } finally {
          Y(!1);
        }
      },
      ml = async () => {
        window.confirm("Are you sure you want to clear stored CV data?") &&
          (await uv(), y(null), B("CV Data cleared", "info"));
      },
      bl = async () => {
        if (!H) {
          B("Upload a CV first", "error");
          return;
        }
        Y(!0);
        try {
          const tl = await cv();
          tl.success
            ? B(
                `Filled ${tl.fieldsCount || "several"} fields successfully`,
                "success"
              )
            : B(
                tl.error || "Could not fill form. Is this a supported page?",
                "error"
              );
        } catch {
          B("Error communicating with page content", "error");
        } finally {
          Y(!1);
        }
      },
      Ql = !!ll();
    return _.jsxs("div", {
      className: "flex flex-col h-screen bg-slate-50 text-slate-800 font-sans",
      children: [
        _.jsx(Pm, {}),
        _.jsxs("main", {
          className: "flex-1 overflow-y-auto p-4 space-y-6 pb-24",
          children: [
            _.jsxs("section", {
              children: [
                _.jsxs("div", {
                  className: "flex items-center justify-between mb-3",
                  children: [
                    _.jsxs("h3", {
                      className:
                        "text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1",
                      children: [
                        _.jsx(Km, { className: "w-3 h-3" }),
                        " Configuration",
                      ],
                    }),
                    !Ql &&
                      _.jsx("span", {
                        className:
                          "text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium",
                        children: "Required",
                      }),
                  ],
                }),
                _.jsx(lv, { config: z, onSave: T }),
              ],
            }),
            _.jsxs("section", {
              children: [
                _.jsx("div", {
                  className: "flex items-center justify-between mb-3",
                  children: _.jsxs("div", {
                    className: "flex space-x-4",
                    children: [
                      _.jsxs("button", {
                        onClick: () => E("upload"),
                        className: `text-sm font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                          N === "upload"
                            ? "text-indigo-600"
                            : "text-slate-400 hover:text-slate-600"
                        }`,
                        children: [
                          _.jsx(Ym, { className: "w-3 h-3" }),
                          " Source Data",
                        ],
                      }),
                      H &&
                        _.jsxs("button", {
                          onClick: () => E("data"),
                          className: `text-sm font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                            N === "data"
                              ? "text-indigo-600"
                              : "text-slate-400 hover:text-slate-600"
                          }`,
                          children: [
                            _.jsx(Um, { className: "w-3 h-3" }),
                            " View Data",
                          ],
                        }),
                    ],
                  }),
                }),
                N === "upload"
                  ? _.jsx(tv, {
                      onUpload: Ul,
                      isLoading: j,
                      hasExistingData: !!H,
                      onClearData: ml,
                    })
                  : _.jsx("div", {
                      className:
                        "bg-white rounded-xl border border-slate-200 p-4 text-xs font-mono max-h-60 overflow-y-auto shadow-inner",
                      children: _.jsx("pre", {
                        children: JSON.stringify(H, null, 2),
                      }),
                    }),
              ],
            }),
            !Ql &&
              _.jsxs("div", {
                className:
                  "bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3 items-start",
                children: [
                  _.jsx(Wm, {
                    className: "w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5",
                  }),
                  _.jsx("p", {
                    className: "text-xs text-amber-800 leading-relaxed",
                    children:
                      "Please enter an API Key above to enable AI processing. Your key is stored locally and never shared.",
                  }),
                ],
              }),
          ],
        }),
        _.jsx("div", {
          className:
            "fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]",
          children: _.jsx("button", {
            onClick: bl,
            disabled: !H || !Ql || j,
            className: `w-full py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-200 ${
              !H || !Ql || j
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0"
            }`,
            children: j
              ? _.jsxs(_.Fragment, {
                  children: [
                    _.jsx("span", {
                      className: "animate-spin mr-2",
                      children: "⟳",
                    }),
                    " Processing...",
                  ],
                })
              : _.jsxs(_.Fragment, {
                  children: [
                    _.jsx(Fm, { className: "w-4 h-4" }),
                    _.jsx("span", { children: "Auto-Fill Current Page" }),
                  ],
                }),
          }),
        }),
        F && _.jsx(av, { toast: F, onClose: () => ul(null) }),
      ],
    });
  },
  Hd = document.getElementById("root");
if (!Hd) throw new Error("Could not find root element to mount to");
const fv = vm.createRoot(Hd);
fv.render(_.jsx(cm.StrictMode, { children: _.jsx(iv, {}) }));
