import queryString from "query-string";
import { createSearchParams } from "react-router-dom";

export const stringify = (params) => {
  const cleaned = Object.keys(params).reduce((result, key) => {
    const val = params[key];
    /* eslint-disable no-param-reassign */
    if (val !== null) {
      result[key] = val;
    }
    /* eslint-enable no-param-reassign */
    return result;
  }, {});
  return queryString.stringify(cleaned);
};

export const parseFloatNum = (str) => {
  const trimmed = str && typeof str.trim === "function" ? str.trim() : null;
  if (!trimmed) {
    return null;
  }
  const num = parseFloat(trimmed);
  const isNumber = !isNaN(num);
  const isFullyParsedNum = isNumber && num.toString() === trimmed;
  return isFullyParsedNum ? num : null;
};

export const parse = (search) => {
  const params = queryString.parse(search);
  return Object.keys(params).reduce((result, key) => {
    const val = params[key];
    /* eslint-disable no-param-reassign */
    if (val === "true") {
      result[key] = true;
    } else if (val === "false") {
      result[key] = false;
    } else {
      const num = parseFloatNum(val);
      result[key] = num === null ? val : num;
    }
    /* eslint-enable no-param-reassign */
    return result;
  }, {});
};

/**
 * Creates search params that can be used in navigate
 * from useNavigate hook
 *
 * @param {object} searchParams
 *
 * @return {string} string containing search params
 */
export const createNavigateSearchParams = (searchParams) => {
  return `?${createSearchParams(searchParams)}`;
};
