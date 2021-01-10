# tiny-moment
A format date function in less than 1KB, written in Typescript (partially compatible with moment).

Receives a `Date` and a format `string` (with tokens based on Moment.js) and returns the formatted Date.

## Usage
Import the `formatDate` function and use it as follows:

```
formatDate(new Date(), "DD/MM/YYYY hh:mm:ss"); //prints "25/06/2020 11:59:28"

formatDate(new Date(), "[Day] D [at] h'mm"); //prints "Day 25 at 11'59"


@param {Date} date - A `Date | String | number` instance.
@param {String} format - A string with tokens (like Moment.js tokens).
@returns {String}
export function formatDate(date: Date | string | number, format:string):string;

```

## Thanks to VitorLuizC

Adapted from: https://github.com/VitorLuizC/format-date with support for multiple inputs and timezone fixes
