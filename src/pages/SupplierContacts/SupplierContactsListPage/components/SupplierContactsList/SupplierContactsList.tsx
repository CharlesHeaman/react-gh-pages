import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchHelperText from "../../../../../components/ui/SearchHelperText/SearchHelperText";
import SearchTable from "../../../../../components/ui/SearchTable/SearchTable";
import { SupplierContactCollectionResponse } from "../../../../../types/supplierContact.types";
import { SupplierManufacturerCollectionResponse, SupplierManufacturerResponseData } from "../../../../../types/supplierManufacturer.types";
import findSupplierManufacturer from "../../../../../utils/findSupplierManufacturer";
import getAPI from "../../../../../utils/getAPI";
import SupplierContactRow from "../SupplierContactRow";
import SupplierContactRowSkeleton from "./components/SupplierContactRowSkeleton";

const SupplierContactsList = (props: {
    hasSearched: boolean,
    isSupplierContactsLoading: boolean,
    supplierContacts: SupplierContactCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hideSupplier?: boolean,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isSuppliersLoading, setIsSuppliersLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<Array<SupplierManufacturerResponseData>>([]);

    // Resource Constants
    const resourceName = "supplier contacts";
    const resourceIcon = "contact_phone"

    useEffect(() => {
        setIsSuppliersLoading(true);
    }, [props.isSupplierContactsLoading])

    useEffect(() => {
        if (props.supplierContacts && props.supplierContacts.data.length > 0) {
            if (!props.hideSupplier) {
                getSuppliers([...new Set(props.supplierContacts.data.map(supplierContact => supplierContact.data.supplier_manufacturer_id))]);
            } else {
                setIsSuppliersLoading(false);
            }
        } else {
            setIsSuppliersLoading(false);
            }
    }, [props.supplierContacts])

    const getSuppliers = (supplierIDs: Array<number>) => {
        getAPI('suppliers_manufacturers', {
            ids: supplierIDs
        }, (response: any) => {
            const supplierData: SupplierManufacturerCollectionResponse = response.data;
            setSupplierData(supplierData.data)
        }, setIsSuppliersLoading)
    }

    const isLoading = (
        props.isSupplierContactsLoading || 
        (isSuppliersLoading && !props.hideSupplier)
    )

    const getTableHeader = () => {
        var tableHeader = ['Name', 'Supplier', 'Email', 'Telephone', 'Mobile'];
        if (props.hideSupplier) {
            var headerIndex = tableHeader.indexOf('Supplier');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }

    return (
        <div>
            {props.hasSearched ?
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.supplierContacts)}
                    skeletonRow={<SupplierContactRowSkeleton hideSupplier={props.hideSupplier}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.supplierContacts ? props.supplierContacts.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.supplierContacts && props.supplierContacts.data.map((supplierContact, index) => 
                        <SupplierContactRow
                            supplierContact={supplierContact}
                            supplier={findSupplierManufacturer(supplierData, supplierContact.data.supplier_manufacturer_id)}
                            hideSupplier={props.hideSupplier}
                            key={index}
                        />
                    )}
                />
                :
                props.showAdvancedSearch ? <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search supplier contact by name"
                    showAdvanced={props.showAdvancedSearch}
                /> : null
            }
            {(!isLoading && props.hasSearched && props.supplierContacts) && <PaginationNavigation
                data={props.supplierContacts.data}
                totalCount={props.supplierContacts.total_count}
                perPage={props.supplierContacts.pages.per_page}
                resourceName={resourceName}
                prefix="supplier_contacts"
            />}
        </div>
    )
}

export default SupplierContactsList