import {
  __commonJS
} from "./chunk-BUSYA2B4.js";

// node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js
var require_mapbox_gl_draw = __commonJS({
  "node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).MapboxDraw = e();
    }(exports, function() {
      "use strict";
      var t = function(t2, e2) {
        var n2 = { drag: [], click: [], mousemove: [], mousedown: [], mouseup: [], mouseout: [], keydown: [], keyup: [], touchstart: [], touchmove: [], touchend: [], tap: [] }, o2 = { on: function(t3, e3, o3) {
          if (void 0 === n2[t3]) throw new Error("Invalid event type: " + t3);
          n2[t3].push({ selector: e3, fn: o3 });
        }, render: function(t3) {
          e2.store.featureChanged(t3);
        } }, r2 = function(t3, r3) {
          for (var i2 = n2[t3], a2 = i2.length; a2--; ) {
            var s2 = i2[a2];
            if (s2.selector(r3)) {
              s2.fn.call(o2, r3) || e2.store.render(), e2.ui.updateMapClasses();
              break;
            }
          }
        };
        return t2.start.call(o2), { render: t2.render, stop: function() {
          t2.stop && t2.stop();
        }, trash: function() {
          t2.trash && (t2.trash(), e2.store.render());
        }, combineFeatures: function() {
          t2.combineFeatures && t2.combineFeatures();
        }, uncombineFeatures: function() {
          t2.uncombineFeatures && t2.uncombineFeatures();
        }, drag: function(t3) {
          r2("drag", t3);
        }, click: function(t3) {
          r2("click", t3);
        }, mousemove: function(t3) {
          r2("mousemove", t3);
        }, mousedown: function(t3) {
          r2("mousedown", t3);
        }, mouseup: function(t3) {
          r2("mouseup", t3);
        }, mouseout: function(t3) {
          r2("mouseout", t3);
        }, keydown: function(t3) {
          r2("keydown", t3);
        }, keyup: function(t3) {
          r2("keyup", t3);
        }, touchstart: function(t3) {
          r2("touchstart", t3);
        }, touchmove: function(t3) {
          r2("touchmove", t3);
        }, touchend: function(t3) {
          r2("touchend", t3);
        }, tap: function(t3) {
          r2("tap", t3);
        } };
      };
      function e(t2) {
        return t2 && t2.__esModule && Object.prototype.hasOwnProperty.call(t2, "default") ? t2.default : t2;
      }
      function n(t2) {
        if (t2.__esModule) return t2;
        var e2 = t2.default;
        if ("function" == typeof e2) {
          var n2 = function t3() {
            if (this instanceof t3) {
              var n3 = [null];
              n3.push.apply(n3, arguments);
              var o2 = Function.bind.apply(e2, n3);
              return new o2();
            }
            return e2.apply(this, arguments);
          };
          n2.prototype = e2.prototype;
        } else n2 = {};
        return Object.defineProperty(n2, "__esModule", { value: true }), Object.keys(t2).forEach(function(e3) {
          var o2 = Object.getOwnPropertyDescriptor(t2, e3);
          Object.defineProperty(n2, e3, o2.get ? o2 : { enumerable: true, get: function() {
            return t2[e3];
          } });
        }), n2;
      }
      var o = {}, r = { RADIUS: 6378137, FLATTENING: 1 / 298.257223563, POLAR_RADIUS: 63567523142e-4 }, i = r;
      function a(t2) {
        var e2 = 0;
        if (t2 && t2.length > 0) {
          e2 += Math.abs(s(t2[0]));
          for (var n2 = 1; n2 < t2.length; n2++) e2 -= Math.abs(s(t2[n2]));
        }
        return e2;
      }
      function s(t2) {
        var e2, n2, o2, r2, a2, s2, c2 = 0, l2 = t2.length;
        if (l2 > 2) {
          for (s2 = 0; s2 < l2; s2++) s2 === l2 - 2 ? (o2 = l2 - 2, r2 = l2 - 1, a2 = 0) : s2 === l2 - 1 ? (o2 = l2 - 1, r2 = 0, a2 = 1) : (o2 = s2, r2 = s2 + 1, a2 = s2 + 2), e2 = t2[o2], n2 = t2[r2], c2 += (u(t2[a2][0]) - u(e2[0])) * Math.sin(u(n2[1]));
          c2 = c2 * i.RADIUS * i.RADIUS / 2;
        }
        return c2;
      }
      function u(t2) {
        return t2 * Math.PI / 180;
      }
      o.geometry = function t2(e2) {
        var n2, o2 = 0;
        switch (e2.type) {
          case "Polygon":
            return a(e2.coordinates);
          case "MultiPolygon":
            for (n2 = 0; n2 < e2.coordinates.length; n2++) o2 += a(e2.coordinates[n2]);
            return o2;
          case "Point":
          case "MultiPoint":
          case "LineString":
          case "MultiLineString":
            return 0;
          case "GeometryCollection":
            for (n2 = 0; n2 < e2.geometries.length; n2++) o2 += t2(e2.geometries[n2]);
            return o2;
        }
      }, o.ring = s;
      var c = { CONTROL_BASE: "mapboxgl-ctrl", CONTROL_PREFIX: "mapboxgl-ctrl-", CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn", CONTROL_BUTTON_LINE: "mapbox-gl-draw_line", CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon", CONTROL_BUTTON_POINT: "mapbox-gl-draw_point", CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash", CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine", CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine", CONTROL_GROUP: "mapboxgl-ctrl-group", ATTRIBUTION: "mapboxgl-ctrl-attrib", ACTIVE_BUTTON: "active", BOX_SELECT: "mapbox-gl-draw_boxselect" }, l = { HOT: "mapbox-gl-draw-hot", COLD: "mapbox-gl-draw-cold" }, d = { ADD: "add", MOVE: "move", DRAG: "drag", POINTER: "pointer", NONE: "none" }, p = { POLYGON: "polygon", LINE: "line_string", POINT: "point" }, f = { FEATURE: "Feature", POLYGON: "Polygon", LINE_STRING: "LineString", POINT: "Point", FEATURE_COLLECTION: "FeatureCollection", MULTI_PREFIX: "Multi", MULTI_POINT: "MultiPoint", MULTI_LINE_STRING: "MultiLineString", MULTI_POLYGON: "MultiPolygon" }, h = { DRAW_LINE_STRING: "draw_line_string", DRAW_POLYGON: "draw_polygon", DRAW_POINT: "draw_point", SIMPLE_SELECT: "simple_select", DIRECT_SELECT: "direct_select", STATIC: "static" }, g = { CREATE: "draw.create", DELETE: "draw.delete", UPDATE: "draw.update", SELECTION_CHANGE: "draw.selectionchange", MODE_CHANGE: "draw.modechange", ACTIONABLE: "draw.actionable", RENDER: "draw.render", COMBINE_FEATURES: "draw.combine", UNCOMBINE_FEATURES: "draw.uncombine" }, y = { MOVE: "move", CHANGE_COORDINATES: "change_coordinates" }, v = { FEATURE: "feature", MIDPOINT: "midpoint", VERTEX: "vertex" }, m = { ACTIVE: "true", INACTIVE: "false" }, _ = ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"], b = -85, E = Object.freeze({ __proto__: null, classes: c, sources: l, cursors: d, types: p, geojsonTypes: f, modes: h, events: g, updateActions: y, meta: v, activeStates: m, interactions: _, LAT_MIN: -90, LAT_RENDERED_MIN: b, LAT_MAX: 90, LAT_RENDERED_MAX: 85, LNG_MIN: -270, LNG_MAX: 270 }), T = { Point: 0, LineString: 1, MultiLineString: 1, Polygon: 2 };
      function C(t2, e2) {
        var n2 = T[t2.geometry.type] - T[e2.geometry.type];
        return 0 === n2 && t2.geometry.type === f.POLYGON ? t2.area - e2.area : n2;
      }
      function O(t2) {
        return t2.map(function(t3) {
          return t3.geometry.type === f.POLYGON && (t3.area = o.geometry({ type: f.FEATURE, property: {}, geometry: t3.geometry })), t3;
        }).sort(C).map(function(t3) {
          return delete t3.area, t3;
        });
      }
      function S(t2, e2) {
        return void 0 === e2 && (e2 = 0), [[t2.point.x - e2, t2.point.y - e2], [t2.point.x + e2, t2.point.y + e2]];
      }
      function I(t2) {
        if (this._items = {}, this._nums = {}, this._length = t2 ? t2.length : 0, t2) for (var e2 = 0, n2 = t2.length; e2 < n2; e2++) this.add(t2[e2]), void 0 !== t2[e2] && ("string" == typeof t2[e2] ? this._items[t2[e2]] = e2 : this._nums[t2[e2]] = e2);
      }
      I.prototype.add = function(t2) {
        return this.has(t2) || (this._length++, "string" == typeof t2 ? this._items[t2] = this._length : this._nums[t2] = this._length), this;
      }, I.prototype.delete = function(t2) {
        return false === this.has(t2) || (this._length--, delete this._items[t2], delete this._nums[t2]), this;
      }, I.prototype.has = function(t2) {
        return ("string" == typeof t2 || "number" == typeof t2) && (void 0 !== this._items[t2] || void 0 !== this._nums[t2]);
      }, I.prototype.values = function() {
        var t2 = this, e2 = [];
        return Object.keys(this._items).forEach(function(n2) {
          e2.push({ k: n2, v: t2._items[n2] });
        }), Object.keys(this._nums).forEach(function(n2) {
          e2.push({ k: JSON.parse(n2), v: t2._nums[n2] });
        }), e2.sort(function(t3, e3) {
          return t3.v - e3.v;
        }).map(function(t3) {
          return t3.k;
        });
      }, I.prototype.clear = function() {
        return this._length = 0, this._items = {}, this._nums = {}, this;
      };
      var x = [v.FEATURE, v.MIDPOINT, v.VERTEX], M = { click: function(t2, e2, n2) {
        return L(t2, e2, n2, n2.options.clickBuffer);
      }, touch: function(t2, e2, n2) {
        return L(t2, e2, n2, n2.options.touchBuffer);
      } };
      function L(t2, e2, n2, o2) {
        if (null === n2.map) return [];
        var r2 = t2 ? S(t2, o2) : e2, i2 = {};
        n2.options.styles && (i2.layers = n2.options.styles.map(function(t3) {
          return t3.id;
        }).filter(function(t3) {
          return null != n2.map.getLayer(t3);
        }));
        var a2 = n2.map.queryRenderedFeatures(r2, i2).filter(function(t3) {
          return -1 !== x.indexOf(t3.properties.meta);
        }), s2 = new I(), u2 = [];
        return a2.forEach(function(t3) {
          var e3 = t3.properties.id;
          s2.has(e3) || (s2.add(e3), u2.push(t3));
        }), O(u2);
      }
      function N(t2, e2) {
        var n2 = M.click(t2, null, e2), o2 = { mouse: d.NONE };
        return n2[0] && (o2.mouse = n2[0].properties.active === m.ACTIVE ? d.MOVE : d.POINTER, o2.feature = n2[0].properties.meta), -1 !== e2.events.currentModeName().indexOf("draw") && (o2.mouse = d.ADD), e2.ui.queueMapClasses(o2), e2.ui.updateMapClasses(), n2[0];
      }
      function A(t2, e2) {
        var n2 = t2.x - e2.x, o2 = t2.y - e2.y;
        return Math.sqrt(n2 * n2 + o2 * o2);
      }
      function P(t2, e2, n2) {
        void 0 === n2 && (n2 = {});
        var o2 = null != n2.fineTolerance ? n2.fineTolerance : 4, r2 = null != n2.grossTolerance ? n2.grossTolerance : 12, i2 = null != n2.interval ? n2.interval : 500;
        t2.point = t2.point || e2.point, t2.time = t2.time || e2.time;
        var a2 = A(t2.point, e2.point);
        return a2 < o2 || a2 < r2 && e2.time - t2.time < i2;
      }
      function F(t2, e2, n2) {
        void 0 === n2 && (n2 = {});
        var o2 = null != n2.tolerance ? n2.tolerance : 25, r2 = null != n2.interval ? n2.interval : 250;
        return t2.point = t2.point || e2.point, t2.time = t2.time || e2.time, A(t2.point, e2.point) < o2 && e2.time - t2.time < r2;
      }
      var w = { exports: {} }, R = w.exports = function(t2, e2) {
        if (e2 || (e2 = 16), void 0 === t2 && (t2 = 128), t2 <= 0) return "0";
        for (var n2 = Math.log(Math.pow(2, t2)) / Math.log(e2), o2 = 2; n2 === 1 / 0; o2 *= 2) n2 = Math.log(Math.pow(2, t2 / o2)) / Math.log(e2) * o2;
        var r2 = n2 - Math.floor(n2), i2 = "";
        for (o2 = 0; o2 < Math.floor(n2); o2++) {
          i2 = Math.floor(Math.random() * e2).toString(e2) + i2;
        }
        if (r2) {
          var a2 = Math.pow(e2, r2);
          i2 = Math.floor(Math.random() * a2).toString(e2) + i2;
        }
        var s2 = parseInt(i2, e2);
        return s2 !== 1 / 0 && s2 >= Math.pow(2, t2) ? R(t2, e2) : i2;
      };
      R.rack = function(t2, e2, n2) {
        var o2 = function(o3) {
          var i2 = 0;
          do {
            if (i2++ > 10) {
              if (!n2) throw new Error("too many ID collisions, use more bits");
              t2 += n2;
            }
            var a2 = R(t2, e2);
          } while (Object.hasOwnProperty.call(r2, a2));
          return r2[a2] = o3, a2;
        }, r2 = o2.hats = {};
        return o2.get = function(t3) {
          return o2.hats[t3];
        }, o2.set = function(t3, e3) {
          return o2.hats[t3] = e3, o2;
        }, o2.bits = t2 || 128, o2.base = e2 || 16, o2;
      };
      var k = e(w.exports), D = function(t2, e2) {
        this.ctx = t2, this.properties = e2.properties || {}, this.coordinates = e2.geometry.coordinates, this.id = e2.id || k(), this.type = e2.geometry.type;
      };
      D.prototype.changed = function() {
        this.ctx.store.featureChanged(this.id);
      }, D.prototype.incomingCoords = function(t2) {
        this.setCoordinates(t2);
      }, D.prototype.setCoordinates = function(t2) {
        this.coordinates = t2, this.changed();
      }, D.prototype.getCoordinates = function() {
        return JSON.parse(JSON.stringify(this.coordinates));
      }, D.prototype.setProperty = function(t2, e2) {
        this.properties[t2] = e2;
      }, D.prototype.toGeoJSON = function() {
        return JSON.parse(JSON.stringify({ id: this.id, type: f.FEATURE, properties: this.properties, geometry: { coordinates: this.getCoordinates(), type: this.type } }));
      }, D.prototype.internal = function(t2) {
        var e2 = { id: this.id, meta: v.FEATURE, "meta:type": this.type, active: m.INACTIVE, mode: t2 };
        if (this.ctx.options.userProperties) for (var n2 in this.properties) e2["user_" + n2] = this.properties[n2];
        return { type: f.FEATURE, properties: e2, geometry: { coordinates: this.getCoordinates(), type: this.type } };
      };
      var U = function(t2, e2) {
        D.call(this, t2, e2);
      };
      (U.prototype = Object.create(D.prototype)).isValid = function() {
        return "number" == typeof this.coordinates[0] && "number" == typeof this.coordinates[1];
      }, U.prototype.updateCoordinate = function(t2, e2, n2) {
        this.coordinates = 3 === arguments.length ? [e2, n2] : [t2, e2], this.changed();
      }, U.prototype.getCoordinate = function() {
        return this.getCoordinates();
      };
      var j = function(t2, e2) {
        D.call(this, t2, e2);
      };
      (j.prototype = Object.create(D.prototype)).isValid = function() {
        return this.coordinates.length > 1;
      }, j.prototype.addCoordinate = function(t2, e2, n2) {
        this.changed();
        var o2 = parseInt(t2, 10);
        this.coordinates.splice(o2, 0, [e2, n2]);
      }, j.prototype.getCoordinate = function(t2) {
        var e2 = parseInt(t2, 10);
        return JSON.parse(JSON.stringify(this.coordinates[e2]));
      }, j.prototype.removeCoordinate = function(t2) {
        this.changed(), this.coordinates.splice(parseInt(t2, 10), 1);
      }, j.prototype.updateCoordinate = function(t2, e2, n2) {
        var o2 = parseInt(t2, 10);
        this.coordinates[o2] = [e2, n2], this.changed();
      };
      var V = function(t2, e2) {
        D.call(this, t2, e2), this.coordinates = this.coordinates.map(function(t3) {
          return t3.slice(0, -1);
        });
      };
      (V.prototype = Object.create(D.prototype)).isValid = function() {
        return 0 !== this.coordinates.length && this.coordinates.every(function(t2) {
          return t2.length > 2;
        });
      }, V.prototype.incomingCoords = function(t2) {
        this.coordinates = t2.map(function(t3) {
          return t3.slice(0, -1);
        }), this.changed();
      }, V.prototype.setCoordinates = function(t2) {
        this.coordinates = t2, this.changed();
      }, V.prototype.addCoordinate = function(t2, e2, n2) {
        this.changed();
        var o2 = t2.split(".").map(function(t3) {
          return parseInt(t3, 10);
        });
        this.coordinates[o2[0]].splice(o2[1], 0, [e2, n2]);
      }, V.prototype.removeCoordinate = function(t2) {
        this.changed();
        var e2 = t2.split(".").map(function(t3) {
          return parseInt(t3, 10);
        }), n2 = this.coordinates[e2[0]];
        n2 && (n2.splice(e2[1], 1), n2.length < 3 && this.coordinates.splice(e2[0], 1));
      }, V.prototype.getCoordinate = function(t2) {
        var e2 = t2.split(".").map(function(t3) {
          return parseInt(t3, 10);
        }), n2 = this.coordinates[e2[0]];
        return JSON.parse(JSON.stringify(n2[e2[1]]));
      }, V.prototype.getCoordinates = function() {
        return this.coordinates.map(function(t2) {
          return t2.concat([t2[0]]);
        });
      }, V.prototype.updateCoordinate = function(t2, e2, n2) {
        this.changed();
        var o2 = t2.split("."), r2 = parseInt(o2[0], 10), i2 = parseInt(o2[1], 10);
        void 0 === this.coordinates[r2] && (this.coordinates[r2] = []), this.coordinates[r2][i2] = [e2, n2];
      };
      var B = { MultiPoint: U, MultiLineString: j, MultiPolygon: V }, G = function(t2, e2, n2, o2, r2) {
        var i2 = n2.split("."), a2 = parseInt(i2[0], 10), s2 = i2[1] ? i2.slice(1).join(".") : null;
        return t2[a2][e2](s2, o2, r2);
      }, J = function(t2, e2) {
        if (D.call(this, t2, e2), delete this.coordinates, this.model = B[e2.geometry.type], void 0 === this.model) throw new TypeError(e2.geometry.type + " is not a valid type");
        this.features = this._coordinatesToFeatures(e2.geometry.coordinates);
      };
      function z(t2) {
        this.map = t2.map, this.drawConfig = JSON.parse(JSON.stringify(t2.options || {})), this._ctx = t2;
      }
      (J.prototype = Object.create(D.prototype))._coordinatesToFeatures = function(t2) {
        var e2 = this, n2 = this.model.bind(this);
        return t2.map(function(t3) {
          return new n2(e2.ctx, { id: k(), type: f.FEATURE, properties: {}, geometry: { coordinates: t3, type: e2.type.replace("Multi", "") } });
        });
      }, J.prototype.isValid = function() {
        return this.features.every(function(t2) {
          return t2.isValid();
        });
      }, J.prototype.setCoordinates = function(t2) {
        this.features = this._coordinatesToFeatures(t2), this.changed();
      }, J.prototype.getCoordinate = function(t2) {
        return G(this.features, "getCoordinate", t2);
      }, J.prototype.getCoordinates = function() {
        return JSON.parse(JSON.stringify(this.features.map(function(t2) {
          return t2.type === f.POLYGON ? t2.getCoordinates() : t2.coordinates;
        })));
      }, J.prototype.updateCoordinate = function(t2, e2, n2) {
        G(this.features, "updateCoordinate", t2, e2, n2), this.changed();
      }, J.prototype.addCoordinate = function(t2, e2, n2) {
        G(this.features, "addCoordinate", t2, e2, n2), this.changed();
      }, J.prototype.removeCoordinate = function(t2) {
        G(this.features, "removeCoordinate", t2), this.changed();
      }, J.prototype.getFeatures = function() {
        return this.features;
      }, z.prototype.setSelected = function(t2) {
        return this._ctx.store.setSelected(t2);
      }, z.prototype.setSelectedCoordinates = function(t2) {
        var e2 = this;
        this._ctx.store.setSelectedCoordinates(t2), t2.reduce(function(t3, n2) {
          return void 0 === t3[n2.feature_id] && (t3[n2.feature_id] = true, e2._ctx.store.get(n2.feature_id).changed()), t3;
        }, {});
      }, z.prototype.getSelected = function() {
        return this._ctx.store.getSelected();
      }, z.prototype.getSelectedIds = function() {
        return this._ctx.store.getSelectedIds();
      }, z.prototype.isSelected = function(t2) {
        return this._ctx.store.isSelected(t2);
      }, z.prototype.getFeature = function(t2) {
        return this._ctx.store.get(t2);
      }, z.prototype.select = function(t2) {
        return this._ctx.store.select(t2);
      }, z.prototype.deselect = function(t2) {
        return this._ctx.store.deselect(t2);
      }, z.prototype.deleteFeature = function(t2, e2) {
        return void 0 === e2 && (e2 = {}), this._ctx.store.delete(t2, e2);
      }, z.prototype.addFeature = function(t2) {
        return this._ctx.store.add(t2);
      }, z.prototype.clearSelectedFeatures = function() {
        return this._ctx.store.clearSelected();
      }, z.prototype.clearSelectedCoordinates = function() {
        return this._ctx.store.clearSelectedCoordinates();
      }, z.prototype.setActionableState = function(t2) {
        void 0 === t2 && (t2 = {});
        var e2 = { trash: t2.trash || false, combineFeatures: t2.combineFeatures || false, uncombineFeatures: t2.uncombineFeatures || false };
        return this._ctx.events.actionable(e2);
      }, z.prototype.changeMode = function(t2, e2, n2) {
        return void 0 === e2 && (e2 = {}), void 0 === n2 && (n2 = {}), this._ctx.events.changeMode(t2, e2, n2);
      }, z.prototype.updateUIClasses = function(t2) {
        return this._ctx.ui.queueMapClasses(t2);
      }, z.prototype.activateUIButton = function(t2) {
        return this._ctx.ui.setActiveButton(t2);
      }, z.prototype.featuresAt = function(t2, e2, n2) {
        if (void 0 === n2 && (n2 = "click"), "click" !== n2 && "touch" !== n2) throw new Error("invalid buffer type");
        return M[n2](t2, e2, this._ctx);
      }, z.prototype.newFeature = function(t2) {
        var e2 = t2.geometry.type;
        return e2 === f.POINT ? new U(this._ctx, t2) : e2 === f.LINE_STRING ? new j(this._ctx, t2) : e2 === f.POLYGON ? new V(this._ctx, t2) : new J(this._ctx, t2);
      }, z.prototype.isInstanceOf = function(t2, e2) {
        if (t2 === f.POINT) return e2 instanceof U;
        if (t2 === f.LINE_STRING) return e2 instanceof j;
        if (t2 === f.POLYGON) return e2 instanceof V;
        if ("MultiFeature" === t2) return e2 instanceof J;
        throw new Error("Unknown feature class: " + t2);
      }, z.prototype.doRender = function(t2) {
        return this._ctx.store.featureChanged(t2);
      }, z.prototype.onSetup = function() {
      }, z.prototype.onDrag = function() {
      }, z.prototype.onClick = function() {
      }, z.prototype.onMouseMove = function() {
      }, z.prototype.onMouseDown = function() {
      }, z.prototype.onMouseUp = function() {
      }, z.prototype.onMouseOut = function() {
      }, z.prototype.onKeyUp = function() {
      }, z.prototype.onKeyDown = function() {
      }, z.prototype.onTouchStart = function() {
      }, z.prototype.onTouchMove = function() {
      }, z.prototype.onTouchEnd = function() {
      }, z.prototype.onTap = function() {
      }, z.prototype.onStop = function() {
      }, z.prototype.onTrash = function() {
      }, z.prototype.onCombineFeature = function() {
      }, z.prototype.onUncombineFeature = function() {
      }, z.prototype.toDisplayFeatures = function() {
        throw new Error("You must overwrite toDisplayFeatures");
      };
      var Y = { drag: "onDrag", click: "onClick", mousemove: "onMouseMove", mousedown: "onMouseDown", mouseup: "onMouseUp", mouseout: "onMouseOut", keyup: "onKeyUp", keydown: "onKeyDown", touchstart: "onTouchStart", touchmove: "onTouchMove", touchend: "onTouchEnd", tap: "onTap" }, $ = Object.keys(Y);
      function q(t2) {
        var e2 = Object.keys(t2);
        return function(n2, o2) {
          void 0 === o2 && (o2 = {});
          var r2 = {}, i2 = e2.reduce(function(e3, n3) {
            return e3[n3] = t2[n3], e3;
          }, new z(n2));
          return { start: function() {
            var e3 = this;
            r2 = i2.onSetup(o2), $.forEach(function(n3) {
              var o3, a2 = Y[n3], s2 = function() {
                return false;
              };
              t2[a2] && (s2 = function() {
                return true;
              }), e3.on(n3, s2, (o3 = a2, function(t3) {
                return i2[o3](r2, t3);
              }));
            });
          }, stop: function() {
            i2.onStop(r2);
          }, trash: function() {
            i2.onTrash(r2);
          }, combineFeatures: function() {
            i2.onCombineFeatures(r2);
          }, uncombineFeatures: function() {
            i2.onUncombineFeatures(r2);
          }, render: function(t3, e3) {
            i2.toDisplayFeatures(r2, t3, e3);
          } };
        };
      }
      function H(t2) {
        return [].concat(t2).filter(function(t3) {
          return void 0 !== t3;
        });
      }
      function X() {
        var t2 = this;
        if (!(t2.ctx.map && void 0 !== t2.ctx.map.getSource(l.HOT))) return u2();
        var e2 = t2.ctx.events.currentModeName();
        t2.ctx.ui.queueMapClasses({ mode: e2 });
        var n2 = [], o2 = [];
        t2.isDirty ? o2 = t2.getAllIds() : (n2 = t2.getChangedIds().filter(function(e3) {
          return void 0 !== t2.get(e3);
        }), o2 = t2.sources.hot.filter(function(e3) {
          return e3.properties.id && -1 === n2.indexOf(e3.properties.id) && void 0 !== t2.get(e3.properties.id);
        }).map(function(t3) {
          return t3.properties.id;
        })), t2.sources.hot = [];
        var r2 = t2.sources.cold.length;
        t2.sources.cold = t2.isDirty ? [] : t2.sources.cold.filter(function(t3) {
          var e3 = t3.properties.id || t3.properties.parent;
          return -1 === n2.indexOf(e3);
        });
        var i2 = r2 !== t2.sources.cold.length || o2.length > 0;
        function a2(n3, o3) {
          var r3 = t2.get(n3).internal(e2);
          t2.ctx.events.currentModeRender(r3, function(e3) {
            t2.sources[o3].push(e3);
          });
        }
        if (n2.forEach(function(t3) {
          return a2(t3, "hot");
        }), o2.forEach(function(t3) {
          return a2(t3, "cold");
        }), i2 && t2.ctx.map.getSource(l.COLD).setData({ type: f.FEATURE_COLLECTION, features: t2.sources.cold }), t2.ctx.map.getSource(l.HOT).setData({ type: f.FEATURE_COLLECTION, features: t2.sources.hot }), t2._emitSelectionChange && (t2.ctx.map.fire(g.SELECTION_CHANGE, { features: t2.getSelected().map(function(t3) {
          return t3.toGeoJSON();
        }), points: t2.getSelectedCoordinates().map(function(t3) {
          return { type: f.FEATURE, properties: {}, geometry: { type: f.POINT, coordinates: t3.coordinates } };
        }) }), t2._emitSelectionChange = false), t2._deletedFeaturesToEmit.length) {
          var s2 = t2._deletedFeaturesToEmit.map(function(t3) {
            return t3.toGeoJSON();
          });
          t2._deletedFeaturesToEmit = [], t2.ctx.map.fire(g.DELETE, { features: s2 });
        }
        function u2() {
          t2.isDirty = false, t2.clearChangedIds();
        }
        u2(), t2.ctx.map.fire(g.RENDER, {});
      }
      function Z(t2) {
        var e2, n2 = this;
        this._features = {}, this._featureIds = new I(), this._selectedFeatureIds = new I(), this._selectedCoordinates = [], this._changedFeatureIds = new I(), this._deletedFeaturesToEmit = [], this._emitSelectionChange = false, this._mapInitialConfig = {}, this.ctx = t2, this.sources = { hot: [], cold: [] }, this.render = function() {
          e2 || (e2 = requestAnimationFrame(function() {
            e2 = null, X.call(n2);
          }));
        }, this.isDirty = false;
      }
      function W(t2, e2) {
        var n2 = t2._selectedCoordinates.filter(function(e3) {
          return t2._selectedFeatureIds.has(e3.feature_id);
        });
        t2._selectedCoordinates.length === n2.length || e2.silent || (t2._emitSelectionChange = true), t2._selectedCoordinates = n2;
      }
      Z.prototype.createRenderBatch = function() {
        var t2 = this, e2 = this.render, n2 = 0;
        return this.render = function() {
          n2++;
        }, function() {
          t2.render = e2, n2 > 0 && t2.render();
        };
      }, Z.prototype.setDirty = function() {
        return this.isDirty = true, this;
      }, Z.prototype.featureChanged = function(t2) {
        return this._changedFeatureIds.add(t2), this;
      }, Z.prototype.getChangedIds = function() {
        return this._changedFeatureIds.values();
      }, Z.prototype.clearChangedIds = function() {
        return this._changedFeatureIds.clear(), this;
      }, Z.prototype.getAllIds = function() {
        return this._featureIds.values();
      }, Z.prototype.add = function(t2) {
        return this.featureChanged(t2.id), this._features[t2.id] = t2, this._featureIds.add(t2.id), this;
      }, Z.prototype.delete = function(t2, e2) {
        var n2 = this;
        return void 0 === e2 && (e2 = {}), H(t2).forEach(function(t3) {
          n2._featureIds.has(t3) && (n2._featureIds.delete(t3), n2._selectedFeatureIds.delete(t3), e2.silent || -1 === n2._deletedFeaturesToEmit.indexOf(n2._features[t3]) && n2._deletedFeaturesToEmit.push(n2._features[t3]), delete n2._features[t3], n2.isDirty = true);
        }), W(this, e2), this;
      }, Z.prototype.get = function(t2) {
        return this._features[t2];
      }, Z.prototype.getAll = function() {
        var t2 = this;
        return Object.keys(this._features).map(function(e2) {
          return t2._features[e2];
        });
      }, Z.prototype.select = function(t2, e2) {
        var n2 = this;
        return void 0 === e2 && (e2 = {}), H(t2).forEach(function(t3) {
          n2._selectedFeatureIds.has(t3) || (n2._selectedFeatureIds.add(t3), n2._changedFeatureIds.add(t3), e2.silent || (n2._emitSelectionChange = true));
        }), this;
      }, Z.prototype.deselect = function(t2, e2) {
        var n2 = this;
        return void 0 === e2 && (e2 = {}), H(t2).forEach(function(t3) {
          n2._selectedFeatureIds.has(t3) && (n2._selectedFeatureIds.delete(t3), n2._changedFeatureIds.add(t3), e2.silent || (n2._emitSelectionChange = true));
        }), W(this, e2), this;
      }, Z.prototype.clearSelected = function(t2) {
        return void 0 === t2 && (t2 = {}), this.deselect(this._selectedFeatureIds.values(), { silent: t2.silent }), this;
      }, Z.prototype.setSelected = function(t2, e2) {
        var n2 = this;
        return void 0 === e2 && (e2 = {}), t2 = H(t2), this.deselect(this._selectedFeatureIds.values().filter(function(e3) {
          return -1 === t2.indexOf(e3);
        }), { silent: e2.silent }), this.select(t2.filter(function(t3) {
          return !n2._selectedFeatureIds.has(t3);
        }), { silent: e2.silent }), this;
      }, Z.prototype.setSelectedCoordinates = function(t2) {
        return this._selectedCoordinates = t2, this._emitSelectionChange = true, this;
      }, Z.prototype.clearSelectedCoordinates = function() {
        return this._selectedCoordinates = [], this._emitSelectionChange = true, this;
      }, Z.prototype.getSelectedIds = function() {
        return this._selectedFeatureIds.values();
      }, Z.prototype.getSelected = function() {
        var t2 = this;
        return this._selectedFeatureIds.values().map(function(e2) {
          return t2.get(e2);
        });
      }, Z.prototype.getSelectedCoordinates = function() {
        var t2 = this;
        return this._selectedCoordinates.map(function(e2) {
          return { coordinates: t2.get(e2.feature_id).getCoordinate(e2.coord_path) };
        });
      }, Z.prototype.isSelected = function(t2) {
        return this._selectedFeatureIds.has(t2);
      }, Z.prototype.setFeatureProperty = function(t2, e2, n2) {
        this.get(t2).setProperty(e2, n2), this.featureChanged(t2);
      }, Z.prototype.storeMapConfig = function() {
        var t2 = this;
        _.forEach(function(e2) {
          t2.ctx.map[e2] && (t2._mapInitialConfig[e2] = t2.ctx.map[e2].isEnabled());
        });
      }, Z.prototype.restoreMapConfig = function() {
        var t2 = this;
        Object.keys(this._mapInitialConfig).forEach(function(e2) {
          t2._mapInitialConfig[e2] ? t2.ctx.map[e2].enable() : t2.ctx.map[e2].disable();
        });
      }, Z.prototype.getInitialConfigValue = function(t2) {
        return void 0 === this._mapInitialConfig[t2] || this._mapInitialConfig[t2];
      };
      var K = function() {
        for (var t2 = arguments, e2 = {}, n2 = 0; n2 < arguments.length; n2++) {
          var o2 = t2[n2];
          for (var r2 in o2) Q.call(o2, r2) && (e2[r2] = o2[r2]);
        }
        return e2;
      }, Q = Object.prototype.hasOwnProperty;
      var tt = e(K), et = ["mode", "feature", "mouse"];
      function nt(e2) {
        var n2 = null, o2 = null, r2 = { onRemove: function() {
          return e2.map.off("load", r2.connect), clearInterval(o2), r2.removeLayers(), e2.store.restoreMapConfig(), e2.ui.removeButtons(), e2.events.removeEventListeners(), e2.ui.clearMapClasses(), e2.boxZoomInitial && e2.map.boxZoom.enable(), e2.map = null, e2.container = null, e2.store = null, n2 && n2.parentNode && n2.parentNode.removeChild(n2), n2 = null, this;
        }, connect: function() {
          e2.map.off("load", r2.connect), clearInterval(o2), r2.addLayers(), e2.store.storeMapConfig(), e2.events.addEventListeners();
        }, onAdd: function(i2) {
          var a2 = i2.fire;
          return i2.fire = function(t2, e3) {
            var n3 = arguments;
            return 1 === a2.length && 1 !== arguments.length && (n3 = [tt({}, { type: t2 }, e3)]), a2.apply(i2, n3);
          }, e2.map = i2, e2.events = function(e3) {
            var n3 = Object.keys(e3.options.modes).reduce(function(t2, n4) {
              return t2[n4] = q(e3.options.modes[n4]), t2;
            }, {}), o3 = {}, r3 = {}, i3 = {}, a3 = null, s2 = null;
            i3.drag = function(t2, n4) {
              n4({ point: t2.point, time: (/* @__PURE__ */ new Date()).getTime() }) ? (e3.ui.queueMapClasses({ mouse: d.DRAG }), s2.drag(t2)) : t2.originalEvent.stopPropagation();
            }, i3.mousedrag = function(t2) {
              i3.drag(t2, function(t3) {
                return !P(o3, t3);
              });
            }, i3.touchdrag = function(t2) {
              i3.drag(t2, function(t3) {
                return !F(r3, t3);
              });
            }, i3.mousemove = function(t2) {
              if (1 === (void 0 !== t2.originalEvent.buttons ? t2.originalEvent.buttons : t2.originalEvent.which)) return i3.mousedrag(t2);
              var n4 = N(t2, e3);
              t2.featureTarget = n4, s2.mousemove(t2);
            }, i3.mousedown = function(t2) {
              o3 = { time: (/* @__PURE__ */ new Date()).getTime(), point: t2.point };
              var n4 = N(t2, e3);
              t2.featureTarget = n4, s2.mousedown(t2);
            }, i3.mouseup = function(t2) {
              var n4 = N(t2, e3);
              t2.featureTarget = n4, P(o3, { point: t2.point, time: (/* @__PURE__ */ new Date()).getTime() }) ? s2.click(t2) : s2.mouseup(t2);
            }, i3.mouseout = function(t2) {
              s2.mouseout(t2);
            }, i3.touchstart = function(t2) {
              if (e3.options.touchEnabled) {
                r3 = { time: (/* @__PURE__ */ new Date()).getTime(), point: t2.point };
                var n4 = M.touch(t2, null, e3)[0];
                t2.featureTarget = n4, s2.touchstart(t2);
              }
            }, i3.touchmove = function(t2) {
              if (e3.options.touchEnabled) return s2.touchmove(t2), i3.touchdrag(t2);
            }, i3.touchend = function(t2) {
              if (t2.originalEvent.preventDefault(), e3.options.touchEnabled) {
                var n4 = M.touch(t2, null, e3)[0];
                t2.featureTarget = n4, F(r3, { time: (/* @__PURE__ */ new Date()).getTime(), point: t2.point }) ? s2.tap(t2) : s2.touchend(t2);
              }
            };
            var u2 = function(t2) {
              return !(8 === t2 || 46 === t2 || t2 >= 48 && t2 <= 57);
            };
            function c2(o4, r4, i4) {
              void 0 === i4 && (i4 = {}), s2.stop();
              var u3 = n3[o4];
              if (void 0 === u3) throw new Error(o4 + " is not valid");
              a3 = o4;
              var c3 = u3(e3, r4);
              s2 = t(c3, e3), i4.silent || e3.map.fire(g.MODE_CHANGE, { mode: o4 }), e3.store.setDirty(), e3.store.render();
            }
            i3.keydown = function(t2) {
              (t2.srcElement || t2.target).classList.contains("mapboxgl-canvas") && (8 !== t2.keyCode && 46 !== t2.keyCode || !e3.options.controls.trash ? u2(t2.keyCode) ? s2.keydown(t2) : 49 === t2.keyCode && e3.options.controls.point ? c2(h.DRAW_POINT) : 50 === t2.keyCode && e3.options.controls.line_string ? c2(h.DRAW_LINE_STRING) : 51 === t2.keyCode && e3.options.controls.polygon && c2(h.DRAW_POLYGON) : (t2.preventDefault(), s2.trash()));
            }, i3.keyup = function(t2) {
              u2(t2.keyCode) && s2.keyup(t2);
            }, i3.zoomend = function() {
              e3.store.changeZoom();
            }, i3.data = function(t2) {
              if ("style" === t2.dataType) {
                var n4 = e3.setup, o4 = e3.map, r4 = e3.options, i4 = e3.store;
                r4.styles.some(function(t3) {
                  return o4.getLayer(t3.id);
                }) || (n4.addLayers(), i4.setDirty(), i4.render());
              }
            };
            var l2 = { trash: false, combineFeatures: false, uncombineFeatures: false };
            return { start: function() {
              a3 = e3.options.defaultMode, s2 = t(n3[a3](e3), e3);
            }, changeMode: c2, actionable: function(t2) {
              var n4 = false;
              Object.keys(t2).forEach(function(e4) {
                if (void 0 === l2[e4]) throw new Error("Invalid action type");
                l2[e4] !== t2[e4] && (n4 = true), l2[e4] = t2[e4];
              }), n4 && e3.map.fire(g.ACTIONABLE, { actions: l2 });
            }, currentModeName: function() {
              return a3;
            }, currentModeRender: function(t2, e4) {
              return s2.render(t2, e4);
            }, fire: function(t2, e4) {
              i3[t2] && i3[t2](e4);
            }, addEventListeners: function() {
              e3.map.on("mousemove", i3.mousemove), e3.map.on("mousedown", i3.mousedown), e3.map.on("mouseup", i3.mouseup), e3.map.on("data", i3.data), e3.map.on("touchmove", i3.touchmove), e3.map.on("touchstart", i3.touchstart), e3.map.on("touchend", i3.touchend), e3.container.addEventListener("mouseout", i3.mouseout), e3.options.keybindings && (e3.container.addEventListener("keydown", i3.keydown), e3.container.addEventListener("keyup", i3.keyup));
            }, removeEventListeners: function() {
              e3.map.off("mousemove", i3.mousemove), e3.map.off("mousedown", i3.mousedown), e3.map.off("mouseup", i3.mouseup), e3.map.off("data", i3.data), e3.map.off("touchmove", i3.touchmove), e3.map.off("touchstart", i3.touchstart), e3.map.off("touchend", i3.touchend), e3.container.removeEventListener("mouseout", i3.mouseout), e3.options.keybindings && (e3.container.removeEventListener("keydown", i3.keydown), e3.container.removeEventListener("keyup", i3.keyup));
            }, trash: function(t2) {
              s2.trash(t2);
            }, combineFeatures: function() {
              s2.combineFeatures();
            }, uncombineFeatures: function() {
              s2.uncombineFeatures();
            }, getMode: function() {
              return a3;
            } };
          }(e2), e2.ui = /* @__PURE__ */ function(t2) {
            var e3 = {}, n3 = null, o3 = { mode: null, feature: null, mouse: null }, r3 = { mode: null, feature: null, mouse: null };
            function i3(t3) {
              r3 = tt(r3, t3);
            }
            function a3() {
              var e4, n4;
              if (t2.container) {
                var i4 = [], a4 = [];
                et.forEach(function(t3) {
                  r3[t3] !== o3[t3] && (i4.push(t3 + "-" + o3[t3]), null !== r3[t3] && a4.push(t3 + "-" + r3[t3]));
                }), i4.length > 0 && (e4 = t2.container.classList).remove.apply(e4, i4), a4.length > 0 && (n4 = t2.container.classList).add.apply(n4, a4), o3 = tt(o3, r3);
              }
            }
            function s2(t3, e4) {
              void 0 === e4 && (e4 = {});
              var o4 = document.createElement("button");
              return o4.className = c.CONTROL_BUTTON + " " + e4.className, o4.setAttribute("title", e4.title), e4.container.appendChild(o4), o4.addEventListener("click", function(o5) {
                if (o5.preventDefault(), o5.stopPropagation(), o5.target === n3) return u2(), void e4.onDeactivate();
                l2(t3), e4.onActivate();
              }, true), o4;
            }
            function u2() {
              n3 && (n3.classList.remove(c.ACTIVE_BUTTON), n3 = null);
            }
            function l2(t3) {
              u2();
              var o4 = e3[t3];
              o4 && o4 && "trash" !== t3 && (o4.classList.add(c.ACTIVE_BUTTON), n3 = o4);
            }
            return { setActiveButton: l2, queueMapClasses: i3, updateMapClasses: a3, clearMapClasses: function() {
              i3({ mode: null, feature: null, mouse: null }), a3();
            }, addButtons: function() {
              var n4 = t2.options.controls, o4 = document.createElement("div");
              return o4.className = c.CONTROL_GROUP + " " + c.CONTROL_BASE, n4 ? (n4[p.LINE] && (e3[p.LINE] = s2(p.LINE, { container: o4, className: c.CONTROL_BUTTON_LINE, title: "LineString tool " + (t2.options.keybindings ? "(l)" : ""), onActivate: function() {
                return t2.events.changeMode(h.DRAW_LINE_STRING);
              }, onDeactivate: function() {
                return t2.events.trash();
              } })), n4[p.POLYGON] && (e3[p.POLYGON] = s2(p.POLYGON, { container: o4, className: c.CONTROL_BUTTON_POLYGON, title: "Polygon tool " + (t2.options.keybindings ? "(p)" : ""), onActivate: function() {
                return t2.events.changeMode(h.DRAW_POLYGON);
              }, onDeactivate: function() {
                return t2.events.trash();
              } })), n4[p.POINT] && (e3[p.POINT] = s2(p.POINT, { container: o4, className: c.CONTROL_BUTTON_POINT, title: "Marker tool " + (t2.options.keybindings ? "(m)" : ""), onActivate: function() {
                return t2.events.changeMode(h.DRAW_POINT);
              }, onDeactivate: function() {
                return t2.events.trash();
              } })), n4.trash && (e3.trash = s2("trash", { container: o4, className: c.CONTROL_BUTTON_TRASH, title: "Delete", onActivate: function() {
                t2.events.trash();
              } })), n4.combine_features && (e3.combine_features = s2("combineFeatures", { container: o4, className: c.CONTROL_BUTTON_COMBINE_FEATURES, title: "Combine", onActivate: function() {
                t2.events.combineFeatures();
              } })), n4.uncombine_features && (e3.uncombine_features = s2("uncombineFeatures", { container: o4, className: c.CONTROL_BUTTON_UNCOMBINE_FEATURES, title: "Uncombine", onActivate: function() {
                t2.events.uncombineFeatures();
              } })), o4) : o4;
            }, removeButtons: function() {
              Object.keys(e3).forEach(function(t3) {
                var n4 = e3[t3];
                n4.parentNode && n4.parentNode.removeChild(n4), delete e3[t3];
              });
            } };
          }(e2), e2.container = i2.getContainer(), e2.store = new Z(e2), n2 = e2.ui.addButtons(), e2.options.boxSelect && (e2.boxZoomInitial = i2.boxZoom.isEnabled(), i2.boxZoom.disable(), i2.dragPan.disable(), i2.dragPan.enable()), i2.loaded() ? r2.connect() : (i2.on("load", r2.connect), o2 = setInterval(function() {
            i2.loaded() && r2.connect();
          }, 16)), e2.events.start(), n2;
        }, addLayers: function() {
          e2.map.addSource(l.COLD, { data: { type: f.FEATURE_COLLECTION, features: [] }, type: "geojson" }), e2.map.addSource(l.HOT, { data: { type: f.FEATURE_COLLECTION, features: [] }, type: "geojson" }), e2.options.styles.forEach(function(t2) {
            e2.map.addLayer(t2);
          }), e2.store.setDirty(true), e2.store.render();
        }, removeLayers: function() {
          e2.options.styles.forEach(function(t2) {
            e2.map.getLayer(t2.id) && e2.map.removeLayer(t2.id);
          }), e2.map.getSource(l.COLD) && e2.map.removeSource(l.COLD), e2.map.getSource(l.HOT) && e2.map.removeSource(l.HOT);
        } };
        return e2.setup = r2, r2;
      }
      var ot = [{ id: "gl-draw-polygon-fill-inactive", type: "fill", filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]], paint: { "fill-color": "#3bb2d0", "fill-outline-color": "#3bb2d0", "fill-opacity": 0.1 } }, { id: "gl-draw-polygon-fill-active", type: "fill", filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]], paint: { "fill-color": "#fbb03b", "fill-outline-color": "#fbb03b", "fill-opacity": 0.1 } }, { id: "gl-draw-polygon-midpoint", type: "circle", filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]], paint: { "circle-radius": 3, "circle-color": "#fbb03b" } }, { id: "gl-draw-polygon-stroke-inactive", type: "line", filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#3bb2d0", "line-width": 2 } }, { id: "gl-draw-polygon-stroke-active", type: "line", filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#fbb03b", "line-dasharray": [0.2, 2], "line-width": 2 } }, { id: "gl-draw-line-inactive", type: "line", filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#3bb2d0", "line-width": 2 } }, { id: "gl-draw-line-active", type: "line", filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#fbb03b", "line-dasharray": [0.2, 2], "line-width": 2 } }, { id: "gl-draw-polygon-and-line-vertex-stroke-inactive", type: "circle", filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]], paint: { "circle-radius": 5, "circle-color": "#fff" } }, { id: "gl-draw-polygon-and-line-vertex-inactive", type: "circle", filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]], paint: { "circle-radius": 3, "circle-color": "#fbb03b" } }, { id: "gl-draw-point-point-stroke-inactive", type: "circle", filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]], paint: { "circle-radius": 5, "circle-opacity": 1, "circle-color": "#fff" } }, { id: "gl-draw-point-inactive", type: "circle", filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]], paint: { "circle-radius": 3, "circle-color": "#3bb2d0" } }, { id: "gl-draw-point-stroke-active", type: "circle", filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]], paint: { "circle-radius": 7, "circle-color": "#fff" } }, { id: "gl-draw-point-active", type: "circle", filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]], paint: { "circle-radius": 5, "circle-color": "#fbb03b" } }, { id: "gl-draw-polygon-fill-static", type: "fill", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]], paint: { "fill-color": "#404040", "fill-outline-color": "#404040", "fill-opacity": 0.1 } }, { id: "gl-draw-polygon-stroke-static", type: "line", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#404040", "line-width": 2 } }, { id: "gl-draw-line-static", type: "line", filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#404040", "line-width": 2 } }, { id: "gl-draw-point-static", type: "circle", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]], paint: { "circle-radius": 5, "circle-color": "#404040" } }];
      function rt(t2) {
        return function(e2) {
          var n2 = e2.featureTarget;
          return !!n2 && (!!n2.properties && n2.properties.meta === t2);
        };
      }
      function it(t2) {
        return !!t2.originalEvent && (!!t2.originalEvent.shiftKey && 0 === t2.originalEvent.button);
      }
      function at(t2) {
        return !!t2.featureTarget && (!!t2.featureTarget.properties && (t2.featureTarget.properties.active === m.ACTIVE && t2.featureTarget.properties.meta === v.FEATURE));
      }
      function st(t2) {
        return !!t2.featureTarget && (!!t2.featureTarget.properties && (t2.featureTarget.properties.active === m.INACTIVE && t2.featureTarget.properties.meta === v.FEATURE));
      }
      function ut(t2) {
        return void 0 === t2.featureTarget;
      }
      function ct(t2) {
        return !!t2.featureTarget && (!!t2.featureTarget.properties && t2.featureTarget.properties.meta === v.FEATURE);
      }
      function lt(t2) {
        var e2 = t2.featureTarget;
        return !!e2 && (!!e2.properties && e2.properties.meta === v.VERTEX);
      }
      function dt(t2) {
        return !!t2.originalEvent && true === t2.originalEvent.shiftKey;
      }
      function pt(t2) {
        return 27 === t2.keyCode;
      }
      function ft(t2) {
        return 13 === t2.keyCode;
      }
      var ht = Object.freeze({ __proto__: null, isOfMetaType: rt, isShiftMousedown: it, isActiveFeature: at, isInactiveFeature: st, noTarget: ut, isFeature: ct, isVertex: lt, isShiftDown: dt, isEscapeKey: pt, isEnterKey: ft, isTrue: function() {
        return true;
      } }), gt = yt;
      function yt(t2, e2) {
        this.x = t2, this.y = e2;
      }
      yt.prototype = { clone: function() {
        return new yt(this.x, this.y);
      }, add: function(t2) {
        return this.clone()._add(t2);
      }, sub: function(t2) {
        return this.clone()._sub(t2);
      }, multByPoint: function(t2) {
        return this.clone()._multByPoint(t2);
      }, divByPoint: function(t2) {
        return this.clone()._divByPoint(t2);
      }, mult: function(t2) {
        return this.clone()._mult(t2);
      }, div: function(t2) {
        return this.clone()._div(t2);
      }, rotate: function(t2) {
        return this.clone()._rotate(t2);
      }, rotateAround: function(t2, e2) {
        return this.clone()._rotateAround(t2, e2);
      }, matMult: function(t2) {
        return this.clone()._matMult(t2);
      }, unit: function() {
        return this.clone()._unit();
      }, perp: function() {
        return this.clone()._perp();
      }, round: function() {
        return this.clone()._round();
      }, mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }, equals: function(t2) {
        return this.x === t2.x && this.y === t2.y;
      }, dist: function(t2) {
        return Math.sqrt(this.distSqr(t2));
      }, distSqr: function(t2) {
        var e2 = t2.x - this.x, n2 = t2.y - this.y;
        return e2 * e2 + n2 * n2;
      }, angle: function() {
        return Math.atan2(this.y, this.x);
      }, angleTo: function(t2) {
        return Math.atan2(this.y - t2.y, this.x - t2.x);
      }, angleWith: function(t2) {
        return this.angleWithSep(t2.x, t2.y);
      }, angleWithSep: function(t2, e2) {
        return Math.atan2(this.x * e2 - this.y * t2, this.x * t2 + this.y * e2);
      }, _matMult: function(t2) {
        var e2 = t2[0] * this.x + t2[1] * this.y, n2 = t2[2] * this.x + t2[3] * this.y;
        return this.x = e2, this.y = n2, this;
      }, _add: function(t2) {
        return this.x += t2.x, this.y += t2.y, this;
      }, _sub: function(t2) {
        return this.x -= t2.x, this.y -= t2.y, this;
      }, _mult: function(t2) {
        return this.x *= t2, this.y *= t2, this;
      }, _div: function(t2) {
        return this.x /= t2, this.y /= t2, this;
      }, _multByPoint: function(t2) {
        return this.x *= t2.x, this.y *= t2.y, this;
      }, _divByPoint: function(t2) {
        return this.x /= t2.x, this.y /= t2.y, this;
      }, _unit: function() {
        return this._div(this.mag()), this;
      }, _perp: function() {
        var t2 = this.y;
        return this.y = this.x, this.x = -t2, this;
      }, _rotate: function(t2) {
        var e2 = Math.cos(t2), n2 = Math.sin(t2), o2 = e2 * this.x - n2 * this.y, r2 = n2 * this.x + e2 * this.y;
        return this.x = o2, this.y = r2, this;
      }, _rotateAround: function(t2, e2) {
        var n2 = Math.cos(t2), o2 = Math.sin(t2), r2 = e2.x + n2 * (this.x - e2.x) - o2 * (this.y - e2.y), i2 = e2.y + o2 * (this.x - e2.x) + n2 * (this.y - e2.y);
        return this.x = r2, this.y = i2, this;
      }, _round: function() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
      } }, yt.convert = function(t2) {
        return t2 instanceof yt ? t2 : Array.isArray(t2) ? new yt(t2[0], t2[1]) : t2;
      };
      var vt = e(gt);
      function mt(t2, e2) {
        var n2 = e2.getBoundingClientRect();
        return new vt(t2.clientX - n2.left - (e2.clientLeft || 0), t2.clientY - n2.top - (e2.clientTop || 0));
      }
      function _t(t2, e2, n2, o2) {
        return { type: f.FEATURE, properties: { meta: v.VERTEX, parent: t2, coord_path: n2, active: o2 ? m.ACTIVE : m.INACTIVE }, geometry: { type: f.POINT, coordinates: e2 } };
      }
      function bt(t2, e2, n2) {
        var o2 = e2.geometry.coordinates, r2 = n2.geometry.coordinates;
        if (o2[1] > 85 || o2[1] < b || r2[1] > 85 || r2[1] < b) return null;
        var i2 = { lng: (o2[0] + r2[0]) / 2, lat: (o2[1] + r2[1]) / 2 };
        return { type: f.FEATURE, properties: { meta: v.MIDPOINT, parent: t2, lng: i2.lng, lat: i2.lat, coord_path: n2.properties.coord_path }, geometry: { type: f.POINT, coordinates: [i2.lng, i2.lat] } };
      }
      function Et(t2, e2, n2) {
        void 0 === e2 && (e2 = {}), void 0 === n2 && (n2 = null);
        var o2, r2 = t2.geometry, i2 = r2.type, a2 = r2.coordinates, s2 = t2.properties && t2.properties.id, u2 = [];
        function c2(t3, n3) {
          var o3 = "", r3 = null;
          t3.forEach(function(t4, i3) {
            var a3 = null != n3 ? n3 + "." + i3 : String(i3), c3 = _t(s2, t4, a3, l2(a3));
            if (e2.midpoints && r3) {
              var d2 = bt(s2, r3, c3);
              d2 && u2.push(d2);
            }
            r3 = c3;
            var p2 = JSON.stringify(t4);
            o3 !== p2 && u2.push(c3), 0 === i3 && (o3 = p2);
          });
        }
        function l2(t3) {
          return !!e2.selectedPaths && -1 !== e2.selectedPaths.indexOf(t3);
        }
        return i2 === f.POINT ? u2.push(_t(s2, a2, n2, l2(n2))) : i2 === f.POLYGON ? a2.forEach(function(t3, e3) {
          c2(t3, null !== n2 ? n2 + "." + e3 : String(e3));
        }) : i2 === f.LINE_STRING ? c2(a2, n2) : 0 === i2.indexOf(f.MULTI_PREFIX) && (o2 = i2.replace(f.MULTI_PREFIX, ""), a2.forEach(function(n3, r3) {
          var i3 = { type: f.FEATURE, properties: t2.properties, geometry: { type: o2, coordinates: n3 } };
          u2 = u2.concat(Et(i3, e2, r3));
        })), u2;
      }
      var Tt = { enable: function(t2) {
        setTimeout(function() {
          t2.map && t2.map.doubleClickZoom && t2._ctx && t2._ctx.store && t2._ctx.store.getInitialConfigValue && t2._ctx.store.getInitialConfigValue("doubleClickZoom") && t2.map.doubleClickZoom.enable();
        }, 0);
      }, disable: function(t2) {
        setTimeout(function() {
          t2.map && t2.map.doubleClickZoom && t2.map.doubleClickZoom.disable();
        }, 0);
      } }, Ct = { exports: {} }, Ot = function(t2) {
        if (!t2 || !t2.type) return null;
        var e2 = St[t2.type];
        if (!e2) return null;
        if ("geometry" === e2) return { type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: t2 }] };
        if ("feature" === e2) return { type: "FeatureCollection", features: [t2] };
        if ("featurecollection" === e2) return t2;
      }, St = { Point: "geometry", MultiPoint: "geometry", LineString: "geometry", MultiLineString: "geometry", Polygon: "geometry", MultiPolygon: "geometry", GeometryCollection: "geometry", Feature: "feature", FeatureCollection: "featurecollection" };
      var It = e(Ot);
      var xt = Object.freeze({ __proto__: null, default: function t2(e2) {
        switch (e2 && e2.type || null) {
          case "FeatureCollection":
            return e2.features = e2.features.reduce(function(e3, n2) {
              return e3.concat(t2(n2));
            }, []), e2;
          case "Feature":
            return e2.geometry ? t2(e2.geometry).map(function(t3) {
              var n2 = { type: "Feature", properties: JSON.parse(JSON.stringify(e2.properties)), geometry: t3 };
              return void 0 !== e2.id && (n2.id = e2.id), n2;
            }) : [e2];
          case "MultiPoint":
            return e2.coordinates.map(function(t3) {
              return { type: "Point", coordinates: t3 };
            });
          case "MultiPolygon":
            return e2.coordinates.map(function(t3) {
              return { type: "Polygon", coordinates: t3 };
            });
          case "MultiLineString":
            return e2.coordinates.map(function(t3) {
              return { type: "LineString", coordinates: t3 };
            });
          case "GeometryCollection":
            return e2.geometries.map(t2).reduce(function(t3, e3) {
              return t3.concat(e3);
            }, []);
          case "Point":
          case "Polygon":
          case "LineString":
            return [e2];
        }
      } }), Mt = Ot, Lt = n(xt), Nt = function(t2) {
        return function t3(e2) {
          if (Array.isArray(e2) && e2.length && "number" == typeof e2[0]) return [e2];
          return e2.reduce(function(e3, n2) {
            return Array.isArray(n2) && Array.isArray(n2[0]) ? e3.concat(t3(n2)) : (e3.push(n2), e3);
          }, []);
        }(t2);
      };
      Lt instanceof Function || (Lt = Lt.default);
      var At = { exports: {} }, Pt = At.exports = function(t2) {
        return new Ft(t2);
      };
      function Ft(t2) {
        this.value = t2;
      }
      function wt(t2, e2, n2) {
        var o2 = [], r2 = [], i2 = true;
        return function t3(a2) {
          var s2 = n2 ? Rt(a2) : a2, u2 = {}, c2 = true, l2 = { node: s2, node_: a2, path: [].concat(o2), parent: r2[r2.length - 1], parents: r2, key: o2.slice(-1)[0], isRoot: 0 === o2.length, level: o2.length, circular: null, update: function(t4, e3) {
            l2.isRoot || (l2.parent.node[l2.key] = t4), l2.node = t4, e3 && (c2 = false);
          }, delete: function(t4) {
            delete l2.parent.node[l2.key], t4 && (c2 = false);
          }, remove: function(t4) {
            Ut(l2.parent.node) ? l2.parent.node.splice(l2.key, 1) : delete l2.parent.node[l2.key], t4 && (c2 = false);
          }, keys: null, before: function(t4) {
            u2.before = t4;
          }, after: function(t4) {
            u2.after = t4;
          }, pre: function(t4) {
            u2.pre = t4;
          }, post: function(t4) {
            u2.post = t4;
          }, stop: function() {
            i2 = false;
          }, block: function() {
            c2 = false;
          } };
          if (!i2) return l2;
          function d2() {
            if ("object" == typeof l2.node && null !== l2.node) {
              l2.keys && l2.node_ === l2.node || (l2.keys = kt(l2.node)), l2.isLeaf = 0 == l2.keys.length;
              for (var t4 = 0; t4 < r2.length; t4++) if (r2[t4].node_ === a2) {
                l2.circular = r2[t4];
                break;
              }
            } else l2.isLeaf = true, l2.keys = null;
            l2.notLeaf = !l2.isLeaf, l2.notRoot = !l2.isRoot;
          }
          d2();
          var p2 = e2.call(l2, l2.node);
          return void 0 !== p2 && l2.update && l2.update(p2), u2.before && u2.before.call(l2, l2.node), c2 ? ("object" != typeof l2.node || null === l2.node || l2.circular || (r2.push(l2), d2(), jt(l2.keys, function(e3, r3) {
            o2.push(e3), u2.pre && u2.pre.call(l2, l2.node[e3], e3);
            var i3 = t3(l2.node[e3]);
            n2 && Vt.call(l2.node, e3) && (l2.node[e3] = i3.node), i3.isLast = r3 == l2.keys.length - 1, i3.isFirst = 0 == r3, u2.post && u2.post.call(l2, i3), o2.pop();
          }), r2.pop()), u2.after && u2.after.call(l2, l2.node), l2) : l2;
        }(t2).node;
      }
      function Rt(t2) {
        if ("object" == typeof t2 && null !== t2) {
          var e2;
          if (Ut(t2)) e2 = [];
          else if ("[object Date]" === Dt(t2)) e2 = new Date(t2.getTime ? t2.getTime() : t2);
          else if (function(t3) {
            return "[object RegExp]" === Dt(t3);
          }(t2)) e2 = new RegExp(t2);
          else if (function(t3) {
            return "[object Error]" === Dt(t3);
          }(t2)) e2 = { message: t2.message };
          else if (function(t3) {
            return "[object Boolean]" === Dt(t3);
          }(t2)) e2 = new Boolean(t2);
          else if (function(t3) {
            return "[object Number]" === Dt(t3);
          }(t2)) e2 = new Number(t2);
          else if (function(t3) {
            return "[object String]" === Dt(t3);
          }(t2)) e2 = new String(t2);
          else if (Object.create && Object.getPrototypeOf) e2 = Object.create(Object.getPrototypeOf(t2));
          else if (t2.constructor === Object) e2 = {};
          else {
            var n2 = t2.constructor && t2.constructor.prototype || t2.__proto__ || {}, o2 = function() {
            };
            o2.prototype = n2, e2 = new o2();
          }
          return jt(kt(t2), function(n3) {
            e2[n3] = t2[n3];
          }), e2;
        }
        return t2;
      }
      Ft.prototype.get = function(t2) {
        for (var e2 = this.value, n2 = 0; n2 < t2.length; n2++) {
          var o2 = t2[n2];
          if (!e2 || !Vt.call(e2, o2)) {
            e2 = void 0;
            break;
          }
          e2 = e2[o2];
        }
        return e2;
      }, Ft.prototype.has = function(t2) {
        for (var e2 = this.value, n2 = 0; n2 < t2.length; n2++) {
          var o2 = t2[n2];
          if (!e2 || !Vt.call(e2, o2)) return false;
          e2 = e2[o2];
        }
        return true;
      }, Ft.prototype.set = function(t2, e2) {
        for (var n2 = this.value, o2 = 0; o2 < t2.length - 1; o2++) {
          var r2 = t2[o2];
          Vt.call(n2, r2) || (n2[r2] = {}), n2 = n2[r2];
        }
        return n2[t2[o2]] = e2, e2;
      }, Ft.prototype.map = function(t2) {
        return wt(this.value, t2, true);
      }, Ft.prototype.forEach = function(t2) {
        return this.value = wt(this.value, t2, false), this.value;
      }, Ft.prototype.reduce = function(t2, e2) {
        var n2 = 1 === arguments.length, o2 = n2 ? this.value : e2;
        return this.forEach(function(e3) {
          this.isRoot && n2 || (o2 = t2.call(this, o2, e3));
        }), o2;
      }, Ft.prototype.paths = function() {
        var t2 = [];
        return this.forEach(function(e2) {
          t2.push(this.path);
        }), t2;
      }, Ft.prototype.nodes = function() {
        var t2 = [];
        return this.forEach(function(e2) {
          t2.push(this.node);
        }), t2;
      }, Ft.prototype.clone = function() {
        var t2 = [], e2 = [];
        return function n2(o2) {
          for (var r2 = 0; r2 < t2.length; r2++) if (t2[r2] === o2) return e2[r2];
          if ("object" == typeof o2 && null !== o2) {
            var i2 = Rt(o2);
            return t2.push(o2), e2.push(i2), jt(kt(o2), function(t3) {
              i2[t3] = n2(o2[t3]);
            }), t2.pop(), e2.pop(), i2;
          }
          return o2;
        }(this.value);
      };
      var kt = Object.keys || function(t2) {
        var e2 = [];
        for (var n2 in t2) e2.push(n2);
        return e2;
      };
      function Dt(t2) {
        return Object.prototype.toString.call(t2);
      }
      var Ut = Array.isArray || function(t2) {
        return "[object Array]" === Object.prototype.toString.call(t2);
      }, jt = function(t2, e2) {
        if (t2.forEach) return t2.forEach(e2);
        for (var n2 = 0; n2 < t2.length; n2++) e2(t2[n2], n2, t2);
      };
      jt(kt(Ft.prototype), function(t2) {
        Pt[t2] = function(e2) {
          var n2 = [].slice.call(arguments, 1), o2 = new Ft(e2);
          return o2[t2].apply(o2, n2);
        };
      });
      var Vt = Object.hasOwnProperty || function(t2, e2) {
        return e2 in t2;
      }, Bt = At.exports, Gt = Jt;
      function Jt(t2) {
        if (!(this instanceof Jt)) return new Jt(t2);
        this._bbox = t2 || [1 / 0, 1 / 0, -1 / 0, -1 / 0], this._valid = !!t2;
      }
      Jt.prototype.include = function(t2) {
        return this._valid = true, this._bbox[0] = Math.min(this._bbox[0], t2[0]), this._bbox[1] = Math.min(this._bbox[1], t2[1]), this._bbox[2] = Math.max(this._bbox[2], t2[0]), this._bbox[3] = Math.max(this._bbox[3], t2[1]), this;
      }, Jt.prototype.equals = function(t2) {
        var e2;
        return e2 = t2 instanceof Jt ? t2.bbox() : t2, this._bbox[0] == e2[0] && this._bbox[1] == e2[1] && this._bbox[2] == e2[2] && this._bbox[3] == e2[3];
      }, Jt.prototype.center = function(t2) {
        return this._valid ? [(this._bbox[0] + this._bbox[2]) / 2, (this._bbox[1] + this._bbox[3]) / 2] : null;
      }, Jt.prototype.union = function(t2) {
        var e2;
        return this._valid = true, e2 = t2 instanceof Jt ? t2.bbox() : t2, this._bbox[0] = Math.min(this._bbox[0], e2[0]), this._bbox[1] = Math.min(this._bbox[1], e2[1]), this._bbox[2] = Math.max(this._bbox[2], e2[2]), this._bbox[3] = Math.max(this._bbox[3], e2[3]), this;
      }, Jt.prototype.bbox = function() {
        return this._valid ? this._bbox : null;
      }, Jt.prototype.contains = function(t2) {
        if (!t2) return this._fastContains();
        if (!this._valid) return null;
        var e2 = t2[0], n2 = t2[1];
        return this._bbox[0] <= e2 && this._bbox[1] <= n2 && this._bbox[2] >= e2 && this._bbox[3] >= n2;
      }, Jt.prototype.intersect = function(t2) {
        return this._valid ? (e2 = t2 instanceof Jt ? t2.bbox() : t2, !(this._bbox[0] > e2[2] || this._bbox[2] < e2[0] || this._bbox[3] < e2[1] || this._bbox[1] > e2[3])) : null;
        var e2;
      }, Jt.prototype._fastContains = function() {
        if (!this._valid) return new Function("return null;");
        var t2 = "return " + this._bbox[0] + "<= ll[0] &&" + this._bbox[1] + "<= ll[1] &&" + this._bbox[2] + ">= ll[0] &&" + this._bbox[3] + ">= ll[1]";
        return new Function("ll", t2);
      }, Jt.prototype.polygon = function() {
        return this._valid ? { type: "Polygon", coordinates: [[[this._bbox[0], this._bbox[1]], [this._bbox[2], this._bbox[1]], [this._bbox[2], this._bbox[3]], [this._bbox[0], this._bbox[3]], [this._bbox[0], this._bbox[1]]]] } : null;
      };
      var zt = function(t2) {
        if (!t2) return [];
        var e2 = Lt(Mt(t2)), n2 = [];
        return e2.features.forEach(function(t3) {
          t3.geometry && (n2 = n2.concat(Nt(t3.geometry.coordinates)));
        }), n2;
      }, Yt = Bt, $t = Gt, qt = { features: ["FeatureCollection"], coordinates: ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"], geometry: ["Feature"], geometries: ["GeometryCollection"] }, Ht = Object.keys(qt);
      function Xt(t2) {
        for (var e2 = $t(), n2 = zt(t2), o2 = 0; o2 < n2.length; o2++) e2.include(n2[o2]);
        return e2;
      }
      Ct.exports = function(t2) {
        return Xt(t2).bbox();
      }, Ct.exports.polygon = function(t2) {
        return Xt(t2).polygon();
      }, Ct.exports.bboxify = function(t2) {
        return Yt(t2).map(function(t3) {
          t3 && (Ht.some(function(e2) {
            return !!t3[e2] && -1 !== qt[e2].indexOf(t3.type);
          }) && (t3.bbox = Xt(t3).bbox(), this.update(t3)));
        });
      };
      var Zt = e(Ct.exports), Wt = -90;
      function Kt(t2, e2) {
        var n2 = Wt, o2 = 90, r2 = Wt, i2 = 90, a2 = 270, s2 = -270;
        t2.forEach(function(t3) {
          var e3 = Zt(t3), u3 = e3[1], c2 = e3[3], l2 = e3[0], d2 = e3[2];
          u3 > n2 && (n2 = u3), c2 < o2 && (o2 = c2), c2 > r2 && (r2 = c2), u3 < i2 && (i2 = u3), l2 < a2 && (a2 = l2), d2 > s2 && (s2 = d2);
        });
        var u2 = e2;
        return n2 + u2.lat > 85 && (u2.lat = 85 - n2), r2 + u2.lat > 90 && (u2.lat = 90 - r2), o2 + u2.lat < -85 && (u2.lat = -85 - o2), i2 + u2.lat < Wt && (u2.lat = Wt - i2), a2 + u2.lng <= -270 && (u2.lng += 360 * Math.ceil(Math.abs(u2.lng) / 360)), s2 + u2.lng >= 270 && (u2.lng -= 360 * Math.ceil(Math.abs(u2.lng) / 360)), u2;
      }
      function Qt(t2, e2) {
        var n2 = Kt(t2.map(function(t3) {
          return t3.toGeoJSON();
        }), e2);
        t2.forEach(function(t3) {
          var e3, o2 = t3.getCoordinates(), r2 = function(t4) {
            var e4 = { lng: t4[0] + n2.lng, lat: t4[1] + n2.lat };
            return [e4.lng, e4.lat];
          }, i2 = function(t4) {
            return t4.map(function(t5) {
              return r2(t5);
            });
          };
          t3.type === f.POINT ? e3 = r2(o2) : t3.type === f.LINE_STRING || t3.type === f.MULTI_POINT ? e3 = o2.map(r2) : t3.type === f.POLYGON || t3.type === f.MULTI_LINE_STRING ? e3 = o2.map(i2) : t3.type === f.MULTI_POLYGON && (e3 = o2.map(function(t4) {
            return t4.map(function(t5) {
              return i2(t5);
            });
          })), t3.incomingCoords(e3);
        });
      }
      var te = { onSetup: function(t2) {
        var e2 = this, n2 = { dragMoveLocation: null, boxSelectStartLocation: null, boxSelectElement: void 0, boxSelecting: false, canBoxSelect: false, dragMoving: false, canDragMove: false, initiallySelectedFeatureIds: t2.featureIds || [] };
        return this.setSelected(n2.initiallySelectedFeatureIds.filter(function(t3) {
          return void 0 !== e2.getFeature(t3);
        })), this.fireActionable(), this.setActionableState({ combineFeatures: true, uncombineFeatures: true, trash: true }), n2;
      }, fireUpdate: function() {
        this.map.fire(g.UPDATE, { action: y.MOVE, features: this.getSelected().map(function(t2) {
          return t2.toGeoJSON();
        }) });
      }, fireActionable: function() {
        var t2 = this, e2 = this.getSelected(), n2 = e2.filter(function(e3) {
          return t2.isInstanceOf("MultiFeature", e3);
        }), o2 = false;
        if (e2.length > 1) {
          o2 = true;
          var r2 = e2[0].type.replace("Multi", "");
          e2.forEach(function(t3) {
            t3.type.replace("Multi", "") !== r2 && (o2 = false);
          });
        }
        var i2 = n2.length > 0, a2 = e2.length > 0;
        this.setActionableState({ combineFeatures: o2, uncombineFeatures: i2, trash: a2 });
      }, getUniqueIds: function(t2) {
        return t2.length ? t2.map(function(t3) {
          return t3.properties.id;
        }).filter(function(t3) {
          return void 0 !== t3;
        }).reduce(function(t3, e2) {
          return t3.add(e2), t3;
        }, new I()).values() : [];
      }, stopExtendedInteractions: function(t2) {
        t2.boxSelectElement && (t2.boxSelectElement.parentNode && t2.boxSelectElement.parentNode.removeChild(t2.boxSelectElement), t2.boxSelectElement = null), this.map.dragPan.enable(), t2.boxSelecting = false, t2.canBoxSelect = false, t2.dragMoving = false, t2.canDragMove = false;
      }, onStop: function() {
        Tt.enable(this);
      }, onMouseMove: function(t2, e2) {
        return ct(e2) && t2.dragMoving && this.fireUpdate(), this.stopExtendedInteractions(t2), true;
      }, onMouseOut: function(t2) {
        return !t2.dragMoving || this.fireUpdate();
      } };
      te.onTap = te.onClick = function(t2, e2) {
        return ut(e2) ? this.clickAnywhere(t2, e2) : rt(v.VERTEX)(e2) ? this.clickOnVertex(t2, e2) : ct(e2) ? this.clickOnFeature(t2, e2) : void 0;
      }, te.clickAnywhere = function(t2) {
        var e2 = this, n2 = this.getSelectedIds();
        n2.length && (this.clearSelectedFeatures(), n2.forEach(function(t3) {
          return e2.doRender(t3);
        })), Tt.enable(this), this.stopExtendedInteractions(t2);
      }, te.clickOnVertex = function(t2, e2) {
        this.changeMode(h.DIRECT_SELECT, { featureId: e2.featureTarget.properties.parent, coordPath: e2.featureTarget.properties.coord_path, startPos: e2.lngLat }), this.updateUIClasses({ mouse: d.MOVE });
      }, te.startOnActiveFeature = function(t2, e2) {
        this.stopExtendedInteractions(t2), this.map.dragPan.disable(), this.doRender(e2.featureTarget.properties.id), t2.canDragMove = true, t2.dragMoveLocation = e2.lngLat;
      }, te.clickOnFeature = function(t2, e2) {
        var n2 = this;
        Tt.disable(this), this.stopExtendedInteractions(t2);
        var o2 = dt(e2), r2 = this.getSelectedIds(), i2 = e2.featureTarget.properties.id, a2 = this.isSelected(i2);
        if (!o2 && a2 && this.getFeature(i2).type !== f.POINT) return this.changeMode(h.DIRECT_SELECT, { featureId: i2 });
        a2 && o2 ? (this.deselect(i2), this.updateUIClasses({ mouse: d.POINTER }), 1 === r2.length && Tt.enable(this)) : !a2 && o2 ? (this.select(i2), this.updateUIClasses({ mouse: d.MOVE })) : a2 || o2 || (r2.forEach(function(t3) {
          return n2.doRender(t3);
        }), this.setSelected(i2), this.updateUIClasses({ mouse: d.MOVE })), this.doRender(i2);
      }, te.onMouseDown = function(t2, e2) {
        return at(e2) ? this.startOnActiveFeature(t2, e2) : this.drawConfig.boxSelect && it(e2) ? this.startBoxSelect(t2, e2) : void 0;
      }, te.startBoxSelect = function(t2, e2) {
        this.stopExtendedInteractions(t2), this.map.dragPan.disable(), t2.boxSelectStartLocation = mt(e2.originalEvent, this.map.getContainer()), t2.canBoxSelect = true;
      }, te.onTouchStart = function(t2, e2) {
        if (at(e2)) return this.startOnActiveFeature(t2, e2);
      }, te.onDrag = function(t2, e2) {
        return t2.canDragMove ? this.dragMove(t2, e2) : this.drawConfig.boxSelect && t2.canBoxSelect ? this.whileBoxSelect(t2, e2) : void 0;
      }, te.whileBoxSelect = function(t2, e2) {
        t2.boxSelecting = true, this.updateUIClasses({ mouse: d.ADD }), t2.boxSelectElement || (t2.boxSelectElement = document.createElement("div"), t2.boxSelectElement.classList.add(c.BOX_SELECT), this.map.getContainer().appendChild(t2.boxSelectElement));
        var n2 = mt(e2.originalEvent, this.map.getContainer()), o2 = Math.min(t2.boxSelectStartLocation.x, n2.x), r2 = Math.max(t2.boxSelectStartLocation.x, n2.x), i2 = Math.min(t2.boxSelectStartLocation.y, n2.y), a2 = Math.max(t2.boxSelectStartLocation.y, n2.y), s2 = "translate(" + o2 + "px, " + i2 + "px)";
        t2.boxSelectElement.style.transform = s2, t2.boxSelectElement.style.WebkitTransform = s2, t2.boxSelectElement.style.width = r2 - o2 + "px", t2.boxSelectElement.style.height = a2 - i2 + "px";
      }, te.dragMove = function(t2, e2) {
        t2.dragMoving = true, e2.originalEvent.stopPropagation();
        var n2 = { lng: e2.lngLat.lng - t2.dragMoveLocation.lng, lat: e2.lngLat.lat - t2.dragMoveLocation.lat };
        Qt(this.getSelected(), n2), t2.dragMoveLocation = e2.lngLat;
      }, te.onTouchEnd = te.onMouseUp = function(t2, e2) {
        var n2 = this;
        if (t2.dragMoving) this.fireUpdate();
        else if (t2.boxSelecting) {
          var o2 = [t2.boxSelectStartLocation, mt(e2.originalEvent, this.map.getContainer())], r2 = this.featuresAt(null, o2, "click"), i2 = this.getUniqueIds(r2).filter(function(t3) {
            return !n2.isSelected(t3);
          });
          i2.length && (this.select(i2), i2.forEach(function(t3) {
            return n2.doRender(t3);
          }), this.updateUIClasses({ mouse: d.MOVE }));
        }
        this.stopExtendedInteractions(t2);
      }, te.toDisplayFeatures = function(t2, e2, n2) {
        e2.properties.active = this.isSelected(e2.properties.id) ? m.ACTIVE : m.INACTIVE, n2(e2), this.fireActionable(), e2.properties.active === m.ACTIVE && e2.geometry.type !== f.POINT && Et(e2).forEach(n2);
      }, te.onTrash = function() {
        this.deleteFeature(this.getSelectedIds()), this.fireActionable();
      }, te.onCombineFeatures = function() {
        var t2 = this.getSelected();
        if (!(0 === t2.length || t2.length < 2)) {
          for (var e2 = [], n2 = [], o2 = t2[0].type.replace("Multi", ""), r2 = 0; r2 < t2.length; r2++) {
            var i2 = t2[r2];
            if (i2.type.replace("Multi", "") !== o2) return;
            i2.type.includes("Multi") ? i2.getCoordinates().forEach(function(t3) {
              e2.push(t3);
            }) : e2.push(i2.getCoordinates()), n2.push(i2.toGeoJSON());
          }
          if (n2.length > 1) {
            var a2 = this.newFeature({ type: f.FEATURE, properties: n2[0].properties, geometry: { type: "Multi" + o2, coordinates: e2 } });
            this.addFeature(a2), this.deleteFeature(this.getSelectedIds(), { silent: true }), this.setSelected([a2.id]), this.map.fire(g.COMBINE_FEATURES, { createdFeatures: [a2.toGeoJSON()], deletedFeatures: n2 });
          }
          this.fireActionable();
        }
      }, te.onUncombineFeatures = function() {
        var t2 = this, e2 = this.getSelected();
        if (0 !== e2.length) {
          for (var n2 = [], o2 = [], r2 = function(r3) {
            var i3 = e2[r3];
            t2.isInstanceOf("MultiFeature", i3) && (i3.getFeatures().forEach(function(e3) {
              t2.addFeature(e3), e3.properties = i3.properties, n2.push(e3.toGeoJSON()), t2.select([e3.id]);
            }), t2.deleteFeature(i3.id, { silent: true }), o2.push(i3.toGeoJSON()));
          }, i2 = 0; i2 < e2.length; i2++) r2(i2);
          n2.length > 1 && this.map.fire(g.UNCOMBINE_FEATURES, { createdFeatures: n2, deletedFeatures: o2 }), this.fireActionable();
        }
      };
      var ee = rt(v.VERTEX), ne = rt(v.MIDPOINT), oe = { fireUpdate: function() {
        this.map.fire(g.UPDATE, { action: y.CHANGE_COORDINATES, features: this.getSelected().map(function(t2) {
          return t2.toGeoJSON();
        }) });
      }, fireActionable: function(t2) {
        this.setActionableState({ combineFeatures: false, uncombineFeatures: false, trash: t2.selectedCoordPaths.length > 0 });
      }, startDragging: function(t2, e2) {
        this.map.dragPan.disable(), t2.canDragMove = true, t2.dragMoveLocation = e2.lngLat;
      }, stopDragging: function(t2) {
        this.map.dragPan.enable(), t2.dragMoving = false, t2.canDragMove = false, t2.dragMoveLocation = null;
      }, onVertex: function(t2, e2) {
        this.startDragging(t2, e2);
        var n2 = e2.featureTarget.properties, o2 = t2.selectedCoordPaths.indexOf(n2.coord_path);
        dt(e2) || -1 !== o2 ? dt(e2) && -1 === o2 && t2.selectedCoordPaths.push(n2.coord_path) : t2.selectedCoordPaths = [n2.coord_path];
        var r2 = this.pathsToCoordinates(t2.featureId, t2.selectedCoordPaths);
        this.setSelectedCoordinates(r2);
      }, onMidpoint: function(t2, e2) {
        this.startDragging(t2, e2);
        var n2 = e2.featureTarget.properties;
        t2.feature.addCoordinate(n2.coord_path, n2.lng, n2.lat), this.fireUpdate(), t2.selectedCoordPaths = [n2.coord_path];
      }, pathsToCoordinates: function(t2, e2) {
        return e2.map(function(e3) {
          return { feature_id: t2, coord_path: e3 };
        });
      }, onFeature: function(t2, e2) {
        0 === t2.selectedCoordPaths.length ? this.startDragging(t2, e2) : this.stopDragging(t2);
      }, dragFeature: function(t2, e2, n2) {
        Qt(this.getSelected(), n2), t2.dragMoveLocation = e2.lngLat;
      }, dragVertex: function(t2, e2, n2) {
        for (var o2 = t2.selectedCoordPaths.map(function(e3) {
          return t2.feature.getCoordinate(e3);
        }), r2 = Kt(o2.map(function(t3) {
          return { type: f.FEATURE, properties: {}, geometry: { type: f.POINT, coordinates: t3 } };
        }), n2), i2 = 0; i2 < o2.length; i2++) {
          var a2 = o2[i2];
          t2.feature.updateCoordinate(t2.selectedCoordPaths[i2], a2[0] + r2.lng, a2[1] + r2.lat);
        }
      }, clickNoTarget: function() {
        this.changeMode(h.SIMPLE_SELECT);
      }, clickInactive: function() {
        this.changeMode(h.SIMPLE_SELECT);
      }, clickActiveFeature: function(t2) {
        t2.selectedCoordPaths = [], this.clearSelectedCoordinates(), t2.feature.changed();
      }, onSetup: function(t2) {
        var e2 = t2.featureId, n2 = this.getFeature(e2);
        if (!n2) throw new Error("You must provide a featureId to enter direct_select mode");
        if (n2.type === f.POINT) throw new TypeError("direct_select mode doesn't handle point features");
        var o2 = { featureId: e2, feature: n2, dragMoveLocation: t2.startPos || null, dragMoving: false, canDragMove: false, selectedCoordPaths: t2.coordPath ? [t2.coordPath] : [] };
        return this.setSelectedCoordinates(this.pathsToCoordinates(e2, o2.selectedCoordPaths)), this.setSelected(e2), Tt.disable(this), this.setActionableState({ trash: true }), o2;
      }, onStop: function() {
        Tt.enable(this), this.clearSelectedCoordinates();
      }, toDisplayFeatures: function(t2, e2, n2) {
        t2.featureId === e2.properties.id ? (e2.properties.active = m.ACTIVE, n2(e2), Et(e2, { map: this.map, midpoints: true, selectedPaths: t2.selectedCoordPaths }).forEach(n2)) : (e2.properties.active = m.INACTIVE, n2(e2)), this.fireActionable(t2);
      }, onTrash: function(t2) {
        t2.selectedCoordPaths.sort(function(t3, e2) {
          return e2.localeCompare(t3, "en", { numeric: true });
        }).forEach(function(e2) {
          return t2.feature.removeCoordinate(e2);
        }), this.fireUpdate(), t2.selectedCoordPaths = [], this.clearSelectedCoordinates(), this.fireActionable(t2), false === t2.feature.isValid() && (this.deleteFeature([t2.featureId]), this.changeMode(h.SIMPLE_SELECT, {}));
      }, onMouseMove: function(t2, e2) {
        var n2 = at(e2), o2 = ee(e2), r2 = ne(e2), i2 = 0 === t2.selectedCoordPaths.length;
        return n2 && i2 || o2 && !i2 ? this.updateUIClasses({ mouse: d.MOVE }) : this.updateUIClasses({ mouse: d.NONE }), (o2 || n2 || r2) && t2.dragMoving && this.fireUpdate(), this.stopDragging(t2), true;
      }, onMouseOut: function(t2) {
        return t2.dragMoving && this.fireUpdate(), true;
      } };
      oe.onTouchStart = oe.onMouseDown = function(t2, e2) {
        return ee(e2) ? this.onVertex(t2, e2) : at(e2) ? this.onFeature(t2, e2) : ne(e2) ? this.onMidpoint(t2, e2) : void 0;
      }, oe.onDrag = function(t2, e2) {
        if (true === t2.canDragMove) {
          t2.dragMoving = true, e2.originalEvent.stopPropagation();
          var n2 = { lng: e2.lngLat.lng - t2.dragMoveLocation.lng, lat: e2.lngLat.lat - t2.dragMoveLocation.lat };
          t2.selectedCoordPaths.length > 0 ? this.dragVertex(t2, e2, n2) : this.dragFeature(t2, e2, n2), t2.dragMoveLocation = e2.lngLat;
        }
      }, oe.onClick = function(t2, e2) {
        return ut(e2) ? this.clickNoTarget(t2, e2) : at(e2) ? this.clickActiveFeature(t2, e2) : st(e2) ? this.clickInactive(t2, e2) : void this.stopDragging(t2);
      }, oe.onTap = function(t2, e2) {
        return ut(e2) ? this.clickNoTarget(t2, e2) : at(e2) ? this.clickActiveFeature(t2, e2) : st(e2) ? this.clickInactive(t2, e2) : void 0;
      }, oe.onTouchEnd = oe.onMouseUp = function(t2) {
        t2.dragMoving && this.fireUpdate(), this.stopDragging(t2);
      };
      var re = {};
      function ie(t2, e2) {
        return !!t2.lngLat && (t2.lngLat.lng === e2[0] && t2.lngLat.lat === e2[1]);
      }
      re.onSetup = function() {
        var t2 = this.newFeature({ type: f.FEATURE, properties: {}, geometry: { type: f.POINT, coordinates: [] } });
        return this.addFeature(t2), this.clearSelectedFeatures(), this.updateUIClasses({ mouse: d.ADD }), this.activateUIButton(p.POINT), this.setActionableState({ trash: true }), { point: t2 };
      }, re.stopDrawingAndRemove = function(t2) {
        this.deleteFeature([t2.point.id], { silent: true }), this.changeMode(h.SIMPLE_SELECT);
      }, re.onTap = re.onClick = function(t2, e2) {
        this.updateUIClasses({ mouse: d.MOVE }), t2.point.updateCoordinate("", e2.lngLat.lng, e2.lngLat.lat), this.map.fire(g.CREATE, { features: [t2.point.toGeoJSON()] }), this.changeMode(h.SIMPLE_SELECT, { featureIds: [t2.point.id] });
      }, re.onStop = function(t2) {
        this.activateUIButton(), t2.point.getCoordinate().length || this.deleteFeature([t2.point.id], { silent: true });
      }, re.toDisplayFeatures = function(t2, e2, n2) {
        var o2 = e2.properties.id === t2.point.id;
        if (e2.properties.active = o2 ? m.ACTIVE : m.INACTIVE, !o2) return n2(e2);
      }, re.onTrash = re.stopDrawingAndRemove, re.onKeyUp = function(t2, e2) {
        if (pt(e2) || ft(e2)) return this.stopDrawingAndRemove(t2, e2);
      };
      var ae = { onSetup: function() {
        var t2 = this.newFeature({ type: f.FEATURE, properties: {}, geometry: { type: f.POLYGON, coordinates: [[]] } });
        return this.addFeature(t2), this.clearSelectedFeatures(), Tt.disable(this), this.updateUIClasses({ mouse: d.ADD }), this.activateUIButton(p.POLYGON), this.setActionableState({ trash: true }), { polygon: t2, currentVertexPosition: 0 };
      }, clickAnywhere: function(t2, e2) {
        if (t2.currentVertexPosition > 0 && ie(e2, t2.polygon.coordinates[0][t2.currentVertexPosition - 1])) return this.changeMode(h.SIMPLE_SELECT, { featureIds: [t2.polygon.id] });
        this.updateUIClasses({ mouse: d.ADD }), t2.polygon.updateCoordinate("0." + t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat), t2.currentVertexPosition++, t2.polygon.updateCoordinate("0." + t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat);
      }, clickOnVertex: function(t2) {
        return this.changeMode(h.SIMPLE_SELECT, { featureIds: [t2.polygon.id] });
      }, onMouseMove: function(t2, e2) {
        t2.polygon.updateCoordinate("0." + t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat), lt(e2) && this.updateUIClasses({ mouse: d.POINTER });
      } };
      ae.onTap = ae.onClick = function(t2, e2) {
        return lt(e2) ? this.clickOnVertex(t2, e2) : this.clickAnywhere(t2, e2);
      }, ae.onKeyUp = function(t2, e2) {
        pt(e2) ? (this.deleteFeature([t2.polygon.id], { silent: true }), this.changeMode(h.SIMPLE_SELECT)) : ft(e2) && this.changeMode(h.SIMPLE_SELECT, { featureIds: [t2.polygon.id] });
      }, ae.onStop = function(t2) {
        this.updateUIClasses({ mouse: d.NONE }), Tt.enable(this), this.activateUIButton(), void 0 !== this.getFeature(t2.polygon.id) && (t2.polygon.removeCoordinate("0." + t2.currentVertexPosition), t2.polygon.isValid() ? this.map.fire(g.CREATE, { features: [t2.polygon.toGeoJSON()] }) : (this.deleteFeature([t2.polygon.id], { silent: true }), this.changeMode(h.SIMPLE_SELECT, {}, { silent: true })));
      }, ae.toDisplayFeatures = function(t2, e2, n2) {
        var o2 = e2.properties.id === t2.polygon.id;
        if (e2.properties.active = o2 ? m.ACTIVE : m.INACTIVE, !o2) return n2(e2);
        if (0 !== e2.geometry.coordinates.length) {
          var r2 = e2.geometry.coordinates[0].length;
          if (!(r2 < 3)) {
            if (e2.properties.meta = v.FEATURE, n2(_t(t2.polygon.id, e2.geometry.coordinates[0][0], "0.0", false)), r2 > 3) {
              var i2 = e2.geometry.coordinates[0].length - 3;
              n2(_t(t2.polygon.id, e2.geometry.coordinates[0][i2], "0." + i2, false));
            }
            if (r2 <= 4) {
              var a2 = [[e2.geometry.coordinates[0][0][0], e2.geometry.coordinates[0][0][1]], [e2.geometry.coordinates[0][1][0], e2.geometry.coordinates[0][1][1]]];
              if (n2({ type: f.FEATURE, properties: e2.properties, geometry: { coordinates: a2, type: f.LINE_STRING } }), 3 === r2) return;
            }
            return n2(e2);
          }
        }
      }, ae.onTrash = function(t2) {
        this.deleteFeature([t2.polygon.id], { silent: true }), this.changeMode(h.SIMPLE_SELECT);
      };
      var se = { onSetup: function(t2) {
        var e2, n2, o2 = (t2 = t2 || {}).featureId, r2 = "forward";
        if (o2) {
          if (!(e2 = this.getFeature(o2))) throw new Error("Could not find a feature with the provided featureId");
          var i2 = t2.from;
          if (i2 && "Feature" === i2.type && i2.geometry && "Point" === i2.geometry.type && (i2 = i2.geometry), i2 && "Point" === i2.type && i2.coordinates && 2 === i2.coordinates.length && (i2 = i2.coordinates), !i2 || !Array.isArray(i2)) throw new Error("Please use the `from` property to indicate which point to continue the line from");
          var a2 = e2.coordinates.length - 1;
          if (e2.coordinates[a2][0] === i2[0] && e2.coordinates[a2][1] === i2[1]) n2 = a2 + 1, e2.addCoordinate.apply(e2, [n2].concat(e2.coordinates[a2]));
          else {
            if (e2.coordinates[0][0] !== i2[0] || e2.coordinates[0][1] !== i2[1]) throw new Error("`from` should match the point at either the start or the end of the provided LineString");
            r2 = "backwards", n2 = 0, e2.addCoordinate.apply(e2, [n2].concat(e2.coordinates[0]));
          }
        } else e2 = this.newFeature({ type: f.FEATURE, properties: {}, geometry: { type: f.LINE_STRING, coordinates: [] } }), n2 = 0, this.addFeature(e2);
        return this.clearSelectedFeatures(), Tt.disable(this), this.updateUIClasses({ mouse: d.ADD }), this.activateUIButton(p.LINE), this.setActionableState({ trash: true }), { line: e2, currentVertexPosition: n2, direction: r2 };
      }, clickAnywhere: function(t2, e2) {
        if (t2.currentVertexPosition > 0 && ie(e2, t2.line.coordinates[t2.currentVertexPosition - 1]) || "backwards" === t2.direction && ie(e2, t2.line.coordinates[t2.currentVertexPosition + 1])) return this.changeMode(h.SIMPLE_SELECT, { featureIds: [t2.line.id] });
        this.updateUIClasses({ mouse: d.ADD }), t2.line.updateCoordinate(t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat), "forward" === t2.direction ? (t2.currentVertexPosition++, t2.line.updateCoordinate(t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat)) : t2.line.addCoordinate(0, e2.lngLat.lng, e2.lngLat.lat);
      }, clickOnVertex: function(t2) {
        return this.changeMode(h.SIMPLE_SELECT, { featureIds: [t2.line.id] });
      }, onMouseMove: function(t2, e2) {
        t2.line.updateCoordinate(t2.currentVertexPosition, e2.lngLat.lng, e2.lngLat.lat), lt(e2) && this.updateUIClasses({ mouse: d.POINTER });
      } };
      se.onTap = se.onClick = function(t2, e2) {
        if (lt(e2)) return this.clickOnVertex(t2, e2);
        this.clickAnywhere(t2, e2);
      }, se.onKeyUp = function(t2, e2) {
        ft(e2) ? this.changeMode(h.SIMPLE_SELECT, { featureIds: [t2.line.id] }) : pt(e2) && (this.deleteFeature([t2.line.id], { silent: true }), this.changeMode(h.SIMPLE_SELECT));
      }, se.onStop = function(t2) {
        Tt.enable(this), this.activateUIButton(), void 0 !== this.getFeature(t2.line.id) && (t2.line.removeCoordinate("" + t2.currentVertexPosition), t2.line.isValid() ? this.map.fire(g.CREATE, { features: [t2.line.toGeoJSON()] }) : (this.deleteFeature([t2.line.id], { silent: true }), this.changeMode(h.SIMPLE_SELECT, {}, { silent: true })));
      }, se.onTrash = function(t2) {
        this.deleteFeature([t2.line.id], { silent: true }), this.changeMode(h.SIMPLE_SELECT);
      }, se.toDisplayFeatures = function(t2, e2, n2) {
        var o2 = e2.properties.id === t2.line.id;
        if (e2.properties.active = o2 ? m.ACTIVE : m.INACTIVE, !o2) return n2(e2);
        e2.geometry.coordinates.length < 2 || (e2.properties.meta = v.FEATURE, n2(_t(t2.line.id, e2.geometry.coordinates["forward" === t2.direction ? e2.geometry.coordinates.length - 2 : 1], "" + ("forward" === t2.direction ? e2.geometry.coordinates.length - 2 : 1), false)), n2(e2));
      };
      var ue = { simple_select: te, direct_select: oe, draw_point: re, draw_polygon: ae, draw_line_string: se }, ce = { defaultMode: h.SIMPLE_SELECT, keybindings: true, touchEnabled: true, clickBuffer: 2, touchBuffer: 25, boxSelect: true, displayControlsDefault: true, styles: ot, modes: ue, controls: {}, userProperties: false }, le = { point: true, line_string: true, polygon: true, trash: true, combine_features: true, uncombine_features: true }, de = { point: false, line_string: false, polygon: false, trash: false, combine_features: false, uncombine_features: false };
      function pe(t2, e2) {
        return t2.map(function(t3) {
          return t3.source ? t3 : tt(t3, { id: t3.id + "." + e2, source: "hot" === e2 ? l.HOT : l.COLD });
        });
      }
      var fe = { exports: {} };
      !function(t2, e2) {
        var n2 = "__lodash_hash_undefined__", o2 = 9007199254740991, r2 = "[object Arguments]", i2 = "[object Array]", a2 = "[object Boolean]", s2 = "[object Date]", u2 = "[object Error]", c2 = "[object Function]", l2 = "[object Map]", d2 = "[object Number]", p2 = "[object Object]", f2 = "[object Promise]", h2 = "[object RegExp]", g2 = "[object Set]", y2 = "[object String]", v2 = "[object Symbol]", m2 = "[object WeakMap]", _2 = "[object ArrayBuffer]", b2 = "[object DataView]", E2 = /^\[object .+?Constructor\]$/, T2 = /^(?:0|[1-9]\d*)$/, C2 = {};
        C2["[object Float32Array]"] = C2["[object Float64Array]"] = C2["[object Int8Array]"] = C2["[object Int16Array]"] = C2["[object Int32Array]"] = C2["[object Uint8Array]"] = C2["[object Uint8ClampedArray]"] = C2["[object Uint16Array]"] = C2["[object Uint32Array]"] = true, C2[r2] = C2[i2] = C2[_2] = C2[a2] = C2[b2] = C2[s2] = C2[u2] = C2[c2] = C2[l2] = C2[d2] = C2[p2] = C2[h2] = C2[g2] = C2[y2] = C2[m2] = false;
        var O2 = "object" == typeof global && global && global.Object === Object && global, S2 = "object" == typeof self && self && self.Object === Object && self, I2 = O2 || S2 || Function("return this")(), x2 = e2 && !e2.nodeType && e2, M2 = x2 && t2 && !t2.nodeType && t2, L2 = M2 && M2.exports === x2, N2 = L2 && O2.process, A2 = function() {
          try {
            return N2 && N2.binding && N2.binding("util");
          } catch (t3) {
          }
        }(), P2 = A2 && A2.isTypedArray;
        function F2(t3, e3) {
          for (var n3 = -1, o3 = null == t3 ? 0 : t3.length; ++n3 < o3; ) if (e3(t3[n3], n3, t3)) return true;
          return false;
        }
        function w2(t3) {
          var e3 = -1, n3 = Array(t3.size);
          return t3.forEach(function(t4, o3) {
            n3[++e3] = [o3, t4];
          }), n3;
        }
        function R2(t3) {
          var e3 = -1, n3 = Array(t3.size);
          return t3.forEach(function(t4) {
            n3[++e3] = t4;
          }), n3;
        }
        var k2, D2, U2, j2 = Array.prototype, V2 = Function.prototype, B2 = Object.prototype, G2 = I2["__core-js_shared__"], J2 = V2.toString, z2 = B2.hasOwnProperty, Y2 = (k2 = /[^.]+$/.exec(G2 && G2.keys && G2.keys.IE_PROTO || "")) ? "Symbol(src)_1." + k2 : "", $2 = B2.toString, q2 = RegExp("^" + J2.call(z2).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), H2 = L2 ? I2.Buffer : void 0, X2 = I2.Symbol, Z2 = I2.Uint8Array, W2 = B2.propertyIsEnumerable, K2 = j2.splice, Q2 = X2 ? X2.toStringTag : void 0, tt2 = Object.getOwnPropertySymbols, et2 = H2 ? H2.isBuffer : void 0, nt2 = (D2 = Object.keys, U2 = Object, function(t3) {
          return D2(U2(t3));
        }), ot2 = At2(I2, "DataView"), rt2 = At2(I2, "Map"), it2 = At2(I2, "Promise"), at2 = At2(I2, "Set"), st2 = At2(I2, "WeakMap"), ut2 = At2(Object, "create"), ct2 = Rt2(ot2), lt2 = Rt2(rt2), dt2 = Rt2(it2), pt2 = Rt2(at2), ft2 = Rt2(st2), ht2 = X2 ? X2.prototype : void 0, gt2 = ht2 ? ht2.valueOf : void 0;
        function yt2(t3) {
          var e3 = -1, n3 = null == t3 ? 0 : t3.length;
          for (this.clear(); ++e3 < n3; ) {
            var o3 = t3[e3];
            this.set(o3[0], o3[1]);
          }
        }
        function vt2(t3) {
          var e3 = -1, n3 = null == t3 ? 0 : t3.length;
          for (this.clear(); ++e3 < n3; ) {
            var o3 = t3[e3];
            this.set(o3[0], o3[1]);
          }
        }
        function mt2(t3) {
          var e3 = -1, n3 = null == t3 ? 0 : t3.length;
          for (this.clear(); ++e3 < n3; ) {
            var o3 = t3[e3];
            this.set(o3[0], o3[1]);
          }
        }
        function _t2(t3) {
          var e3 = -1, n3 = null == t3 ? 0 : t3.length;
          for (this.__data__ = new mt2(); ++e3 < n3; ) this.add(t3[e3]);
        }
        function bt2(t3) {
          var e3 = this.__data__ = new vt2(t3);
          this.size = e3.size;
        }
        function Et2(t3, e3) {
          var n3 = Ut2(t3), o3 = !n3 && Dt2(t3), r3 = !n3 && !o3 && jt2(t3), i3 = !n3 && !o3 && !r3 && zt2(t3), a3 = n3 || o3 || r3 || i3, s3 = a3 ? function(t4, e4) {
            for (var n4 = -1, o4 = Array(t4); ++n4 < t4; ) o4[n4] = e4(n4);
            return o4;
          }(t3.length, String) : [], u3 = s3.length;
          for (var c3 in t3) !e3 && !z2.call(t3, c3) || a3 && ("length" == c3 || r3 && ("offset" == c3 || "parent" == c3) || i3 && ("buffer" == c3 || "byteLength" == c3 || "byteOffset" == c3) || wt2(c3, u3)) || s3.push(c3);
          return s3;
        }
        function Tt2(t3, e3) {
          for (var n3 = t3.length; n3--; ) if (kt2(t3[n3][0], e3)) return n3;
          return -1;
        }
        function Ct2(t3) {
          return null == t3 ? void 0 === t3 ? "[object Undefined]" : "[object Null]" : Q2 && Q2 in Object(t3) ? function(t4) {
            var e3 = z2.call(t4, Q2), n3 = t4[Q2];
            try {
              t4[Q2] = void 0;
              var o3 = true;
            } catch (t5) {
            }
            var r3 = $2.call(t4);
            o3 && (e3 ? t4[Q2] = n3 : delete t4[Q2]);
            return r3;
          }(t3) : function(t4) {
            return $2.call(t4);
          }(t3);
        }
        function Ot2(t3) {
          return Jt2(t3) && Ct2(t3) == r2;
        }
        function St2(t3, e3, n3, o3, c3) {
          return t3 === e3 || (null == t3 || null == e3 || !Jt2(t3) && !Jt2(e3) ? t3 != t3 && e3 != e3 : function(t4, e4, n4, o4, c4, f3) {
            var m3 = Ut2(t4), E3 = Ut2(e4), T3 = m3 ? i2 : Ft2(t4), C3 = E3 ? i2 : Ft2(e4), O3 = (T3 = T3 == r2 ? p2 : T3) == p2, S3 = (C3 = C3 == r2 ? p2 : C3) == p2, I3 = T3 == C3;
            if (I3 && jt2(t4)) {
              if (!jt2(e4)) return false;
              m3 = true, O3 = false;
            }
            if (I3 && !O3) return f3 || (f3 = new bt2()), m3 || zt2(t4) ? Mt2(t4, e4, n4, o4, c4, f3) : function(t5, e5, n5, o5, r3, i3, c5) {
              switch (n5) {
                case b2:
                  if (t5.byteLength != e5.byteLength || t5.byteOffset != e5.byteOffset) return false;
                  t5 = t5.buffer, e5 = e5.buffer;
                case _2:
                  return !(t5.byteLength != e5.byteLength || !i3(new Z2(t5), new Z2(e5)));
                case a2:
                case s2:
                case d2:
                  return kt2(+t5, +e5);
                case u2:
                  return t5.name == e5.name && t5.message == e5.message;
                case h2:
                case y2:
                  return t5 == e5 + "";
                case l2:
                  var p3 = w2;
                case g2:
                  var f4 = 1 & o5;
                  if (p3 || (p3 = R2), t5.size != e5.size && !f4) return false;
                  var m4 = c5.get(t5);
                  if (m4) return m4 == e5;
                  o5 |= 2, c5.set(t5, e5);
                  var E4 = Mt2(p3(t5), p3(e5), o5, r3, i3, c5);
                  return c5.delete(t5), E4;
                case v2:
                  if (gt2) return gt2.call(t5) == gt2.call(e5);
              }
              return false;
            }(t4, e4, T3, n4, o4, c4, f3);
            if (!(1 & n4)) {
              var x3 = O3 && z2.call(t4, "__wrapped__"), M3 = S3 && z2.call(e4, "__wrapped__");
              if (x3 || M3) {
                var L3 = x3 ? t4.value() : t4, N3 = M3 ? e4.value() : e4;
                return f3 || (f3 = new bt2()), c4(L3, N3, n4, o4, f3);
              }
            }
            if (!I3) return false;
            return f3 || (f3 = new bt2()), function(t5, e5, n5, o5, r3, i3) {
              var a3 = 1 & n5, s3 = Lt2(t5), u3 = s3.length, c5 = Lt2(e5).length;
              if (u3 != c5 && !a3) return false;
              var l3 = u3;
              for (; l3--; ) {
                var d3 = s3[l3];
                if (!(a3 ? d3 in e5 : z2.call(e5, d3))) return false;
              }
              var p3 = i3.get(t5);
              if (p3 && i3.get(e5)) return p3 == e5;
              var f4 = true;
              i3.set(t5, e5), i3.set(e5, t5);
              var h3 = a3;
              for (; ++l3 < u3; ) {
                var g3 = t5[d3 = s3[l3]], y3 = e5[d3];
                if (o5) var v3 = a3 ? o5(y3, g3, d3, e5, t5, i3) : o5(g3, y3, d3, t5, e5, i3);
                if (!(void 0 === v3 ? g3 === y3 || r3(g3, y3, n5, o5, i3) : v3)) {
                  f4 = false;
                  break;
                }
                h3 || (h3 = "constructor" == d3);
              }
              if (f4 && !h3) {
                var m4 = t5.constructor, _3 = e5.constructor;
                m4 == _3 || !("constructor" in t5) || !("constructor" in e5) || "function" == typeof m4 && m4 instanceof m4 && "function" == typeof _3 && _3 instanceof _3 || (f4 = false);
              }
              return i3.delete(t5), i3.delete(e5), f4;
            }(t4, e4, n4, o4, c4, f3);
          }(t3, e3, n3, o3, St2, c3));
        }
        function It2(t3) {
          return !(!Gt2(t3) || function(t4) {
            return !!Y2 && Y2 in t4;
          }(t3)) && (Vt2(t3) ? q2 : E2).test(Rt2(t3));
        }
        function xt2(t3) {
          if (n3 = (e3 = t3) && e3.constructor, o3 = "function" == typeof n3 && n3.prototype || B2, e3 !== o3) return nt2(t3);
          var e3, n3, o3, r3 = [];
          for (var i3 in Object(t3)) z2.call(t3, i3) && "constructor" != i3 && r3.push(i3);
          return r3;
        }
        function Mt2(t3, e3, n3, o3, r3, i3) {
          var a3 = 1 & n3, s3 = t3.length, u3 = e3.length;
          if (s3 != u3 && !(a3 && u3 > s3)) return false;
          var c3 = i3.get(t3);
          if (c3 && i3.get(e3)) return c3 == e3;
          var l3 = -1, d3 = true, p3 = 2 & n3 ? new _t2() : void 0;
          for (i3.set(t3, e3), i3.set(e3, t3); ++l3 < s3; ) {
            var f3 = t3[l3], h3 = e3[l3];
            if (o3) var g3 = a3 ? o3(h3, f3, l3, e3, t3, i3) : o3(f3, h3, l3, t3, e3, i3);
            if (void 0 !== g3) {
              if (g3) continue;
              d3 = false;
              break;
            }
            if (p3) {
              if (!F2(e3, function(t4, e4) {
                if (a4 = e4, !p3.has(a4) && (f3 === t4 || r3(f3, t4, n3, o3, i3))) return p3.push(e4);
                var a4;
              })) {
                d3 = false;
                break;
              }
            } else if (f3 !== h3 && !r3(f3, h3, n3, o3, i3)) {
              d3 = false;
              break;
            }
          }
          return i3.delete(t3), i3.delete(e3), d3;
        }
        function Lt2(t3) {
          return function(t4, e3, n3) {
            var o3 = e3(t4);
            return Ut2(t4) ? o3 : function(t5, e4) {
              for (var n4 = -1, o4 = e4.length, r3 = t5.length; ++n4 < o4; ) t5[r3 + n4] = e4[n4];
              return t5;
            }(o3, n3(t4));
          }(t3, Yt2, Pt2);
        }
        function Nt2(t3, e3) {
          var n3, o3, r3 = t3.__data__;
          return ("string" == (o3 = typeof (n3 = e3)) || "number" == o3 || "symbol" == o3 || "boolean" == o3 ? "__proto__" !== n3 : null === n3) ? r3["string" == typeof e3 ? "string" : "hash"] : r3.map;
        }
        function At2(t3, e3) {
          var n3 = function(t4, e4) {
            return null == t4 ? void 0 : t4[e4];
          }(t3, e3);
          return It2(n3) ? n3 : void 0;
        }
        yt2.prototype.clear = function() {
          this.__data__ = ut2 ? ut2(null) : {}, this.size = 0;
        }, yt2.prototype.delete = function(t3) {
          var e3 = this.has(t3) && delete this.__data__[t3];
          return this.size -= e3 ? 1 : 0, e3;
        }, yt2.prototype.get = function(t3) {
          var e3 = this.__data__;
          if (ut2) {
            var o3 = e3[t3];
            return o3 === n2 ? void 0 : o3;
          }
          return z2.call(e3, t3) ? e3[t3] : void 0;
        }, yt2.prototype.has = function(t3) {
          var e3 = this.__data__;
          return ut2 ? void 0 !== e3[t3] : z2.call(e3, t3);
        }, yt2.prototype.set = function(t3, e3) {
          var o3 = this.__data__;
          return this.size += this.has(t3) ? 0 : 1, o3[t3] = ut2 && void 0 === e3 ? n2 : e3, this;
        }, vt2.prototype.clear = function() {
          this.__data__ = [], this.size = 0;
        }, vt2.prototype.delete = function(t3) {
          var e3 = this.__data__, n3 = Tt2(e3, t3);
          return !(n3 < 0) && (n3 == e3.length - 1 ? e3.pop() : K2.call(e3, n3, 1), --this.size, true);
        }, vt2.prototype.get = function(t3) {
          var e3 = this.__data__, n3 = Tt2(e3, t3);
          return n3 < 0 ? void 0 : e3[n3][1];
        }, vt2.prototype.has = function(t3) {
          return Tt2(this.__data__, t3) > -1;
        }, vt2.prototype.set = function(t3, e3) {
          var n3 = this.__data__, o3 = Tt2(n3, t3);
          return o3 < 0 ? (++this.size, n3.push([t3, e3])) : n3[o3][1] = e3, this;
        }, mt2.prototype.clear = function() {
          this.size = 0, this.__data__ = { hash: new yt2(), map: new (rt2 || vt2)(), string: new yt2() };
        }, mt2.prototype.delete = function(t3) {
          var e3 = Nt2(this, t3).delete(t3);
          return this.size -= e3 ? 1 : 0, e3;
        }, mt2.prototype.get = function(t3) {
          return Nt2(this, t3).get(t3);
        }, mt2.prototype.has = function(t3) {
          return Nt2(this, t3).has(t3);
        }, mt2.prototype.set = function(t3, e3) {
          var n3 = Nt2(this, t3), o3 = n3.size;
          return n3.set(t3, e3), this.size += n3.size == o3 ? 0 : 1, this;
        }, _t2.prototype.add = _t2.prototype.push = function(t3) {
          return this.__data__.set(t3, n2), this;
        }, _t2.prototype.has = function(t3) {
          return this.__data__.has(t3);
        }, bt2.prototype.clear = function() {
          this.__data__ = new vt2(), this.size = 0;
        }, bt2.prototype.delete = function(t3) {
          var e3 = this.__data__, n3 = e3.delete(t3);
          return this.size = e3.size, n3;
        }, bt2.prototype.get = function(t3) {
          return this.__data__.get(t3);
        }, bt2.prototype.has = function(t3) {
          return this.__data__.has(t3);
        }, bt2.prototype.set = function(t3, e3) {
          var n3 = this.__data__;
          if (n3 instanceof vt2) {
            var o3 = n3.__data__;
            if (!rt2 || o3.length < 199) return o3.push([t3, e3]), this.size = ++n3.size, this;
            n3 = this.__data__ = new mt2(o3);
          }
          return n3.set(t3, e3), this.size = n3.size, this;
        };
        var Pt2 = tt2 ? function(t3) {
          return null == t3 ? [] : (t3 = Object(t3), function(t4, e3) {
            for (var n3 = -1, o3 = null == t4 ? 0 : t4.length, r3 = 0, i3 = []; ++n3 < o3; ) {
              var a3 = t4[n3];
              e3(a3, n3, t4) && (i3[r3++] = a3);
            }
            return i3;
          }(tt2(t3), function(e3) {
            return W2.call(t3, e3);
          }));
        } : function() {
          return [];
        }, Ft2 = Ct2;
        function wt2(t3, e3) {
          return !!(e3 = null == e3 ? o2 : e3) && ("number" == typeof t3 || T2.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
        }
        function Rt2(t3) {
          if (null != t3) {
            try {
              return J2.call(t3);
            } catch (t4) {
            }
            try {
              return t3 + "";
            } catch (t4) {
            }
          }
          return "";
        }
        function kt2(t3, e3) {
          return t3 === e3 || t3 != t3 && e3 != e3;
        }
        (ot2 && Ft2(new ot2(new ArrayBuffer(1))) != b2 || rt2 && Ft2(new rt2()) != l2 || it2 && Ft2(it2.resolve()) != f2 || at2 && Ft2(new at2()) != g2 || st2 && Ft2(new st2()) != m2) && (Ft2 = function(t3) {
          var e3 = Ct2(t3), n3 = e3 == p2 ? t3.constructor : void 0, o3 = n3 ? Rt2(n3) : "";
          if (o3) switch (o3) {
            case ct2:
              return b2;
            case lt2:
              return l2;
            case dt2:
              return f2;
            case pt2:
              return g2;
            case ft2:
              return m2;
          }
          return e3;
        });
        var Dt2 = Ot2(/* @__PURE__ */ function() {
          return arguments;
        }()) ? Ot2 : function(t3) {
          return Jt2(t3) && z2.call(t3, "callee") && !W2.call(t3, "callee");
        }, Ut2 = Array.isArray;
        var jt2 = et2 || function() {
          return false;
        };
        function Vt2(t3) {
          if (!Gt2(t3)) return false;
          var e3 = Ct2(t3);
          return e3 == c2 || "[object GeneratorFunction]" == e3 || "[object AsyncFunction]" == e3 || "[object Proxy]" == e3;
        }
        function Bt2(t3) {
          return "number" == typeof t3 && t3 > -1 && t3 % 1 == 0 && t3 <= o2;
        }
        function Gt2(t3) {
          var e3 = typeof t3;
          return null != t3 && ("object" == e3 || "function" == e3);
        }
        function Jt2(t3) {
          return null != t3 && "object" == typeof t3;
        }
        var zt2 = P2 ? /* @__PURE__ */ function(t3) {
          return function(e3) {
            return t3(e3);
          };
        }(P2) : function(t3) {
          return Jt2(t3) && Bt2(t3.length) && !!C2[Ct2(t3)];
        };
        function Yt2(t3) {
          return null != (e3 = t3) && Bt2(e3.length) && !Vt2(e3) ? Et2(t3) : xt2(t3);
          var e3;
        }
        t2.exports = function(t3, e3) {
          return St2(t3, e3);
        };
      }(fe, fe.exports);
      var he = e(fe.exports);
      function ge(t2, e2) {
        return t2.length === e2.length && JSON.stringify(t2.map(function(t3) {
          return t3;
        }).sort()) === JSON.stringify(e2.map(function(t3) {
          return t3;
        }).sort());
      }
      var ye = { Polygon: V, LineString: j, Point: U, MultiPolygon: J, MultiLineString: J, MultiPoint: J };
      var ve = Object.freeze({ __proto__: null, CommonSelectors: ht, constrainFeatureMovement: Kt, createMidPoint: bt, createSupplementaryPoints: Et, createVertex: _t, doubleClickZoom: Tt, euclideanDistance: A, featuresAt: M, getFeatureAtAndSetCursors: N, isClick: P, isEventAtCoordinates: ie, isTap: F, mapEventToBoundingBox: S, ModeHandler: t, moveFeatures: Qt, sortFeatures: O, stringSetsAreEqual: ge, StringSet: I, theme: ot, toDenseArray: H }), me = function(t2, e2) {
        var n2 = { options: t2 = function(t3) {
          void 0 === t3 && (t3 = {});
          var e3 = tt(t3);
          return t3.controls || (e3.controls = {}), false === t3.displayControlsDefault ? e3.controls = tt(de, t3.controls) : e3.controls = tt(le, t3.controls), (e3 = tt(ce, e3)).styles = pe(e3.styles, "cold").concat(pe(e3.styles, "hot")), e3;
        }(t2) };
        e2 = function(t3, e3) {
          return e3.modes = h, e3.getFeatureIdsAt = function(e4) {
            return M.click({ point: e4 }, null, t3).map(function(t4) {
              return t4.properties.id;
            });
          }, e3.getSelectedIds = function() {
            return t3.store.getSelectedIds();
          }, e3.getSelected = function() {
            return { type: f.FEATURE_COLLECTION, features: t3.store.getSelectedIds().map(function(e4) {
              return t3.store.get(e4);
            }).map(function(t4) {
              return t4.toGeoJSON();
            }) };
          }, e3.getSelectedPoints = function() {
            return { type: f.FEATURE_COLLECTION, features: t3.store.getSelectedCoordinates().map(function(t4) {
              return { type: f.FEATURE, properties: {}, geometry: { type: f.POINT, coordinates: t4.coordinates } };
            }) };
          }, e3.set = function(n3) {
            if (void 0 === n3.type || n3.type !== f.FEATURE_COLLECTION || !Array.isArray(n3.features)) throw new Error("Invalid FeatureCollection");
            var o3 = t3.store.createRenderBatch(), r2 = t3.store.getAllIds().slice(), i2 = e3.add(n3), a2 = new I(i2);
            return (r2 = r2.filter(function(t4) {
              return !a2.has(t4);
            })).length && e3.delete(r2), o3(), i2;
          }, e3.add = function(e4) {
            var n3 = JSON.parse(JSON.stringify(It(e4))).features.map(function(e5) {
              if (e5.id = e5.id || k(), null === e5.geometry) throw new Error("Invalid geometry: null");
              if (void 0 === t3.store.get(e5.id) || t3.store.get(e5.id).type !== e5.geometry.type) {
                var n4 = ye[e5.geometry.type];
                if (void 0 === n4) throw new Error("Invalid geometry type: " + e5.geometry.type + ".");
                var o3 = new n4(t3, e5);
                t3.store.add(o3);
              } else {
                var r2 = t3.store.get(e5.id);
                r2.properties = e5.properties, he(r2.properties, e5.properties) || t3.store.featureChanged(r2.id), he(r2.getCoordinates(), e5.geometry.coordinates) || r2.incomingCoords(e5.geometry.coordinates);
              }
              return e5.id;
            });
            return t3.store.render(), n3;
          }, e3.get = function(e4) {
            var n3 = t3.store.get(e4);
            if (n3) return n3.toGeoJSON();
          }, e3.getAll = function() {
            return { type: f.FEATURE_COLLECTION, features: t3.store.getAll().map(function(t4) {
              return t4.toGeoJSON();
            }) };
          }, e3.delete = function(n3) {
            return t3.store.delete(n3, { silent: true }), e3.getMode() !== h.DIRECT_SELECT || t3.store.getSelectedIds().length ? t3.store.render() : t3.events.changeMode(h.SIMPLE_SELECT, void 0, { silent: true }), e3;
          }, e3.deleteAll = function() {
            return t3.store.delete(t3.store.getAllIds(), { silent: true }), e3.getMode() === h.DIRECT_SELECT ? t3.events.changeMode(h.SIMPLE_SELECT, void 0, { silent: true }) : t3.store.render(), e3;
          }, e3.changeMode = function(n3, o3) {
            return void 0 === o3 && (o3 = {}), n3 === h.SIMPLE_SELECT && e3.getMode() === h.SIMPLE_SELECT ? (ge(o3.featureIds || [], t3.store.getSelectedIds()) || (t3.store.setSelected(o3.featureIds, { silent: true }), t3.store.render()), e3) : (n3 === h.DIRECT_SELECT && e3.getMode() === h.DIRECT_SELECT && o3.featureId === t3.store.getSelectedIds()[0] || t3.events.changeMode(n3, o3, { silent: true }), e3);
          }, e3.getMode = function() {
            return t3.events.getMode();
          }, e3.trash = function() {
            return t3.events.trash({ silent: true }), e3;
          }, e3.combineFeatures = function() {
            return t3.events.combineFeatures({ silent: true }), e3;
          }, e3.uncombineFeatures = function() {
            return t3.events.uncombineFeatures({ silent: true }), e3;
          }, e3.setFeatureProperty = function(n3, o3, r2) {
            return t3.store.setFeatureProperty(n3, o3, r2), e3;
          }, e3;
        }(n2, e2), n2.api = e2;
        var o2 = nt(n2);
        return e2.onAdd = o2.onAdd, e2.onRemove = o2.onRemove, e2.types = p, e2.options = t2, e2;
      };
      function _e(t2) {
        me(t2, this);
      }
      return _e.modes = ue, _e.constants = E, _e.lib = ve, _e;
    });
  }
});
export default require_mapbox_gl_draw();
//# sourceMappingURL=@mapbox_mapbox-gl-draw.js.map
