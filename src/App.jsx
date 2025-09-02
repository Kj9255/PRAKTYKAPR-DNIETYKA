import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

/*
 * Indoor routing application with admin tools.
 *
 * This component renders a MapLibre map with a dark base map and allows users to
 * draw rooms, paths and special points (evacuation points, fire extinguishers
 * and hose points). Rooms are stored as polygon features, paths as line
 * features and special points as point features. Each room can be given a
 * name, department and occupant list. A simple A* path‑finding implementation
 * computes a route between two selected rooms along the drawn paths.
 */

// Custom style for Mapbox Draw features. Only outlines are rendered for
// polygons (rooms) and paths. Point colours differentiate special point types.
const DRAW_STYLE = [
  // Hide the default fill for polygons so only outlines are visible
  {
    id: 'gl-draw-polygon-fill',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    // Give rooms a subtle dark fill so they stand out against the base map.
    paint: {
      'fill-color': '#1e293b',
      'fill-opacity': 0.15
    }
  },
  // Outline of rooms
  {
    id: 'gl-draw-polygon-outline',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    paint: {
      'line-color': '#7c3aed',
      'line-width': 2
    }
  },
  // Lines representing paths
  {
    id: 'gl-draw-line-path',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
    paint: {
      'line-color': '#3b3b3b',
      'line-width': 3
    }
  },
  // Unified points layer with data-driven colours by 'kind'
  {
    id: 'gl-draw-point-colored',
    type: 'circle',
    // Style all user points in Draw (exclude static/edit helper features)
    filter: ['all', ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 7,
      'circle-color': [
        'match', ['downcase', ['coalesce', ['get', 'kind'], ['get', 'user_kind'], '']],
        'extinguisher', '#dc2626',
        'hose',        '#2563eb',
        'evac',        '#16a34a',
        'door',        '#eab308',
        '#9ca3af'
      ],
      'circle-stroke-color': [
        'match', ['downcase', ['coalesce', ['get', 'kind'], ['get', 'user_kind'], '']],
        'extinguisher', '#7f1d1d',
        'hose',        '#1e3a8a',
        'evac',        '#064e3b',
        'door',        '#92400e',
        '#374151'
      ],
      'circle-stroke-width': 1.5,
      // Hide the circle for extinguishers so the icon shows alone
      'circle-opacity': [
        'case',
        [
          '==',
          ['downcase', ['coalesce', ['get', 'kind'], ['get', 'user_kind'], '']],
          'extinguisher'
        ],
        0,
        1
      ]
    }
  },
  // Symbol layer for extinguisher points using a custom icon
  {
    id: 'gl-draw-point-extinguisher-icon',
    type: 'symbol',
    filter: [
      'all',
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static'],
      [
        '==',
        ['downcase', ['coalesce', ['get', 'kind'], ['get', 'user_kind'], '']],
        'extinguisher'
      ]
    ],
    layout: {
      'icon-image': 'extinguisher-icon',
      'icon-size': 1.0,
      'icon-allow-overlap': true,
      'icon-ignore-placement': true
    }
  }
];

// Keys used for persisting data in localStorage
const STORAGE_KEYS = {
  features: 'app:features',
  userView: 'app:userView',
  startRoom: 'app:startRoom',
  endRoom: 'app:endRoom'
};

/**
 * Compute the centroid of a polygon using the shoelace formula. Falls back to
 * averaging coordinates if the area is too small. The input must be a
 * GeoJSON polygon coordinate array (array of linear rings).
 *
 * @param {number[][][]} coords Polygon coordinates
 * @returns {number[]} [x, y] centroid of the polygon
 */
function centroidPoly(coords) {
  const ring = coords[0];
  let twiceArea = 0;
  let xSum = 0;
  let ySum = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[i + 1];
    const c = x0 * y1 - x1 * y0;
    twiceArea += c;
    xSum += (x0 + x1) * c;
    ySum += (y0 + y1) * c;
  }
  if (Math.abs(twiceArea) < 1e-8) {
    // Fall back to average of coordinates
    let sx = 0;
    let sy = 0;
    for (const [x, y] of ring) {
      sx += x;
      sy += y;
    }
    const n = ring.length;
    return [sx / n, sy / n];
  }
  const area = twiceArea / 2;
  return [xSum / (3 * area), ySum / (3 * area)];
}

/**
 * Compute the nearest point on a polygon ring to a given point. The polygon
 * ring should be an array of [lng, lat] coordinates. The returned value is
 * the [lng, lat] coordinate on the polygon boundary that is closest to the
 * provided point.
 *
 * @param {number[][]} ring Polygon ring (array of coordinates)
 * @param {number[]} point [lng, lat] coordinate
 * @returns {number[]} [lng, lat] nearest point on polygon boundary
 */
function nearestPointOnPolygon(ring, point) {
  let minDist = Infinity;
  let nearest = null;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    const vx = x2 - x1;
    const vy = y2 - y1;
    const wx = point[0] - x1;
    const wy = point[1] - y1;
    const c1 = vx * wx + vy * wy;
    const c2 = vx * vx + vy * vy;
    let t = c2 === 0 ? 0 : c1 / c2;
    t = Math.max(0, Math.min(1, t));
    const projx = x1 + t * vx;
    const projy = y1 + t * vy;
    const dx = point[0] - projx;
    const dy = point[1] - projy;
    const dist = Math.hypot(dx, dy);
    if (dist < minDist) {
      minDist = dist;
      nearest = [projx, projy];
    }
  }
  return nearest;
}

/**
 * Build a graph from the provided features. Path vertices become graph nodes
 * connected by edges with weights equal to their Euclidean distance. Each room
 * centroid is connected to its nearest path node. Returns nodes (mapping
 * keys to coordinates), edges (adjacency list) and a mapping from room IDs
 * to the corresponding centroid node key.
 *
 * @param {Object[]} features GeoJSON features from Mapbox Draw
 * @returns {Object} { nodes, edges, roomNodes }
 */
function buildGraph(features) {
  const nodes = new Map();
  const edges = new Map();
  const roomNodes = {};
  const doorNodes = {};

  // Helper to create or retrieve a node key for a coordinate
  function ensureNode(x, y) {
    const key = `${x.toFixed(6)},${y.toFixed(6)}`;
    if (!nodes.has(key)) {
      nodes.set(key, [x, y]);
      edges.set(key, []);
    }
    return key;
  }

  // Add nodes and edges from path features
  features.forEach((f) => {
    if (f.properties && f.properties.kind === 'path' && f.geometry && f.geometry.type === 'LineString') {
      const coords = f.geometry.coordinates;
      for (let i = 0; i < coords.length; i++) {
        const [x, y] = coords[i];
        const key = ensureNode(x, y);
        // Connect consecutive vertices
        if (i > 0) {
          const [x0, y0] = coords[i - 1];
          const prevKey = ensureNode(x0, y0);
          const dist = Math.hypot(x - x0, y - y0);
          edges.get(key).push({ to: prevKey, w: dist });
          edges.get(prevKey).push({ to: key, w: dist });
        }
      }
    }
  });

  // Precompute path node list for nearest‑neighbor search
  const pathNodes = Array.from(nodes.entries());

  // Connect each door point to its nearest path node
  features.forEach((f) => {
    if (f.properties && f.properties.kind === 'door' && f.geometry && f.geometry.type === 'Point') {
      const [x, y] = f.geometry.coordinates;
      const key = ensureNode(x, y);
      // find nearest path node
      let nearestKey = null;
      let nearestDist = Infinity;
      pathNodes.forEach(([nodeKey, coord]) => {
        const dx = coord[0] - x;
        const dy = coord[1] - y;
        const d = Math.hypot(dx, dy);
        if (d < nearestDist) {
          nearestDist = d;
          nearestKey = nodeKey;
        }
      });
      if (nearestKey) {
        edges.get(key).push({ to: nearestKey, w: nearestDist });
        edges.get(nearestKey).push({ to: key, w: nearestDist });
      }
      doorNodes[f.id] = key;
    }
  });

  // Connect each room centroid to its nearest path node
  features.forEach((f) => {
    if (f.properties && f.properties.kind === 'room' && f.geometry && f.geometry.type === 'Polygon') {
      const centroid = centroidPoly(f.geometry.coordinates);
      let nearestKey = null;
      let nearestDist = Infinity;
      pathNodes.forEach(([key, coord]) => {
        const dx = coord[0] - centroid[0];
        const dy = coord[1] - centroid[1];
        const d = Math.hypot(dx, dy);
        if (d < nearestDist) {
          nearestDist = d;
          nearestKey = key;
        }
      });
      // If there are no path nodes yet, create a standalone node
      const roomKey = `room-${f.id}`;
      nodes.set(roomKey, centroid);
      edges.set(roomKey, []);
      if (nearestKey) {
        edges.get(roomKey).push({ to: nearestKey, w: nearestDist });
        edges.get(nearestKey).push({ to: roomKey, w: nearestDist });
      }
      roomNodes[f.id] = roomKey;
    }
  });

  return { nodes, edges, roomNodes, doorNodes };
}

/**
 * Perform an A* search on the graph from startKey to goalKey. Returns an
 * array of coordinates representing the path, or null if no path exists.
 *
 * @param {Object} graph Graph object returned from buildGraph
 * @param {string} startKey Node key for the start room centroid
 * @param {string} goalKey Node key for the goal room centroid
 * @returns {number[][] | null} Array of [x, y] coordinates for the route
 */
function aStar(graph, startKey, goalKey) {
  const { nodes, edges } = graph;
  const closed = new Set();
  const open = new Set([startKey]);
  const cameFrom = {};
  const g = {};
  const f = {};
  g[startKey] = 0;
  f[startKey] = heuristic(startKey);

  function heuristic(nodeKey) {
    const [sx, sy] = nodes.get(nodeKey);
    const [gx, gy] = nodes.get(goalKey);
    return Math.hypot(sx - gx, sy - gy);
  }

  while (open.size > 0) {
    // Select the node in open with the lowest f score
    let current = null;
    let currentF = Infinity;
    open.forEach((node) => {
      const val = f[node];
      if (val !== undefined && val < currentF) {
        currentF = val;
        current = node;
      }
    });
    if (current === null) break;
    if (current === goalKey) {
      // Reconstruct the path
      const path = [];
      let node = current;
      path.push(nodes.get(node));
      while (cameFrom[node]) {
        node = cameFrom[node];
        path.push(nodes.get(node));
      }
      return path.reverse();
    }
    open.delete(current);
    closed.add(current);
    const neighbors = edges.get(current) || [];
    neighbors.forEach(({ to, w }) => {
      if (closed.has(to)) return;
      const tentativeG = (g[current] ?? Infinity) + w;
      if (!open.has(to)) open.add(to);
      if (tentativeG >= (g[to] ?? Infinity)) return;
      cameFrom[to] = current;
      g[to] = tentativeG;
      f[to] = tentativeG + heuristic(to);
    });
  }
  // No path found
  return null;
}

/**
 * Compute a route between two room features using the current feature set.
 * Returns an array of coordinates or null if no route could be found.
 *
 * @param {Object[]} features All GeoJSON features from Mapbox Draw
 * @param {string} startId Feature id of the start room
 * @param {string} endId Feature id of the end room
 */
function computeRoute(features, startId, endId) {
  const graph = buildGraph(features);
  // Find door features associated with the start and end rooms
  let startDoor = null;
  let endDoor = null;
  features.forEach((f) => {
    if (f.properties && f.properties.kind === 'door') {
      if (f.properties.roomId === startId && !startDoor) {
        startDoor = f;
      }
      if (f.properties.roomId === endId && !endDoor) {
        endDoor = f;
      }
    }
  });
  let startKey;
  let endKey;
  // Use door nodes if available, otherwise fallback to room centroids
  // Use door nodes exclusively; if either room lacks a door, no route can be computed
  if (startDoor && graph.doorNodes[startDoor.id]) {
    startKey = graph.doorNodes[startDoor.id];
  }
  if (endDoor && graph.doorNodes[endDoor.id]) {
    endKey = graph.doorNodes[endDoor.id];
  }
  // Abort if either room lacks door connection
  if (!startKey || !endKey) {
    return null;
  }
  const path = aStar(graph, startKey, endKey);
  return path;
}

export default function App() {
  const mapRef = useRef(null);
  const drawRef = useRef(null);
  const routeAnimRef = useRef(null);
  const doorRoomRef = useRef(null);
  // pointTypeRef keeps track of the current point drawing type (evac, extinguisher, hose, door)
  const pointTypeRef = useRef('evac');
  const [rooms, setRooms] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [pointType, setPointType] = useState('evac');
  const [startRoom, setStartRoom] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.startRoom) || '';
    } catch (_) {
      return '';
    }
  });
  const [endRoom, setEndRoom] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.endRoom) || '';
    } catch (_) {
      return '';
    }
  });
  const [drawingRect, setDrawingRect] = useState(false);
  const [userView, setUserView] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.userView) === 'true';
    } catch (_) {
      return false;
    }
  });

  // Persist simple UI state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.userView, String(userView));
    } catch (_) {}
  }, [userView]);
  useEffect(() => {
    try {
      if (startRoom) {
        localStorage.setItem(STORAGE_KEYS.startRoom, startRoom);
      } else {
        localStorage.removeItem(STORAGE_KEYS.startRoom);
      }
    } catch (_) {}
  }, [startRoom]);
  useEffect(() => {
    try {
      if (endRoom) {
        localStorage.setItem(STORAGE_KEYS.endRoom, endRoom);
      } else {
        localStorage.removeItem(STORAGE_KEYS.endRoom);
      }
    } catch (_) {}
  }, [endRoom]);

  // Helper to persist features
  const saveFeatures = () => {
    try {
      if (drawRef.current) {
        const all = drawRef.current.getAll();
        localStorage.setItem(STORAGE_KEYS.features, JSON.stringify(all));
      }
    } catch (_) {}
  };

  // Initialise the map and drawing tools
  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      // Center the map near the user-defined reference point in Warsaw
      center: [21.015885624684906, 52.23771803359571],
      zoom: 15,
      // Restrict panning and zooming to within approximately 1 km of the center
      maxBounds: [
        [21.0012166, 52.2287349], // southwest corner (~1 km SW)
        [21.0305546, 52.2467011]  // northeast corner (~1 km NE)
      ]
    });
    mapRef.current = map;
    // Add zoom and rotation controls to the map
    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

    // Helper to move Mapbox Draw layers to the top so symbols (e.g., extinguisher) are visible
    const moveDrawLayersToTop = () => {
      try {
        const style = map.getStyle();
        if (style && Array.isArray(style.layers)) {
          style.layers
            .map((l) => l.id)
            .filter((id) => typeof id === 'string' && id.startsWith('gl-draw-'))
            .forEach((id) => {
              try { map.moveLayer(id); } catch (_) {}
            });
        }
      } catch (_) {}
    };

    map.on('load', () => {
      // Load custom extinguisher icon from public folder
      try {
        const iconUrl = '/pixil-frame-0.png';
        map.loadImage(iconUrl, (err, image) => {
          if (err || !image) return;
          try {
            if (!map.hasImage('extinguisher-icon')) {
              map.addImage('extinguisher-icon', image);
            }
          } catch (_) {}
        });
      } catch (_) {}

      // Building outline source and layer
      map.addSource('building', {
        type: 'geojson',
        data: new URL('jesus-building.geojson', document.baseURI).href
      });
      map.addLayer({
        id: 'building-outline',
        type: 'line',
        source: 'building',
        paint: {
          'line-color': '#7c3aed',
          'line-width': 3
        }
      });
      // Route layer for displaying computed paths
      map.addSource('route', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      map.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          // Use the primary accent colour for the route highlight
          'line-color': '#7c3aed',
          'line-width': 4
        }
      });

      // Source and layers for highlighting a room on hover.  This
      // highlight layer sits above the draw layers and draws a filled
      // polygon and outline for the room under the mouse pointer.
      map.addSource('hover-room', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      map.addLayer({
        id: 'hover-room-fill',
        type: 'fill',
        source: 'hover-room',
        paint: {
          'fill-color': '#7c3aed',
          'fill-opacity': 0.25
        }
      });
      map.addLayer({
        id: 'hover-room-outline',
        type: 'line',
        source: 'hover-room',
        paint: {
          'line-color': '#7c3aed',
          'line-width': 3
        }
      });

      // Label layer for hovered room. This layer displays the room name at
      // the centre of the hovered polygon using the properties copied in
      // the mousemove handler. The halo improves readability against the
      // dark background.
      map.addLayer({
        id: 'hover-room-label',
        type: 'symbol',
        source: 'hover-room',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 14,
          'text-anchor': 'center'
        },
        paint: {
          'text-color': '#f3f4f6',
          'text-halo-color': '#000000',
          'text-halo-width': 1.2
        }
      });

      // Persistent room name labels at room centroids
      map.addSource('room-labels', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      map.addLayer({
        id: 'room-labels',
        type: 'symbol',
        source: 'room-labels',
        layout: {
          'text-field': ['coalesce', ['get', 'name'], ''],
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'text-size': 12,
          'text-anchor': 'center',
          'text-allow-overlap': false
        },
        paint: {
          'text-color': '#f3f4f6',
          'text-halo-color': '#000000',
          'text-halo-width': 1
        }
      });
      try { map.moveLayer('room-labels'); } catch (_) {}

      // Temporary source and layers for drawing rectangles. This source
      // remains empty until a rectangle is actively being drawn.
      map.addSource('temp-rect', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      map.addLayer({
        id: 'temp-rect-fill',
        type: 'fill',
        source: 'temp-rect',
        paint: {
          'fill-color': '#7c3aed',
          'fill-opacity': 0.2
        }
      });
      map.addLayer({
        id: 'temp-rect-outline',
        type: 'line',
        source: 'temp-rect',
        paint: {
          'line-color': '#7c3aed',
          'line-width': 2
        }
      });

      // Temporary source and layer for door preview while dragging.
      map.addSource('temp-door', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      map.addLayer({
        id: 'temp-door-layer',
        type: 'circle',
        source: 'temp-door',
        paint: {
          'circle-radius': 7,
          'circle-color': '#a855f7',
          'circle-stroke-color': '#f4f4f5',
          'circle-stroke-width': 1.5
        }
      });

      // Ensure all Mapbox Draw layers are on top so symbols (e.g., extinguisher) are visible
      moveDrawLayersToTop();

      // Add explicit symbol layers bound to Mapbox Draw sources to render extinguisher icons
      try {
        if (!map.getLayer('extinguisher-icon-cold')) {
          map.addLayer({
            id: 'extinguisher-icon-cold',
            type: 'symbol',
            source: 'mapbox-gl-draw-cold',
            filter: [
              'all',
              ['==', ['geometry-type'], 'Point'],
              [
                '==',
                ['downcase', ['coalesce', ['get', 'kind'], ['get', 'user_kind'], '']],
                'extinguisher'
              ]
            ],
            layout: {
              'icon-image': 'extinguisher-icon',
              'icon-size': 0.9,
              'icon-allow-overlap': true,
              'icon-ignore-placement': true
            }
          });
        }
      } catch (_) {}
      try {
        if (!map.getLayer('extinguisher-icon-hot')) {
          map.addLayer({
            id: 'extinguisher-icon-hot',
            type: 'symbol',
            source: 'mapbox-gl-draw-hot',
            filter: [
              'all',
              ['==', ['geometry-type'], 'Point'],
              [
                '==',
                ['downcase', ['coalesce', ['get', 'kind'], ['get', 'user_kind'], '']],
                'extinguisher'
              ]
            ],
            layout: {
              'icon-image': 'extinguisher-icon',
              'icon-size': 0.9,
              'icon-allow-overlap': true,
              'icon-ignore-placement': true
            }
          });
        }
      } catch (_) {}

      // Lift the extinguisher icon layers above others
      try { map.moveLayer('extinguisher-icon-cold'); } catch (_) {}
      try { map.moveLayer('extinguisher-icon-hot'); } catch (_) {}

    });

    // Initialise Mapbox Draw
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      styles: DRAW_STYLE,
      // Preserve custom properties like 'kind' on features so our filters work
      userProperties: true
    });
    drawRef.current = draw;
    map.addControl(draw);
    // After Draw adds its layers, move them to the top
    moveDrawLayersToTop();
    try { map.moveLayer('gl-draw-point-extinguisher-icon'); } catch (_) {}
    // Keep the icon layer above the circle layer to ensure visibility
    try { map.moveLayer('gl-draw-point-colored'); } catch (_) {}
    try { map.moveLayer('extinguisher-icon-cold'); } catch (_) {}
    try { map.moveLayer('extinguisher-icon-hot'); } catch (_) {}
    // Also keep them on top after any style updates (e.g., style reloads)
    map.on('styledata', moveDrawLayersToTop);

    // Helper to refresh room name labels
    const refreshRoomLabels = () => {
      try {
        const mapObj = mapRef.current;
        const drawObj = drawRef.current;
        if (!mapObj || !drawObj) return;
        const src = mapObj.getSource('room-labels');
        if (!src) return;
        const all = drawObj.getAll();
        const features = (all.features || [])
          .filter((feat) => feat.properties && feat.properties.kind === 'room' && feat.geometry && feat.geometry.type === 'Polygon')
          .map((feat) => {
            const name = (feat.properties && feat.properties.name) || '';
            const centroid = centroidPoly(feat.geometry.coordinates);
            return {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: centroid },
              properties: { name }
            };
          })
          .filter((f) => f.properties && typeof f.properties.name === 'string' && f.properties.name.trim() !== '');
        src.setData({ type: 'FeatureCollection', features });
      } catch (_) {}
    };

    // Helper to refresh room list state
    function updateRooms() {
      const all = draw.getAll();
      const roomFeatures = all.features.filter(
        (feat) => feat.properties && feat.properties.kind === 'room'
      );
      setRooms(roomFeatures);
      refreshRoomLabels();
    }

    // Assign properties on feature creation
    map.on('draw.create', (e) => {
      e.features.forEach((feat) => {
        const id = feat.id;
        if (feat.geometry.type === 'Polygon') {
          // Room
          draw.setFeatureProperty(id, 'kind', 'room');
          draw.setFeatureProperty(id, 'name', 'Nowy pokój');
          draw.setFeatureProperty(id, 'department', '');
          draw.setFeatureProperty(id, 'occupant', '');
        } else if (feat.geometry.type === 'LineString') {
          // Path
          draw.setFeatureProperty(id, 'kind', 'path');
        } else if (feat.geometry.type === 'Point') {
          // Point types: evac, extinguisher, hose, door, default
          const pType = pointTypeRef.current;
          if (pType === 'door') {
            draw.setFeatureProperty(id, 'kind', 'door');
            // Associate this door with the currently selected room (if any)
            if (doorRoomRef.current) {
              draw.setFeatureProperty(id, 'roomId', doorRoomRef.current);
            }
            // Reset the doorRoomRef so the next point isn't erroneously linked
            doorRoomRef.current = null;
          } else {
            // Normalize to lowercase strings so style "match" works
            const normalized = String(pType || '').trim().toLowerCase();
            draw.setFeatureProperty(id, 'kind', normalized);
            // also set user_kind for compatibility with older data
            draw.setFeatureProperty(id, 'user_kind', normalized);
          }
          // Ensure Draw metadata says this is a feature
          draw.setFeatureProperty(id, 'meta', 'feature');
        }
      });
      updateRooms();
      saveFeatures();
    });
    // Update state on edit
    map.on('draw.update', () => {
      updateRooms();
      saveFeatures();
    });
    map.on('draw.delete', () => {
      updateRooms();
      setSelectedFeature(null);
      saveFeatures();
    });
    // Listen for selection changes to display room details
    map.on('draw.selectionchange', (e) => {
      if (e.features && e.features.length > 0) {
        const f = e.features[0];
        // Clone feature to avoid mutation of state from external lib
        setSelectedFeature(JSON.parse(JSON.stringify(f)));
      } else {
        setSelectedFeature(null);
      }
    });

    // Highlight rooms on mouse move.  When the pointer hovers over a room
    // polygon, populate the hover-room source with its geometry and change
    // the cursor to indicate interactivity.
    map.on('mousemove', (e) => {
      // Query the draw layers for polygons
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['gl-draw-polygon-fill', 'gl-draw-polygon-outline']
      });
      let found = null;
      for (const feat of features) {
        if (feat.properties && feat.properties.kind === 'room') {
          found = feat;
          break;
        }
      }
      if (found) {
        map.getCanvas().style.cursor = 'pointer';
        // When hovering a room, copy its properties so the label layer can
        // access the room name. Without copying properties, the label would
        // not know what text to render.
        const geo = {
          type: 'Feature',
          geometry: found.geometry,
          properties: found.properties || {}
        };
        const hoverSource = map.getSource('hover-room');
        if (hoverSource) hoverSource.setData(geo);
      } else {
        map.getCanvas().style.cursor = '';
        const hoverSource = map.getSource('hover-room');
        if (hoverSource) {
          hoverSource.setData({ type: 'FeatureCollection', features: [] });
        }
      }
    });

    // Restore previously saved features
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.features);
      if (saved) {
        const data = JSON.parse(saved);
        if (data && data.type === 'FeatureCollection' && Array.isArray(data.features)) {
          data.features.forEach((f) => {
            try {
              const addedIds = draw.add(f);
              // MapboxDraw.add returns an id or an array of ids; resolve to a single id
              const id = Array.isArray(addedIds) ? addedIds[0] : addedIds;
              let kind = (f.properties && typeof f.properties.kind === 'string') ? f.properties.kind.trim().toLowerCase() : '';
              if (!kind && f.properties && typeof f.properties.user_kind === 'string') {
                kind = f.properties.user_kind.trim().toLowerCase();
              }
              if (kind !== 'evac' && kind !== 'extinguisher' && kind !== 'hose' && kind !== 'door' && kind !== 'room' && kind !== 'path') {
                // leave empty for unknown points so they render gray
                if (f.geometry && f.geometry.type === 'Point') kind = '';
              }
              if (id) {
                try { draw.setFeatureProperty(id, 'kind', kind); } catch (_) {}
                try { draw.setFeatureProperty(id, 'user_kind', kind); } catch (_) {}
                try { draw.setFeatureProperty(id, 'meta', 'feature'); } catch (_) {}
              }
            } catch (_) {}
          });
          updateRooms();
          refreshRoomLabels();
        }
      }
    } catch (_) {}

    return () => {
      map.remove();
    };
  }, []);

  // Update room property when editing in the side panel
  const updateProperty = (key, value) => {
    if (!selectedFeature) return;
    const featureId = selectedFeature.id;
    drawRef.current.setFeatureProperty(featureId, key, value);
    // Update local state to reflect the change
    setSelectedFeature((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        properties: {
          ...prev.properties,
          [key]: value
        }
      };
    });
    // Refresh rooms list so names show up in select boxes
    const all = drawRef.current.getAll();
    const roomFeatures = all.features.filter(
      (feat) => feat.properties && feat.properties.kind === 'room'
    );
    setRooms(roomFeatures);
    // Persist after property updates
    saveFeatures();
  };

  // Command functions to start drawing
  const startDrawRoom = () => {
    drawRef.current.changeMode('draw_polygon');
  };
  const startDrawPath = () => {
    drawRef.current.changeMode('draw_line_string');
  };
  const startDrawPoint = (type) => {
    setPointType(type);
    // update ref to ensure draw.create uses latest type
    pointTypeRef.current = String(type || '').trim().toLowerCase();
    drawRef.current.changeMode('draw_point');
  };

  /**
   * Begin dragging a special point (e.g., extinguisher) anywhere on the map.
   * A temporary preview follows the cursor until mouseup, when the point is
   * committed to the draw layer. The preview uses the same temporary door
   * source for simplicity.
   *
   * @param {string} type One of 'evac', 'extinguisher' or 'hose'
   */
  const startDragSpecial = (type) => {
    // Leave draw mode so events are not intercepted
    drawRef.current.changeMode('simple_select');
    const map = mapRef.current;
    const canvas = map.getCanvas();
    canvas.style.cursor = 'crosshair';
    // Show preview as the user moves the mouse
    const onMouseMove = (e) => {
      const coord = [e.lngLat.lng, e.lngLat.lat];
      const geo = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: coord },
            properties: {}
          }
        ]
      };
      const src = map.getSource('temp-door');
      if (src) src.setData(geo);
    };
    const onMouseUp = (e) => {
      const coord = [e.lngLat.lng, e.lngLat.lat];
      const feature = {
        id: String(Date.now()),
        type: 'Feature',
        geometry: { type: 'Point', coordinates: coord },
        properties: {
          kind: type
        }
      };
      try {
        drawRef.current.add(feature);
        // Ensure 'kind' is persisted in case Draw modifies properties
        drawRef.current.setFeatureProperty(feature.id, 'kind', type);
        saveFeatures();
      } catch (_) {}
      // Clear preview
      const src = map.getSource('temp-door');
      if (src) src.setData({ type: 'FeatureCollection', features: [] });
      // Remove listeners and restore cursor
      map.off('mousemove', onMouseMove);
      canvas.style.cursor = '';
    };
    map.on('mousemove', onMouseMove);
    map.once('mouseup', onMouseUp);
  };
  /**
   * Begin drawing an open door associated with the selected room. The user
   * drags the cursor towards the desired location on the room boundary. The
   * door preview snaps to the nearest point on the room outline as the
   * cursor moves. On mouse release, a permanent door feature is added and
   * linked to the room. If no room is selected, an alert will be shown.
   */
  const startDrawDoor = () => {
    if (!selectedFeature || !selectedFeature.properties || selectedFeature.properties.kind !== 'room') {
      alert('Najpierw wybierz pokój, do którego chcesz dodać drzwi.');
      return;
    }
    // Exit any active draw mode so Mapbox Draw doesn’t intercept events
    drawRef.current.changeMode('simple_select');
    const map = mapRef.current;
    const canvas = map.getCanvas();
    const roomFeature = selectedFeature;
    const ring = roomFeature.geometry.coordinates[0];
    // Update the cursor
    canvas.style.cursor = 'crosshair';
    // Handler for mouse move: update the temporary door location
    const onMouseMove = (e) => {
      const pt = [e.lngLat.lng, e.lngLat.lat];
      const snapped = nearestPointOnPolygon(ring, pt);
      const geo = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: snapped },
            properties: {}
          }
        ]
      };
      const src = map.getSource('temp-door');
      if (src) src.setData(geo);
    };
    // Handler for mouse up: finalise the door
    const onMouseUp = (e) => {
      const pt = [e.lngLat.lng, e.lngLat.lat];
      const snapped = nearestPointOnPolygon(ring, pt);
      // Add permanent door feature
      const feature = {
        id: String(Date.now()),
        type: 'Feature',
        geometry: { type: 'Point', coordinates: snapped },
        properties: {
          kind: 'door',
          roomId: roomFeature.id
        }
      };
      drawRef.current.add(feature);
      saveFeatures();
      // Clear temporary preview
      const src = map.getSource('temp-door');
      if (src) {
        src.setData({ type: 'FeatureCollection', features: [] });
      }
      // Remove event listeners
      map.off('mousemove', onMouseMove);
      canvas.style.cursor = '';
    };
    // Attach listeners
    map.on('mousemove', onMouseMove);
    map.once('mouseup', onMouseUp);
  };
  const deleteSelected = () => {
    const selectedIds = drawRef.current.getSelectedIds();
    if (selectedIds.length > 0) {
      drawRef.current.delete(selectedIds);
    }
  };

  /**
   * Toggle between administrator view and user view. In user view the
   * sidebar with drawing tools is hidden and drawing interactions are
   * disabled. Switching back to admin view restores editing capabilities.
   */
  const toggleUserView = () => {
    setUserView((prev) => {
      const next = !prev;
      if (next) {
        // Entering user view: ensure no drawing mode is active
        if (drawRef.current) {
          drawRef.current.changeMode('simple_select');
        }
      }
      return next;
    });
  };

  /**
   * Animate the route by gradually revealing segments of the path. The route
   * source is updated in small increments to create a flowing effect from
   * the start door/room to the end door/room. Any ongoing animation will
   * be cancelled before starting a new one.
   *
   * @param {number[][]} coords Ordered list of [lng, lat] route coordinates
   */
  const startRouteAnimation = (coords) => {
    const map = mapRef.current;
    if (!map) return;
    // Cancel any ongoing animation
    if (routeAnimRef.current) {
      clearInterval(routeAnimRef.current);
      routeAnimRef.current = null;
    }
    // If there are less than two points just draw nothing
    if (!coords || coords.length < 2) {
      const src = map.getSource('route');
      if (src) src.setData({ type: 'FeatureCollection', features: [] });
      return;
    }
    // Start with the first two coordinates to draw an initial segment
    let i = 2;
    const total = coords.length;
    const src = map.getSource('route');
    if (src) {
      src.setData({
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: coords.slice(0, 2) },
        properties: {}
      });
    }
    // Interval to append the next coordinate and extend the line gradually
    // The interval duration controls how quickly the path is drawn.  A longer
    // interval produces a slower, more pronounced animation.  We use 200ms
    // here to significantly lengthen the animation compared with the
    // previous 50ms default.
    routeAnimRef.current = setInterval(() => {
      if (i > total) {
        clearInterval(routeAnimRef.current);
        routeAnimRef.current = null;
        // Clear the route so that it does not persist after animation completes
        if (src) {
          src.setData({ type: 'FeatureCollection', features: [] });
        }
        return;
      }
      if (src) {
        src.setData({
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: coords.slice(0, i) },
          properties: {}
        });
      }
      i++;
    }, 200);
  };

  /**
   * Begin drawing a rectangular room. The user clicks and drags on the map
   * to define the bounding box. A temporary rectangle shows as feedback
   * during drawing. On mouse up, the rectangle is added as a new room
   * feature to the draw layer with default properties.
   */
  const startDrawRect = () => {
    if (!mapRef.current || !drawRef.current || drawingRect) return;
    // Exit any active draw mode
    drawRef.current.changeMode('simple_select');
    setDrawingRect(true);
    const map = mapRef.current;
    const canvas = map.getCanvas();
    canvas.style.cursor = 'crosshair';
    let startLngLat = null;
    // Function to update temporary rectangle on mouse move
    const onMouseMove = (e) => {
      if (!startLngLat) return;
      const end = [e.lngLat.lng, e.lngLat.lat];
      const minLng = Math.min(startLngLat[0], end[0]);
      const maxLng = Math.max(startLngLat[0], end[0]);
      const minLat = Math.min(startLngLat[1], end[1]);
      const maxLat = Math.max(startLngLat[1], end[1]);
      const coords = [
        [minLng, minLat],
        [maxLng, minLat],
        [maxLng, maxLat],
        [minLng, maxLat],
        [minLng, minLat]
      ];
      const tempGeo = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [coords] },
            properties: {}
          }
        ]
      };
      const src = map.getSource('temp-rect');
      if (src) src.setData(tempGeo);
    };
    // Function called when user releases mouse button
    const onMouseUp = (e) => {
      if (!startLngLat) return;
      const endLngLat = [e.lngLat.lng, e.lngLat.lat];
      const minLng = Math.min(startLngLat[0], endLngLat[0]);
      const maxLng = Math.max(startLngLat[0], endLngLat[0]);
      const minLat = Math.min(startLngLat[1], endLngLat[1]);
      const maxLat = Math.max(startLngLat[1], endLngLat[1]);
      const coords = [
        [minLng, minLat],
        [maxLng, minLat],
        [maxLng, maxLat],
        [minLng, maxLat],
        [minLng, minLat]
      ];
      // Create a new room feature and add it to draw
      const feature = {
        id: String(Date.now()),
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [coords] },
        properties: {
          kind: 'room',
          name: 'Nowy pokój',
          department: '',
          occupant: ''
        }
      };
      drawRef.current.add(feature);
      saveFeatures();
      // Clear temporary rectangle
      const src = map.getSource('temp-rect');
      if (src) {
        src.setData({ type: 'FeatureCollection', features: [] });
      }
      // Remove listeners and reset state
      map.off('mousemove', onMouseMove);
      canvas.style.cursor = '';
      startLngLat = null;
      setDrawingRect(false);
      // Update the rooms list
      const all = drawRef.current.getAll();
      const roomFeatures = all.features.filter(
        (feat) => feat.properties && feat.properties.kind === 'room'
      );
      setRooms(roomFeatures);
    };
    // Function called when user starts dragging
    const onMouseDown = (e) => {
      startLngLat = [e.lngLat.lng, e.lngLat.lat];
      map.on('mousemove', onMouseMove);
      map.once('mouseup', onMouseUp);
    };
    map.once('mousedown', onMouseDown);
  };

  // Compute and display route between selected rooms
  const handleComputeRoute = () => {
    if (!startRoom || !endRoom || startRoom === endRoom) {
      // Clear route if invalid selection
      const src = mapRef.current.getSource('route');
      if (src) src.setData({ type: 'FeatureCollection', features: [] });
      return;
    }
    const allFeatures = drawRef.current.getAll().features;
    // Ensure both rooms have at least one door before computing the route
    const hasStartDoor = allFeatures.some((f) => f.properties && f.properties.kind === 'door' && f.properties.roomId === startRoom);
    const hasEndDoor = allFeatures.some((f) => f.properties && f.properties.kind === 'door' && f.properties.roomId === endRoom);
    if (!hasStartDoor || !hasEndDoor) {
      alert('Aby wyznaczyć trasę, oba pokoje muszą posiadać drzwi. Dodaj drzwi do każdego pokoju.');
      const src = mapRef.current.getSource('route');
      if (src) src.setData({ type: 'FeatureCollection', features: [] });
      return;
    }
    const path = computeRoute(allFeatures, startRoom, endRoom);
    if (path && path.length > 1) {
      // Animate the route instead of drawing it all at once
      startRouteAnimation(path);
    } else {
      // No path found: clear existing route
      const src = mapRef.current.getSource('route');
      if (src) src.setData({ type: 'FeatureCollection', features: [] });
    }
  };

  return (
    <div id="app-container">
      <div id="map"></div>
      {/* Toggle button for switching between admin and user views */}
      <div id="mode-toggle">
        <button
          className="btn btn-secondary"
          onClick={toggleUserView}
        >
          {userView ? 'Tryb administratora' : 'Podgląd użytkownika'}
        </button>
      </div>
      {!userView && (
      <div id="sidebar">
        <h2 className="sidebar-title">Panel administracyjny</h2>
        <div className="section">
          <h3>Rysowanie</h3>
          <div className="controls">
            <button className="btn" onClick={startDrawRoom}>Pokój (poligon)</button>
            <button className="btn" onClick={startDrawRect}>Pokój (prostokąt)</button>
            <button className="btn" onClick={startDrawPath}>Dodaj ścieżkę</button>
            <button className="btn" onClick={startDrawDoor}>🚪 Dodaj drzwi</button>
            {/*
             * Specjalne punkty są teraz dodawane poprzez przeciągnięcie w dowolne miejsce
             * na mapie. Po kliknięciu przycisku zmieniamy tryb rysowania na tryb prosty
             * i pokazujemy podgląd ikony pod kursorem. Na puszczeniu myszy punkt jest
             * zapisywany w warstwie Draw. Dzięki temu użytkownik może precyzyjnie
             * umieścić znacznik i zobaczyć, jak będzie wyglądał na mapie.
             */}
            <button className="btn" onClick={() => startDrawPoint('evac')}>
              🚪 Ewakuacja
            </button>
            <button className="btn" onClick={() => startDrawPoint('extinguisher')}>
              🔥 Gaśnica
            </button>
            <button className="btn" onClick={() => startDrawPoint('hose')}>
              💧 Wąż
            </button>
            <button className="btn" onClick={deleteSelected}>Usuń</button>
          </div>
        </div>
        <hr className="divider" />
        <div className="section">
          <h3>Wyznacz trasę</h3>
          <label>Start:</label>
          <select value={startRoom} onChange={(e) => setStartRoom(e.target.value)}>
            <option value="">-- wybierz pokój --</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.properties && r.properties.name ? r.properties.name : r.id}
              </option>
            ))}
          </select>
          <label>Cel:</label>
          <select value={endRoom} onChange={(e) => setEndRoom(e.target.value)}>
            <option value="">-- wybierz pokój --</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.properties && r.properties.name ? r.properties.name : r.id}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleComputeRoute}>
            Wyznacz trasę
          </button>
        </div>
        {selectedFeature && selectedFeature.properties && selectedFeature.properties.kind === 'room' && (
          <>
            <hr className="divider" />
            <div className="section">
              <h3>Szczegóły pokoju</h3>
              <label>Nazwa:</label>
              <input
                value={selectedFeature.properties.name || ''}
                onChange={(e) => updateProperty('name', e.target.value)}
              />
              <label>Departament:</label>
              <input
                value={selectedFeature.properties.department || ''}
                onChange={(e) => updateProperty('department', e.target.value)}
              />
              <label>Osoby:</label>
              <textarea
                value={selectedFeature.properties.occupant || ''}
                onChange={(e) => updateProperty('occupant', e.target.value)}
              ></textarea>
            </div>
          </>
        )}

        {selectedFeature && selectedFeature.properties && selectedFeature.geometry && selectedFeature.geometry.type === 'Point' && (
          <>
            <hr className="divider" />
            <div className="section">
              <h3>Szczegóły punktu</h3>
              <p>Typ: <strong>{selectedFeature.properties.kind || 'punkt'}</strong></p>
              {selectedFeature.properties.kind === 'door' && selectedFeature.properties.roomId && (
                <p>Pokój: <code>{selectedFeature.properties.roomId}</code></p>
              )}
              <button className="btn" onClick={deleteSelected}>Usuń zaznaczony punkt</button>
            </div>
          </>
        )}

        <hr className="divider" />
        <div className="section">
          <h3>Pomoc</h3>
          <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#9ca3af' }}>
            <strong>Rysowanie pokojów:</strong> Wybierz odpowiednią opcję, aby rysować pokoje
            w kształcie poligonu lub prostokąta. Podczas rysowania poligonu możesz przytrzymać
            klawisz <kbd>Shift</kbd>, aby utrzymać kąt prosty względem poprzedniej krawędzi.
          </p>
          <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#9ca3af' }}>
            <strong>Ścieżki i punkty:</strong> Ścieżki łączą pokoje i korytarze; punkty ewakuacji 🚪,
            gaśnic 🔥 i węży 💧 możesz dodawać w odpowiednich miejscach. Drzwi należy
            dodawać po wybraniu pokoju – służą jako początek lub koniec trasy.
          </p>
          <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#9ca3af' }}>
            <strong>Wyznaczanie trasy:</strong> Wybierz startowy i docelowy pokój, a następnie kliknij
            <em>Wyznacz trasę</em>. Trasa będzie animowana i zniknie po zakończeniu.
          </p>
        </div>
      </div>
      )}
    </div>
  );
}