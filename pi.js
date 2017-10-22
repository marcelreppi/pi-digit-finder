const https = require('https');

const searchTerm = process.argv[2]

// const url = 'https://www.angio.net/pi/digits/1000.txt'                   // thousand
// const url = 'https://www.angio.net/pi/digits/10000.txt'                  // ten thousand
const url = 'https://www.angio.net/pi/digits/100000.txt'                    // one hundred throusand
// const url = 'https://www.angio.net/pi/digits/pi1000000.txt'              // one million
// const url = 'https://stuff.mit.edu/afs/sipb/contrib/pi/pi-billion.txt'   // one billion

let posBase = 0
let lastChunk = ''
let found = false


https.get(url, (res) => {
  res.on('data', (data) => {
    const searchText = lastChunk + data.toString()
    const index = searchText.indexOf(searchTerm)
    if (index > 0) {
      console.log(`Found '${searchTerm}' at index: ${posBase + index - 1}`)
      found = true
      res.destroy()
    }

    posBase += lastChunk.length
    lastChunk = data.toString()
  })

  res.on('end', () => {
    if (!found) {
      console.log('Not found')  
    }
  })

  res.on('error', (err) => {
    console.error(err)
    process.exit()
  })
})