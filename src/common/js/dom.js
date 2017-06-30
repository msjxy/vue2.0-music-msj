export function addClass (el, className) {
  console.log('成功')
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function tchoucsa (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
let elementStyle = document.createElement('div').style
let vendor = (() => {
  let llq = {
    webkit: 'webkitRransform',
    Moz: 'MozTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in llq) {
    if (elementStyle[llq[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function perfisle (style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
