import { Dispatch, SetStateAction } from "react";
import DepartmentSelect from "../../../../../components/form/DepartmentSelect/DepartmentSelect";
import CustomerSelect from "../../../../../components/form/SelectCustomer/CustomerSelect";
import SiteSelect from "../../../../../components/form/SiteSelect/SiteSelect";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CustomerResponseData } from "../../../../../types/customers.types";
import { DepartmentResponseData } from "../../../../../types/department.types";
import { SiteResponseData } from "../../../../../types/sites.types";

const EquipmentSiteDepartmentForm = (props: {
    selectedCustomer: CustomerResponseData | undefined,
    setSelectedCustomer: Dispatch<SetStateAction<CustomerResponseData | undefined>>
    selectedSite: SiteResponseData | undefined,
    setSelectedSite: Dispatch<SetStateAction<SiteResponseData | undefined>>
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Site/Department</h2>}
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
                <GridItem title='Department'>
                    <DepartmentSelect
                        selectedDepartment={props.selectedDepartment}
                        setSelectedDepartment={props.setSelectedDepartment}
                        required
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default EquipmentSiteDepartmentForm