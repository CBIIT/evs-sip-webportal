export const sortAlphabetically = (values) => {
  values.sort((a, b) => {
    const an = a.n.replace(/<b>/g, '').replace(/<\/b>/g, '').toLowerCase()
    const bn = b.n.replace(/<b>/g, '').replace(/<\/b>/g, '').toLowerCase()
    if (an > bn) {
      return 1
    }
    if (bn > an) {
      return -1
    }
    return 0
  })
  return values
}

export const sortAlphabeticallyObject = (object) => {
  const ordered = {}
  Object.keys(object)
    .sort()
    .forEach((key) => (ordered[key] = object[key]))
  return ordered
}

export const sortSynonyms = (synonyms) => {
  const mapped = {
    PT: 1,
    BR: 2,
    FB: 3,
    CN: 4,
    AB: 5,
    SY: 6,
    SN: 7,
    AD: 8,
    AQ: 9,
    AQS: 10,
  }
  synonyms.sort((a, b) =>
    mapped[a.termGroup] > mapped[b.termGroup]
      ? 1
      : a.termGroup === b.termGroup
        ? a.termName.toLowerCase() > b.termName.toLowerCase()
          ? 1
          : -1
        : -1,
  )
  return synonyms
}

export const getHighlightObj = (highlight) => {
  const highlightObj = {}
  if (highlight !== undefined) {
    highlight.forEach((val) => {
      const tmp = val.replace(/<b>/g, '').replace(/<\/b>/g, '')
      if (highlightObj[tmp] === undefined) highlightObj[tmp] = val
    })
  }
  return highlightObj
}

export const getAllValueHighlight = (enumHits) => {
  const highlightValueObj = {}
  enumHits.hits.forEach((emHit) => {
    const emHighlight = emHit.highlight
    const highlightValue =
      'enum.n' in emHighlight || 'enum.n.have' in emHighlight
        ? emHighlight['enum.n'] || emHighlight['enum.n.have']
        : undefined
    if (highlightValue !== undefined) {
      highlightValue.forEach((val) => {
        const tmp = val.replace(/<b>/g, '').replace(/<\/b>/g, '')
        if (highlightValueObj[tmp] === undefined) highlightValueObj[tmp] = val
      })
    }
  })
  return highlightValueObj
}

export const getAllSyn = (items) => {
  items.forEach((item) => {
    if (item.ncit !== undefined) {
      item.all_syn = []
      item.ncit.forEach((nc) => {
        item.all_syn = item.all_syn.concat(
          nc.s.map(function (x) {
            return x.n
          }),
        )
      })
    }
  })
  return items
}

export const searchFilter = (items, keyword) => {
  getAllSyn(items)
  const newItem = []
  JSON.parse(JSON.stringify(items)).forEach((item) => {
    const idx = item.n.toLowerCase().indexOf(keyword)
    if (idx !== -1) {
      if (idx === 0) newItem.unshift(item)
      if (idx !== 0) newItem.push(item)
    }
  })

  // // Search in all_syn synonyms if it has icdo3 code
  JSON.parse(JSON.stringify(items)).forEach((item) => {
    if (item.all_syn !== undefined) {
      const tmpArr = item.all_syn
        .map(function (x) {
          return x.trim().toLowerCase()
        })
        .map(function (s) {
          return s.indexOf(keyword) >= 0
        })
      if (
        tmpArr.indexOf(true) >= 0 &&
        !newItem.some((existingItem) => existingItem === item)
      ) {
        newItem.push(item)
      }
    }

    if (item.ncit !== undefined) {
      const tmpArr = item.ncit
        .map(function (x) {
          return x.c.trim().toLowerCase()
        })
        .map(function (c) {
          return c.indexOf(keyword) >= 0
        })
      if (
        tmpArr.includes(true) &&
        !newItem.some((existingItem) => existingItem === item)
      ) {
        newItem.push(item)
      }
    }

    if (item.ncit !== undefined) {
      const tmpArr = item.ncit
        .map(function (x) {
          return x.l.trim().toLowerCase()
        })
        .map(function (l) {
          return l.indexOf(keyword) >= 0
        })
      if (
        tmpArr.includes(true) &&
        !newItem.some((existingItem) => existingItem === item)
      ) {
        newItem.push(item)
      }
    }

    if (item.icdo !== undefined) {
      if (item.icdo.c.trim().toLowerCase().indexOf(keyword) >= 0) {
        newItem.push(item)
        return
      }
      const tmpArr = item.icdo.s
        .map(function (x) {
          return x.n.trim().toLowerCase()
        })
        .map(function (s) {
          return s.indexOf(keyword) >= 0
        })
      if (
        tmpArr.includes(true) &&
        !newItem.some((existingItem) => existingItem === item)
      ) {
        newItem.push(item)
      }
    }
  })

  // Highlight matched values and synonyms
  newItem.forEach((item) => {
    item.n = item.n
      .replace(/<b>/g, '')
      .replace(/<\/b>/g, '')
      .replace(new RegExp(keyword, 'ig'), '<b>$&</b>')
    if (item.icdo !== undefined) {
      item.icdo.c = item.icdo.c
        .replace(/<b>/g, '')
        .replace(/<\/b>/g, '')
        .replace(new RegExp(keyword, 'ig'), '<b>$&</b>')
      item.icdo.s = item.icdo.s.map(function (x) {
        return {
          n: x.n
            .replace(/<b>/g, '')
            .replace(/<\/b>/g, '')
            .replace(new RegExp(keyword, 'ig'), '<b>$&</b>'),
          t: x.t,
          src: x.src,
        }
      })
    }

    if (item.ncit !== undefined) {
      item.ncit.forEach((nc) => {
        if (nc.c !== undefined) {
          nc.c = nc.c
            .replace(/<b>/g, '')
            .replace(/<\/b>/g, '')
            .replace(new RegExp(keyword, 'ig'), '<b>$&</b>')
        }
        if (nc.l !== undefined) {
          nc.l = nc.l
            .replace(/<b>/g, '')
            .replace(/<\/b>/g, '')
            .replace(new RegExp(keyword, 'ig'), '<b>$&</b>')
        }
        if (nc.s === undefined) return
        nc.s = nc.s.map(function (x) {
          return {
            n: x.n
              .replace(/<b>/g, '')
              .replace(/<\/b>/g, '')
              .replace(new RegExp(keyword, 'ig'), '<b>$&</b>'),
            t: x.t,
            src: x.src,
          }
        })
      })
    }
  })
  return newItem
}
