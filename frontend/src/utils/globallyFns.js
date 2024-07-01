export const createdAt = (date) => {
  const getDate = new Date(date);
  const formattedDate = getDate.toLocaleString('default', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return formattedDate;
};

export const formatDate = (date) => {
  const dates = date.split('T')[0];
  const getDate = new Date(dates.replace(/-/g, '/'));
  const formattedDate = getDate.toLocaleString('default', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formattedDate;
};

export const formatDateForInput = (date) => {
  if (!date) return '';

  const getDate = new Date(date);

  const year = getDate.getUTCFullYear();
  const month = String(getDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(getDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const featureComingSoon = (e) => {
  e.preventDefault();
  alert('Feature Coming Soon! 🚧');
};

export const validateImage = (url) => {
  const imageURLs = ['.jpg', '.png', '.jpeg'];
  return imageURLs.some((format) => url.toLowerCase().endsWith(format));
};
