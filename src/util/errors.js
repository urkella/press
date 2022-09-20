/**
 * Throws an error received from the client
 *
 * @param {string} errorMessage
 */
export const handleError = (errorMessage) => {
  throw new Error(errorMessage);
};
