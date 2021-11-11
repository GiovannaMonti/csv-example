import { reduceData, sortData } from "./data.js"
import { setButtonContent, createButton, createHeader } from "./elements.js"
// PRINT DATA TO DOM
function getColumnNames(items) {
  return Object.keys(items[0])
}

function renderTableTitles(items) {
  const tableTitles = document.getElementById("table-titles")
  const columnNames = getColumnNames(items)
  columnNames.unshift("#")
  columnNames.forEach((name) => {
    const columnHeader = createHeader(name + "-column", "col", name + " ")
    if (name !== "#") {
      const btn = createButton("btn", name)
      setButtonContent(btn, "original", "Original ", "fas fa-arrows-alt-v")
      columnHeader.appendChild(btn)
    }
    tableTitles.appendChild(columnHeader)
  })
}
function resetTableTitles(items, id) {
  const columnNames = getColumnNames(items)
  columnNames.forEach((name) => {
    const button = document.getElementById(name)
    if (button.getAttribute("id") !== id) {
      setButtonContent(button, "original", "Original ", "fas fa-arrows-alt-v")
    }
  })
}

function renderTableBody(items) {
  const tableBody = document.getElementById("table-body")
  items.forEach((item, index) => {
    const row = document.createElement("tr")
    const rowHeader = createHeader("row-" + index, "row", index + 1)
    row.appendChild(rowHeader)
    for (const prop in item) {
      const cell = document.createElement("td")
      cell.innerHTML = item[prop] !== null ? item[prop] : "Unknown"
      row.appendChild(cell)
    }
    tableBody.appendChild(row)
  })
}
//VIEW DATA
function viewTableTitles() {
  reduceData().then((items) => {
    renderTableTitles(items)
  })
}
function viewResettedTableTitles(id) {
  reduceData().then((items) => {
    resetTableTitles(items, id)
  })
}

function viewData(prop, order) {
  reduceData().then((items) => {
    sortData(items, prop, order)
    renderTableBody(items)
  })
}

export { viewTableTitles, viewData, viewResettedTableTitles, getColumnNames }
