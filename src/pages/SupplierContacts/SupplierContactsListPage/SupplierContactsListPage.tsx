import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import Header from "../../../components/ui/Structure/Header/Header";
import { SupplierContactCollectionResponse } from "../../../types/supplierContact.types";
import getAPI from "../../../utils/getAPI";
import SupplierManufacturerNavigation from "../../SuppliersManufacturers/components/SupplierManufacturerNavigation/SupplierManufacturerNavigation";
import SupplierContactSearchHeader from "../components/SupplierContactSearchHeader";
import getSupplierContactSearchParams from "../utils/getSupplierContactsSearchParams";
import SupplierContactsList from "./components/SupplierContactsList/SupplierContactsList";
import SupplierContactAdvancedSearch from "./components/SupplierContactsAdvancedSearch";

const SupplierContactsListPage = ()  => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isSupplierContactLoading, setIsSupplierContactLoading] = useState(true);
    const [supplierContactData, setSupplierContactData] = useState<SupplierContactCollectionResponse>();

    // Search Parameters 
    const hasSearched = searchParams.get(`supplier_contacts_has_searched`) === "true";
    const contactSearchParams = getSupplierContactSearchParams(searchParams);    

    useEffect(() => {
        hasSearched && searchContacts();
    }, [JSON.stringify(contactSearchParams)])

    const searchContacts = () => {
        setShowAdvancedSearch(false);
        getAPI('supplier_contacts', {
            ...contactSearchParams,
        }, (response: any) => {
            const contactData: SupplierContactCollectionResponse = response.data;
            setSupplierContactData(contactData);
        }, setIsSupplierContactLoading);
    }
    
    return (
        <>
            <SupplierManufacturerNavigation
                location="supplier_contacts"
            />
            <OuterContainer
                title='Supplier/Manufacturer Contacts'
                maxWidth={1400}
                description="Create, edit and deactivate contacts linked to suppliers/manufacturers."
                noBorder
            >
                <SupplierContactSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <SupplierContactsList 
                    hasSearched={hasSearched} 
                    isSupplierContactsLoading={isSupplierContactLoading} 
                    supplierContacts={supplierContactData} 
                    perPage={contactSearchParams.perPage}
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />                
            </OuterContainer>

            <SupplierContactAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default SupplierContactsListPage