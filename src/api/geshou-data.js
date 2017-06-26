import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
export function gettwo () {
  console.log('gettwo')
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  console.log(jsonp(url, data, options))
  return jsonp(url, data, options)
}
