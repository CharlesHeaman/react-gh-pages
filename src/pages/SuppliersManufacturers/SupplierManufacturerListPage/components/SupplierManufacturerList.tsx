import { useEffect, useState } from "react"
import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchHelperText from "../../../../components/ui/SearchHelperText/SearchHelperText"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { SupplierContactCollectionResponse, SupplierContactResponseData } from "../../../../types/supplierContact.types"
import { SupplierManufacturerCollectionResponse } from "../../../../types/supplierManufacturer.types"
import countSupplierContacts from "../../../../utils/countSupplierContacts"
import getAPI from "../../../../utils/getAPI"
import SupplierManufacturerRow from "./SupplierManufacturerRow"
import SupplierManufacturerRowSkeleton from "./SuppliersManufacturersRowSkeleton"

const SupplierManufacturerList = (props: {
    hasSearched: boolean,
    isSuppliersManufacturersLoading: boolean,
    supplierManufacturers: SupplierManufacturerCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isContactsLoading, setIsContactsLoading] = useState(false);
    const [contactsData, setContactsData] = useState<Array<SupplierContactResponseData>>([]);

    // Resource Constants
    const resourceName = "suppliers/manufacturers";
    const resourceIcon = "warehouse"

    useEffect(() => {
        setIsContactsLoading(true);
    }, [props.isSuppliersManufacturersLoading])

    useEffect(() => {
        if (props.supplierManufacturers && props.supplierManufacturers.data.length > 0) {
            getContacts([...new Set(props.supplierManufacturers.data.map(customer => customer.id))]);
        } else {
            setIsContactsLoading(false);
        }
    }, [props.supplierManufacturers])

    const getContacts = (supplierIDs: Array<number>) => {
        getAPI(`supplier_contacts`, {
            supplier_manufacturer_ids: supplierIDs,
            is_active: true,
        }, (response: any) => {
            const contactData: SupplierContactCollectionResponse = response.data;
            setContactsData(contactData.data);
        }, setIsContactsLoading)
    }  

    const isLoading = (
        props.isSuppliersManufacturersLoading || 
        isContactsLoading
    )

    return (
        <div>
            {props.hasSearched ?
                <SearchTable
                headers={['Code', 'Name', 'Contacts', 'Sage Name', 'Type', 'Approval']}
                    isLoading={!(!isLoading && props.supplierManufacturers)}
                    skeletonRow={<SupplierManufacturerRowSkeleton/>}
                    skeletonCount={props.perPage}
                    count={props.supplierManufacturers ? props.supplierManufacturers.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.supplierManufacturers && props.supplierManufacturers.data.map((supplierManufacturer, index) => 
                        <SupplierManufacturerRow
                            supplierManufacturer={supplierManufacturer}
                            contactCount={countSupplierContacts(contactsData, supplierManufacturer.id)}
                            key={index}
                        />
                    )}
                />
                :
                <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search suppliers and manufacturers by code or name"
                />
            }
            {(!isLoading && props.hasSearched && props.supplierManufacturers) && <PaginationNavigation
                data={props.supplierManufacturers.data}
                totalCount={props.supplierManufacturers.total_count}
                perPage={props.supplierManufacturers.pages.per_page}
                resourceName={resourceName}
                prefix={resourceName}
            />}
        </div>
    )
}

export default SupplierManufacturerList