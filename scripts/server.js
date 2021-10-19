/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios')
const fs = require('fs-extra')
const path = require('path')

const logsUrl = 'http://skyeye.17usoft.com/api/proxy/skynet/logs/search/api/skyeye/logs'

;(async () => {
  const req = fs.readJsonSync(path.resolve(__dirname, './data/parmas.json'))
  const cookie = fs.readFileSync(path.resolve(__dirname, './data/cookie.txt')).toString()

  axios
    .post(logsUrl, req, {
      headers: {
        Cookie: cookie,
      },
    })
    .then(function (response) {
      console.log(response.data)
      const { result } = response.data
      const { logs } = result

      logs.forEach((v) => {
        parseLogData(v)
      })

      fs.writeJsonSync(path.resolve(__dirname, './data/rep.json'), response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
})()

function parseLogData(item) {
  const { logTime, msg, timestamp } = item
  
}

function parseMsg(msg) {}
