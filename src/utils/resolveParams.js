/**
 * Validate and transform input params
 * @param {string[]} params
 * @param {string} countOfParams
 * @param {string[]} [possibleParams]
 * @return {string[]} params
 */
export const resolveParams = (params, countOfParams, possibleParams) => {
  if (
    params?.length !== countOfParams ||
    (possibleParams && params.some((param) => !possibleParams.includes(param)))
  ) {
    throw new Error('Invalid input');
  }

  const preparedParams = params.map((param) => param.replace('--', ''));

  return preparedParams;
};
