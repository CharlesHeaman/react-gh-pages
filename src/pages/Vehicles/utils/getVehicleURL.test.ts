import getVehicleURL from "./getVehicleURL";

describe('the getVehicleURL utility function', () => {
    it('return the correct url', () => {
        const vehicleURL = getVehicleURL(123);

        expect(vehicleURL).toBe('/#/system/vehicles/123');
    });
})