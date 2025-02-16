import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { ContactResponseData, CreateContactAttributes } from "../../../../../../types/contact.types";
import putAPI from "../../../../../../utils/putAPI";
import updateStateParams from "../../../../../../utils/updateStateParams/updateStateParams";
import ContactDetailsForm from "../../../CreateContact/components/ContactDetailsForm";
import isContactDetailsFormValid from "../../../CreateContact/utils/isContactDetailsFormValid";

const EditContactForm = (props: {
    contact: ContactResponseData,
    setContactData: Dispatch<SetStateAction<ContactResponseData | undefined>>
    disabledEdit: () => void
}) => {  
    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [contactDetails, setContactDetails] = useState<CreateContactAttributes>({
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
        putAPI(`contacts/${props.contact.id}/update`, {}, contactDetails, (response: any) => {
            const contactData: ContactResponseData = response.data;
            props.setContactData(contactData);
            props.disabledEdit()
        }, setIsUpdating)
    }

    return (
        <>
            <ContactDetailsForm 
                contactDetails={contactDetails} 
                updateParams={updateParams} 
                isEdit
                showErrors
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

export default EditContactForm