import { ChangeEvent, Dispatch, SetStateAction } from "react";
import TextInput from "../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateUserAttributes } from "../../../../types/user.types";
import { DepartmentResponseData } from "../../../../types/department.types";
import DepartmentSelect from "../../../../components/form/DepartmentSelect/DepartmentSelect";
import CheckboxInput from "../../../../components/form/CheckboxInput/CheckboxInput";
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput";
import CodeInput from "../../../../components/form/CodeInput/CodeInput";


const UserDetailsForm = (props: {
    userDetails: CreateUserAttributes,
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>    
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    isUsernameUnique: boolean,
    checkUniqueUsername: () => void,
    showErrors: boolean,
    isEdit?: boolean,
}) => {
    return (
        <section>
            {props.isEdit && <h2>User Details</h2>}
            <InfoGrid>                    
                <GridItem title='Username' span={3}>
                    <CodeInput
                        name="username"
                        label="Username"
                        value={props.userDetails.username}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        isUnique={props.isUsernameUnique}
                        checkUnique={props.checkUniqueUsername}
                        upperCase={false}
                        autoFocus
                        required
                    />
                </GridItem>
                <GridItem title='Job Title' span={3}>
                    <TextInput
                        name="job_title"
                        value={props.userDetails.job_title}
                        label="Job title"
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='First Name' span={3}>
                    <TextInput
                        name="first_name"
                        value={props.userDetails.first_name}
                        label="First name"
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Last Name' span={3}>
                    <TextInput
                        name="last_name"
                        value={props.userDetails.last_name}
                        label="Last name"
                        updateFunc={props.updateParams} 
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
                <GridItem title='Primary Department' secondaryTitle="(optional)">
                    <DepartmentSelect
                        selectedDepartment={props.selectedDepartment}
                        setSelectedDepartment={props.setSelectedDepartment}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Is Engineer' span={3}>
                    <CheckboxInput 
                        name="is_engineer"
                        checked={props.userDetails.is_engineer} 
                        updateFunc={props.updateCheckboxParams} 
                    />
                </GridItem>
                <GridItem title='Notes' secondaryTitle="(optional)">
                    <TextareaInput
                        name="notes"
                        value={props.userDetails.notes}
                        label="Notes"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors} />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default UserDetailsForm