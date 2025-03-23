export const makeDate = (dateString: string): Date | null => {
  if (dateString) {
    // do check to make sure it is valid date

    if (isNaN(Date.parse(dateString))) {
      return null;
    }

    return new Date(dateString);
  }
  return null;
};
