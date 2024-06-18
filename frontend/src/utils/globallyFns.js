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
  const getDate = new Date(date.replace(/-/g, '/'));
  const formattedDate = getDate.toLocaleString('default', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formattedDate;
};

export const featureComingSoon = (e) => {
  e.preventDefault();
  alert('Feature Coming Soon! 🚧');
};

export const validateImage = (url) => {
  const imageURLs = ['.jpg', '.png', '.jpeg'];
  return imageURLs.some((format) => url.toLowerCase().endsWith(format));
};
