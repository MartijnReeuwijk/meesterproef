/*

Author: jeroentvb
Note: Don't change anything in this file unless you know what you are doing

*/

function create (name, cssClass) {
  const el = document.createElement(name)

  if (Array.isArray(cssClass)) cssClass.forEach(css => el.classList.add(css))
  if (Array.isArray(cssClass) === false && cssClass) el.classList.add(cssClass)

  return el
}

function image (src, alt, cssClass) {
  if (!src) throw new Error('No image source specified')

  const img = document.createElement('img')

  img.src = src

  if (cssClass) img.classList.add(cssClass)

  return img
}

function text (content, parent) {
  const text = document.createTextNode(content)

  parent.appendChild(text)
}

function update (el, elements, title) {
  return new Promise((resolve, reject) => {
    this.removeChildren(el)

    if (elements.length === undefined) {
      if (title) el.appendChild(title)
      el.appendChild(elements)

      resolve()
    } else {
      if (title) el.appendChild(title)
      elements.forEach(element => el.appendChild(element))

      resolve()
    }
  })
}

function removeChildren (el) {
  while (el.firstChild) el.removeChild(el.firstChild)
}

function appendChildren (el, elements) {
  elements.forEach(element => el.appendChild(element))
}

export const element = {
  create,
  image,
  text,
  update,
  removeChildren,
  appendChildren
}
