import isLockedByTimegrid from "./isLockedByTimegrid"

describe('The isLockedByTimegrid util', () => {
    it(`returns 'true' for submitted states`, () => {
        expect(isLockedByTimegrid(true)).toBe(true);
    })

    it(`returns 'false' for un-submitted states`, () => {
        expect(isLockedByTimegrid(false)).toBe(false);
    })

})