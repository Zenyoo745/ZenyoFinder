const deviceDatabase = [
  { brand: 'Apple', model: 'iPhone 15', dpi: 320, playstyles: { headshot: { general: 46, redDot: 51, scope2x: 33, scope4x: 22, awm: 10, freeLook: 90 }, sniper: { general: 42, redDot: 47, scope2x: 30, scope4x: 19, awm: 9, freeLook: 84 }, rush: { general: 60, redDot: 65, scope2x: 44, scope4x: 28, awm: 14, freeLook: 98 }, balanced: { general: 50, redDot: 54, scope2x: 35, scope4x: 25, awm: 11, freeLook: 92 } } },
  { brand: 'Samsung', model: 'Galaxy S24', dpi: 380, playstyles: { headshot: { general: 48, redDot: 52, scope2x: 35, scope4x: 24, awm: 12, freeLook: 94 }, sniper: { general: 44, redDot: 49, scope2x: 32, scope4x: 21, awm: 11, freeLook: 88 }, rush: { general: 63, redDot: 68, scope2x: 46, scope4x: 29, awm: 16, freeLook: 102 }, balanced: { general: 53, redDot: 57, scope2x: 38, scope4x: 27, awm: 13, freeLook: 95 } } },
  { brand: 'Google', model: 'Pixel 8', dpi: 413, playstyles: { headshot: { general: 45, redDot: 50, scope2x: 33, scope4x: 23, awm: 11, freeLook: 92 }, sniper: { general: 41, redDot: 46, scope2x: 30, scope4x: 20, awm: 10, freeLook: 86 }, rush: { general: 59, redDot: 63, scope2x: 45, scope4x: 28, awm: 15, freeLook: 100 }, balanced: { general: 51, redDot: 55, scope2x: 36, scope4x: 26, awm: 12, freeLook: 94 } } },
  { brand: 'Vivo', model: 'Vivo V30', dpi: 400, playstyles: { headshot: { general: 47, redDot: 52, scope2x: 34, scope4x: 23, awm: 11, freeLook: 91 }, sniper: { general: 43, redDot: 48, scope2x: 31, scope4x: 20, awm: 10, freeLook: 87 }, rush: { general: 62, redDot: 66, scope2x: 45, scope4x: 28, awm: 15, freeLook: 99 }, balanced: { general: 52, redDot: 56, scope2x: 36, scope4x: 26, awm: 12, freeLook: 93 } } },
  { brand: 'Infinix', model: 'Infinix Note 40', dpi: 284, playstyles: { headshot: { general: 44, redDot: 49, scope2x: 31, scope4x: 21, awm: 9, freeLook: 88 }, sniper: { general: 40, redDot: 45, scope2x: 29, scope4x: 19, awm: 8, freeLook: 82 }, rush: { general: 56, redDot: 61, scope2x: 43, scope4x: 27, awm: 13, freeLook: 96 }, balanced: { general: 48, redDot: 52, scope2x: 34, scope4x: 24, awm: 10, freeLook: 91 } } },
  { brand: 'Xiaomi', model: 'Redmi Note 13', dpi: 395, playstyles: { headshot: { general: 46, redDot: 50, scope2x: 33, scope4x: 22, awm: 10, freeLook: 90 }, sniper: { general: 42, redDot: 47, scope2x: 30, scope4x: 19, awm: 9, freeLook: 85 }, rush: { general: 61, redDot: 65, scope2x: 45, scope4x: 28, awm: 15, freeLook: 98 }, balanced: { general: 51, redDot: 55, scope2x: 36, scope4x: 26, awm: 12, freeLook: 93 } } },
  { brand: 'Oppo', model: 'Oppo Reno 12', dpi: 402, playstyles: { headshot: { general: 45, redDot: 50, scope2x: 32, scope4x: 22, awm: 10, freeLook: 89 }, sniper: { general: 41, redDot: 46, scope2x: 29, scope4x: 19, awm: 9, freeLook: 84 }, rush: { general: 60, redDot: 64, scope2x: 44, scope4x: 27, awm: 14, freeLook: 97 }, balanced: { general: 50, redDot: 54, scope2x: 35, scope4x: 25, awm: 11, freeLook: 91 } } },
  { brand: 'OnePlus', model: 'OnePlus 12', dpi: 428, playstyles: { headshot: { general: 47, redDot: 51, scope2x: 34, scope4x: 24, awm: 11, freeLook: 93 }, sniper: { general: 43, redDot: 48, scope2x: 31, scope4x: 20, awm: 10, freeLook: 87 }, rush: { general: 62, redDot: 66, scope2x: 46, scope4x: 29, awm: 16, freeLook: 101 }, balanced: { general: 53, redDot: 57, scope2x: 38, scope4x: 27, awm: 13, freeLook: 95 } } },
];

const popularDevices = [
  'iPhone 15',
  'Galaxy S24',
  'Pixel 8',
  'Vivo V30',
  'Infinix Note 40',
  'Redmi Note 13',
  'Oppo Reno 12',
  'OnePlus 12',
  'iPhone 14 Pro',
  'Galaxy S23',
  'Pixel 7',
];
