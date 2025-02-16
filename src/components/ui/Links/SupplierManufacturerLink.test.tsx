import { render, screen } from "@testing-library/react"
import SupplierManufacturerLink from "./SupplierManufacturerLink"

describe('the SupplierManufacturerLink component', () => { 
    it('displays the supplier/manufacturer icon', () => {
        render(<SupplierManufacturerLink 
            code={"TESTCODE012"}
        />)

        expect(screen.getByText('warehouse')).toBeInTheDocument();
    });

    it('displays the supplier/manufacturer code', () => {
        render(<SupplierManufacturerLink 
            code={"TESTCODE012"}
        />)

        expect(screen.getByText('TESTCODE012')).toBeInTheDocument();
    });

    it('has the correct destination', () => {
        render(<SupplierManufacturerLink 
            code={"TESTCODE012"}
        />)

        expect(screen.getByText((_content, element) => {
            return element?.tagName.toLocaleLowerCase() === "a"
        })).toHaveAttribute('href', '/#/suppliers_manufacturers/TESTCODE012');
    });
})