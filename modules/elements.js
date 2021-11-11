function setOrder(element, order) {
  element.setAttribute("data-order", order)
}

function setText(element, text) {
  element.innerText = text
}

function setIcon(element, iconClass) {
  const icon = document.createElement("i")
  icon.className = iconClass
  element.appendChild(icon)
}

function setButtonContent(button, order, text, iconClass) {
  setOrder(button, order)
  setText(button, text)
  setIcon(button, iconClass)
}

function deleteContent(id) {
  const element = document.getElementById(id)
  element.innerHTML = ""
}

function createButton(className, id) {
  const el = document.createElement("button")
  el.className = className
  el.id = id
  return el
}

function createHeader(id, scope, text) {
  const columnHeader = document.createElement("th")
  columnHeader.id = id
  columnHeader.scope = scope
  columnHeader.innerText = text
  return columnHeader
}
export { deleteContent, setButtonContent, createButton, createHeader }
