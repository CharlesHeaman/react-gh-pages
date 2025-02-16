import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ContactResponseData } from "../../../../../../../../types/contact.types";
import { ContractResponseData } from "../../../../../../../../types/contract.types";
import { CustomerResponseData } from "../../../../../../../../types/customers.types";
import { EquipmentResponseData } from "../../../../../../../../types/equipment.types";
import { InvoiceTypeResponseData } from "../../../../../../../../types/invoiceTypes.types";
import { SiteResponseData } from "../../../../../../../../types/sites.types";
import getAPI from "../../../../../../../../utils/getAPI";
import TicketEquipmentForm from "../../../../../../CreateTicketPage/TicketEquipmentForm";
import isTicketEquipmentFormValid from "../../../../../../CreateTicketPage/utils/isTicketEquipmentFormValid";
import postAPI from "../../../../../../../../utils/postAPI";
import putAPI from "../../../../../../../../utils/putAPI";
import { TicketResponseData } from "../../../../../../../../types/tickets.types";

const UpdateCustomerInformation = (props: {
    ticketID: number,
    ticketType: number,
    customer: CustomerResponseData,
    site: SiteResponseData | undefined,
    equipment: EquipmentResponseData | undefined,
    contract: ContractResponseData | undefined,
    contact: ContactResponseData | undefined,
    invoiceType: InvoiceTypeResponseData | undefined,
    show: boolean,
    hideFunc: () => void,
    setTicketData: Dispatch<SetStateAction<TicketResponseData | undefined>>
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractData, setContractData] = useState<ContractResponseData | undefined>(props.contract);
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerResponseData | undefined>(props.customer);
    const [isSiteLoading, setIsSiteLoading] = useState(false);
    const [siteData, setSiteData] = useState<SiteResponseData | undefined>(props.site);
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentResponseData | undefined>(props.equipment);
    const [isInvoiceTypeLoading, setIsInvoiceTypeLoading] = useState(false);
    const [invoiceType, setInvoiceType] = useState<InvoiceTypeResponseData | undefined>(props.invoiceType);
    const [contactData, setContactData] = useState<ContactResponseData | undefined>(props.contact);

    useEffect(() => {
        if (contractData) {
            getInvoiceType(contractData.data.invoice_type);
        } else {
            getInvoiceType(1);
        }
    }, [contractData])

    useEffect(() => {
        siteData?.data.customer_id && getCustomer(siteData.data.customer_id);
    }, [siteData?.data.customer_id]);

    useEffect(() => {
        if (siteData?.data.contract_id) {
            getContract(siteData.data.contract_id);
        } else {
            setContractData(undefined);
        }
    }, [siteData?.data.contract_id]);

    useEffect(() => {
        equipmentData?.data.site_id && getSite(equipmentData.data.site_id);
    }, [equipmentData?.data.site_id]);

    const getCustomer = (customerID: number) => {
        getAPI(`customers/${customerID}`, {}, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            setCustomerData(customerData);
        }, setIsCustomerLoading);
    }

    const getSite = (siteID: number) => {
        getAPI(`sites/${siteID}`, {}, (response: any) => {
            const siteData: SiteResponseData = response.data;
            setSiteData(siteData);
        }, setIsSiteLoading);
    }

    const getContract = (contractID: number) => {
        getAPI(`contracts/${contractID}`, {}, (response: any) => {
            const contractData: ContractResponseData = response.data;
            setContractData(contractData);
        }, setIsContractLoading);
    }

    const getInvoiceType = (invoiceTypeID: number) => {
        getAPI(`invoice_types/${invoiceTypeID}`, {}, (response: any) => {
            const invoiceTypeData: InvoiceTypeResponseData = response.data;
            setInvoiceType(invoiceTypeData);
        }, setIsInvoiceTypeLoading);
    }

    const formComplete = isTicketEquipmentFormValid(customerData?.id, siteData?.id, equipmentData?.id, contactData?.id);
 
    const updateCustomerInformation = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`tickets/${props.ticketType}/${props.ticketID}/update_customer_information`, {}, {
            site_id: siteData?.id,
            customer_id: customerData?.id,
            equipment_id: equipmentData?.id,
            contract_id: contractData?.id,
            invoice_type_id: invoiceType?.id,
            contact_id: contactData?.id,
        }, (response: any) => {
            const ticketData = response.data;
            props.setTicketData(ticketData);
            props.hideFunc();
            setHasSubmitted(false)
        }, setSubmitting)
    }

    
    return (
        <WindowOverlay 
            title="Update Customer Information"
            maxWidth={400}
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Update Customer Information"
                clickFunc={updateCustomerInformation}
                submitting={submitting}
                submittingText="Updating..."
                iconFont="save"
                disabled={hasSubmitted && !formComplete}
            />}
        >
           <TicketEquipmentForm 
                selectedCustomer={customerData}
                setSelectedCustomer={setCustomerData}
                selectedSite={siteData}
                setSelectedSite={setSiteData}
                selectedEquipment={equipmentData}
                setSelectedEquipment={setEquipmentData}
                selectedContact={contactData}
                setSelectedContact={setContactData}
                showErrors={hasSubmitted}   
            />
        </WindowOverlay>
    )
}

export default UpdateCustomerInformation