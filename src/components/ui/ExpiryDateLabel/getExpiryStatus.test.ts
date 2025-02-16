import getDayRelativeDate from "../../../utils/getDayRelativeDate";
import getYearRelativeDate from "../../../utils/getYearRelativeDate";
import getExpiryStatus from "./getExpiryStatus";

describe('the getExpiryStatus utility function', () => {
    it('returns the correct status', () => {
        const good = getExpiryStatus(getYearRelativeDate(new Date() , 1));
        expect(good).toBe(1);

        const expiringSoon = getExpiryStatus(getDayRelativeDate(new Date() , 1));
        expect(expiringSoon).toBe(0);

        const expired = getExpiryStatus(getDayRelativeDate(new Date() , -1));
        expect(expired).toBe(-1);
    })
})