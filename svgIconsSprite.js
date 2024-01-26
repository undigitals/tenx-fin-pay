const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');

const INPUT_PATH = path.resolve(__dirname, 'src', 'assets', 'icons');
const ICON_LIST_OUTPUT_PATH = path.resolve(__dirname, 'src', 'assets', 'iconsList.ts');
const SPRITE_OUTPUT_PATH = path.resolve(__dirname, 'public', 'svg-icons.svg');

const spriter = new SVGSpriter({
  shape: {
    id: {
      generator: 'icon-%s',
    },
    transform: ['svgo'],
  },
  mode: {
    stack: {
      layout: 'vertical',
      rootviewbox: false,
    },
  },
  svg: {
    rootAttributes: {
      id: 'svg-icon-sprite',
    },
  },
});

const trimExtension = (fullName) => {
  const dotIdx = fullName.lastIndexOf('.');
  return dotIdx < 0 ? fullName : fullName.substring(0, dotIdx);
};

function buildSprite() {
  const iconNames = [];

  fs.readdirSync(INPUT_PATH).forEach((fileName) => {
    const filePath = path.resolve(INPUT_PATH, fileName);

    if (path.extname(filePath).toLowerCase() === '.svg') {
      iconNames.push(fileName);
      const fileContent = fs.readFileSync(path.resolve(INPUT_PATH, fileName));
      spriter.add(filePath, fileName, fileContent);
    }
  });

  spriter.compile((error, result) => {
    for (const mode of Object.values(result)) {
      for (const resource of Object.values(mode)) {
        fs.writeFileSync(SPRITE_OUTPUT_PATH, resource.contents);
      }
    }
  });

  fs.writeFileSync(ICON_LIST_OUTPUT_PATH, `export const SVG_ICONS = ${JSON.stringify(iconNames.map(trimExtension).sort())} as const;`);
}

buildSprite();
