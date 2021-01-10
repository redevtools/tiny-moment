import {formatDate} from "../src/tiny-moment";

test("Test formatDate with date only", () => {
    const r = formatDate(new Date("2020-12-06"), "DD/MM/YYYY")
    expect(r).toBe("06/12/2020")
})

test("Test formatDate with hour only", () => {
    let d = new Date()
    d.setHours(16)
    d.setMinutes(20)
    d.setSeconds(55)
    const r = formatDate(d, "HH:mm:ss")
    expect(r).toBe("16:20:55")
})

test("Test formatDate with number", () => {
    const r = formatDate(1000, "DD/MM/YYYY HH:mm:ss")
    expect(r).toBe("01/01/1970 01:00:01")
})