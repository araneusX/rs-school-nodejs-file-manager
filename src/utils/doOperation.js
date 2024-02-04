import { resolveParams } from './resolveParams.js';

/**
 * @typedef {Object} Result
 * @property {string} [message]
 * @property {Object.<string, string>[] | string | ReadStream} [payload]
 */

/**
 * @param {(...params: any[]) => Promise<Result>} operation
 * @param {string[]} [params]
 * @return {Promise<Result>}
 */
export const doOperation = async (operation, params = []) => {
  const countOfParams = operation.length;

  const preparedParams = resolveParams(params, countOfParams);

  return await operation(...preparedParams);
};
