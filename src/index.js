function createElement () {
  const element = document.createElement('div')
  element.innerHTML = '床前明月光，疑似地上霜；举头望明月，低头思故乡'
  element.classList.add('color_blue')
  return element
}
document.body.appendChild(createElement())