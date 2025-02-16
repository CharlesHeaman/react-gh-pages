import { ChangeEvent, useState } from "react"
import { CreateSiteAttributes } from "../../CreateSitePage"
import InputLabelWrap from "../../../../../components/form/InputLabelWrap/InputLabelWrap"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import FormStepNavigation from "../../../../../components/form/FormStepNavigation/FormStepNavigation"

const CreateSiteServiceDetails = (props: {
    siteDetails: CreateSiteAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateDateParams: (event: ChangeEvent<HTMLInputElement>) => void,
    maxStep: number,
}) => {
    return (
        <>
            <section>
                <h2>Service Details</h2>
                <InfoGrid>
                    <GridItem title='Last Service' secondaryTitle="(optional)" span={3}>
                        <input 
                            type='date' 
                            name='last_service_at' 
                            value={props.siteDetails.last_service_at ? 
                                props.siteDetails.last_service_at.toISOString().substring(0, 10) :
                                undefined
                            }
                            onChange={props.updateDateParams}
                            max={new Date().toISOString().substring(0, 10)}
                            autoFocus
                        />
                    </GridItem>
                    <GridItem title='Next Service' secondaryTitle="(optional)" span={3}>
                        <input 
                            type='date' 
                            name='next_service_at' 
                            value={props.siteDetails.next_service_at ? 
                                props.siteDetails.next_service_at.toISOString().substring(0, 10) :
                                undefined
                            }
                            onChange={props.updateDateParams}
                            min={new Date().toISOString().substring(0, 10)}
                        />
                    </GridItem>
                    <GridItem title='Service Frequency' secondaryTitle="(optional)" span={3}>
                        <InputLabelWrap suffix="visits per year" maxWidth={150}>
                            <input 
                                type='number' 
                                name='service_per_year' 
                                value={props.siteDetails.service_per_year}
                                onChange={props.updateParams}
                            />
                        </InputLabelWrap>
                    </GridItem>
                </InfoGrid>
            </section>
            <FormStepNavigation
                formComplete={true}
                hasSubmitted={true}
                onSubmit={() => null}
                maxStep={props.maxStep}
            />
        </>
    )
}

export default CreateSiteServiceDetails