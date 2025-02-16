import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton"
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import UserAssociatedData from "./components/UserAssociatedData/UserAssociatedData"
import { VehicleCollectionResponse } from "../../../../../../types/vehicles.types"
import getAPI from "../../../../../../utils/getAPI"
import UserSideBarSkeleton from "./components/UserSideBarSkeleton"
import { AssetCollectionResponse } from "../../../../../../types/asset.types"
import { GasBottleCollectionResponse } from "../../../../../../types/gasBottle.types"
import ExportResource from "../../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import { UserResponseData } from "../../../../../../types/user.types"
import PermsProtectedComponent from "../../../../../../components/PermsProtectedComponent"
import UserDeactivate from "./components/UserDeactivate"

const UserSideBar = (props: {
    user: UserResponseData | undefined,
    setUserData: Dispatch<SetStateAction<UserResponseData | undefined>>
}) => {
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showReactivate, setShowReactivate] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    // Data States 
    const [isVehicleLoading, setIsVehicleLoading] = useState(true)
    const [vehicleData, setVehicleData] = useState<VehicleCollectionResponse>();
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const [assetData, setAssetData] = useState<AssetCollectionResponse>();
    const [isGasBottleLoading, setIsGasBottleLoading] = useState(true);
    const [gasBottleData, setGasBottleData] = useState<GasBottleCollectionResponse>();

    useEffect(() => {
        if (props.user === undefined) return;
        getVehicles(props.user.id);
        getAssets(props.user.id);
        getGasBottles(props.user.id);
    }, [props.user?.id])

    const getVehicles = (userID: number) => {
        getAPI(`vehicles`, {
            user_ids: [userID],
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const vehicleData: VehicleCollectionResponse = response.data;
            setVehicleData(vehicleData);
        }, setIsVehicleLoading)    
    }
    
    const getAssets = (userID: number) => {
        getAPI(`assets`, {
            assigned_to_user_ids: [userID],
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const assetData: AssetCollectionResponse = response.data;
            setAssetData(assetData);
        }, setIsAssetsLoading)    
    }

    const getGasBottles = (userID: number) => {
        getAPI(`gas_bottles`, {
            assigned_to_ids: [userID],
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const gasBottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(gasBottleData);
        }, setIsGasBottleLoading)    
    }

    const isLoading = (
        isVehicleLoading ||
        isAssetsLoading || 
        isGasBottleLoading
    )

    const hasCoordinates = false;

    return (
        !isLoading && props.user && vehicleData && assetData && gasBottleData ? <>
            {props.user.data.is_active ?
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <SideBarModule title="Actions">
                        <SideBarButton
                            text='Edit User Details'
                            iconFont="edit"
                            color="orange"
                            clickEvent={() => setShowEdit(true)}
                        />
                    </SideBarModule>
                    <SideBarModule title='Home'>
                        <SideBarButton
                            text={`${hasCoordinates ? 'Update' : "Set"} Home Location`}
                            iconFont="my_location"
                            color={hasCoordinates ? '' : "light-green"}
                            clickEvent={() => setShowUpdate(true)}
                        />
                    </SideBarModule>
                </PermsProtectedComponent>
            : null}

            <UserAssociatedData
                userID={props.user.id}
                vehicleCount={vehicleData.total_count}
                assetCount={assetData.total_count}
                gasBottleCount={gasBottleData.total_count}
            />
            {props.user.data.is_active ?
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <SideBarModule title="Login">
                        <SideBarButton
                            text='Update Password'
                            iconFont="password"
                            clickEvent={() => setShowEdit(true)}
                        />
                        <SideBarButton
                            text='Update Pin'
                            iconFont="pin"
                            clickEvent={() => setShowEdit(true)}
                        />
                    </SideBarModule>
                </PermsProtectedComponent>
            : null}

            <SideBarModule title="History">
                <SideBarButton
                    text="User Activity"
                    iconFont="history"
                    clickEvent={() => null}
                />
            </SideBarModule>
            <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                <UserDeactivate
                    userID={props.user.id}
                    setUserData={() => null}
                    reactivate={!props.user.data.is_active}
                />
            </PermsProtectedComponent>

            <ExportResource
                resourceData={props.user}
                resourceName='User'
            />
        </> : 
        <UserSideBarSkeleton/>
    )
}

export default UserSideBar