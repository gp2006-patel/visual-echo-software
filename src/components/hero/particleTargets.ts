import { createRandom } from "@/lib/performance";

export interface ParticleTargets {
  room: Float32Array;
  tree: Float32Array;
  ripple: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  seeds: Float32Array;
}

const BRASS: [number, number, number] = [0.79, 0.65, 0.42];
const IVORY: [number, number, number] = [0.96, 0.94, 0.9];
const COOL: [number, number, number] = [0.72, 0.78, 0.88];

/** Sample the studio name from an offscreen 2D canvas into normalised points. */
function sampleText(text: string, limit: number, rand: () => number): Array<[number, number]> {
  const points: Array<[number, number]> = [];
  if (typeof document === "undefined") return points;
  const width = 512;
  const height = 128;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return points;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.font = "600 64px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);
  const data = ctx.getImageData(0, 0, width, height).data;
  const candidates: Array<[number, number]> = [];
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (data[(y * width + x) * 4] > 128) {
        candidates.push([x / width - 0.5, 0.5 - y / height]);
      }
    }
  }
  if (candidates.length === 0) return points;
  for (let i = 0; i < limit; i++) {
    const pick = candidates[Math.floor(rand() * candidates.length)]!;
    points.push([pick[0], pick[1]]);
  }
  return points;
}

function buildTree(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3);
  const branches: Array<{
    x: number;
    y: number;
    z: number;
    dx: number;
    dy: number;
    dz: number;
    len: number;
    depth: number;
  }> = [{ x: 0, y: -2.6, z: 0, dx: 0, dy: 1, dz: 0, len: 1.5, depth: 0 }];

  const segments: Array<{ ax: number; ay: number; az: number; bx: number; by: number; bz: number; depth: number }> = [];

  while (branches.length > 0) {
    const b = branches.pop()!;
    const bx = b.x + b.dx * b.len;
    const by = b.y + b.dy * b.len;
    const bz = b.z + b.dz * b.len;
    segments.push({ ax: b.x, ay: b.y, az: b.z, bx, by, bz, depth: b.depth });
    if (b.depth >= 5) continue;
    const children = b.depth === 0 ? 3 : 2 + (rand() > 0.6 ? 1 : 0);
    for (let i = 0; i < children; i++) {
      const spread = 0.55 + rand() * 0.5;
      const angle = rand() * Math.PI * 2;
      let dx = b.dx + Math.cos(angle) * spread;
      let dy = b.dy + 0.35 + rand() * 0.25;
      let dz = b.dz + Math.sin(angle) * spread;
      const m = Math.hypot(dx, dy, dz) || 1;
      dx /= m;
      dy /= m;
      dz /= m;
      branches.push({ x: bx, y: by, z: bz, dx, dy, dz, len: b.len * (0.64 + rand() * 0.1), depth: b.depth + 1 });
    }
  }

  const weights = segments.map((s) => (s.depth + 1) ** 1.8);
  const total = weights.reduce((a, b) => a + b, 0);

  for (let i = 0; i < count; i++) {
    let target = rand() * total;
    let index = 0;
    while (index < segments.length - 1 && target > weights[index]!) {
      target -= weights[index]!;
      index++;
    }
    const s = segments[index]!;
    const t = rand();
    const jitter = 0.02 + s.depth * 0.035;
    out[i * 3] = s.ax + (s.bx - s.ax) * t + (rand() - 0.5) * jitter;
    out[i * 3 + 1] = s.ay + (s.by - s.ay) * t + (rand() - 0.5) * jitter;
    out[i * 3 + 2] = s.az + (s.bz - s.az) * t + (rand() - 0.5) * jitter;
  }
  return out;
}

export function buildTargets(count: number, studioName: string): ParticleTargets {
  const rand = createRandom(20260928);
  const room = new Float32Array(count * 3);
  const ripple = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count);

  const textCount = Math.floor(count * 0.18);
  const textPoints = sampleText(studioName, textCount, rand);
  const half = 1.9;

  for (let i = 0; i < count; i++) {
    // ---- Room: wireframe cube edges + sparse volume + text on one face
    const textPoint = i < textPoints.length ? textPoints[i] : undefined;
    if (textPoint) {
      room[i * 3] = textPoint[0] * 2.8;
      room[i * 3 + 1] = textPoint[1] * 1.0;
      room[i * 3 + 2] = half + 0.02;
    } else if (rand() < 0.72) {
      // edge sampling
      const axis = Math.floor(rand() * 3);
      const t = rand() * 2 - 1;
      const s1 = rand() < 0.5 ? -1 : 1;
      const s2 = rand() < 0.5 ? -1 : 1;
      const jitter = () => (rand() - 0.5) * 0.02;
      if (axis === 0) {
        room[i * 3] = t * half + jitter();
        room[i * 3 + 1] = s1 * half + jitter();
        room[i * 3 + 2] = s2 * half + jitter();
      } else if (axis === 1) {
        room[i * 3] = s1 * half + jitter();
        room[i * 3 + 1] = t * half + jitter();
        room[i * 3 + 2] = s2 * half + jitter();
      } else {
        room[i * 3] = s1 * half + jitter();
        room[i * 3 + 1] = s2 * half + jitter();
        room[i * 3 + 2] = t * half + jitter();
      }
    } else {
      room[i * 3] = (rand() * 2 - 1) * half;
      room[i * 3 + 1] = (rand() * 2 - 1) * half;
      room[i * 3 + 2] = (rand() * 2 - 1) * half;
    }

    // ---- Ripple: settled dust near a dark floor plane
    const radius = Math.sqrt(rand()) * 5.5;
    const angle = rand() * Math.PI * 2;
    ripple[i * 3] = Math.cos(angle) * radius;
    ripple[i * 3 + 1] = -2.2 + Math.pow(rand(), 3) * 1.4;
    ripple[i * 3 + 2] = Math.sin(angle) * radius;

    // ---- Look
    const roll = rand();
    const base = roll < 0.6 ? BRASS : roll < 0.9 ? IVORY : COOL;
    const shade = 0.75 + rand() * 0.45;
    colors[i * 3] = base[0] * shade;
    colors[i * 3 + 1] = base[1] * shade;
    colors[i * 3 + 2] = base[2] * shade;
    sizes[i] = 1.2 + rand() * 2.4;
    seeds[i] = rand();
  }

  return { room, tree: buildTree(count, rand), ripple, colors, sizes, seeds };
}
