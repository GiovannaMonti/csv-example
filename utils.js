// FETCH CSV FROM URL
async function fetchCSV(url) {
  const response = await fetch(url)
  const text = await response.text()
  const parsed = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  })
  return parsed.data
}
// FETCH DATA
const fetchData = async () => {
  try {
    let parsedData = await fetchCSV("/factbook.csv")
    return parsedData
  } catch (e) {
    console.log(e)
  }
}
// REDUCE DATA
function reduceData() {
  return fetchData().then((data) => {
    const reducedData = data.map((d) => {
      return {
        country: d.Country,
        population: d.Population,
        area: d["Area(sq km)"],
        users: d["Internet users"],
      }
    })
    return reducedData.slice(0, 51)
  })
}

// SORT DATA ASCENDING
function sortAscending(items, prop) {
  if (items[0][prop] === "double") {
    return items.sort((a, b) => a[prop] - b[prop])
  } else if (items[0][prop] === "String") {
    return items.sort((a, b) => {
      const nameA = a[prop].toUpperCase() // ignore upper and lowercase
      const nameB = b[prop].toUpperCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
  }
}
// SORT DATA DESCENDING
function sortDescending(items, prop) {
  if (items[0][prop] === "double") {
    return items.sort((a, b) => b[prop] - a[prop])
  } else if (items[0][prop] === "String") {
    return items.sort((a, b) => {
      const nameA = a[prop].toUpperCase() // ignore upper and lowercase
      const nameB = b[prop].toUpperCase() // ignore upper and lowercase
      if (nameA > nameB) {
        return -1
      }
      if (nameA < nameB) {
        return 1
      }
      return 0
    })
  }
}
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
  items.shift()
  items.forEach((item, index) => {
    let row = document.createElement("tr")
    let rowHeading = document.createElement("th")
    rowHeading.scope = "row"
    rowHeading.innerHTML = index + 1
    row.appendChild(rowHeading)
    for (const prop in item) {
      let cell = document.createElement("td")
      cell.innerHTML = item[prop]
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

function viewDataOriginal() {
  reduceData().then((items) => {
    renderTableBody(items)
  })
}

function viewDataAscending(prop) {
  reduceData().then((items) => {
    sortAscending(items, prop)
    renderTableBody(items)
  })
}
function viewDataDescending(prop) {
  reduceData().then((items) => {
    sortDescending(items, prop)
    renderTableBody(items)
  })
}

export {
  reduceData,
  viewTableTitles,
  viewDataOriginal,
  viewDataAscending,
  viewDataDescending,
  viewResettedTableTitles,
}
