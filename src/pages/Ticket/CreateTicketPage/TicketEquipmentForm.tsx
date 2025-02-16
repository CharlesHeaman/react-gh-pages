import { Dispatch, SetStateAction } from "react";
import CustomerSelect from "../../../components/form/SelectCustomer/CustomerSelect";
import EquipmentSelect from "../../../components/form/SiteSelect/EquipmentSelect";
import SiteSelect from "../../../components/form/SiteSelect/SiteSelect";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CustomerResponseData } from "../../../types/customers.types";
import { EquipmentResponseData } from "../../../types/equipment.types";
import { SiteResponseData } from "../../../types/sites.types";
import ContactSelect from "../../../components/form/ContactSelect/ContactSelect";
import { ContactResponseData } from "../../../types/contact.types";


const TicketEquipmentForm = (props: {
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>
    selectedSite: SiteResponseData | undefined,
    setSelectedSite: Dispatch<SetStateAction<SiteResponseData | undefined>>
    selectedEquipment: EquipmentResponseData | undefined,
    setSelectedEquipment: Dispatch<SetStateAction<EquipmentResponseData | undefined>>
    selectedContact: ContactResponseData | undefined,
    setSelectedContact: Dispatch<SetStateAction<ContactResponseData | undefined>>
    showErrors: boolean,
    isEdit?: boolean
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
                <GridItem title='Site'>
                    <SiteSelect
                        selectedSite={props.selectedSite}
                        setSelectedSite={props.setSelectedSite}
                        required
                        hasSubmitted={props.showErrors}
                        customerID={props.selectedCustomer?.id}
                    />
                </GridItem>
                <GridItem title='Equipment'>
                    <EquipmentSelect 
                        selectedEquipment={props.selectedEquipment}
                        setSelectedEquipment={props.setSelectedEquipment}
                        required
                        hasSubmitted={props.showErrors}                      
                        customerID={props.selectedCustomer?.id}
                        siteID={props.selectedSite?.id}
                    />
                </GridItem>
                <GridItem title='Contact'>
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

export default TicketEquipmentForm