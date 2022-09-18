const dotenv = require('dotenv');
const deepl = require('deepl-node');

dotenv.config();
const { DEEPL_KEY } = process.env;
const translator = new deepl.Translator(DEEPL_KEY);

const fetchTranslation = (lang, content) => {
  if (process.env.NODE_ENV === 'development')
    console.log('Translation API called!');
  return translator.translateText(content, null, lang);
};

module.exports = fetchTranslation;

// fetchTranslation('JA', 'I really hope this works this time around!').then(
//   (res) => console.log(res)
// );
