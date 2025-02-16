import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SupplierContactCollectionResponse } from "../../../../../../../../types/supplierContact.types";
import getAPI from "../../../../../../../../utils/getAPI";
import SupplierContactSearchHeader from "../../../../../../../SupplierContacts/components/SupplierContactSearchHeader";
import SupplierContactAdvancedSearch from "../../../../../../../SupplierContacts/SupplierContactsListPage/components/SupplierContactsAdvancedSearch";
import SupplierContactsList from "../../../../../../../SupplierContacts/SupplierContactsListPage/components/SupplierContactsList/SupplierContactsList";
import getSupplierContactSearchParams from "../../../../../../../SupplierContacts/utils/getSupplierContactsSearchParams";

const SupplierManufacturerContacts = (props: {
    supplierID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    
    // Data States
    const [isContactsLoading, setIsContactsLoading] = useState(true);
    const [contactData, setContactsData] = useState<SupplierContactCollectionResponse>();

    // Search Parameters 
    const contactSearchParams = getSupplierContactSearchParams(searchParams);    
    
    useEffect(() => {
        getSupplierContacts();
    }, [props.supplierID, JSON.stringify(contactSearchParams)])

    const getSupplierContacts = () => {
        getAPI(`supplier_contacts`, {
            supplier_manufacturer_ids: [props.supplierID],
            ...contactSearchParams
        }, (response: any) => {
            const contactData: SupplierContactCollectionResponse = response.data;
            setContactsData(contactData);
        }, setIsContactsLoading)    
    } 

    return (
        <>
            <WindowOverlay 
                title={"Supplier/Manufacturer Contacts"} 
                maxWidth={1000} 
                show={props.show}
                hideFunc={props.hideFunc} 
                top
            >
                <SupplierContactSearchHeader
                    supplierManufacturerID={props.supplierID}
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <SupplierContactsList 
                    hasSearched={true} 
                    isSupplierContactsLoading={isContactsLoading} 
                    supplierContacts={contactData} 
                    perPage={contactSearchParams.perPage}
                    totalCount={props.totalCount}
                    hideSupplier
                />
            </WindowOverlay>

            <SupplierContactAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>

    )
}

export default SupplierManufacturerContacts