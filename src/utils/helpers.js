// Format date to a readable format
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  return date.toLocaleDateString('es-ES', options);
};

export default formatDate;
