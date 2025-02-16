import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { SupplierManufacturerCollectionResponse } from "../../../types/supplierManufacturer.types";
import getAPI from "../../../utils/getAPI";
import SupplierManufacturerNavigation from "../components/SupplierManufacturerNavigation/SupplierManufacturerNavigation";
import SupplierManufacturerSearchHeader from "../components/SupplierManufacturerSearchHeader";
import getSupplierManufacturerSearchParams from "../utils/getSupplierManufacturerSearchParams";
import SupplierManufacturerList from "./components/SupplierManufacturerList";

const SupplierManufacturersListPage = ()  => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isSuppliersManufacturersLoading, setIsSuppliersManufacturersLoading] = useState(true);
    const [supplierManufacturerData, setSupplierManufacturerData] = useState<SupplierManufacturerCollectionResponse>();
    
    // Search Parameters 
    const hasSearched = searchParams.get(`suppliers_manufacturers_has_searched`) === "true";
    const supplierManufacturerSearchParams = getSupplierManufacturerSearchParams(searchParams);

    useEffect(() => {
        hasSearched && searchSupplierManufacturers();
    }, [JSON.stringify(supplierManufacturerSearchParams)])

    const searchSupplierManufacturers = () => {
        getAPI('suppliers_manufacturers', {
            ...supplierManufacturerSearchParams
        }, (response: any) => {
            const supplierManufacturerData: SupplierManufacturerCollectionResponse = response.data;
            setSupplierManufacturerData(supplierManufacturerData);
        }, setIsSuppliersManufacturersLoading);
    }
    
    return (
        <>
            <SupplierManufacturerNavigation
                location="suppliers_manufacturers"
            />
            <OuterContainer
                title='Suppliers/Manufacturers'
                description="Create, edit and deactivate suppliers/manufacturers. Manage suppliers/manufacturers ISO approval. Manage suppliers/manufacturers documents."
                maxWidth={1400}
                noBorder
            >
                <SupplierManufacturerSearchHeader/>
                <SupplierManufacturerList 
                    hasSearched={hasSearched} 
                    isSuppliersManufacturersLoading={isSuppliersManufacturersLoading} 
                    supplierManufacturers={supplierManufacturerData} 
                    perPage={supplierManufacturerSearchParams.perPage}            
                />
            </OuterContainer>
        </>
    )
}

export default SupplierManufacturersListPage