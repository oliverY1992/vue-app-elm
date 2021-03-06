import request, {serialize} from 'utils/request';
import systemConfig from 'config/system';

const {host, port, apiSuffix} = systemConfig;
const API_BASE_URL = `http://${host}:${port}${apiSuffix}`;
const makeSearchUrl = (path, params) => `${API_BASE_URL}${path}?${serialize(params)}`;

export const getComments = async (params = {}) => {
  const url = makeSearchUrl('/comments', params);
  return request(url, {
    method: 'get'
  });
};

