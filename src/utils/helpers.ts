export const isValidNumber = (value: string | number): boolean => {
  if (value.toString().trim() === '') {
    return false;
  }

  return !Number.isNaN(Number(value.toString()));
};

export const getInitials = (value: string) => {
  let initials = '';

  if (value && value.length > 0) {
    let words = value.split(' ');
    
    words.forEach((word) => {
      let letter = word.substring(0, 1);
      initials = initials + letter;
    });
  }
    
  return initials;
};
