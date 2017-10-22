const https = require('https');

const searchTerm = process.argv[2]
const url = 'https://stuff.mit.edu/afs/sipb/contrib/pi/pi-billion.txt'
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