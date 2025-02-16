import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../../../../../components/ui/DeactivateModule/DeactivateModule"
import { ContactResponseData } from "../../../../../../../../types/contact.types"
import DeactivateOverlay from "../../../../../../../../components/ui/DeactivateModule/DeactivateOverlay"
import putAPI from "../../../../../../../../utils/putAPI"

const ContactDeactivate = (props: {
    contactID: number,
    reactivate: boolean,
    setContactData: Dispatch<SetStateAction<ContactResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateContact = () => {
        putAPI(`contacts/${props.contactID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const contactData: ContactResponseData = response.data;
            props.setContactData(contactData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Contact'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Contact"
                reactivate={props.reactivate} 
                additionalText={!props.reactivate ? "This will also unassign this contact from any assigned sites." : undefined}
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateContact}
            />
        </>

    )
}

export default ContactDeactivate