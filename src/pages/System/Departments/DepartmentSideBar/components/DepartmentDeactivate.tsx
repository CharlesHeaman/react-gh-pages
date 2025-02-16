import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { DepartmentResponseData } from "../../../../../types/department.types";
import putAPI from "../../../../../utils/putAPI";

const DepartmentDeactivate = (props: {
    departmentID: number,
    reactivate: boolean,
    setDepartmentData: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateDepartment = () => {
        putAPI(`departments/${props.departmentID}/deactivate`, {}, {
            reactivate: props.reactivate,
        }, (response: any) => {
            const contactData: DepartmentResponseData = response.data;
            props.setDepartmentData(contactData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='Department'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="Department"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateDepartment}/>
        </>

    )
}

export default DepartmentDeactivate