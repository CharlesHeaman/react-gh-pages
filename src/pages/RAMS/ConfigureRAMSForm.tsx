
import { Dispatch, SetStateAction } from "react"
import MarkdownEditor from "../../components/form/MarkdownEditor/MarkdownEditor"
import GridItem from "../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../components/ui/Containers/InnerContainer/InnerContainer"
import Label from "../../components/ui/General/Label/Label"
import NoneFound from "../../components/ui/General/NoneFound/NoneFound"
import { SelectItem } from "../../components/ui/SelectMenu/SelectMenu"
import SideButtonMenu from "../../components/ui/SideButtonMenu/SideButtonMenu"
import { PersonnelProtectiveEquipmentResponseData } from "../../types/personnelProtectiveEquipment.types"
import { RiskAssessmentResponseData } from "../../types/riskAssessment.types"

const ConfigureRAMSForm = (props: {
    sequenceOfOperations: string, 
    setSequenceOfOperations: Dispatch<SetStateAction<string>>,
    selectedRiskAssessments: Array<SelectItem>,
    riskAssessments: Array<RiskAssessmentResponseData>,
    startSelectedRiskAssessmentIDS: Array<number>,
    riskAssessmentAttachmentIDs: Array<number>,
    setRiskAssessmentAttachmentIDs: Dispatch<SetStateAction<Array<number>>>
    selectedPPE: Array<SelectItem>,
    ppe: Array<PersonnelProtectiveEquipmentResponseData>,
    startSelectedPPEIDS: Array<number>,
    ppeRequiredIDs: Array<number>,
    setPPERequiredIDs: Dispatch<SetStateAction<Array<number>>>
    // updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isPreview?: boolean,
}) => {
    return (
        <>
            <section>
                <h2>Sequence of Operations</h2>
                <MarkdownEditor
                    content={props.sequenceOfOperations}
                    setter={props.setSequenceOfOperations}                                                    
                    startPreview
                />
            </section>
            <hr/>
            <section>
                <h2>Attached Risk Assessments</h2>
                    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <SideButtonMenu
                            buttonText='Select Attached Risk Assessments'
                            buttonIcon="checklist_rtl"
                            menuTitle='Select Attached Risk Assessments'
                            resourcePlural="risk assessments"
                            startSelectItems={props.selectedRiskAssessments}
                            updateFunc={(updatedItems: Array<SelectItem>) => {
                                props.setRiskAssessmentAttachmentIDs(updatedItems.map(selectedItem => selectedItem.id))
                            }}
                            updateOnChange
                            returnSelected
                        />
                    </div>
                    {props.riskAssessments.length > 0 ?
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '48px' }}></th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.riskAssessments.map((riskAssessment, index) => 
                                    (props.riskAssessmentAttachmentIDs.includes(riskAssessment.id) || 
                                        props.startSelectedRiskAssessmentIDS.includes(riskAssessment.id)
                                    ) ? 
                                        <tr key={index}>
                                            <td>
                                                {!(props.startSelectedRiskAssessmentIDS.includes(riskAssessment.id)) ? 
                                                    <Label text="" iconFont="add" color="light-green" title="Added"/> : 
                                                    !(props.riskAssessmentAttachmentIDs.includes(riskAssessment.id)) ? 
                                                        <Label text="" iconFont="remove" color="red" title="Removed"/> : 
                                                        <Label text="" iconFont="radio_button_checked" color="dark-blue" title="Default"/> 
                                                }

                                            </td>
                                            <td className="text-left">{riskAssessment.data.name}</td>
                                        </tr>
                                        : 
                                        null
                                )}
                            </tbody>
                        </table>
                        :
                        <InnerContainer>
                            <NoneFound
                                iconFont="assignment_late"
                                text='No risk assessments found.'
                                small
                            />
                        </InnerContainer>
                    }
                </section>
                <hr/>
                <section>
                    <h2>Required Personnel Protective Equipment</h2>
                    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <SideButtonMenu
                            buttonText='Select Required PPE'
                            buttonIcon="checklist_rtl"
                            menuTitle='Select Required PPE'
                            resourcePlural="personnel protective equipment"
                            startSelectItems={props.selectedPPE}
                            updateFunc={(updatedItems: Array<SelectItem>) => {
                                props.setPPERequiredIDs(updatedItems.map(selectedItem => selectedItem.id))
                            }}
                            updateOnChange
                            returnSelected
                        />
                    </div>
                    {props.ppe.length > 0 ?
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '48px' }}></th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.ppe.map((ppe, index) => 
                                    (props.ppeRequiredIDs.includes(ppe.id) || 
                                        props.startSelectedPPEIDS.includes(ppe.id)
                                    ) ? 
                                        <tr key={index}>
                                            <td>
                                                {!(props.startSelectedPPEIDS.includes(ppe.id)) ? 
                                                    <Label text="" iconFont="add" color="light-green" title="Added"/> : 
                                                    !(props.ppeRequiredIDs.includes(ppe.id)) ? 
                                                        <Label text="" iconFont="remove" color="red" title="Removed"/> : 
                                                        <Label text="" iconFont="radio_button_checked" color="dark-blue" title="Default"/> 
                                                }

                                            </td>
                                            <td className="text-left">{ppe.data.name}</td>
                                        </tr>
                                        : 
                                        null
                                )}
                            </tbody>
                        </table>
                        :
                        <InnerContainer>
                            <NoneFound
                                iconFont="masks"
                                text='No personnel protective equipment found.'
                                small
                            />
                        </InnerContainer>
                    }
            </section>
        </>
    )
}

export default ConfigureRAMSForm