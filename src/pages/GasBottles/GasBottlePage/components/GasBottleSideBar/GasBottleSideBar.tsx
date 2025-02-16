import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { RefrigerantMovementCollectionResponse } from "../../../../../types/refrigerantMovement.types"
import getAPI from "../../../../../utils/getAPI"
import GasBottleAssignment from "./components/GasBottleAssignment/GasBottleAssignment"
import GasBottleDeactivate from "./components/GasBottleDisable/GasBottleDisable"
import GasBottleAssociatedData from "./components/GasBottleHistory/GasBottleAssociatedData"
import GasBottleRental from "./components/GasBottleRental/GasBottleRental"
import GasBottleSideBarSkeleton from "./components/GasBottleSideBarSkeleton"
import { GasBottleActivityCollectionResponse } from "../../../../../types/gasBottleActivity"
import { GasBottleResponseData } from "../../../../../types/gasBottle.types"
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent"

const GasBottleSideBar = (props: {
    gasBottle: GasBottleResponseData | undefined,
    setGasBottleData: Dispatch<SetStateAction<GasBottleResponseData | undefined>>,
    isAssigned: boolean,
    isUserLoading: boolean,
    isReturned: boolean,
    isConsumable?: boolean,
}) => {
    // Data States
    const [isRefrigerantMovementsLoading, setIsRefrigerantMovementsLoading] = useState(true);
    const [refrigerantMovementData, setRefrigerantMovementData] = useState<RefrigerantMovementCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<GasBottleActivityCollectionResponse>();

    useEffect(() => {
        if (props.gasBottle?.id) {
            getGasBottleActivity(props.gasBottle.id);
        }
    }, [props.gasBottle?.id, JSON.stringify(props.gasBottle)])

    useEffect(() => {
        if (props.gasBottle?.data.number) {
            getRefrigerantMovements(props.gasBottle.data.number);
        }
    }, [props.gasBottle?.data.number])

    const getGasBottleActivity = (gasBottleID: number) => {
        getAPI(`gas_bottle_activity`, {
            gas_bottle_ids: [gasBottleID],
            perPage: 1
        }, (response: any) => {
            const activityData: GasBottleActivityCollectionResponse = response.data;
            setActivityData(activityData);
        }, setIsActivityLoading)    
    } 

    const getRefrigerantMovements = (bottleNumber: string) => {
        getAPI(`refrigerant_movements`, {
            bottle_number: bottleNumber,
            perPage: 1
        }, (response: any) => {
            const refrigerantMovementData: RefrigerantMovementCollectionResponse = response.data;
            setRefrigerantMovementData(refrigerantMovementData);
        }, setIsRefrigerantMovementsLoading)    
    } 

    const isLoading = (
        props.isUserLoading || 
        isRefrigerantMovementsLoading || 
        isActivityLoading
    )

    return (
        !isLoading && props.gasBottle && refrigerantMovementData && activityData ? <>
            {props.gasBottle.data.is_active && !props.isReturned ? 
                <PermsProtectedComponent requiredPerms={{ engineer_assets: 2 }}>
                    {!props.gasBottle.data.is_queued ? <GasBottleAssignment
                        gasBottleID={props.gasBottle.id}
                        isAssigned={props.isAssigned}
                        current_gas_weight={props.gasBottle.data.current_gas_weight}
                        tare_weight={props.gasBottle.data.tare_weight}
                        setGasBottleData={props.setGasBottleData}
                        isConsumable={props.isConsumable}                 
                    /> : null}
                    <GasBottleRental
                        gasBottleID={props.gasBottle.id}
                        isQueued={props.gasBottle.data.is_queued}
                        current_gas_weight={props.gasBottle.data.current_gas_weight}
                        tare_weight={props.gasBottle.data.tare_weight}
                        setGasBottleData={props.setGasBottleData}   
                        isConsumable={props.isConsumable}                 
                    />
                </PermsProtectedComponent>
            : null}
            <GasBottleAssociatedData
                bottleID={props.gasBottle.id}
                bottleNumber={props.gasBottle.data.number}
                activityCount={activityData.total_count}
                refrigerantMovementCount={refrigerantMovementData.total_count}
                isConsumable={props.isConsumable}
            />
            <PermsProtectedComponent requiredPerms={{ engineer_assets: 2 }}>
                {props.gasBottle.data.is_active ?
                    <GasBottleDeactivate
                        gasBottleID={props.gasBottle.id} 
                        setGasBottleData={props.setGasBottleData}
                        reactivate={!props.gasBottle.data.is_active} 
                        isConsumable={props.isConsumable}
                    /> : 
                    null
                }
            </PermsProtectedComponent>

            <ExportResource
                resourceData={props.gasBottle}
                resourceName='Gas Bottle'
            />
        </> :
        // Skeleton
        <GasBottleSideBarSkeleton/>
    )
}

export default GasBottleSideBar