import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import getExpiryColor from "../../../components/ui/ExpiryDateLabel/getExpiryColor";
import getExpiryStatus from "../../../components/ui/ExpiryDateLabel/getExpiryStatus";
import Label from "../../../components/ui/General/Label/Label";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { GasBottleCollectionResponse, GasBottleResponseData } from "../../../types/gasBottle.types";
import { RefrigerantResponseData } from "../../../types/refrigerant.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import { UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import RefrigerantMovementLabel from "../../RefrigerantMovements/components/RefrigerantMovementLabel";
import GasBottleStatusLabel from "../components/GasBottleStatusLabel";
import getGasBottleRentalTitle from "../utils/getGasBottleRentalTitle";
import GasBottleInformation from "./components/GasBottleInformation";
import GasBottleInformationSkeleton from "./components/GasBottleInformationSkeleton";
import GasBottleSideBar from "./components/GasBottleSideBar/GasBottleSideBar";
import RefrigerantGasAirTypeLabel from "../../Refrigerants/RefrigerantPage/components/RefrigerantGasAirTypeLabel";
import BottleAdminNavigation from "../GasBottlesListPage/BottleAdminNavigation";
import { GasBottleActivityCollectionResponse, GasBottleActivityResponseData } from "../../../types/gasBottleActivity";

const GasBottlePage = (props: {
    isConsumable?: boolean,
}) => {
    const { gasBottleCode } = useParams();

    // Data States
    const [isGasBottleLoading, setIsGasBottleLoading] = useState(true);
    const [gasBottleData, setGasBottleData] = useState<GasBottleResponseData>();
    const [isRefrigerantLoading, setIsRefrigerantLoading] = useState(true);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantResponseData>();
    const [isSupplierLoading, setIsSupplierLoading] = useState(true);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userData, setUserData] = useState<UserResponseData>();
    const [isAssignmentActivityLoading, setIsAssignmentActivityLoading] = useState(true);
    const [assignmentActivityData, setAssignmentActivityData] = useState<GasBottleActivityResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<GasBottleActivityResponseData>();

    useEffect(() => {
        getBottleData();
    }, [gasBottleCode]);

    useEffect(() => {
        if (gasBottleData === undefined) return;
        if (gasBottleData.data.assigned_to_id) {
            getUser(gasBottleData.data.assigned_to_id);
        } else {
            setUserData(undefined);
        }
    }, [gasBottleData?.data.assigned_to_id]);

    useEffect(() => {
        if (gasBottleData === undefined) return;
        getAssignmentActivity(gasBottleData.id, gasBottleData.data.assigned_to_id !== null);
        if (!gasBottleData.data.is_active) getInactiveActivity(gasBottleData.id);
    }, [JSON.stringify(gasBottleData)]);


    const getBottleData = () => {
        getAPI('gas_bottles', {
            code: gasBottleCode
        }, (response: any) => {
            const gasBottleCollectionData: GasBottleCollectionResponse = response.data;
            const gasBottleData = gasBottleCollectionData.data[0];
            setGasBottleData(gasBottleData);
            getSupplierData(gasBottleData.data.supplier_id);
            getRefrigerantData(gasBottleData.data.refrigerant_id);
        }, setIsGasBottleLoading);
    }

    const getUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setUserData(userData);
        }, setIsUserLoading);
    }

    const getSupplierData = (supplierID: number) => {
        getAPI(`suppliers_manufacturers/${supplierID}`, {}, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            setSupplierData(supplierData);
        }, setIsSupplierLoading);
    }

    const getRefrigerantData = (refrigerantID: number) => {
        getAPI(`refrigerants/${refrigerantID}`, {}, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            setRefrigerantData(refrigerantData);
        }, setIsRefrigerantLoading);
    }

    const getAssignmentActivity = (gasBottleID: number, isAssigned: boolean) => {
        getAPI(`gas_bottle_activity`, {
            gasBottle_id: gasBottleID,
            type: !isAssigned ? 3 : 0,
            perPage: 1
        }, (response: any) => {
            const gasBottleActivityData: GasBottleActivityCollectionResponse = response.data;
            setAssignmentActivityData(gasBottleActivityData.data[0]);
        }, setIsAssignmentActivityLoading)    
    } 

    const getInactiveActivity = (gasBottleID: number) => {
        getAPI(`gas_bottle_activity`, {
            gasBottle_id: gasBottleID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const gasBottleActivityData: GasBottleActivityCollectionResponse = response.data;
            setInactiveActivityData(gasBottleActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    }

    const isLoading = (
        isGasBottleLoading || 
        isRefrigerantLoading || 
        isSupplierLoading ||
        isUserLoading ||
        isAssignmentActivityLoading || 
        isInactiveActivityLoading
    )

    const isHeaderLoading = (
        isGasBottleLoading 
    )

    return (
        <>
            <BottleAdminNavigation location={props.isConsumable ? 'gas_air' : 'refrigerant'}/>
            <OuterContainer 
                title={`${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} Bottle`}
                id={gasBottleCode as string}
                headerContent={
                    !isHeaderLoading && gasBottleData ?
                        <div className="flex">
                            {!gasBottleData.data.is_active ? <InactiveLabel/> : null}
                            <RefrigerantGasAirTypeLabel isConsumable={props.isConsumable ? props.isConsumable : false}/>
                            {!props.isConsumable ? <RefrigerantMovementLabel 
                                isDecant={gasBottleData.data.is_decant}
                            /> : null}
                            {gasBottleData.data.is_active ? <GasBottleStatusLabel 
                                isReturned={gasBottleData.data.supplier_returned_by_id !== null} 
                                isAssigned={gasBottleData.data.assigned_to_id !== null}
                                isQueued={gasBottleData.data.is_queued}
                            /> : null}
                            {gasBottleData.data.supplier_returned_by_id === null && <Label
                                iconFont='shop_two'
                                text={getGasBottleRentalTitle(getExpiryStatus(gasBottleData.data.rental_end_date))}
                                color={getExpiryColor(gasBottleData.data.rental_end_date)}
                            />}
                        </div>
                        :
                        <div className="flex">
                            <Skeleton type='label'/>
                            <Skeleton type='label'/>
                            <Skeleton type='label'/>
                        </div>
                }
                bigID
                maxWidth={1050}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && gasBottleData && refrigerantData && supplierData ?
                            <GasBottleInformation
                                gasBottleData={gasBottleData.data}
                                user={userData}
                                refrigerant={refrigerantData}
                                supplier={supplierData}
                                isConsumable={props.isConsumable}
                                lastAssignmentUpdate={assignmentActivityData?.data.date}
                                lastDeactivate={inactiveActivityData?.data.date}
                            /> :
                            <GasBottleInformationSkeleton isConsumable={props.isConsumable}/>
                        }
                    </div>
                    <div className="page-side">
                        <GasBottleSideBar
                            gasBottle={gasBottleData}
                            setGasBottleData={setGasBottleData}
                            isAssigned={userData !== undefined}
                            isReturned={gasBottleData?.data.supplier_returned_by_id !== null}
                            isUserLoading={isUserLoading || isGasBottleLoading}
                            isConsumable={props.isConsumable}
                        />
                    </div>
                </div> 
            </OuterContainer> 
        </>
    )
}

export default GasBottlePage