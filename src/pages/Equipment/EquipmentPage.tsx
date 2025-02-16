import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import DepartmentLabel from "../../components/ui/Department/DepartmentLabel";
import Label from "../../components/ui/General/Label/Label";
import Skeleton from "../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../components/ui/InactiveLabel/InactiveLabel";
import { CustomerResponseData } from "../../types/customers.types";
import { DepartmentResponseData } from "../../types/department.types";
import { EquipmentCollectionResponse, EquipmentResponseData } from "../../types/equipment.types";
import { EquipmentTypeResponseData } from "../../types/equipmentType.types";
import { RefrigerantResponseData } from "../../types/refrigerant.types";
import { SiteResponseData } from "../../types/sites.types";
import { SupplierManufacturerResponseData } from "../../types/supplierManufacturer.types";
import getAPI from "../../utils/getAPI";
import EquipmentInformationSkeleton from "../CustomerAdmin/Equipment/components/EquipmentInformationSkeleton";
import CustomerAdminNavigation from "../CustomerAdmin/components/CustomerAdminNavigation";
import EditEquipmentForm from "./components/EditEquipmentForm";
import EquipmentInformation from "./components/EquipmentInformation";
import EquipmentSideBar from "./components/EquipmentSideBar";
import EquipmentTypeLabel from "../CustomerAdmin/Equipment/components/EquipmentTypeLabel";
import { EquipmentActivityCollectionResponse, EquipmentActivityResponseData } from "../../types/equipmentActivity.types";
import EnergySourceLabel from "./components/EnergySourceLabel";
import NewCustomerLink from "../../components/ui/Links/NewCustomerLink";
import SiteLink from "../../components/ui/Links/SiteLink";

const EquipmentPage = () => {
    const { equipmentCode } = useParams();

    // Data States
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(true);
    const [equipmentData, setEquipmentData] = useState<EquipmentResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isSiteLoading, setIsSiteLoading] = useState(true);
    const [siteData, setSiteData] = useState<SiteResponseData>();
    const [isEquipmentTypeLoading, setIsEquipmentTypeLoading] = useState(false);
    const [equipmentTypeData, setEquipmentTypeData] = useState<EquipmentTypeResponseData>();
    const [isRefrigerantLoading, setIsRefrigerantLoading] = useState(false);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantResponseData>();
    const [isSupplierLoading, setIsSupplierLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();
    const [isManufacturerLoading, setIsManufacturerLoading] = useState(false);
    const [manufacturerData, setManufacturerData] = useState<SupplierManufacturerResponseData>();
    const [isMasterLoading, setIsMasterLoading] = useState(false);
    const [masterData, setMasterData] = useState<EquipmentResponseData>();
    const [isSlavesLoading, setIsSlavesLoading] = useState(false);
    const [slavesData, setSlavesData] = useState<EquipmentCollectionResponse>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<EquipmentActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getEquipmentData();
    }, [equipmentCode]);

    useEffect(() => {
        if (!equipmentData) return;
        getSite(equipmentData.data.site_id);
    }, [equipmentData?.data.site_id]);

    useEffect(() => {
        if (!equipmentData) return;
        if (equipmentData.data.equipment_type_id) {
            getEquipmentType(equipmentData.data.equipment_type_id);
        } else {
            setEquipmentTypeData(undefined);
        }
    }, [equipmentData?.data.equipment_type_id]);

    useEffect(() => {
        if (!equipmentData) return;
        if (equipmentData.data.supplier_id) {
            getSupplier(equipmentData.data.supplier_id);
        } else {
            setSupplierData(undefined);
        }
    }, [equipmentData?.data.supplier_id]);

    useEffect(() => {
        if (!equipmentData) return;
        if (equipmentData.data.manufacturer_id) {
            getManufacturer(equipmentData.data.manufacturer_id);
        } else {
            setManufacturerData(undefined);
        }
    }, [equipmentData?.data.manufacturer_id]);

    useEffect(() => {
        if (!equipmentData) return;
        if (equipmentData.data.refrigerant_id) {
            getRefrigerant(equipmentData.data.refrigerant_id);
        } else {
            setRefrigerantData(undefined);
        }
    }, [equipmentData?.data.refrigerant_id]);

    useEffect(() => {
        if (equipmentData === undefined) return;
        if (!equipmentData.data.is_active) getInactiveActivity(equipmentData.id);
    }, [JSON.stringify(equipmentData)]);

    const getEquipmentData = () => {
        getAPI(`equipment`, {
            codes: [equipmentCode],
        }, (response: any) => {
            const equipmentCollectionData: EquipmentCollectionResponse = response.data;
            const equipmentData = equipmentCollectionData.data[0];
            setEquipmentData(equipmentData);
            if (equipmentData !== undefined) {
                getDepartment(equipmentData.data.department_id);
                getSlaves(equipmentData.id)
                equipmentData.data.master_equipment_id && getMaster(equipmentData.data.master_equipment_id);
            }
        }, setIsEquipmentLoading);
    }

    const getSite = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const siteData: SiteResponseData = response.data;
            setSiteData(siteData);
            getCustomerData(siteData.data.customer_id);
        }, setIsSiteLoading);

    }

    const getCustomerData = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getEquipmentType = (equipmentTypeID: number) => {
        getAPI(`equipment_types/${equipmentTypeID}`, {}, (response: any) => {
            const equipmentTypeData: EquipmentTypeResponseData = response.data;
            setEquipmentTypeData(equipmentTypeData);
        }, setIsEquipmentTypeLoading);
    }

    const getRefrigerant = (refrigerantID: number) => {
        getAPI(`refrigerants/${refrigerantID}`, {}, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            setRefrigerantData(refrigerantData);
        }, setIsRefrigerantLoading);
    }

    const getSupplier = (supplierID: number) => {
        getAPI(`suppliers_manufacturers/${supplierID}`, {}, (response: any) => {
            const supplierData: SupplierManufacturerResponseData = response.data;
            setSupplierData(supplierData);
        }, setIsSupplierLoading);
    }

    const getManufacturer = (manufacturerID: number) => {
        getAPI(`suppliers_manufacturers/${manufacturerID}`, {}, (response: any) => {
            const manufacturerData: SupplierManufacturerResponseData = response.data;
            setManufacturerData(manufacturerData);
        }, setIsManufacturerLoading);
    }

    const getMaster = (masterID: number) => {
        getAPI(`equipment/${masterID}`, {}, (response: any) => {
            const equipmentData: EquipmentResponseData = response.data;
            setMasterData(equipmentData);
        }, setIsMasterLoading);
    }

    const getSlaves = (equipmentID: number) => {
        getAPI(`equipment`, {
            master_equipment_id: equipmentID,
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setSlavesData(equipmentData);
        }, setIsSlavesLoading)    
    } 

    const getInactiveActivity = (equipmentID: number) => {
        getAPI(`equipment_activity`, {
            equipment_id: equipmentID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const equipmentActivityData: EquipmentActivityCollectionResponse = response.data;
            setInactiveActivityData(equipmentActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isNavigationLoading = (
        isCustomerLoading || 
        isSiteLoading
    )

    const isHeaderLoading = (
        isEquipmentLoading ||
        isDepartmentLoading || 
        isEquipmentTypeLoading ||
        isSlavesLoading
    )

    const isLoading = (
        isEquipmentLoading || 
        isSiteLoading || 
        isCustomerLoading ||
        isRefrigerantLoading ||
        isSupplierLoading ||
        isManufacturerLoading || 
        isMasterLoading ||
        isEquipmentTypeLoading ||
        isInactiveActivityLoading 
    )

    return (
        <>
            <CustomerAdminNavigation location="equipment"/>
            <OuterContainer 
                title='Equipment' 
                id={equipmentCode}
                headerContent={
                    !isHeaderLoading && equipmentData && departmentData && slavesData ? 
                        <div className="flex">
                            {!equipmentData.data.is_active ? <InactiveLabel/> : null}
                            <DepartmentLabel department={departmentData}/>
                            <EquipmentTypeLabel equipmentType={equipmentTypeData}/>
                            {equipmentTypeData?.data.energy_source ? <EnergySourceLabel energySource={equipmentTypeData.data.energy_source}/> : null}
                            {slavesData.total_count > 0 ? <Label text='Master' iconFont="share" color="dark-blue"/> : null}
                            {equipmentData.data.master_equipment_id ? <Label text='Slave' iconFont="share" color="light-blue"/> : null}
                        </div> :
                        <div className="flex">
                            <Skeleton type='label'/>
                            <Skeleton type='label'/>
                        </div>                    
                }
                navigation={!isNavigationLoading && customerData && siteData ? 
                    <div className="flex" style={{ gap: '4px' }}>
                        <NewCustomerLink name={customerData.data.name} code={customerData.data.code}/>
                        <span className="material-icons">chevron_right</span>
                        <SiteLink name={siteData.data.name} code={siteData.data.code}/>
                    </div>
                    : 
                    <div className="flex" style={{ gap: '20px' }}>
                        <Skeleton type='navigation' width={250}/>
                        <Skeleton type='navigation' width={250}/>
                    </div>
                }
                maxWidth={1050}
                bigID
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && equipmentData && siteData && customerData && departmentData ?
                            !isEditMode ? 
                                <EquipmentInformation
                                    equipmentData={equipmentData.data}
                                    departmentData={departmentData}
                                    customerData={customerData}
                                    equipmentTypeData={equipmentTypeData}
                                    refrigerant={refrigerantData}
                                    site={siteData}
                                    supplier={supplierData}
                                    manufacturer={manufacturerData}
                                    master={masterData}
                                    lastDeactivate={inactiveActivityData?.data.created_at}
                                /> :
                                <EditEquipmentForm 
                                    department={departmentData} 
                                    equipment={equipmentData} 
                                    equipmentType={equipmentTypeData}
                                    supplierData={supplierData}
                                    manufacturerData={manufacturerData}
                                    refrigerant={refrigerantData}
                                    setEquipmentData={setEquipmentData} 
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            : 
                            <EquipmentInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <EquipmentSideBar
                            equipment={equipmentData}
                            site={siteData}
                            customerID={customerData?.id}
                            setEquipmentData={setEquipmentData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        />
                    </div>
                </div>
            </OuterContainer> 
        </>
    )
}

export default EquipmentPage