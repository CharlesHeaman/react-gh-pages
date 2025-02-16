import { render, screen } from "@testing-library/react";
import SupplierManufacturerApprovedLabel from "./SupplierManufacturerApprovedLabel";

describe('The SupplierManufacturerApprovedLabel', () => {
    it('displays the approved label', () => {
        render(
            <SupplierManufacturerApprovedLabel
                is_approved={true}
            />
        )
        expect(screen.getByText('Approved')).toBeInTheDocument();
    })

    it('displays the pending label', () => {
        render(
            <SupplierManufacturerApprovedLabel
                is_approved={null}
            />
        )
        expect(screen.getByText('Pending')).toBeInTheDocument();
    })

    it('displays the non-approved label', () => {
        render(
            <SupplierManufacturerApprovedLabel
                is_approved={false}
            />
        )
        expect(screen.getByText('Non-approved')).toBeInTheDocument();
    })
})
