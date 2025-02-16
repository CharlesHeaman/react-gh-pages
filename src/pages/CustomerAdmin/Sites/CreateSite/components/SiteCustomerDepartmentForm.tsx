import { ChangeEvent, Dispatch, SetStateAction } from "react";
import DepartmentSelect from "../../../../../components/form/DepartmentSelect/DepartmentSelect";
import CustomerSelect from "../../../../../components/form/SelectCustomer/CustomerSelect";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateSiteAttributes } from "../../../../../types/sites.types";
import { CustomerResponseData } from "../../../../../types/customers.types";
import { DepartmentResponseData } from "../../../../../types/department.types";

const SiteCustomerDepartmentForm = (props: {
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>
    siteDetails: CreateSiteAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
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
            </InfoGrid>
        </section>
    )
}

export default SiteCustomerDepartmentForm