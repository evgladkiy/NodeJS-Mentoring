export function addModifiedDateTo(itemToAddDate) {
  if (Array.isArray(itemToAddDate)) {
    return itemToAddDate.map(item => ({
      ...item,
      lastModifiedDate: new Date(),
    }));
  }

  return {
    ...itemToAddDate,
    lastModifiedDate: new Date(),
  };
}
