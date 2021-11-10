import { reduceData, sortData } from "./data.js"
// PRINT DATA TO DOM

function renderTableTitles(items) {
  const tableTitles = document.getElementById("table-titles")
  const columnNames = Object.keys(items[0])
  columnNames.unshift("#")
  columnNames.forEach((name) => {
    let columnName = document.createElement("th")
    columnName.id = name + "-column"
    columnName.scope = "col"
    name !== "#"
      ? (columnName.innerHTML = `${name} <button class="btn" id="${name}" data-order="original">Original <i class="fas fa-arrows-alt-v"></i></button>`)
      : (columnName.innerHTML = name)
    tableTitles.appendChild(columnName)
  })
}
function resetTableTitles(items, id) {
  const columnNames = Object.keys(items[0])
  columnNames.forEach((name) => {
    const button = document.getElementById(name)
    console.log(button)
    if (button.getAttribute("id") !== id) {
      button.setAttribute("data-order", "original")
      button.innerHTML = `Original <i class="fas fa-arrows-alt-v"></i>`
    }
  })
}

function renderTableBody(items) {
  const tableBody = document.getElementById("table-body")
  items.forEach((item, index) => {
    let row = document.createElement("tr")
    let rowHeading = document.createElement("th")
    rowHeading.scope = "row"
    rowHeading.innerHTML = index + 1
    row.appendChild(rowHeading)
    for (const prop in item) {
      let cell = document.createElement("td")
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

export { viewTableTitles, viewData, viewResettedTableTitles }
