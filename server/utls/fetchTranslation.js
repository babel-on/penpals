const dotenv = require('dotenv');
const deepl = require('deepl-node');

dotenv.config();
const { DEEPL_KEY } = process.env;
const translator = new deepl.translator(DEEPL_KEY);

const fetchTranslation = (lang, content) => {
  return translator.translateText(content, null, lang);
};
