const dotenv = require('dotenv');
const deepl = require('deepl-node');

dotenv.config();
const { DEEPL_KEY } = process.env;
const translator = new deepl.Translator(DEEPL_KEY);

const fetchTranslation = (lang, content) => {
  return translator.translateText(content, null, lang);
};

fetchTranslation('JA', 'I really hope this works this time around!').then(
  (res) => console.log(res)
);
