/**
 *
 * Receives a `Date` and a format (with tokens based on Moment.js) in `string`
 * and returns the same format replacing the tokens for values from `Date`.
 * @example
 * formatDate(new Date(), "DD/MM/YYYY hh:mm:ss");
 * //=> "25/06/2020 11:59:28"
 *
 * formatDate(new Date(), "[Day] D [at] h'mm");
 * //=> "Day 25 at 11'59"
 * @param {Date} date - A `Date` instance.
 * @param {String} format - A string with tokens (like Moment.js tokens).
 * @returns {String}
 *
 * Adapted from: https://github.com/VitorLuizC/format-date and added support for multiple inputs and timezone fix
 */
 
 
 function fixTimezone(date, format) {
    let tzMs = date.getTimezoneOffset() * 60 * 1000
    if (format.slice(-1) == "Z")
        date.setTime(date.getTime() + tzMs)
}


const FORMATTERS: Record<string, (date: Date) => string> = {
    'DD': date => pad(2, '' + date.getDate()),
    'D': date => '' + date.getDate(),
    'MM': date => pad(2, '' + (date.getMonth() + 1)),
    'M': date => '' + (date.getMonth() + 1),
    'YYYY': date => pad(4, '' + date.getFullYear()),
    'YY': date => ('' + date.getFullYear()).substr(-2),
    'HH': date => pad(2, '' + date.getHours()),
    'H': date => '' + date.getHours(),
    'mm': date => pad(2, '' + date.getMinutes()),
    'm': date => '' + date.getMinutes(),
    'ss': date => pad(2, '' + date.getSeconds()),
    's': date => '' + date.getSeconds(),
    'SSS': date => '' + pad(3, '' + date.getMilliseconds()),
};

const ESCAPE = '\\[[^\\[\\]]*\\]';

function createMatcher(): RegExp {
    const matchers = Object.keys(FORMATTERS).concat(ESCAPE);
    return new RegExp(matchers.join('|'), 'g');
}

function pad(length: number, text: string): string {
    if (text.length >= length) return text;
    return pad(length, '0' + text);
}

export function formatDate(rawDate: Date | number | string, format: string): string {

    let date: Date
    if (typeof rawDate === 'string' || rawDate instanceof String)
        date = new Date(Date.parse(rawDate as string))
    else if (rawDate instanceof Date)
        date = rawDate as Date
    else if (!isNaN(rawDate))
        date = new Date(rawDate as number)
    else
        throw new Error("Input date not supported: " + rawDate)

    fixTimezone(date, format)

    return format.replace(createMatcher(), (token: string) => {
        if (FORMATTERS.hasOwnProperty(token)) return FORMATTERS[token](date);
        return token.replace(/\[|\]/g, '');
    });
}


