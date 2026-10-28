import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard 5x7 bitmap font for rendering crisp text in pure Node without external canvas/cairo deps
const FONT = {
  ' ': [0, 0, 0, 0, 0],
  '.': [0, 0x60, 0x60, 0, 0],
  ',': [0, 0x80, 0x60, 0x20, 0],
  ':': [0, 0x66, 0x66, 0, 0],
  '-': [0x08, 0x08, 0x08, 0x08, 0x08],
  '/': [0x40, 0x20, 0x10, 0x08, 0x04],
  '|': [0, 0, 0x7f, 0, 0],
  '•': [0, 0x1c, 0x1c, 0, 0],
  '(': [0x3e, 0x41, 0, 0, 0],
  ')': [0, 0, 0x41, 0x3e, 0],
  '&': [0x36, 0x49, 0x55, 0x22, 0x50],
  '0': [0x3e, 0x51, 0x49, 0x45, 0x3e],
  '1': [0x00, 0x42, 0x7f, 0x40, 0x00],
  '2': [0x42, 0x61, 0x51, 0x49, 0x46],
  '3': [0x21, 0x41, 0x45, 0x4b, 0x31],
  '4': [0x18, 0x14, 0x12, 0x7f, 0x10],
  '5': [0x27, 0x45, 0x45, 0x45, 0x39],
  '6': [0x3c, 0x4a, 0x49, 0x49, 0x30],
  '7': [0x01, 0x71, 0x09, 0x05, 0x03],
  '8': [0x36, 0x49, 0x49, 0x49, 0x36],
  '9': [0x06, 0x49, 0x49, 0x29, 0x1e],
  'A': [0x7e, 0x11, 0x11, 0x11, 0x7e],
  'B': [0x7f, 0x49, 0x49, 0x49, 0x36],
  'C': [0x3e, 0x41, 0x41, 0x41, 0x22],
  'D': [0x7f, 0x41, 0x41, 0x22, 0x1c],
  'E': [0x7f, 0x49, 0x49, 0x49, 0x41],
  'F': [0x7f, 0x09, 0x09, 0x09, 0x01],
  'G': [0x3e, 0x41, 0x49, 0x49, 0x7a],
  'H': [0x7f, 0x08, 0x08, 0x08, 0x7f],
  'I': [0x00, 0x41, 0x7f, 0x41, 0x00],
  'J': [0x20, 0x40, 0x41, 0x3f, 0x01],
  'K': [0x7f, 0x08, 0x14, 0x22, 0x41],
  'L': [0x7f, 0x40, 0x40, 0x40, 0x40],
  'M': [0x7f, 0x02, 0x0c, 0x02, 0x7f],
  'N': [0x7f, 0x04, 0x08, 0x10, 0x7f],
  'O': [0x3e, 0x41, 0x41, 0x41, 0x3e],
  'P': [0x7f, 0x09, 0x09, 0x09, 0x06],
  'Q': [0x3e, 0x41, 0x51, 0x21, 0x5e],
  'R': [0x7f, 0x09, 0x19, 0x29, 0x46],
  'S': [0x46, 0x49, 0x49, 0x49, 0x31],
  'T': [0x01, 0x01, 0x7f, 0x01, 0x01],
  'U': [0x3f, 0x40, 0x40, 0x40, 0x3f],
  'V': [0x1f, 0x20, 0x40, 0x20, 0x1f],
  'W': [0x7f, 0x20, 0x18, 0x20, 0x7f],
  'X': [0x63, 0x14, 0x08, 0x14, 0x63],
  'Y': [0x07, 0x08, 0x70, 0x08, 0x07],
  'Z': [0x61, 0x51, 0x49, 0x45, 0x43],
  'a': [0x20, 0x54, 0x54, 0x54, 0x78],
  'b': [0x7f, 0x48, 0x44, 0x44, 0x38],
  'c': [0x38, 0x44, 0x44, 0x44, 0x20],
  'd': [0x38, 0x44, 0x44, 0x48, 0x7f],
  'e': [0x38, 0x54, 0x54, 0x54, 0x18],
  'f': [0x08, 0x7e, 0x09, 0x01, 0x02],
  'g': [0x08, 0x14, 0x54, 0x54, 0x3c],
  'h': [0x7f, 0x08, 0x04, 0x04, 0x78],
  'i': [0x00, 0x44, 0x7d, 0x40, 0x00],
  'j': [0x20, 0x40, 0x44, 0x3d, 0x00],
  'k': [0x7f, 0x10, 0x28, 0x44, 0x00],
  'l': [0x00, 0x41, 0x7f, 0x40, 0x00],
  'm': [0x7c, 0x04, 0x18, 0x04, 0x78],
  'n': [0x7c, 0x08, 0x04, 0x04, 0x78],
  'o': [0x38, 0x44, 0x44, 0x44, 0x38],
  'p': [0x7c, 0x14, 0x14, 0x14, 0x08],
  'q': [0x08, 0x14, 0x14, 0x18, 0x7c],
  'r': [0x7c, 0x08, 0x04, 0x04, 0x08],
  's': [0x48, 0x54, 0x54, 0x54, 0x20],
  't': [0x04, 0x3f, 0x44, 0x40, 0x20],
  'u': [0x3c, 0x40, 0x40, 0x20, 0x7c],
  'v': [0x1c, 0x20, 0x40, 0x20, 0x1c],
  'w': [0x3c, 0x40, 0x30, 0x40, 0x3c],
  'x': [0x44, 0x28, 0x10, 0x28, 0x44],
  'y': [0x0c, 0x50, 0x50, 0x50, 0x3c],
  'z': [0x44, 0x64, 0x54, 0x4c, 0x44],
};

function createPng(width, height) {
  // RGBA buffer: width * height * 4
  const pixels = Buffer.alloc(width * height * 4);

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = (y * width + x) * 4;
    if (a < 255) {
      const existingA = pixels[idx + 3] / 255;
      const alpha = a / 255;
      const outA = alpha + existingA * (1 - alpha);
      if (outA > 0) {
        pixels[idx] = Math.round((r * alpha + pixels[idx] * existingA * (1 - alpha)) / outA);
        pixels[idx + 1] = Math.round((g * alpha + pixels[idx + 1] * existingA * (1 - alpha)) / outA);
        pixels[idx + 2] = Math.round((b * alpha + pixels[idx + 2] * existingA * (1 - alpha)) / outA);
        pixels[idx + 3] = Math.round(outA * 255);
      }
    } else {
      pixels[idx] = r;
      pixels[idx + 1] = g;
      pixels[idx + 2] = b;
      pixels[idx + 3] = a;
    }
  }

  function fillRect(x, y, w, h, r, g, b, a = 255) {
    for (let py = y; py < y + h; py++) {
      for (let px = x; px < x + w; px++) {
        setPixel(px, py, r, g, b, a);
      }
    }
  }

  function fillRoundedRect(x, y, w, h, radius, r, g, b, a = 255) {
    for (let py = y; py < y + h; py++) {
      for (let px = x; px < x + w; px++) {
        const dx = Math.max(x + radius - px, 0, px - (x + w - 1 - radius));
        const dy = Math.max(y + radius - py, 0, py - (y + h - 1 - radius));
        if (dx * dx + dy * dy <= radius * radius) {
          setPixel(px, py, r, g, b, a);
        }
      }
    }
  }

  function drawText(text, startX, startY, scale, r, g, b) {
    let curX = startX;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const glyph = FONT[char] || FONT[' '];
      for (let col = 0; col < 5; col++) {
        const line = glyph[col] || 0;
        for (let row = 0; row < 7; row++) {
          if ((line & (1 << row)) !== 0) {
            fillRect(curX + col * scale, startY + row * scale, scale, scale, r, g, b);
          }
        }
      }
      curX += 6 * scale;
    }
    return curX;
  }

  // 1. Background gradient (Off-white / Slate-50 to Slate-100)
  for (let y = 0; y < height; y++) {
    const t = y / height;
    const r = Math.round(248 + (238 - 248) * t);
    const g = Math.round(250 + (242 - 250) * t);
    const b = Math.round(252 + (248 - 252) * t);
    for (let x = 0; x < width; x++) {
      setPixel(x, y, r, g, b, 255);
    }
  }

  // 2. Cyan / Teal atmospheric glow on top right
  const glowX = width - 200;
  const glowY = 120;
  const maxDist = 480;
  for (let y = 0; y < 450; y++) {
    for (let x = width - 600; x < width; x++) {
      const dist = Math.hypot(x - glowX, y - glowY);
      if (dist < maxDist) {
        const alpha = Math.round(45 * (1 - dist / maxDist));
        setPixel(x, y, 2, 132, 199, alpha);
      }
    }
  }

  // 3. Subtle architectural grid lines
  for (let x = 60; x < width; x += 60) {
    for (let y = 0; y < height; y += 4) {
      setPixel(x, y, 203, 213, 225, 60);
    }
  }
  for (let y = 60; y < height; y += 60) {
    for (let x = 0; x < width; x += 4) {
      setPixel(x, y, 203, 213, 225, 60);
    }
  }

  // 4. Outer border
  fillRect(0, 0, width, 8, 2, 132, 199, 255); // Top brand accent bar
  fillRect(0, 0, 1, height, 226, 232, 240, 255);
  fillRect(width - 1, 0, 1, height, 226, 232, 240, 255);
  fillRect(0, height - 1, width, 1, 226, 232, 240, 255);

  // 5. Lettermark "R" Squircle Card on Left
  fillRoundedRect(80, 100, 100, 100, 24, 255, 255, 255, 255);
  // Border for squircle
  fillRoundedRect(79, 99, 102, 102, 25, 2, 132, 199, 140);
  fillRoundedRect(81, 101, 98, 98, 23, 255, 255, 255, 255);
  // Draw large "R" inside
  drawText('R', 114, 122, 8, 15, 23, 42);

  // 6. Pill Badge above Name
  fillRoundedRect(210, 106, 380, 34, 17, 224, 242, 254, 255);
  fillRoundedRect(209, 105, 382, 36, 18, 186, 230, 253, 120);
  drawText('APPLICATION ENGINEER & SYSTEMS BUILDER', 228, 117, 2, 2, 132, 199);

  // 7. Full Name
  drawText('Raman Kumar Sharma', 210, 154, 6, 15, 23, 42);

  // 8. Primary Tagline / Value Proposition
  drawText('Architect of CloudPower Ecosystem & MCP Agent Execution Runtimes', 80, 240, 3, 51, 65, 85);
  drawText('Engineering high-resilience cross-platform Flutter clients, multi-service', 80, 280, 2, 100, 116, 139);
  drawText('backends in Python, Java & C#, and verified AI agent SDLC integrations.', 80, 304, 2, 100, 116, 139);

  // 9. Competency / Capability Pill Tags
  const tags = [
    'Model Context Protocol (MCP)',
    'Flutter Mobile Architecture',
    'CloudPower Commerce Engine',
    'HimAmrit Platform',
    '11 Verified Specializations'
  ];

  let tagX = 80;
  const tagY = 360;
  for (const tag of tags) {
    const textWidth = tag.length * 6 * 2;
    fillRoundedRect(tagX, tagY, textWidth + 28, 38, 19, 255, 255, 255, 255);
    fillRoundedRect(tagX - 1, tagY - 1, textWidth + 30, 40, 20, 203, 213, 225, 180);
    fillRoundedRect(tagX + 1, tagY + 1, textWidth + 26, 36, 18, 255, 255, 255, 255);
    drawText(tag, tagX + 14, tagY + 13, 2, 30, 41, 59);
    tagX += textWidth + 40;
    if (tagX > 1050) break;
  }

  // 10. Secondary Row: Verified Credentials Highlight
  fillRoundedRect(80, 430, 1040, 90, 20, 255, 255, 255, 230);
  fillRoundedRect(79, 429, 1042, 92, 21, 226, 232, 240, 160);
  drawText('VERIFIED CREDENTIALS & SPECIALIZATIONS', 106, 448, 2, 2, 132, 199);
  drawText('Microsoft Learn: Agent SDLC • MCP Tooling & Environments • GitHub Agentic AI • C#', 106, 474, 2, 71, 85, 105);
  drawText('Tutedude: Flutter Mobile Architecture • Java Concurrent Systems • Power BI Analytics • Python', 106, 496, 2, 71, 85, 105);

  // 11. Bottom Bar: Canonical Domain & Status
  fillRect(80, 560, 1040, 1, 226, 232, 240, 255);
  drawText('https://alex.runs-on.dev', 80, 582, 3, 2, 132, 199);
  drawText('Production Systems & Architecture Portfolio', 680, 584, 2, 100, 116, 139);

  // Encode as PNG
  // PNG Chunk structure helper
  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    // CRC32
    let crc = 0xffffffff;
    for (let i = 4; i < 8 + len; i++) {
      let byte = buf[i];
      for (let j = 0; j < 8; j++) {
        if ((crc ^ byte) & 1) {
          crc = (crc >>> 1) ^ 0xedb88320;
        } else {
          crc = crc >>> 1;
        }
        byte = byte >>> 1;
      }
    }
    buf.writeInt32BE((crc ^ 0xffffffff) | 0, 8 + len);
    return buf;
  }

  // Raw scanlines with filter 0
  const scanlines = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const scanlineOffset = y * (1 + width * 4);
    scanlines[scanlineOffset] = 0; // Filter None
    pixels.copy(scanlines, scanlineOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(scanlines, { level: 9 });

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const pngBuffer = createPng(1200, 630);
const outPublic = path.resolve(__dirname, '../public/og-image.png');
fs.writeFileSync(outPublic, pngBuffer);
console.log(`Generated og-image.png at ${outPublic} (${pngBuffer.length} bytes)`);

