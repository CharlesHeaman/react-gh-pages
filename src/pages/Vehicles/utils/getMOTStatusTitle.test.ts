import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import getYearRelativeDate from "../../../utils/getYearRelativeDate";
import getMOTStatusTitle from "./getMOTStatusTitle"

describe('the getMOTStatusTitle utility function', () => {
    it('returns the correct title', () => {
        const goodTitle = getMOTStatusTitle(getYearRelativeDate(new Date() , 1));
        expect(goodTitle).toBe('MOT Good');

        const expiringSoonTitle = getMOTStatusTitle(getDayRelativeDate(new Date() , 1));
        expect(expiringSoonTitle).toBe('MOT Expiring Soon');

        const expiredTitle = getMOTStatusTitle(getDayRelativeDate(new Date() , -1));
        expect(expiredTitle).toBe('MOT Expired');
    })
})