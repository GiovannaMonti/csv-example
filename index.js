import {
  viewTableTitles,
  viewData,
  viewResettedTableTitles,
} from "./modules/view.js"
import { reduceData } from "./modules/data.js"
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
          viewData(event.target.id, "descending")
          button.setAttribute("data-order", "descending")
          button.innerHTML = `Descending <i class="fas fa-arrow-down"></i>`
        } else if (button.getAttribute("data-order") === "descending") {
          const tableBody = document.getElementById("table-body")
          tableBody.innerHTML = ""
          viewData(event.target.id, "ascending")
          button.setAttribute("data-order", "ascending")
          button.innerHTML = `Ascending <i class="fas fa-arrow-up"></i>`
        } else if (button.getAttribute("data-order") === "ascending") {
          const tableBody = document.getElementById("table-body")
          tableBody.innerHTML = ""
          viewData(event.target.id, "original")
          button.setAttribute("data-order", "original")
          button.innerHTML = `Original <i class="fas fa-arrows-alt-v"></i>`
        }
      })
    })
  })
})
viewTableTitles()
viewData("original")
