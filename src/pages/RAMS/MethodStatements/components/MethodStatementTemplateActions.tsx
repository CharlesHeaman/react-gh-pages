import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { MethodStatementTemplateResponseData } from "../../../../types/methodStatementTemplate.types";
import MarkMethodStatementTemplateAsDefault from "./MarkMethodStatementTemplateAsDefault";

const MethodStatementTemplateActions = (props: {
    methodStatementTemplateID: number,
    setMethodStatementTemplateData: Dispatch<SetStateAction<MethodStatementTemplateResponseData | undefined>>,
    isDefault: boolean,
    setIsEditMode: () => void,
}) => {
    
    const [showMarkAsDefault, setShowMarkAsDefault] = useState(false);

    return (
        <>
            <SideBarModule title="Actions">
                {!props.isDefault ? <SideBarButton 
                    text='Mark as Default'
                    iconFont="star"
                    color="dark-blue"
                    clickEvent={() => setShowMarkAsDefault(true)}
                /> : null}
                <SideBarButton
                    text='Edit Template Details'
                    iconFont="edit"
                    color="orange"
                    clickEvent={props.setIsEditMode}
                />
            </SideBarModule>

            <MarkMethodStatementTemplateAsDefault
                methodStatementTemplateID={props.methodStatementTemplateID}
                setMethodStatementTemplateData={props.setMethodStatementTemplateData}
                show={showMarkAsDefault}
                hideFunc={() => setShowMarkAsDefault(false)}
            />
        </>
    )
}

export default MethodStatementTemplateActions