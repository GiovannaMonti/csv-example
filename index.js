import { reduceData } from "./modules/data.js"
import { addButtonClickListener } from "./modules/interactions.js"
import { viewTableTitles, viewData } from "./modules/view.js"

window.addEventListener("DOMContentLoaded", (e) => {
  reduceData().then((items) => addButtonClickListener(items))
})

viewTableTitles()

viewData("original")
