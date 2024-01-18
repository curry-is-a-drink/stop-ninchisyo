let jsonpID = 0;

function jsonp(latitude, longitude, timeout = 7500) {
  const url = `https://map.yahooapis.jp/placeinfo/V1/get?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_YAHOO_API_KEY}&output=json`;
  const head = document.querySelector('head');
  jsonpID += 1;

  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    const callbackName = `jsonpCallback${jsonpID}`;

    script.src = encodeURI(`${url}&callback=${callbackName}`);
    script.async = true;

    const timeoutId = window.setTimeout(() => {
      cleanUp();

      return reject(new Error('Timeout'));
    }, timeout);

    window[callbackName] = data => {
      cleanUp();

      return resolve(data);
    };

    script.addEventListener('error', error => {
      cleanUp();

      return reject(error);
    });

    function cleanUp() {
      window[callbackName] = undefined;
      head.removeChild(script);
      window.clearTimeout(timeoutId);
      script = null;
    }


    head.appendChild(script);
  });
}

export default jsonp