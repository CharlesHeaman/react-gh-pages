import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { AssetCollectionResponse } from "../../../../../types/asset.types";
import { EquipmentCollectionResponse } from "../../../../../types/equipment.types";
import { GasBottleCollectionResponse } from "../../../../../types/gasBottle.types";
import { ProductCollectionResponse } from "../../../../../types/products.types";
import { PurchaseOrderCollectionResponse } from "../../../../../types/purchaseOrder.types";
import { SupplierContactCollectionResponse } from "../../../../../types/supplierContact.types";
import { SupplierManufacturerResponseData } from "../../../../../types/supplierManufacturer.types";
import { SupplierManufacturerActivityCollectionResponse } from "../../../../../types/supplierManufacturerActivity.types";
import getAPI from "../../../../../utils/getAPI";
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import AssociatedSupplierManufacturerData from "./components/AssociatedSupplierManufacturerData/AssociatedSupplierManufacturerData";
import GasSupplierAssociatedData from "./components/GasSupplierAssociatedData/GasSupplierAssociatedData";
import ManufacturerAssociatedData from "./components/ManufacturerAssociatedData/ManufacturerAssociatedData";
import SupplierAssociatedData from "./components/SupplierAssociatedData/SupplierAssociatedData";
import SupplierManufacturerAccounts from "./components/SupplierManufacturerAccounts";
import SupplierManufacturerActions from "./components/SupplierManufacturerActions";
import SupplierManufacturerDeactivate from "./components/SupplierManufacturerDeactivate";
import SupplierManufacturerDocuments from "./components/SupplierManufacturerDocuments/SupplierManufacturerDocuments";
import SupplierManufacturerISO from "./components/SupplierManufacturerISO";
import SupplierManufacturerPurchaseOrders from "./components/SupplierManufacturerPurchaseOrders/SupplierManufacturerPurchaseOrders";
import SupplierManufacturerSideBarSkeleton from "./components/SupplierManufacturerSideBarSkeleton";

const SupplierManufacturerSideBar = (props: {
    supplierManufacturerData: SupplierManufacturerResponseData | undefined,
    setSupplierManufacturerData: Dispatch<SetStateAction<SupplierManufacturerResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {
    // Data States 
    const [isPurchaseOrdersLoading, setIsPurchaseOrdersLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderCollectionResponse>();
    const [isContactsLoading, setIsContactsLoading] = useState(true);
    const [contactsData, setContactsData] = useState<SupplierContactCollectionResponse>();
    const [isSupplierEquipmentLoading, setIsSupplierEquipmentLoading] = useState(false);
    const [supplierEquipmentData, setSupplierEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isManufacturerEquipmentLoading, setIsManufacturerEquipmentLoading] = useState(false);
    const [manufacturerEquipmentData, setManufacturerEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isSupplierProductsLoading, setIsSupplierProductsLoading] = useState(false);
    const [supplierProductsData, setSupplierProductsData] = useState<ProductCollectionResponse>();
    const [isManufacturerProductsLoading, setIsManufacturerProductsLoading] = useState(false);
    const [manufacturerProductsData, setManufacturerProductsData] = useState<ProductCollectionResponse>();
    const [isGasBottlesLoading, setIsGasBottlesLoading] = useState(false);
    const [gasBottleData, setGasBottleData] = useState<GasBottleCollectionResponse>();
    const [isPlantEquipmentLoading, setIsPlantEquipmentLoading] = useState(false);
    const [plantEquipmentData, setPlantEquipmentData] = useState<AssetCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<SupplierManufacturerActivityCollectionResponse>();

    useEffect(() => {
        if (props.supplierManufacturerData?.id === undefined) return;
        getPurchaseOrders(props.supplierManufacturerData.id);
        getSupplierContacts(props.supplierManufacturerData.id);
        getSupplierEquipment(props.supplierManufacturerData.id);
        getManufacturerEquipment(props.supplierManufacturerData.id);
        getSupplierProducts(props.supplierManufacturerData.id);
        getManufacturerProducts(props.supplierManufacturerData.id);
        getGasBottles(props.supplierManufacturerData.id);
        getPlantEquipment(props.supplierManufacturerData.id);
    }, [props.supplierManufacturerData?.id]);

    useEffect(() => {
        if (props.supplierManufacturerData?.id === undefined) return;
        getActivity(props.supplierManufacturerData.id);
    }, [JSON.stringify(props.supplierManufacturerData)]);

    const getPurchaseOrders = (supplierID: number) => {
        getAPI(`purchase_orders`, {
            supplier_id: supplierID,
            is_outstanding: true,
            perPage: 1
        }, (response: any) => {
            const purchaseOrderData: PurchaseOrderCollectionResponse = response.data;
            setPurchaseOrderData(purchaseOrderData);
        }, setIsPurchaseOrdersLoading)    
    } 

    const getSupplierContacts = (supplierID: number) => {
        getAPI(`supplier_contacts`, {
            supplier_manufacturer_ids: [supplierID],
            perPage: 1
        }, (response: any) => {
            const contactData: SupplierContactCollectionResponse = response.data;
            setContactsData(contactData);
        }, setIsContactsLoading)    
    } 

    const getSupplierEquipment = (supplierID: number) => {
        getAPI(`equipment`, {
            supplier_id: supplierID,
            perPage: 1
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setSupplierEquipmentData(equipmentData);
        }, setIsSupplierEquipmentLoading)    
    } 

    const getManufacturerEquipment = (supplierID: number) => {
        getAPI(`equipment`, {
            supplier_id: supplierID,
            perPage: 1
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setManufacturerEquipmentData(equipmentData);
        }, setIsManufacturerEquipmentLoading)    
    } 

    const getSupplierProducts = (supplierID: number) => {
        getAPI(`products`, {
            supplier_id: supplierID,
            perPage: 1
        }, (response: any) => {
            const productsData: ProductCollectionResponse = response.data;
            setSupplierProductsData(productsData);
        }, setIsSupplierProductsLoading)    
    } 

    const getManufacturerProducts = (manufacturerID: number) => {
        getAPI(`products`, {
            manufacturer_id: manufacturerID,
            perPage: 1
        }, (response: any) => {
            const productsData: ProductCollectionResponse = response.data;
            setManufacturerProductsData(productsData);
        }, setIsManufacturerProductsLoading)    
    } 

    const getGasBottles = (supplierID: number) => {
        getAPI(`gas_bottles`, {
            supplier_id: supplierID,
            is_returned: false,
            perPage: 1
        }, (response: any) => {
            const bottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(bottleData);
        }, setIsGasBottlesLoading)    
    } 

    const getPlantEquipment = (manufacturerID: number) => {
        getAPI(`assets`, {
            manufacturer_id: manufacturerID,
            is_active: 1
        }, (response: any) => {
            const plantEquipmentData: AssetCollectionResponse = response.data;
            setPlantEquipmentData(plantEquipmentData);
        }, setIsPlantEquipmentLoading)    
    } 

    const getActivity = (supplierManufacturerID: number) => {
        getAPI(`supplier_manufacturer_activity`, {
            supplier_manufacturer_id: supplierManufacturerID,
            perPage: 1
        }, (response: any) => {
            const supplierManufacturerActivityData: SupplierManufacturerActivityCollectionResponse = response.data;
            setActivityData(supplierManufacturerActivityData);
        }, setIsActivityLoading)    
    } 


    const isLoading = (
        isPurchaseOrdersLoading || 
        isContactsLoading || 
        isSupplierEquipmentLoading ||
        isManufacturerEquipmentLoading ||
        isSupplierProductsLoading ||
        isManufacturerProductsLoading ||
        isGasBottlesLoading || 
        isPlantEquipmentLoading ||
        isActivityLoading
    )

    return (
        !isLoading && props.supplierManufacturerData && contactsData && purchaseOrderData && supplierEquipmentData && manufacturerEquipmentData && supplierProductsData && manufacturerProductsData && gasBottleData && plantEquipmentData && activityData ?
            !props.isEditMode ? 
                <>
                    {props.supplierManufacturerData.data.is_active ? <>
                        <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                            <SupplierManufacturerActions
                                setIsEditMode={() => props.setIsEditMode(true)}  
                            />
                        </PermsProtectedComponent>

                        <PermsProtectedComponent requiredPerms={{ iso: 2 }}>
                            <SupplierManufacturerISO
                                supplierManufacturerID={props.supplierManufacturerData.id}
                                isApproved={props.supplierManufacturerData.data.is_approved}
                                setSupplierManufacturerData={props.setSupplierManufacturerData}
                            />
                        </PermsProtectedComponent>

                        <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                            <SupplierManufacturerAccounts
                                supplierManufacturer={props.supplierManufacturerData}
                                setSupplierManufacturerData={props.setSupplierManufacturerData}
                            />
                        </PermsProtectedComponent>
                    </> : null}
                    <AssociatedSupplierManufacturerData
                        supplierID={props.supplierManufacturerData.id}
                        contactsCount={contactsData.total_count}
                        activityCount={activityData.total_count}
                    />
                    {props.supplierManufacturerData.data.is_supplier && <SupplierAssociatedData
                        supplierID={props.supplierManufacturerData.id}
                        equipmentCount={supplierEquipmentData.total_count}
                        productCount={supplierProductsData.total_count}
                    />}
                    {props.supplierManufacturerData.data.is_manufacturer && <ManufacturerAssociatedData
                        manufacturerID={props.supplierManufacturerData.id}
                        equipmentCount={manufacturerEquipmentData.total_count}
                        plantEquipmentCount={plantEquipmentData.total_count}
                        productCount={manufacturerProductsData.total_count}
                    />}
                    {props.supplierManufacturerData.data.is_gas_supplier && <GasSupplierAssociatedData
                        supplierID={props.supplierManufacturerData.id}
                        gasBottleCount={gasBottleData.total_count}
                    />}
                    <SupplierManufacturerPurchaseOrders
                        supplierID={props.supplierManufacturerData.id}
                        purchaseOrderCount={purchaseOrderData.total_count}
                    />
                    <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                        <SupplierManufacturerDeactivate
                            supplierManufacturerID={props.supplierManufacturerData.id}
                            reactivate={!props.supplierManufacturerData.data.is_active}
                            setSupplierManufacturerData={props.setSupplierManufacturerData}
                            contactCount={contactsData.total_count}
                        />
                    </PermsProtectedComponent>

                    <ExportResource
                        resourceData={props.supplierManufacturerData}
                        resourceName='Supplier/Manufacturer'
                    />
                </> 
                :
                // Edit Mode
                <SideBarModule title='Actions'>
                    <SideBarButton 
                        text='Abandon Edit'
                        color="grey"
                        iconFont='cancel'
                        clickEvent={() => props.setIsEditMode(false)}
                    />
                </SideBarModule>
            :
            // Skeleton
            <SupplierManufacturerSideBarSkeleton/>
    )
}

export default SupplierManufacturerSideBar