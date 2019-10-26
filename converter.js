const fs = require('fs')
const readLine = require('readline')

const csvFileName = 'customer-data.csv'
const jsonFileName = 'customer-data.json'
let isHeader = true;
let headers={}
let buffer= '[\n'

let reader = readLine.createInterface({
    input: fs.createReadStream(csvFileName)
})

reader.on('line',(row)=>{
    let data = row.split(',')
    let count = 0
    let jsonObject= '  {\n'

    if(isHeader){
        headers = data
    } 
    else {
    headers.forEach((element,index) => {
        jsonObject += '    "' + element + '": "' + data[index] + '",\n'
    })
    jsonObject = jsonObject.substr(0,jsonObject.length-2)
    jsonObject += '\n  },\n'
    buffer+=jsonObject
    }
    isHeader=false
    
})

reader.on('close',()=>{
    buffer = buffer.substr(0,buffer.length-2);
    buffer+='\n]'
    fs.writeFileSync(jsonFileName,buffer)
})