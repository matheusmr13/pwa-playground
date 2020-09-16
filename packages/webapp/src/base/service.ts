interface FetchOptions {
  method?: string;
  data?: any;
}

const { REACT_APP_BASE_URL } = process.env;

class Service {
  mountUrl(url: string) {
    return `${REACT_APP_BASE_URL}${url}`;
  }
  async fetch(url: string, opts: FetchOptions = {}) {
    try {
      const resp = await fetch(this.mountUrl(url), {
        method: opts.method || 'GET',
        headers: {
          'content-type': 'application/json',
        },
        body: opts.data ? JSON.stringify(opts.data) : undefined,
      });

      return resp;
    } catch (e) {
      console.info('Request error', e);
    }
  }
}

export default new Service();
