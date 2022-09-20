/**
 * Capitalizes first letter fo the string
 *
 * @param {string} string
 *
 * @return {string} string with the capitalized first letter
 */
export const capitalizeFirstLetter = (string) => {
  if (!string) {
    throw new Error("String is required.");
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Denormalises API response and includes an additional
 * meta object that contains pagination data
 *
 * @param {object} response
 * @param {number} totalPageResults
 *
 * @return {object} denormalised response
 */
export const denormaliseResponseEntities = (response, totalPageResults) => {
  const data = response.data;
  const totalItems = Number(response.headers["x-total-count"]);
  const totalPages = Math.ceil(totalItems / totalPageResults);

  return {
    data,
    meta: {
      totalItems,
      totalPages,
    },
  };
};
