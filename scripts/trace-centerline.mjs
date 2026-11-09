import fs from 'fs';
import sharp from 'sharp';

async function main() {
  const { data, info } = await sharp('public/hero-scribble-pure.png')
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const w = info.width, h = info.height;
  const isSolid = (x, y) => (x >= 0 && x < w && y >= 0 && y < h && data[(Math.round(y) * w + Math.round(x)) * 4 + 3] > 100);

  // Helper to find center of stroke near (x, y) given search normal
  function refineCenter(x, y, nx, ny, radius = 15) {
    let sumX = 0, sumY = 0, count = 0;
    for (let r = -radius; r <= radius; r += 0.5) {
      const px = x + nx * r;
      const py = y + ny * r;
      if (isSolid(px, py)) {
        sumX += px;
        sumY += py;
        count++;
      }
    }
    if (count > 0) return { x: sumX / count, y: sumY / count };
    return { x, y };
  }

  // Walk stroke 1: from top-left (330, 126) -> over the top -> right side -> oktober
  const stroke1 = [];
  let curr = { x: 330, y: 126 };
  let angle = -Math.PI * 0.42; // pointing up and right
  stroke1.push(curr);

  for (let step = 0; step < 500; step++) {
    // Probe ahead along angle
    const stepSize = 8;
    const probeX = curr.x + Math.cos(angle) * stepSize;
    const probeY = curr.y + Math.sin(angle) * stepSize;
    
    // Normal to probe direction
    const normX = -Math.sin(angle);
    const normY = Math.cos(angle);

    // Refine center
    const next = refineCenter(probeX, probeY, normX, normY, 12);
    
    // Check if next is still on solid stroke
    if (!isSolid(next.x, next.y)) {
      // Try scanning a fan of angles (-60 to +60 deg)
      let found = false;
      for (let da = -Math.PI / 3; da <= Math.PI / 3; da += Math.PI / 18) {
        const testA = angle + da;
        const tx = curr.x + Math.cos(testA) * stepSize;
        const ty = curr.y + Math.sin(testA) * stepSize;
        if (isSolid(tx, ty)) {
          const refined = refineCenter(tx, ty, -Math.sin(testA), Math.cos(testA), 12);
          angle = testA;
          curr = refined;
          stroke1.push(curr);
          found = true;
          break;
        }
      }
      if (!found) break;
    } else {
      const dx = next.x - curr.x;
      const dy = next.y - curr.y;
      if (Math.hypot(dx, dy) > 2) {
        angle = Math.atan2(dy, dx);
        curr = next;
        stroke1.push(curr);
      } else {
        break;
      }
    }

    // Stop if we reach near Oktober end (around x: 602, y: 425)
    if (curr.x > 585 && curr.y > 415 && stroke1.length > 100) {
      break;
    }
  }

  console.log('Stroke 1 walked points:', stroke1.length, 'start:', stroke1[0], 'end:', stroke1[stroke1.length - 1]);

  // Walk stroke 2: from bottom-left (0, 526) -> curve down -> right -> up to (350, 348)
  const stroke2 = [];
  curr = { x: 0, y: 526 };
  angle = Math.PI * 0.12; // pointing slightly down and right
  stroke2.push(curr);

  for (let step = 0; step < 500; step++) {
    const stepSize = 8;
    const probeX = curr.x + Math.cos(angle) * stepSize;
    const probeY = curr.y + Math.sin(angle) * stepSize;
    
    const normX = -Math.sin(angle);
    const normY = Math.cos(angle);

    const next = refineCenter(probeX, probeY, normX, normY, 12);
    
    if (!isSolid(next.x, next.y)) {
      let found = false;
      for (let da = -Math.PI / 3; da <= Math.PI / 3; da += Math.PI / 18) {
        const testA = angle + da;
        const tx = curr.x + Math.cos(testA) * stepSize;
        const ty = curr.y + Math.sin(testA) * stepSize;
        if (isSolid(tx, ty)) {
          const refined = refineCenter(tx, ty, -Math.sin(testA), Math.cos(testA), 12);
          angle = testA;
          curr = refined;
          stroke2.push(curr);
          found = true;
          break;
        }
      }
      if (!found) break;
    } else {
      const dx = next.x - curr.x;
      const dy = next.y - curr.y;
      if (Math.hypot(dx, dy) > 2) {
        angle = Math.atan2(dy, dx);
        curr = next;
        stroke2.push(curr);
      } else {
        break;
      }
    }

    if (curr.x < 370 && curr.y < 355 && stroke2.length > 50) {
      break;
    }
  }

  console.log('Stroke 2 walked points:', stroke2.length, 'start:', stroke2[0], 'end:', stroke2[stroke2.length - 1]);

  // Convert points to smooth open cubic bezier SVG path
  function toOpenSmoothPath(pts) {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }

  const d1 = toOpenSmoothPath(stroke1);
  const d2 = toOpenSmoothPath(stroke2);

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none">
  <path d="${d1}" stroke="black" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="${d2}" stroke="black" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>\n`;

  fs.writeFileSync('public/hero-scribble-vector.svg', svgContent);
  console.log('Wrote public/hero-scribble-vector.svg');
}

main();

