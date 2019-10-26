const fs = require('fs')
const readLine = require('readline')

const csvFileName = 'customer-data.csv'
const jsonFileName = 'customer-data.json'
let isHeaderFlag = true;
let headers={}
let buffer= []

let reader = readLine.createInterface({
    input: fs.createReadStream(csvFileName)
})

reader.on('line',(row)=>{
    let data = row.split(',')
    let jsonObject= {}

    if(isHeaderFlag){
        headers = data
    } 
    else {
    headers.forEach((element,index) => {
        jsonObject [element] = data[index];
    })

    buffer.push(jsonObject)
    }
    isHeaderFlag=false
    
})

reader.on('close',()=>{
    fs.writeFileSync(jsonFileName,JSON.stringify(buffer))
})