import systemConfig from 'config/system';
import {serialize} from 'utils/request';

const {host, port, apiSuffix} = systemConfig;
export const API_BASE_URL = `http://${host}:${port}${apiSuffix}`;
export const makeSearchUrl = (path, params) => `${API_BASE_URL}${path}?${serialize(params)}`;
