/* eslint-disable no-undef */
function wait(delay: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise(resolve => setTimeout(resolve, delay));
}

function fetchRetry(
  url: string,
  delay: number,
  tries: number,
  fetchOptions: RequestInit | undefined = {},
): Promise<Response> {
  function onError(err: any) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }
    return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
  }

  function onBadStatus(data: any) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw new Error('something went wrong');
    }
    if (data.status !== 200) {
      return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
    }
    return data;
  }

  return fetch(url, fetchOptions).then(onBadStatus).catch(onError);
}

export default fetchRetry;
