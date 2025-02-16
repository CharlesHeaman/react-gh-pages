import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssignedLabel from "../../../components/ui/AssignedLabel/AssignedLabel";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import getExpiryColor from "../../../components/ui/ExpiryDateLabel/getExpiryColor";
import Label from "../../../components/ui/General/Label/Label";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { CostCentreResponseData } from "../../../types/costCentres.types";
import { UserResponseData } from "../../../types/user.types";
import { VehicleActivityCollectionResponse, VehicleActivityResponseData } from "../../../types/vehicleActivity.types";
import { VehicleResponseData } from "../../../types/vehicles.types";
import getAPI from "../../../utils/getAPI";
import getMOTStatusTitle from "../utils/getMOTStatusTitle";
import getTaxStatusTitle from "../utils/getTaxStatusTitle";
import EditVehicleForm from "./components/EditVehicleForm";
import VehicleInformation from "./components/VehicleInformation";
import VehicleInformationSkeleton from "./components/VehicleInformationSkeleton";
import VehicleSideBar from "./components/VehicleSideBar";

const VehiclePage = ()  => {
    const { vehicleID } = useParams();

    // Data States 
    const [isVehicleLoading, setIsVehicleLoading] = useState(true);
    const [vehicleData, setVehicleData] = useState<VehicleResponseData>();
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userData, setUserData] = useState<UserResponseData>();
    const [isCostCentreLoading, setIsCostCentreLoading] = useState(true);
    const [costCentreData, setCostCentreData] = useState<CostCentreResponseData>();
    const [isAssignmentActivityLoading, setIsAssignmentActivityLoading] = useState(true);
    const [assignmentActivityData, setAssignmentActivityData] = useState<VehicleActivityResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<VehicleActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getVehicleData();
    }, [vehicleID]);

    useEffect(() => {
        if (vehicleData === undefined) return;
        getCostCentre(vehicleData.data.cost_centre_id);
    }, [vehicleData?.data.cost_centre_id]);

    useEffect(() => {
        if (vehicleData === undefined) return;
        getAssignmentActivity(vehicleData.id, vehicleData.data.user_id !== null);
        if (!vehicleData.data.is_active) getInactiveActivity(vehicleData.id);
    }, [JSON.stringify(vehicleData)]);

    useEffect(() => {
        if (vehicleData === undefined) return;
        if (vehicleData.data.user_id) {
            getUser(vehicleData.data.user_id);
        } else {
            setUserData(undefined);
        }
    }, [vehicleData?.data.user_id]);

    const getVehicleData = () => {
        getAPI(`vehicles/${vehicleID}`, {}, (response: any) => {
            const vehicleData: VehicleResponseData = response.data;
            setVehicleData(vehicleData);
        }, setIsVehicleLoading);
    }

    const getUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setUserData(userData);
        }, setIsUserLoading);
    }

    const getCostCentre = (costCentreID: number) => {
        getAPI(`cost_centres/${costCentreID}`, {}, (response: any) => {
            const costCentreData: CostCentreResponseData = response.data;
            setCostCentreData(costCentreData);
        }, setIsCostCentreLoading);
    }

    const getAssignmentActivity = (vehicleID: number, isAssigned: boolean) => {
        getAPI(`vehicle_activity`, {
            vehicle_id: vehicleID,
            type: !isAssigned ? 5 : 4,
            perPage: 1
        }, (response: any) => {
            const vehicleActivityData: VehicleActivityCollectionResponse = response.data;
            setAssignmentActivityData(vehicleActivityData.data[0]);
        }, setIsAssignmentActivityLoading)    
    } 

    const getInactiveActivity = (vehicleID: number) => {
        getAPI(`vehicle_activity`, {
            vehicle_id: vehicleID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const vehicleActivityData: VehicleActivityCollectionResponse = response.data;
            setInactiveActivityData(vehicleActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isHeaderLoading = (
        isVehicleLoading
    )

    const isLoading = (
        isVehicleLoading || 
        isUserLoading || 
        isCostCentreLoading || 
        isAssignmentActivityLoading || 
        isInactiveActivityLoading
    )
    
    return (
        <OuterContainer
            title='Vehicle'
            id={vehicleID}
            maxWidth={1000}
            headerContent={!isHeaderLoading && vehicleData ?
                <div className="flex">
                    {!vehicleData.data.is_active ? <InactiveLabel/> : null}
                    <AssignedLabel 
                        isAssigned={vehicleData.data.user_id !== null}
                    /> 
                    <Label 
                        iconFont="garage"
                        text={getMOTStatusTitle(vehicleData.data.mot_due_date)}
                        color={getExpiryColor(vehicleData.data.mot_due_date)}
                    /> 
                    <Label 
                        iconFont="fact_check"
                        text={getTaxStatusTitle(vehicleData.data.tax_due_date)}
                        color={getExpiryColor(vehicleData.data.tax_due_date)}
                    /> 
                </div> 
                :
                <div className="flex">
                    <Skeleton type="label" width={100}/>
                    <Skeleton type="label" width={100}/>
                    <Skeleton type="label" width={100}/>
                </div>
            }
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && vehicleData && costCentreData ?
                        !isEditMode ? <>
                                <VehicleInformation
                                    vehicle={vehicleData}
                                    costCentre={costCentreData}
                                    user={userData}
                                    lastAssignmentUpdate={assignmentActivityData?.data.created_at}
                                    lastDeactivate={inactiveActivityData?.data.created_at}
                                />
                            </> :
                            <EditVehicleForm
                                vehicle={vehicleData}
                                setVehicleData={setVehicleData}
                                costCentre={costCentreData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        :
                        <VehicleInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <VehicleSideBar
                        vehicle={vehicleData}
                        setVehicleData={setVehicleData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />
                </div>
            </div>
        </OuterContainer>
    )
}

export default VehiclePage