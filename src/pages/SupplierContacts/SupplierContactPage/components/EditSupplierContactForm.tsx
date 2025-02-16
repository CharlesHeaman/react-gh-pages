import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { CreateSupplierContactAttributes, SupplierContactResponseData } from "../../../../types/supplierContact.types";
import putAPI from "../../../../utils/putAPI";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import isContactDetailsFormValid from "../../../CustomerAdmin/Contacts/CreateContact/utils/isContactDetailsFormValid";
import SupplierContactDetailsForm from "../../CreateSupplierContactPage/components/SupplierContactDetailsForm";

const EditSupplierContactForm = (props: {
    contact: SupplierContactResponseData,
    setContactData: Dispatch<SetStateAction<SupplierContactResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [contactDetails, setContactDetails] = useState<CreateSupplierContactAttributes>({
        name: props.contact.data.name,
        email: props.contact.data.email ? props.contact.data.email : '',
        mobile: props.contact.data.mobile ? props.contact.data.mobile : '',
        telephone: props.contact.data.telephone ? props.contact.data.telephone : '',
        notes: props.contact.data.notes ? props.contact.data.notes : '',
    });
   
    const formComplete = isContactDetailsFormValid(contactDetails)

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setContactDetails)
    }

    const updateContact = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`supplier_contacts/${props.contact.id}/update`, {}, contactDetails, (response: any) => {
            const contactData: SupplierContactResponseData = response.data;
            props.setContactData(contactData);
            props.disabledEdit()
        }, setIsUpdating)
    }

    return (
        <>
            <SupplierContactDetailsForm
                contactDetails={contactDetails}
                updateParams={updateParams}
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateContact}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditSupplierContactForm