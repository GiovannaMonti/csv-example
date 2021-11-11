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
    const parsedData = await fetchCSV("/factbook.csv")
    return parsedData
  } catch (e) {
    console.log(e)
  }
}
// REDUCE DATA
async function reduceData() {
  const data = await fetchData()
  const reducedData = data.map((d) => {
    return {
      Country: d.Country,
      Population: d.Population,
      "Area (sq km)": d["Area(sq km)"],
      "Internet users": d["Internet users"],
    }
  })
  return reducedData.slice(0, 51)
}

//SORT FUNCTION BASED ON ORDER
function sortData(items, prop, order) {
  const itemType = items[0][prop]
  items.shift()
  if (order === "original") {
    return
  }
  if (itemType === "double") {
    return items.sort((a, b) => {
      /* if (a[prop] === null && b[prop] === null) {
        return 0
      } */
      if (a[prop] === null) {
        if (order === "ascending") {
          return -b[prop]
        }
        return b[prop]
      }
      if (b[prop] === null) {
        if (order === "ascending") {
          return a[prop]
        }
        return -a[prop]
      }
      if (order === "ascending") {
        return a[prop] - b[prop]
      }
      return b[prop] - a[prop]
    })
  }
  if (itemType === "String") {
    return items.sort((a, b) => {
      const nameA = a[prop].toUpperCase()
      const nameB = b[prop].toUpperCase()
      if (nameA < nameB) {
        if (order === "ascending") {
          return -1
        }
        return 1
      }
      if (nameA > nameB) {
        if (order === "ascending") {
          return 1
        }
        return -1
      }
      return 0
    })
  }
}

export { reduceData, sortData }
