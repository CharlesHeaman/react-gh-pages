import { ChangeEvent, Dispatch, SetStateAction } from "react"
import DepartmentSelect from "../../../../components/form/DepartmentSelect/DepartmentSelect"
import TextInput from "../../../../components/form/TextInput/TextInput"
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import { DepartmentResponseData } from "../../../../types/department.types"

export interface AdvancedSiteSearchForm {
    department_id: number,
    code_like: string,
    name_like: string,
    address_like: string,
    postcode_like: string,
    telephone_like: string,
    location_like: string,
    description_like: string,
}

const SiteAdvancedSearchForm = (props: {
    advancedSearchParams: AdvancedSiteSearchForm,
    setAdvancedSearchParams: Dispatch<SetStateAction<AdvancedSiteSearchForm>>,
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>,

}) => {
    
    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, props.setAdvancedSearchParams)
    }

    return (
        <section>
            <InfoGrid>
                <GridItem title='Department' span={3}> 
                    <DepartmentSelect 
                        selectedDepartment={props.selectedDepartment} 
                        setSelectedDepartment={props.setSelectedDepartment} 
                        hasSubmitted={false}                            
                    />
                </GridItem>
                <GridItem title='Address' span={4}>
                    <TextareaInput
                        name="address_like"
                        value={props.advancedSearchParams.address_like}
                        updateFunc={updateParams}
                    />
                </GridItem>
                <GridItem title='Postcode' span={2}>
                    <TextInput
                        name="postcode_like"
                        value={props.advancedSearchParams.postcode_like}
                        updateFunc={updateParams}                           
                    />                       
                </GridItem>
                <GridItem title='Description' span={3}>
                    <TextareaInput
                        name="description_like"
                        value={props.advancedSearchParams.description_like}
                        updateFunc={updateParams}
                    />
                </GridItem>
                <GridItem title='Location' span={3}>
                    <TextInput
                        name="location_like"
                        value={props.advancedSearchParams.location_like}
                        updateFunc={updateParams}                           
                    />                        
                </GridItem>
                <GridItem title='Telephone' span={3}>
                    <TextInput
                        name="telephone_like"
                        value={props.advancedSearchParams.telephone_like}
                        updateFunc={updateParams}                           
                    />                        
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default SiteAdvancedSearchForm