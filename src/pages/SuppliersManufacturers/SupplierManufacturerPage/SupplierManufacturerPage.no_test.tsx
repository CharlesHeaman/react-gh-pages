import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SupplierManufacturerPage from "./SupplierManufacturerPage";
import Router from 'react-router';
import mockHeaders from "../../../../jest/mockHeaders";
import { supplierManufacturerCollectionResponse } from "../supplierManufacturer.data";
import mockAxios from 'jest-mock-axios';

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: jest.fn(),
  }));

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
}));
const intersectionObserverMock = () => ({
    observe: () => null
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ supplierManufacturerCode: 'ABCPR1' });
});

describe('The Suppliers/Manufacturers List Page', () => {
    it('displays the title', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers/ABCPR1`]}>
                <SupplierManufacturerPage/>
            </MemoryRouter>
        )
        
        expect(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "h1" && content.startsWith('Supplier/Manufacturer')
        })).toBeInTheDocument();
    })

    it('displays the supplier/manufacturer code', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers/ABCPR1`]}>
                <SupplierManufacturerPage/>
            </MemoryRouter>
        )
        
        const titleElement = screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "h1" && content.startsWith('Supplier/Manufacturer')
        })
        expect(within(titleElement).getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "span" && content === '#ABCPR1'
        })).toBeInTheDocument();
    })

    it('displays the breadcrumb navigation', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers/ABCPR1`]}>
                <SupplierManufacturerPage/>
            </MemoryRouter>
        )
        
        expect(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "a" && content === 'Suppliers/Manufacturers'
        })).toHaveAttribute('href', '/suppliers_manufacturers');

        expect(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "a" && content === '#ABCPR1'
        })).toHaveAttribute('href', '/suppliers_manufacturers/ABCPR1');
    })

    it('displays the supplier/manufacturer information', async () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers/ABCPR1`]}>
                <SupplierManufacturerPage/>
            </MemoryRouter>
        )

        expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`, {
            "headers": mockHeaders,
            "params": {
                "code": "ABCPR1",
            }
        });
       
        mockAxios.mockResponseFor({ 
            url: `${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`
        }, {
            data: supplierManufacturerCollectionResponse
        });        

        await waitFor(() => {
            expect(screen.getByText('TestWebsite.com')).toBeInTheDocument();
        })
    })
})