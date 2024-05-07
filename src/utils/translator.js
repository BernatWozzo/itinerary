const translations = {
  fillQuestion: {
    en: 'Please fill the current question before proceeding.',
    es: 'Por favor, llene la pregunta actual antes de continuar.',
  },
  allAnswered: {
    en: 'All questions have been answered. Submit your answers?',
    es: 'Todas las preguntas han sido contestadas. Enviar sus respuestas?',
  },
  back: {
    en: 'Back',
    es: 'Atrás',
  },
  next: {
    en: 'Next',
    es: 'Siguiente',
  },
  submit: {
    en: 'Submit',
    es: 'Enviar',
  },
};

const translate = (key, language) => translations[key]?.[language] || key;

export default translate;
