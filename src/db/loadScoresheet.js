// yarn add papaparse
import Papa from "papaparse";

function loadFile(url) {
    return new Promise(resolve => {
        let host = `${window.location.protocol}//${window.location.host}`
        Papa.parse(host + url, {
            download: true,
            dynamicTyping: true,
            header: true,
            complete: results => {
                resolve(results.data)
            }
        })
    })
}

function convertTime(time) {
    const [minutes, seconds] = time.split(':').map(n => Number(n))
    return (minutes * 60) + seconds
}

async function loadScoresheet(db) {
    let components = [
        "run",
        "sit",
        "push"
    ]
    for (let component of components) {
        let results = await loadFile(`/scoresheet/${component}.csv`)
        if (component === "run") {
            results = results.map(row => {
                return {
                    ...row,
                    countLow: convertTime(row.countLow),
                    countHigh: convertTime(row.countHigh)
                }
            })
        }
        db[component].bulkAdd(results)
    }
}

export default loadScoresheet
export {
    convertTime
}