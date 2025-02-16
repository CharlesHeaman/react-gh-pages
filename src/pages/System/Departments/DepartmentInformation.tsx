import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import Label from "../../../components/ui/General/Label/Label"
import IconTitleText from "../../../components/ui/IconTitleText/IconTitleText"
import { DepartmentResponseData } from "../../../types/department.types"
import InactiveStatus from "../../Vehicles/VehiclePage/components/InactiveStatus"
import DepartmentDetailsInformation from "./DepartmentPage/components/DepartmentDetailsInformation"
import DepartmentLabourRates from "./DepartmentPage/components/DepartmentLabourRates"
import DepartmentModuleStatusLabel from "./DepartmentPage/components/DepartmentModuleStatusLabel"

const DepartmentInformation = (props: {
    department: DepartmentResponseData,
    lastDeactivate: Date | undefined
}) => {
    return (
        <>
            {!props.department.data.is_active ? <InactiveStatus resourceName='Department' inactiveDate={props.lastDeactivate}/> : null}
            <DepartmentDetailsInformation departmentData={props.department.data}/>
            <hr/>
            <DepartmentLabourRates departmentData={props.department.data}/>
            <hr/>
            <section>
                <h2>Department Modules</h2>
                <section>
                    <InnerContainer color={props.department.data.uses_equipment_module ? 'light-green' : 'red'}>
                        <IconTitleText
                            iconFont="local_laundry_service"
                            title={<div className="flex">Equipment Module <DepartmentModuleStatusLabel enabled={props.department.data.uses_equipment_module}/></div>}
                            color={props.department.data.uses_equipment_module ? 'light-green' : 'red'}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Enables engineer 'Equipment' heading on admin and engineer tickets.</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={props.department.data.uses_refrigerant_module ? 'light-green' : 'red'}>
                        <IconTitleText
                            iconFont="propane_tank"
                            title={<div className="flex">Refrigerant Module <DepartmentModuleStatusLabel enabled={props.department.data.uses_refrigerant_module}/></div>}
                            color={props.department.data.uses_refrigerant_module ? 'light-green' : 'red'}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Enables the engineer 'My Bottles' page.</li> 
                                <li>Enables the 'Gas Charge' and 'Gas Decant' features on tickets.</li>
                                <li>Enables the 'F-Gas Checked' input on site list notes.</li>
                                <li>Enables 'Refrigerant Name' and 'Refrigerant Charge' attribute for equipment.</li>
                            <li>Enables refrigerant history displays for equipment.</li>
                        </ul>}
                    />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={props.department.data.uses_fuel_module ? 'light-green' : 'red'}>
                        <IconTitleText
                            iconFont="gas_meter"
                            title={<div className="flex">Fuel Module <DepartmentModuleStatusLabel enabled={props.department.data.uses_fuel_module}/></div>}
                            color={props.department.data.uses_fuel_module ? 'light-green' : 'red'}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Enables the 'Gas Safety Checked' input on site list notes.</li>
                                <li>Enables 'Gas Council Number' and 'Fuel Type' attribute for equipment.</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={props.department.data.uses_job_module ? 'light-green' : 'red'}>
                        <IconTitleText
                            iconFont="dataset_linked"
                            title={<div className="flex">Job Module <DepartmentModuleStatusLabel enabled={props.department.data.uses_job_module}/></div>}
                            color={props.department.data.uses_job_module ? 'light-green' : 'red'}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Enables the 'Project' quote type.</li>
                                <li>Enables 'Job' pages.</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
                <section>
                    <InnerContainer color={props.department.data.uses_collection_module ? 'light-green' : 'red'}>
                        <IconTitleText
                            iconFont="factory"
                            title={<div className="flex">Collection Module <DepartmentModuleStatusLabel enabled={props.department.data.uses_collection_module}/></div>}
                            color={props.department.data.uses_collection_module ? 'light-green' : 'red'}
                            text={<ul style={{ margin: 0, paddingLeft: 'var(--large-gap)' }}>
                                <li>Enabled 'Instruction Details' for tickets.</li>
                                <li>Enables 'Collection Note' document generation for tickets.</li>
                            </ul>}
                        />
                    </InnerContainer>
                </section>
            </section>
            <hr/>
            <section>
                <h2>Department Seeds</h2>
                <InfoGrid>
                    <GridItem title='Ticket Seed' span={2}>
                        <Label 
                            iconFont="confirmation_number" 
                            text={props.department.data.ticket_seed.toString()}
                            color="no-color"
                        />
                    </GridItem>
                    <GridItem title='Quote Seed' span={2}>
                        <Label 
                            iconFont="request_quote" 
                            text={props.department.data.quote_seed.toString()}
                            color="no-color"
                        />
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default DepartmentInformation