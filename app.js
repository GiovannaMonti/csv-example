import {
  reduceData,
  viewTableTitles,
  viewDataOriginal,
  viewDataAscending,
  viewDataDescending,
  viewResettedTableTitles,
} from "./utils.js"
window.addEventListener("DOMContentLoaded", (e) => {
  reduceData().then((items) => {
    const item = items[0]
    const columnNames = Object.keys(item)
    columnNames.forEach((name) => {
      const button = document.getElementById(name)
      button.addEventListener("click", (event) => {
        viewResettedTableTitles(event.target.id)
        if (button.getAttribute("data-order") === "original") {
          const tableBody = document.getElementById("table-body")
          tableBody.innerHTML = ""
          viewDataDescending(event.target.id)
          button.setAttribute("data-order", "descending")
          button.innerHTML = `Descending <i class="fas fa-arrow-down"></i>`
        } else if (button.getAttribute("data-order") === "descending") {
          const tableBody = document.getElementById("table-body")
          tableBody.innerHTML = ""
          viewDataAscending(event.target.id)
          button.setAttribute("data-order", "ascending")
          button.innerHTML = `Ascending <i class="fas fa-arrow-up"></i>`
        } else if (button.getAttribute("data-order") === "ascending") {
          const tableBody = document.getElementById("table-body")
          tableBody.innerHTML = ""
          viewDataOriginal(event.target.id)
          button.setAttribute("data-order", "original")
          button.innerHTML = `Original <i class="fas fa-arrows-alt-v"></i>`
        }
      })
    })
  })
})
viewTableTitles()
viewDataOriginal()
