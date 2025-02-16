import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import mockHeaders from "../../../../jest/mockHeaders";
import mockAxios from 'jest-mock-axios'
import SupplierManufacturersListPage from "./SuppliersManufacturersListPage";
import { supplierManufacturerCollectionResponse } from "../supplierManufacturer.data";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
  }));

const intersectionObserverMock = () => ({
    observe: () => null
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('The Suppliers/Manufacturers List Page', () => {
    it('displays the title', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )
        
        expect(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "h1" && content === 'Suppliers/Manufacturers'
        })).toBeInTheDocument();
    })

    it('displays the breadcrumb navigation', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )
        
        expect(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "a" && content === 'Suppliers/Manufacturers'
        })).toHaveAttribute('href', '/suppliers_manufacturers');
    })

    it('displays the search helper text', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )
        
        expect(screen.getByText(content => {
            return content.startsWith('Search suppliers and manufacturers by name or use the')
        })).toBeInTheDocument();
        
    })

    it('displays the create button', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )

        expect(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "a" && content === 'Create Supplier/Manufacturer'
        })).toHaveAttribute('href', '/#/suppliers_manufacturers/create');
    })

    it('can search suppliers/manufacturers', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )

        const searchInput = screen.getByPlaceholderText('Search all supplier/manufacturers...');

        fireEvent.change(searchInput, {
            target: {
                value: 'supplier name'
            }
        })

        fireEvent.submit(searchInput)

        expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`, {
            "headers": mockHeaders,
            "params": {
                "is_active": true,
                "name_like": "supplier name",
                "offset": null,
                "perPage": 20,
            }
        });
    })

    it('can search inactive suppliers/manufacturers', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )

        const allSelectButton = screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "a" && content.includes('All')
        })

        fireEvent.click(allSelectButton);

        const searchInput = screen.getByPlaceholderText('Search all supplier/manufacturers...');

        fireEvent.change(searchInput, {
            target: {
                value: 'supplier name'
            }
        })

        fireEvent.submit(searchInput)

        expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`, {
            "headers": mockHeaders,
            "params": {
                "name_like": "supplier name",
                "offset": null,
                "perPage": 20,
            }
        });
    })

    it('displays none found', async () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )

        const searchInput = screen.getByPlaceholderText('Search all supplier/manufacturers...');

        fireEvent.submit(searchInput)

        expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`, {
            "headers": mockHeaders,
            "params": {
                "is_active": true,
                "name_like": "supplier name",
                "offset": null,
                "perPage": 20,
            }
        });
       
        mockAxios.mockResponseFor({ 
            url: `${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`
        }, {
            data: {
                ...supplierManufacturerCollectionResponse,
                data: []
            }
        });

        await waitFor(() => {
            expect(screen.getByText('No suppliers/manufacturers matched your search')).toBeInTheDocument();
        })
    })

    it('displays returned suppliers/manufacturer rows', async () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )

        const searchInput = screen.getByPlaceholderText('Search all supplier/manufacturers...');

        fireEvent.submit(searchInput)

        expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`, {
            "headers": mockHeaders,
            "params": {
                "is_active": true,
                "name_like": "supplier name",
                "offset": null,
                "perPage": 20,
            }
        });
       
        mockAxios.mockResponseFor({ 
            url: `${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`
        }, {
            data: supplierManufacturerCollectionResponse
        });

        await waitFor(() => {
            expect(screen.getByText('PLUMB21')).toBeInTheDocument();
        })
    })

    it('displays the supplier/manufacturer link with correct location', async () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )

        const searchInput = screen.getByPlaceholderText('Search all supplier/manufacturers...');

        fireEvent.submit(searchInput)

        expect(mockAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`, {
            "headers": mockHeaders,
            "params": {
                "is_active": true,
                "name_like": "supplier name",
                "offset": null,
                "perPage": 20,
            }
        });
       
        mockAxios.mockResponseFor({ 
            url: `${process.env.REACT_APP_API_URL}/api/suppliers_manufacturers`
        }, {
            data: supplierManufacturerCollectionResponse
        });

        await waitFor(() => {
            expect(screen.getByText((content, element) => {
                return element?.tagName.toLocaleLowerCase() === "a" && content === 'PLUMB21'
            })).toHaveAttribute('href', '/#/suppliers_manufacturers/PLUMB21');
        })
    })

    it('displays the advanced search from helper text', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )

        fireEvent.click(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "a" && content === 'advanced search'
        }))

        expect(screen.getByText('Supplier/Manufacturers Advanced Search')).toBeInTheDocument();
    })

    it('displays the advanced search from the search form', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )

        fireEvent.click(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "span" && content === 'tune'
        }))

        expect(screen.getByText('Supplier/Manufacturers Advanced Search')).toBeInTheDocument();
    })

    it('can close the advanced search', () => {
        render(
            <MemoryRouter initialEntries={[`suppliers_manufacturers`]}>
                <SupplierManufacturersListPage/>
            </MemoryRouter>
        )

        fireEvent.click(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "span" && content === 'tune'
        }))

        expect(screen.getByText('Supplier/Manufacturers Advanced Search')).toBeInTheDocument();

        fireEvent.click(screen.getByText((content, element) => {
            return element?.tagName.toLocaleLowerCase() === "span" && content === 'close'
        }))

        expect(screen.queryByText('Supplier/Manufacturers Advanced Search')).not.toBeInTheDocument();
    })
})