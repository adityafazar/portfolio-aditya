import fs from 'fs';
import sharp from 'sharp';

// Ramer-Douglas-Peucker algorithm
function rdp(points, epsilon) {
  if (points.length <= 2) return points;
  let dmax = 0;
  let index = 0;
  const start = points[0];
  const end = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i], start, end);
    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }

  if (dmax > epsilon) {
    const left = rdp(points.slice(0, index + 1), epsilon);
    const right = rdp(points.slice(index), epsilon);
    return left.slice(0, -1).concat(right);
  } else {
    return [start, end];
  }
}

function perpendicularDistance(pt, lineStart, lineEnd) {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  const mag = Math.hypot(dx, dy);
  if (mag === 0) return Math.hypot(pt.x - lineStart.x, pt.y - lineStart.y);
  const u = ((pt.x - lineStart.x) * dx + (pt.y - lineStart.y) * dy) / (mag * mag);
  const ix = lineStart.x + u * dx;
  const iy = lineStart.y + u * dy;
  return Math.hypot(pt.x - ix, pt.y - iy);
}

// Convert polygon to smooth closed SVG cubic bezier path
function pointsToSmoothPath(pts) {
  if (pts.length < 3) return '';
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];

    // Catmull-Rom to Cubic Bezier control points for segment p1 -> p2
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  d += ' Z';
  return d;
}

async function run() {
  const { data, info } = await sharp('public/hero-scribble-pure.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const w = info.width, h = info.height;
  const visited = new Uint8Array(w * h);
  const isSolid = (x, y) => (x >= 0 && x < w && y >= 0 && y < h && data[(y * w + x) * 4 + 3] > 100);

  const DIRS = [
    {dx: 1, dy: 0},
    {dx: 1, dy: 1},
    {dx: 0, dy: 1},
    {dx: -1, dy: 1},
    {dx: -1, dy: 0},
    {dx: -1, dy: -1},
    {dx: 0, dy: -1},
    {dx: 1, dy: -1}
  ];

  const contours = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (isSolid(x, y) && !visited[y * w + x]) {
        if (!isSolid(x - 1, y)) {
          const contour = [];
          let curr = { x, y };
          let backtrack = { x: x - 1, y };
          let steps = 0;
          const startX = x, startY = y;

          while (steps < 200000) {
            steps++;
            contour.push({ x: curr.x, y: curr.y });
            visited[curr.y * w + curr.x] = 1;

            let bDir = 0;
            for (let d = 0; d < 8; d++) {
              if (curr.x + DIRS[d].dx === backtrack.x && curr.y + DIRS[d].dy === backtrack.y) {
                bDir = d;
                break;
              }
            }

            let found = false;
            for (let i = 1; i <= 8; i++) {
              const nextDir = (bDir + i) % 8;
              const nx = curr.x + DIRS[nextDir].dx;
              const ny = curr.y + DIRS[nextDir].dy;
              if (isSolid(nx, ny)) {
                const lastEmptyDir = (nextDir + 7) % 8;
                backtrack = { x: curr.x + DIRS[lastEmptyDir].dx, y: curr.y + DIRS[lastEmptyDir].dy };
                curr = { x: nx, y: ny };
                found = true;
                break;
              }
            }

            if (!found || (curr.x === startX && curr.y === startY)) break;
          }

          if (contour.length > 50) {
            contours.push(contour);
          }
        }
      }
    }
  }

  console.log(`Extracted ${contours.length} contours with lengths:`, contours.map(c => c.length));

  // Simplify and smooth each contour
  let pathD = '';
  for (const rawContour of contours) {
    const simplified = rdp(rawContour, 1.2);
    console.log(`Contour points: ${rawContour.length} -> simplified: ${simplified.length}`);
    const d = pointsToSmoothPath(simplified);
    pathD += ' ' + d;
  }

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="black" fill-rule="evenodd">\n  <path d="${pathD.trim()}" />\n</svg>\n`;

  fs.writeFileSync('public/hero-scribble.svg', svgContent);
  console.log('Successfully wrote public/hero-scribble.svg, size:', svgContent.length);
}

run();

