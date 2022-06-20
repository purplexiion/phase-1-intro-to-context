// Your code here


let createEmployeeRecord = function(array) {
        return {
            firstName: array[0],
            familyName: array[1],
            title: array[2],
            payPerHour: array[3],
            timeInEvents: [],
            timeOutEvents: []
        }
    }
    // eArray - Array holding the data for the employees
let createEmployeeRecords = function(eArray) {
    return eArray.map(function(array) {
        //array.map - recap ( creates a new array as a result of calling a function on the previous array) 
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
        //split -splits an array to an array of cubstrings
    employee.timeInEvents.push({
        //push adds elements to the beginning of an array
        type: "TimeIn",
        hour: parseInt(hour, 10),
        //parseInt - converts a string to an integer
        date,
    })
    return employee
}
let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, sodate) {
    let eventIn = employee.timeInEvents.find(function(i) {
        return i.date === sodate
            //returns when the dates are matching
    })
    let eventOut = employee.timeOutEvents.find(function(i) {
        return i.date === sodate
            //returns a value when the dates are matching
    })
    return (eventOut.hour - eventIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, sodate) {
    let Rawwages = hoursWorkedOnDate(employee, sodate) * employee.payPerHour
    return parseFloat(Rawwages.toString())
        //
}

let allWagesFor = function(employee) {
    let accDates = employee.timeInEvents.map(function(i) {
        return i.date
    })
    let accWages = accDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return accWages

}
let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}