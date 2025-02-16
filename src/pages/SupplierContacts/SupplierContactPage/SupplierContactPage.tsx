import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../../components/ui/Structure/Header/Header";
import { SupplierContactResponseData } from "../../../types/supplierContact.types";
import { SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types";
import getAPI from "../../../utils/getAPI";
import SupplierManufacturerNavigation from "../../SuppliersManufacturers/components/SupplierManufacturerNavigation/SupplierManufacturerNavigation";
import SupplierContactInformation from "./components/SupplierContactInformation";
import SupplierContactInformationSkeleton from "./components/SupplierContactInformationSkeleton";
import SupplierContactSideBar from "./components/SupplierContactSideBar/SupplierContactSideBar";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import EditSupplierContactForm from "./components/EditSupplierContactForm";
import { SupplierManufacturerContactActivityCollectionResponse, SupplierManufacturerContactActivityResponseData } from "../../../types/supplierManufacturerContactActivity.types";
import SupplierManufacturerLink from "../../../components/ui/Links/SupplierManufacturerLink";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";

const SupplierContactPage = () => {
    const { supplierContactID } = useParams();

    // Data States
    const [isSupplierContactLoading, setIsSupplierContactLoading] = useState(true);
    const [contactData, setContactData] = useState<SupplierContactResponseData>();
    const [isSupplierLoading, setIsSupplierLoading] = useState(true);
    const [supplierData, setSupplierData] = useState<SupplierManufacturerResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<SupplierManufacturerContactActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getContactData();
    }, [supplierContactID])

    useEffect(() => {
        contactData && getSupplierData(contactData.data.supplier_manufacturer_id);
    }, [contactData?.data.supplier_manufacturer_id]);

    useEffect(() => {
        if (contactData === undefined) return;
        if (!contactData.data.is_active) getInactiveActivity(contactData.id);
    }, [JSON.stringify(contactData)]);

    const getContactData = () => {
        getAPI(`supplier_contacts/${supplierContactID}`, {}, (response: any) => {
            const contactData: SupplierContactResponseData = response.data;
            setContactData(contactData);
        }, setIsSupplierContactLoading);
    }

    const getSupplierData = (supplierID: number) => {
        getAPI(`suppliers_manufacturers/${supplierID}`, {}, (response: any) => {
            const customerData: SupplierManufacturerResponseData = response.data;
            setSupplierData(customerData);
        }, setIsSupplierLoading);
    }

    const getInactiveActivity = (supplierID: number) => {
        getAPI(`supplier_manufacturer_contact_activity`, {
            supplier_manufacturer_contact_id: supplierID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const vehicleActivityData: SupplierManufacturerContactActivityCollectionResponse = response.data;
            setInactiveActivityData(vehicleActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isNavigationLoading = (
        isSupplierLoading
    )

    const isLoading = (
        isSupplierContactLoading || 
        isSupplierLoading || 
        isInactiveActivityLoading
    )

    return (
        <>
            <SupplierManufacturerNavigation
                location="supplier_contacts"
            />
            <OuterContainer 
                title='Supplier/Manufacturer Contact' 
                id={supplierContactID as string}
                headerContent={contactData && !contactData.data.is_active ? 
                    <InactiveLabel/> : 
                    null
                }
                navigation={!isNavigationLoading && supplierData ?
                    <SupplierManufacturerLink name={supplierData.data.name} code={supplierData.data.code}/>
                    : <Skeleton type='navigation' width={250}/>
                }
                maxWidth={900}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && contactData && supplierData ?
                            !isEditMode ? 
                                <SupplierContactInformation
                                    supplierContactData={contactData.data}
                                    supplier={supplierData}
                                    lastDeactivate={inactiveActivityData?.data.created_at}
                                /> : 
                                <EditSupplierContactForm
                                    contact={contactData}
                                    setContactData={setContactData}
                                    disabledEdit={() => setIsEditMode(false)}
                                /> 
                            :
                            <SupplierContactInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <SupplierContactSideBar 
                            contact={contactData}
                            supplier={supplierData}
                            setContactData={setContactData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        />
                    </div>
                </div> 
            </OuterContainer> 
        </>
    )
}

export default SupplierContactPage