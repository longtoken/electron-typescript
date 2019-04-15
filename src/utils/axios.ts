import axios from 'axios'
import message from 'antd/lib/message';

export default () => {
  let instance = axios.create();
  instance.defaults.timeout = 20000;

  // 添加请求拦截器
  axios.interceptors.request.use(function (config = {}) {
    config.withCredentials = true;
    /*
    let headers = config.headers = config.headers || {};
    if (config.useForm) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.transformRequest = [function (data) {
        let result = ''
        for (let name in data) {
          result += encodeURIComponent(name) + '=' + encodeURIComponent(data[name]) + '&'
        }
        return result
      }];
    }*/
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // 添加响应拦截器
  axios.interceptors.response.use(_ => _, (err) => {
    if (err && err.response) {
      let config = err.response.config || {};
      if (config.noneIntercept) {
        return Promise.reject(err);
      }
      const {status, data} = err.response;

      switch (status) {
        case 0:
          message.error('系统异常！状态码：0');
          break;
        case 400:
          if (data.message) {
            if (!config.noneIntercept400) {
              message.error(data.message, 2);
            }
          } else {
            message.error('请求错误(400)');
          }
          break;
        case 401:
          message.error('请重新登录！');
          break;
        case 403:
          message.error('服务器连接失败！');
          break;
        case 404:
          message.error('资源已经移除！');
          break;
        case 500:
          message.error('服务器错误(500)');
          break;
        case 501:
          message.error('服务未实现(501)');
          break;
        case 502:
          message.error('网络错误(502)');
          break;
        case 503:
          message.error('我们正在对系统进行升级维护，期间由此造成的不便敬请谅解。');
          break;
        case 504:
          message.error('响应超时，请稍后再试！');
          break;
        case 505:
          message.error('HTTP版本不受支持(505)');
          break;
        default:
          message.error(`连接出错(${err.response.status})!`);
      }
    } else {
      message.error('没有响应，连接服务器失败!');
    }
    return Promise.reject(err);
  });
}
