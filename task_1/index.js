import { encoded, translations } from './data.js'

// console.log("Let's rock")
// console.log({ encoded, translations })

function decodeFields(encoded, translations) {
  const excludeFields = ['groupId', 'service', 'formatSize', 'ca'];
  const uniqIds = new Set();

  const decoded = encoded.map((i) => {
    const newI = { ...i };

    for (let key in i) {
      if (key.endsWith("Id") & !excludeFields.includes(key)) {
        newI[key] = translations[i[key]];
        uniqIds.add(i[key]);
      }
    }

    return newI;
  })

  return { decoded, uniqIds }
}


const { decoded, uniqIds } = decodeFields(encoded, translations);

// logs
console.log('Уникальные id:', {
  my: Array.from(uniqIds).sort().filter(i => i),
  translations: Object.keys(translations).sort()
});

console.log("Decoded: ", decoded)
