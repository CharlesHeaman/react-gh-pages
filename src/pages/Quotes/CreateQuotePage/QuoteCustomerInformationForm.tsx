import { Dispatch, SetStateAction } from "react";
import CustomerSelect from "../../../components/form/SelectCustomer/CustomerSelect";
import SiteSelect from "../../../components/form/SiteSelect/SiteSelect";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import NewEquipmentLink from "../../../components/ui/Links/NewEquipmentLink";
import { ContactResponseData } from "../../../types/contact.types";
import { CustomerResponseData } from "../../../types/customers.types";
import { EquipmentResponseData } from "../../../types/equipment.types";
import { SiteResponseData } from "../../../types/sites.types";
import ContactSelect from "../../../components/form/ContactSelect/ContactSelect";
const QuoteCustomerInformationForm = (props: {
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
    selectedSite: SiteResponseData | undefined,
    setSelectedSite: Dispatch<SetStateAction<SiteResponseData | undefined>>,
    selectedContact: ContactResponseData | undefined,
    setSelectedContact: Dispatch<SetStateAction<ContactResponseData | undefined>>,
    selectValue: string,
    showErrors: boolean
}) => {
    return (
        <section>
            <InfoGrid>
                <GridItem title='Customer'>
                    <CustomerSelect
                        selectedCustomer={props.selectedCustomer}
                        setSelectedCustomer={props.setSelectedCustomer}
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                {props.selectValue === "enquiry" || props.selectValue === "reactive" ? 
                    <GridItem title='Site'>
                        <SiteSelect
                            selectedSite={props.selectedSite}
                            setSelectedSite={props.setSelectedSite}
                            required
                            hasSubmitted={props.showErrors}
                            customerID={props.selectedCustomer?.id}
                        />
                    </GridItem> : null
                }
                <GridItem title='Recipient'>
                    <ContactSelect
                        selectedContact={props.selectedContact}
                        setSelectedContact={props.setSelectedContact}
                        required
                        hasSubmitted={props.showErrors}
                        customerID={props.selectedCustomer?.id}                    
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default QuoteCustomerInformationForm