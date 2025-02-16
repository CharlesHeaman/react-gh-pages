import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { SupplierContactResponseData, SupplierContactCollectionResponse } from "../../../types/supplierContact.types";

const SupplierContactSelect = (props: {
    selectedSupplierContact: SupplierContactResponseData | undefined,
    setSelectedSupplierContact: Dispatch<SetStateAction<SupplierContactResponseData | undefined>>,
    supplier_id: number,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isSupplierContactsLoading, setIsSupplierContactsLoading] = useState(false);
    const [customersData, setSupplierContactsData] = useState<SupplierContactCollectionResponse>();

    useEffect(() => {
        getSupplierContacts();
    }, [searchTerm]);

    const getSupplierContacts = () => {
        getAPI('supplier_contacts', {
            supplier_manufacturer_ids: [props.supplier_id],
            name_like: searchTerm,
            is_active: true,
        }, (response: any) => {
            const customerData: SupplierContactCollectionResponse = response.data;
            setSupplierContactsData(customerData);
        }, setIsSupplierContactsLoading);
    }

    const showRequired = props.selectedSupplierContact === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="contact_phone"
                resourceName="supplier contact"
                resourceNamePlural="supplier contacts"
                selectedText={props.selectedSupplierContact ? `${props.selectedSupplierContact.data.name} <${props.selectedSupplierContact.data.email}>` : undefined}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={customersData ? customersData.data.map(contact => {
                    return {
                        text: `${contact.data.name} <${contact.data.email}>`,
                        clickFunc: () => props.setSelectedSupplierContact(contact),
                        selected: props.selectedSupplierContact?.id === contact.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Supplier contact is required`}
                show={showRequired}
            />}
        </>
    )
}

export default SupplierContactSelect