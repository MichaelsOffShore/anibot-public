// Function: Generate Random Number (Inclusive)
export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};