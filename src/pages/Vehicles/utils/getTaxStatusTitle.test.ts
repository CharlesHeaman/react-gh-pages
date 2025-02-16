import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import getYearRelativeDate from "../../../utils/getYearRelativeDate";
import getTaxStatusTitle from "./getTaxStatusTitle"

describe('the getTaxStatusTitle utility function', () => {
    it('returns the correct title', () => {
        const goodTitle = getTaxStatusTitle(getYearRelativeDate(new Date() , 1));
        expect(goodTitle).toBe('Tax Good');

        const expiringSoonTitle = getTaxStatusTitle(getDayRelativeDate(new Date() , 1));
        expect(expiringSoonTitle).toBe('Tax Expiring Soon');

        const expiredTitle = getTaxStatusTitle(getDayRelativeDate(new Date() , -1));
        expect(expiredTitle).toBe('Tax Expired');
    })
})