import { render, screen } from "@testing-library/react"
import { supplierManufacturerResponseData } from "../../supplierManufacturer.data"
import SupplierManufacturerInformation from "./SupplierManufacturerInformation"

describe('The SupplierManufacturerInformation', () => { 
    it('displays the information', () => {
        render(
            <SupplierManufacturerInformation
                supplierManufacturerData={{
                    ...supplierManufacturerResponseData,
                    data: {
                        ...supplierManufacturerResponseData.data,
                        notes: 'test notes',
                        sage_name: 'test sage name'
                    }
                }}
                user={undefined}
                documents={[]}
            />
        )

        expect(screen.getByText('test notes')).toBeInTheDocument();
        expect(screen.getByText('test sage name')).toBeInTheDocument();
    })

    it('displays the none for missing information', () => {
        render(
            <SupplierManufacturerInformation
                supplierManufacturerData={{
                    ...supplierManufacturerResponseData,
                    data: {
                        ...supplierManufacturerResponseData.data,
                        website_url: null,
                        notes: null,
                        sage_name: null
                    }
                }}
                user={undefined}
                documents={[]}
            />
        )
    })
})