import { render, fireEvent, screen } from "@testing-library/react";
import { SetStateAction } from "react";
import { SupplierManufacturerResponseData } from "../../../../../../types/supplierManufacturer.types";
import SupplierManufacturerDeactivate from "./SupplierManufacturerDeactivate"
import mockAxios from 'jest-mock-axios'
import mockHeaders from "../../../../../../../jest/mockHeaders";
import { supplierManufacturerResponseData } from "../../../../supplierManufacturer.data";

describe('The DeactivateManufacturerModules', () => {
    it('can deactivate the supplier/manufacturer', () => {
        render(
            <SupplierManufacturerDeactivate
                supplierManufacturerID={123} 
                setSupplierManufacturerData={(value: SetStateAction<SupplierManufacturerResponseData | undefined>) => null}                
            />
        )

        fireEvent.click(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "span" && content === 'Deactivate'
        }))

        fireEvent.click(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "button" && content === 'Deactivate Supplier/Manufacturer'
        }))

        expect(mockAxios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers/123/update`, {
            is_active: false
        }, {
            "headers": mockHeaders,
            "params": {}
        });
       
        mockAxios.mockResponseFor({ 
            url: `${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers/123/update`
        }, {
            data: supplierManufacturerResponseData
        });
    });

    it('can close the deactivate window', () => {
        render(
            <SupplierManufacturerDeactivate
                supplierManufacturerID={123} 
                setSupplierManufacturerData={(value: SetStateAction<SupplierManufacturerResponseData | undefined>) => null}                
            />
        )

        fireEvent.click(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "span" && content === 'Deactivate'
        }))

        expect(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "h3" && content === 'Deactivate Supplier/Manufacturer'
        })).toBeInTheDocument();

        fireEvent.click(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "span" && content === 'close'
        }))

        expect(screen.queryByText('Deactivate Supplier/Manufacturer')).not.toBeInTheDocument();
    });
})