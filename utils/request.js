const request = require('request');

const { requestDefaultConfig: config } = require('../configs/base')


// require key of options object: method, url,
// optional key of options object: body, headers. proxy, timeout, etc.
async function _request(options) {
  try {
    options.json = true;
    options.gzip = true;
    options.baseUrl = options.baseUrl || config.baseURL;
    if (config.proxy) {
      options.proxy = config.proxy;
      // for applicationinsights http dependency auto collect issue
      if (options.baseUrl.startsWith('https:')) {
        options.protocol = 'https:';
      } else {
        options.protocol = 'http:';
      }
    }
    options.timeout = options.timeout || config.timeout;

    const res = await new Promise((resolve, reject) => {
      request(options, (err, httpResponse, body) => {
        if (err || (body && body.err)) {
          return reject(err || new Error(body.err, body.code, body.params));
        }

        resolve(body);
      });
    });

    if (res && res.err) {
      throw new Error(res.err, res.code);
    }
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// test
// async function main() {
//   const res = await _request({
//     method: "get",
//     url: "/api/users"
//   })
//   console.log(res)
// }

// main()