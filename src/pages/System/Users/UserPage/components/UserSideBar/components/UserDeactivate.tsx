import { Dispatch, SetStateAction, useState } from "react"
import DeactivateModule from "../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import { UserResponseData } from "../../../../../../../types/user.types";
import putAPI from "../../../../../../../utils/putAPI";


const UserDeactivate = (props: {
    userID: number,
    reactivate: boolean,
    setUserData: Dispatch<SetStateAction<UserResponseData | undefined>>
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateUser = () => {
        putAPI(`users/${props.userID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const userData: UserResponseData = response.data;
            props.setUserData(userData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    return (
        <>
            <DeactivateModule
                resourceName='User'
                showFunc={() => setShowDeactivate(true)}
                reactivate={props.reactivate}
            />

            <DeactivateOverlay 
                resourceName="User"
                reactivate={props.reactivate} 
                show={showDeactivate} 
                hideFunc={() => setShowDeactivate(false)} 
                isSubmitting={isDeactivating} 
                submitFunc={deactivateUser}
            />
        </>

    )
}

export default UserDeactivate