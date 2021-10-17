const {INTERPOLATION_INTERVAL_COUNT, INTERPOLATION_INTERVAL_MS, MS_IN_INTERPOLATION_INTERVAL} = require("./parameters")
const moment = require('moment')

exports.getInterpolatedValue = (db, onResult) => {
    db.query('SELECT * FROM `values` WHERE id = "1"', (err, result) => {
        const value = result[0]
        const lastUpdated = Date.parse(value.updated_at);
        const now = Date.now()
        const diff = new Date(now - INTERPOLATION_INTERVAL_MS)
        // If interpolation interval has passed
        if (lastUpdated < diff) {
            onResult(value.next_value)
        } else {
            // Else If interpolation interval is ongoing

            // Difference between previous and next value
            const valueDiff = value.next_value - value.prev_value
            // Milliseconds since last update
            const msPassed = now - lastUpdated
            // Value change for one interval
            const valueInOneInterval = (valueDiff * 1.0) / INTERPOLATION_INTERVAL_COUNT
            // How many intervals have already passed
            const passedIntervals = Math.floor(msPassed / MS_IN_INTERPOLATION_INTERVAL)
            // Increase previous value by already passed intervals. This is the current value
            onResult(value.prev_value + (valueInOneInterval * passedIntervals))
        }
    })
}

exports.updateValue = (db, value) => {
    db.query('' +
        'UPDATE `values` SET updated_at = ?, next_value = ?, prev_value = (SELECT next_value FROM `values` WHERE id = "1" ) WHERE id = 1',
        [moment().format('YYYY-MM-DD HH:mm:ss'), value]
    )
}
