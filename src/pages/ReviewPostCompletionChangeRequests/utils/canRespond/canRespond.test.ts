import canRespond from "./canRespond"

describe('The canRespond util', () => {
    
    it(`returns 'true' for pending state`, () => {
        expect(canRespond(0)).toBe(true);
    })

    it(`returns 'false' for accepted or denied state`, () => {
        expect(canRespond(-1)).toBe(false);
        expect(canRespond(1)).toBe(false);
    })
})