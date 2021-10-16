const {INTERPOLATION_INTERVAL_COUNT, INTERPOLATION_INTERVAL_MS, MS_IN_INTERPOLATION_INTERVAL} = require("./parameters")
const moment = require('moment')

exports.getInterpolatedBalance = (db, onResult) => {
    db.query('SELECT * FROM balances WHERE id = "1"', (err, result) => {
        const balance = result[0]
        const lastUpdated = Date.parse(balance.updated_at);
        const now = Date.now()
        const diff = new Date(now - INTERPOLATION_INTERVAL_MS)
        // If interpolation interval has passed
        if (lastUpdated < diff) {
            onResult(balance.next_balance)
        } else {
            // Else If interpolation interval is ongoing

            // Difference between previous and next balance
            const balanceDiff = balance.next_balance - balance.prev_balance
            // Milliseconds since last update
            const msPassed = now - lastUpdated
            // Balance change for one interval
            const balanceInOneInterval = (balanceDiff * 1.0) / INTERPOLATION_INTERVAL_COUNT
            // How many intervals have already passed
            const passedIntervals = Math.floor(msPassed / MS_IN_INTERPOLATION_INTERVAL)
            // Increase previous balance by already passed intervals. This is the current balance
            onResult(balance.prev_balance + (balanceInOneInterval * passedIntervals))
        }
    })
}

exports.updateBalance = (db, balance) => {
    db.query('' +
        'UPDATE balances SET updated_at = ?, next_balance = ?, prev_balance = (SELECT next_balance FROM balances WHERE id = "1" ) WHERE id = 1',
        [moment().format('YYYY-MM-DD HH:mm:ss'), balance]
    )
}
