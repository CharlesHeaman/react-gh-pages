import { render, screen } from "@testing-library/react"
import { supplierManufacturerResponseData } from "../../supplierManufacturer.data"
import SupplierManufacturerRow from "./SupplierManufacturerRow"

describe('the SupplierManufacturerRow', () => {
    it('displays the correct text', () => {
        render(<SupplierManufacturerRow
            supplierManufacturer={supplierManufacturerResponseData}
            contactCount={0}
        />)

        expect(screen.getByText('PLUMB21')).toBeInTheDocument();
        expect(screen.getByText('Plumb/Parts Centre (W-S-M) (Wolseley)')).toBeInTheDocument();
        expect(screen.getByText('sage123')).toBeInTheDocument();
    })

    // it('displays the supplier label', () => {
    //     render(<SupplierManufacturerRow
    //         supplierManufacturer={{
    //             ...supplierManufacturerResponseData,
    //             data: {
    //                 ...supplierManufacturerResponseData.data,
    //                 is_supplier: true,
    //             }
    //         }}
    //         contactCount={0}
    //     />)

    //     expect(screen.getByText((content, element) => {
    //         return element?.tagName.toLocaleLowerCase() === "span" && content === "warehouse"
    //     })).toBeInTheDocument();
    // })

    it('displays the manufacturer label', () => {
        render(<SupplierManufacturerRow
            supplierManufacturer={{
                ...supplierManufacturerResponseData,
                data: {
                    ...supplierManufacturerResponseData.data,
                    is_manufacturer: true
                }
            }}
            contactCount={0}
        />)

        expect(screen.getByText('construction')).toBeInTheDocument();
    })

    it('displays the sub-contractor label', () => {
        render(<SupplierManufacturerRow
            supplierManufacturer={{
                ...supplierManufacturerResponseData,
                data: {
                    ...supplierManufacturerResponseData.data,
                    is_sub_contractor: true,
                }
            }}
            contactCount={0}
        />)

        expect(screen.getByText('engineering')).toBeInTheDocument();
    })

    it('displays the gas supplier label', () => {
        render(<SupplierManufacturerRow
            supplierManufacturer={{
                ...supplierManufacturerResponseData,
                data: {
                    ...supplierManufacturerResponseData.data,
                    is_gas_supplier: true,
                }
            }}
            contactCount={0}
        />)

        expect(screen.getByText('propane')).toBeInTheDocument();
    })

    it('displays the approved label', () => {
        render(<SupplierManufacturerRow
            supplierManufacturer={{
                ...supplierManufacturerResponseData,
                data: {
                    ...supplierManufacturerResponseData.data,
                    is_supplier: false,
                    is_manufacturer: true
                }
            }}
            contactCount={0}
        />)

        expect(screen.getByText('Non-approved')).toBeInTheDocument();
    })
})
