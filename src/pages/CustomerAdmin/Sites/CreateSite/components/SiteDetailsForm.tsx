import { ChangeEvent, Dispatch, SetStateAction } from "react";
import CodeInput from "../../../../../components/form/CodeInput/CodeInput";
import DepartmentSelect from "../../../../../components/form/DepartmentSelect/DepartmentSelect";
import TelephoneInput from "../../../../../components/form/TelephoneInput/TelephoneInput";
import TextInput from "../../../../../components/form/TextInput/TextInput";
import TextareaInput from "../../../../../components/form/TextareaInput/TextareaInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { DepartmentResponseData } from "../../../../../types/department.types";
import { CreateSiteAttributes } from "../../../../../types/sites.types";

const SiteDetailsForm = (props: {
    siteDetails: CreateSiteAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>
    siteCodeUnique: boolean,
    checkUniqueSiteCode: () => void,
    showErrors: boolean,
    isEdit?: boolean,
}) => {
    return (
        <section>
            {props.isEdit && <h2>Site Details</h2>}
            <InfoGrid>                
                <GridItem title='Name' span={4}>
                    <TextInput
                        name="name"
                        label="Name"
                        value={props.siteDetails.name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Code' span={2}>
                    <CodeInput
                        name="code"
                        value={props.siteDetails.code}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        isUnique={props.siteCodeUnique}
                        checkUnique={props.checkUniqueSiteCode}
                        required
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
                <GridItem title='Description' span={3}>
                    <TextareaInput
                        name="description"
                        value={props.siteDetails.description}
                        label="Description"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}                        
                        required
                    />
                </GridItem>
                <GridItem title='Location' span={3}>
                    <TextareaInput
                        name="location"
                        value={props.siteDetails.location}
                        label="Location"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}                        
                        required
                    />
                </GridItem>
                <GridItem title='Telephone' span={3}>
                    <TelephoneInput
                        name="telephone"
                        value={props.siteDetails.telephone}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}                        
                        required
                    />
                </GridItem>
                <GridItem title='Special Instructions' secondaryTitle="(optional)">
                    <TextareaInput
                        name="special_instructions"
                        value={props.siteDetails.special_instructions}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}                        
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SiteDetailsForm