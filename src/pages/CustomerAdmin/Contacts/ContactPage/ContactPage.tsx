import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton";
import InactiveLabel from "../../../../components/ui/InactiveLabel/InactiveLabel";
import NewCustomerLink from "../../../../components/ui/Links/NewCustomerLink";
import { ContactResponseData } from "../../../../types/contact.types";
import { ContactActivityCollectionResponse, ContactActivityResponseData } from "../../../../types/contactActivity.types";
import { CustomerResponseData } from "../../../../types/customers.types";
import getAPI from "../../../../utils/getAPI";
import CustomerAdminNavigation from "../../components/CustomerAdminNavigation";
import ContactInformation from "./components/ContactInformation";
import ContactInformationSkeleton from "./components/ContactInformationSkeleton";
import ContactSideBar from "./components/ContactSideBar/ContactSideBar";
import EditContactForm from "./components/EditContact/EditContactForm";

const ContactPage = () => {
    const { contactID } = useParams();

    // Data States
    const [isContactLoading, setIsContactLoading] = useState(true);
    const [contactData, setContactData] = useState<ContactResponseData>();
    const [isCustomerLoading, setIsCustomerLoading] = useState(true);
    const [customerData, setCustomerData] = useState<CustomerResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<ContactActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getContactData();
    }, [contactID]);

    useEffect(() => {
        contactData && getCustomerData(contactData.data.customer_id);
    }, [contactData?.data.customer_id]);

    useEffect(() => {
        if (contactData === undefined) return;
        if (!contactData.data.is_active) getInactiveActivity(contactData.id);
    }, [JSON.stringify(contactData)]);

    const getContactData = () => {
        getAPI(`contacts/${contactID}`, {}, (response: any) => {
            const contactData: ContactResponseData = response.data;
            setContactData(contactData);
        }, setIsContactLoading);
    }

    const getCustomerData = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getInactiveActivity = (contactID: number) => {
        getAPI(`contact_activity`, {
            contact_id: contactID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const contactActivityData: ContactActivityCollectionResponse = response.data;
            setInactiveActivityData(contactActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 
    
    const isNavigationLoading = (
        isCustomerLoading
    )

    const isHeaderLoading = ( 
        isContactLoading
    )
    
    const isLoading = (
        isContactLoading || 
        isCustomerLoading || 
        isInactiveActivityLoading
    )

    return (
        <>
            <CustomerAdminNavigation location="contacts"/>
            <OuterContainer 
                title='Customer Contact' 
                id={contactID as string}
                headerContent={!isHeaderLoading && contactData && !contactData.data.is_active ? 
                    <InactiveLabel/> : 
                    null
                }
                navigation={!isNavigationLoading && customerData ?
                    <NewCustomerLink name={customerData.data.name} code={customerData.data.code}/>
                    : <Skeleton type='navigation' width={250}/>
                }
                maxWidth={900}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && contactData && customerData ?
                            !isEditMode ?
                                <ContactInformation
                                    contactData={contactData.data}
                                    customerData={customerData.data}
                                    lastDeactivate={inactiveActivityData?.data.created_at}
                                /> : 
                                <EditContactForm
                                    contact={contactData}
                                    setContactData={setContactData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            :
                            <ContactInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <ContactSideBar 
                            contact={contactData}
                            customer={customerData}
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

export default ContactPage