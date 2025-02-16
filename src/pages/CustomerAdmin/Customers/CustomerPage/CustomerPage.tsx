import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../../../components/ui/InactiveLabel/InactiveLabel";
import { CustomerActivityCollectionResponse, CustomerActivityResponseData } from "../../../../types/customerActivity.types";
import { CustomerDocumentsCollectionResponse } from "../../../../types/customerDocuments.types";
import { CustomerCollectionResponse, CustomerResponseData } from "../../../../types/customers.types";
import getAPI from "../../../../utils/getAPI";
import CustomerAdminNavigation from "../../components/CustomerAdminNavigation";
import CustomerAccountStatusLabel from "../components/CustomerAccountStatusLabel";
import IsContractedLabel from "../components/CustomerTypeLabel";
import CustomerInformation from "./components/CustomerInformation";
import CustomerInformationSkeleton from "./components/CustomerInformationSkeleton";
import CustomerSideBar from "./components/CustomerSideBar/CustomerSideBar";
import EditCustomerForm from "./components/EditCustomerForm";

const CustomerPage = () => {
    const { customerCode } = useParams();

    // Data States
    const [isLoadingCustomer, setIsLoadingCustomer] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<CustomerActivityResponseData>();
    const [isAccountsActivityLoading, setIsAccountsActivityLoading] = useState(false);
    const [accountsActivityData, setAccountsActivityData] = useState<CustomerActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getCustomerData();
    }, [customerCode]);

    useEffect(() => {
        if (customerData === undefined) return;
        getAccountsActivity(customerData.id);
        if (!customerData.data.is_active) getInactiveActivity(customerData.id);
    }, [JSON.stringify(customerData)]);

    const getCustomerData = () => {
        getAPI(`customers`, {
            codes: [customerCode]
        }, (response: any) => {
            const customerCollectionData: CustomerCollectionResponse = response.data;
            const customerData = customerCollectionData.data[0]
            setCustomerData(customerData);
        }, setIsLoadingCustomer);
    }

    const getInactiveActivity = (customerID: number) => {
        getAPI(`customer_activity`, {
            customer_id: customerID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const customerActivityData: CustomerActivityCollectionResponse = response.data;
            setInactiveActivityData(customerActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    }
    
    const getAccountsActivity = (customerID: number) => {
        getAPI(`customer_activity`, {
            customer_id: customerID,
            type: 4,
            perPage: 1
        }, (response: any) => {
            const customerActivityData: CustomerActivityCollectionResponse = response.data;
            setAccountsActivityData(customerActivityData.data[0]);
        }, setIsAccountsActivityLoading)    
    }

    const isHeaderLoading = (
        isLoadingCustomer
    )

    const isLoading = (
        isLoadingCustomer || 
        isInactiveActivityLoading || 
        isAccountsActivityLoading
    )
    
    return (
        <>
            <CustomerAdminNavigation location='customers'/>
            <OuterContainer 
                title='Customer' 
                id={customerCode as string}
                maxWidth={1050}
                headerContent={
                    !isHeaderLoading && customerData ?
                        <div className="flex">
                            {!customerData.data.is_active ? <InactiveLabel/> : null}
                            <IsContractedLabel isContracted={customerData.data.is_contracted}/> 
                            <CustomerAccountStatusLabel accountsStatus={customerData.data.accounts_status}/>
                        </div>
                        :
                        <div className="flex">
                            <Skeleton type='label'/>
                            <Skeleton type='label'/>
                        </div>
                }
                bigID
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && customerData ?
                            !isEditMode ?
                                <CustomerInformation
                                    customer={customerData}
                                    lastDeactivate={inactiveActivityData?.data.created_at}
                                    lastAccountsUpdate={accountsActivityData?.data.created_at}
                                /> :
                                <EditCustomerForm
                                    customer={customerData}
                                    setCustomerData={setCustomerData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            :
                            <CustomerInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">                    
                        <CustomerSideBar
                            customer={customerData}
                            setCustomerData={setCustomerData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                        />
                    </div>
                </div> 
            </OuterContainer> 
        </>
    )
}

export default CustomerPage