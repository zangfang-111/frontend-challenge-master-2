function capitalizeFirstLetter(word: string): string {
  return word && word.charAt(0).toUpperCase() + word.slice(1);
}

export default capitalizeFirstLetter;
