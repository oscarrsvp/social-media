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

export const featureComingSoon = (e) => {
  e.preventDefault();
  alert('Feature Coming Soon! 🚧');
};
