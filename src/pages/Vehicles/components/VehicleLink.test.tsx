import { render, screen } from "@testing-library/react";
import VehicleLink from "./VehicleLink";

describe('the VehicleLink component', () => {
    it('displays the vehicle icon', () => {
        render(<VehicleLink 
            vehicleID={0} 
            registrationNumber={""}        
        />)

        expect(screen.getByText('directions_car')).toBeInTheDocument();
    });

    it('displays the vehicle registration', () => {
        render(<VehicleLink 
            vehicleID={0} 
            registrationNumber={"ABC 123"}        
        />)

        expect(screen.getByText('ABC 123')).toBeInTheDocument();
    });

    it('has the correct hypertext reference attribute', () => {
        render(<VehicleLink 
            vehicleID={123} 
            registrationNumber={"ABC 123"}        
        />)

        expect(screen.getByText((_content, element) => {
            return element?.tagName.toLocaleLowerCase() === "a"
        })).toHaveAttribute('href', '/#/system/vehicles/123');
    });
})