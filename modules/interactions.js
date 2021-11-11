import { setButtonContent, deleteContent } from "./elements.js"
import { viewResettedTableTitles, viewData } from "./view.js"

function addButtonClickListener(items) {
  const item = items[0]
  const columnNames = Object.keys(item)
  columnNames.forEach((name) => {
    const button = document.getElementById(name)
    button.addEventListener("click", (event) => onButtonClick(button, event))
  })
}

function onButtonClick(button, event) {
  viewResettedTableTitles(event.target.id)
  deleteContent("table-body")
  const order = button.getAttribute("data-order")
  viewData(event.target.id, order)
  if (order === "original") {
    setButtonContent(button, "descending", "Descending ", "fas fa-arrow-down")
    return
  }
  if (order === "descending") {
    setButtonContent(button, "ascending", "Ascending ", "fas fa-arrow-up")
    return
  }
  if (order === "ascending") {
    setButtonContent(button, "original", "Original ", "fas fa-arrows-alt-v")
    return
  }
}

export { onButtonClick, addButtonClickListener }
