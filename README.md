# Value interpolation example

This is an example of how it is possible to interpolate values. Database entry can be updated every 5 minutes,
but frontend will see constantly updating value.

## How it works

If the most simple approach is used - select from database and return the value to frontend, it's impossible to
display a streaming change of value in frontend. The update rate to database should be ridiculously high.

So instead of doing it traditional way, this example makes a small lag for user. He doesn't see the whole change,
but rather that change is returned in pieces in a predefined interval.

When the value update comes to database, the previous value is stored in `prev_balance` field, the received
value is stored in `next_balance` field and the time is saved when this value was updated. This lets to interpolate
the value in an interval and calculate its value in an exact point in time.

This example assumes the value update interval is 5min and the interpolated value should be returned to frontend
every 1 second.

## Setup

- `yarn`
- `docker-compose up`
- run queries inside a database from file `database.sql`
- rerun `docker-compose up`
- open `http://0.0.0.0:3333`

## Trigger balance update

To update balance run `curl -d '{"balance":1000}' -H "Content-Type: application/json" -X POST http://localhost:3333/api/balance`

## Demo

![Alt Text](https://github.com/alfamegaxq/value-interpolation/blob/main/rec.gif)
