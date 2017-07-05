/**
 * Created by 信仰 on 2017/7/5.
 */
export function shuffle (arr) {
  for (let i = 0; i < arr.length; i++) {
    var _arr = arr.slice()
    // var _arr = arr
    let j = getRandomint(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
function getRandomint (min, mix) {
  return Math.floor(Math.random() * (mix - min + 1) + min)
}
