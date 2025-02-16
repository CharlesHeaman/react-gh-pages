import { ChangeEvent } from "react";
import HoursInput from "../../../../../components/form/HoursInput/HoursInput";
import IntegerInput from "../../../../../components/form/IntegerInput/IntegerInput";
import TextareaInput from "../../../../../components/form/TextareaInput/TextareaInput";
import TextInput from "../../../../../components/form/TextInput/TextInput";
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateDepartmentAttributes } from "../../../../../types/department.types";

const DepartmentDetailsForm = (props: {
    departmentDetails: CreateDepartmentAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Department Details</h2>}
            <InfoGrid>                
                <GridItem title='Name'>
                    <TextInput
                        name="name"
                        label="Name"
                        value={props.departmentDetails.name}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                        autoFocus
                    />
                </GridItem>
                <GridItem title='Description' secondaryTitle="(optional)">
                    <TextareaInput
                        name="description"
                        value={props.departmentDetails.description}
                        label="Description"
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                    />
                </GridItem>
                <GridItem title='Max Day Length'>
                    <HoursInput
                        name="day_max_hours"
                        label="Max day length"
                        value={props.departmentDetails.day_max_hours}
                        updateFunc={props.updateParams}
                        hasSubmitted={props.showErrors}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default DepartmentDetailsForm