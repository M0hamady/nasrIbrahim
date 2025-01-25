const functions = require('firebase-functions');
const { Translate } = require('@google-cloud/translate');

// Initialize the Translation API client
const translate = new Translate();

exports.translateBlogTitle = functions.https.onCall((data, context) => {
  const titleToTranslate = data.title;
  const targetLanguage = data.targetLanguage; // e.g., 'fr', 'ar'

  return translate.translate(titleToTranslate, { to: targetLanguage })
    .then(results => {
      const translation = results[0];
      return { translatedTitle: translation };
    })
    .catch(err => {
      console.error('Error during translation:', err);
      throw new Error('Translation failed');
    });
});
