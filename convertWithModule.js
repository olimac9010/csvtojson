const fs = require('fs')
const csvtojson = require('csvtojson')

const csvFile = 'customer-data.csv'
const jsonFile = 'customer-data.json'
let buffer = []
csvtojson()
    .fromFile(csvFile)
    .then((jsonObj) => {
        fs.writeFile(jsonFile,JSON.stringify(jsonObj,null,2),(error) => {
            if(error) return process.exit(1)
            console.log('done')
            process.exit(0)
        })
    })