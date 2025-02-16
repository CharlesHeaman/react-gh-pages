import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Label from "../../../components/ui/General/Label/Label";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { SupplierManufacturerCollectionResponse, SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import { SupplierManufacturerActivityCollectionResponse, SupplierManufacturerActivityResponseData } from "../../../types/supplierManufacturerActivity.types";
import { SupplierManufacturerDocumentsCollectionResponse, SupplierManufacturerDocumentsResponseData } from "../../../types/supplierManufacturerDocuments.types";
import { UserResponseData } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";
import SupplierManufacturerApprovedLabel from "../components/SupplierManufacturerApprovedLabel";
import SupplierManufacturerNavigation from "../components/SupplierManufacturerNavigation/SupplierManufacturerNavigation";
import EditSupplierManufacturerForm from "./components/EditSupplierManufacturer";
import SupplierManufacturerInformation from "./components/SupplierManufacturerInformation";
import SupplierManufacturerInformationSkeleton from "./components/SupplierManufacturerInformationSkeleton";
import SupplierManufacturerSideBar from "./components/SupplierManufacturerSideBar/SupplierManufacturerSideBar";

const SupplierManufacturerPage = () => {
    const { supplierManufacturerCode } = useParams();

    // Data States
    const [isSupplierManufacturerLoading, setIsSupplierManufacturerLoading] = useState(true);
    const [supplierManufacturerData, setSupplierManufacturerData] = useState<SupplierManufacturerResponseData>();
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userData, setUserData] = useState<UserResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<SupplierManufacturerActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getSupplierManufacturerData();
    }, [supplierManufacturerCode]);

    useEffect(() => {
        if (supplierManufacturerData === undefined) return;
        if (!supplierManufacturerData.data.is_active) getInactiveActivity(supplierManufacturerData.id);
    }, [JSON.stringify(supplierManufacturerData)]);

    useEffect(() => {
        if (supplierManufacturerData?.data.approval_updated_by_id === undefined) return;
        supplierManufacturerData.data.approval_updated_by_id && getUser(supplierManufacturerData.data.approval_updated_by_id);
    }, [supplierManufacturerData?.data.approval_updated_by_id]);


    const getSupplierManufacturerData = () => {
        getAPI(`suppliers_manufacturers`, {
            code: supplierManufacturerCode
        }, (response: any) => {
            const supplierManufacturerData: SupplierManufacturerCollectionResponse = response.data;
            const currentSupplierManufacturerData = supplierManufacturerData.data[0]
            setSupplierManufacturerData(currentSupplierManufacturerData);
        }, setIsSupplierManufacturerLoading);
    }

    const getUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setUserData(userData);
        }, setIsUserLoading);
    }

    const getInactiveActivity = (supplierManufacturerID: number) => {
        getAPI(`supplier_manufacturer_activity`, {
            supplier_manufacturer_id: supplierManufacturerID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const supplierManufacturerActivityData: SupplierManufacturerActivityCollectionResponse = response.data;
            setInactiveActivityData(supplierManufacturerActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isHeaderLoading = (
        isSupplierManufacturerLoading
    )

    const isLoading = (
        isSupplierManufacturerLoading || 
        isUserLoading ||
        isInactiveActivityLoading
    )

    return (
        <>
            <SupplierManufacturerNavigation
                location="suppliers_manufacturers"
            />
            <OuterContainer 
                title='Supplier/Manufacturer' 
                id={supplierManufacturerCode as string}
                headerContent={!isHeaderLoading && supplierManufacturerData ? 
                    <div className="flex">
                        {!supplierManufacturerData.data.is_active ? <InactiveLabel/> : null}
                        <SupplierManufacturerApprovedLabel 
                            is_approved={supplierManufacturerData.data.is_approved}
                        /> 
                        {supplierManufacturerData.data.is_supplier ? <Label text="Supplier" iconFont="warehouse" color="no-color"/> : null}
                        {supplierManufacturerData.data.is_manufacturer ? <Label text="Manufacturer" iconFont="construction" color="no-color"/> : null}
                        {supplierManufacturerData.data.is_gas_supplier ? <Label text="Gas Supplier" iconFont="propane" color="no-color"/> : null}
                        {supplierManufacturerData.data.is_sub_contractor ? <Label text="Sub-contractor" iconFont="engineering" color="no-color"/> : null}
                    </div> :
                    <div className="flex">
                        <Skeleton type="label" width={100}/>
                        <Skeleton type="label" width={100}/>
                    </div>
                }
                bigID
                maxWidth={1000}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && supplierManufacturerData ?
                            !isEditMode ?
                                <SupplierManufacturerInformation
                                    supplierManufacturer={supplierManufacturerData}
                                    user={userData}
                                    lastDeactivate={inactiveActivityData?.data.created_at}
                                /> :
                                <EditSupplierManufacturerForm
                                    supplierManufacturer={supplierManufacturerData}
                                    setSupplierManufacturerData={setSupplierManufacturerData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />

                            :
                            <SupplierManufacturerInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <SupplierManufacturerSideBar
                            supplierManufacturerData={supplierManufacturerData}
                            setSupplierManufacturerData={setSupplierManufacturerData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        />
                    </div>
                </div> 
            </OuterContainer> 
        </>
    )
}

export default SupplierManufacturerPage