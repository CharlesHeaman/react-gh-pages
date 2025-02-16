import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import EditEquipmentQuoteLabour from "./EditEquipmentQuoteLabour"
import EditEquipmentQuoteNumberOfVisits from "./EditEquipmentQuoteNumberOfVisits"
import EditEquipmentQuoteTravelAndMileage from "./EditEquipmentQuoteTravelAndMileage"
import getQuotedEquipmentLabourRate from "../utils/getDepartmentLabourRate"
import { DepartmentResponseData } from "../../../../types/department.types"
import { EditEquipmentQuoteDetails, EditQuoteLabour, EditQuoteVisits, QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import formatHours from "../../../../utils/formatHours"
import formatMiles from "../../../../utils/formatMiles"
import putAPI from "../../../../utils/putAPI"
import getEditLabourTypeMaxHours from "../utils/getEditLabourTypeMaxHours"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter"

const EditEquipmentQuoteLabourTravel = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    departmentData: DepartmentResponseData,
    getQuotedEquipment: () => void,
    distance: google.maps.DistanceMatrixResponse | null | undefined,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const [equipmentQuoteDetails, setEquipmentQuoteDetails] = useState<EditEquipmentQuoteDetails>({
        number_of_engineers: props.quotedEquipment.data.number_of_engineers.toString(),
        number_of_mates: props.quotedEquipment.data.number_of_mates.toString(),
        number_of_vans: props.quotedEquipment.data.number_of_vans.toString(),
        is_out_of_hours: props.quotedEquipment.data.is_out_of_hours,
        is_double_time: props.quotedEquipment.data.is_double_time,
        mileage: props.quotedEquipment.data.mileage.toString(),
        travel_time: props.quotedEquipment.data.travel_time.toString(),
        mileage_rate: props.quotedEquipment.data.mileage_rate
    });

    const [quoteLabour, setQuoteLabour] = useState<Array<EditQuoteLabour>>(props.quotedEquipment.data.labour.map(labour => {
        return {
            ...labour,
            hours: labour.hours.toString(),
            rate: getQuotedEquipmentLabourRate(props.quotedEquipment, labour.is_mate, labour.is_out_of_hours, labour.is_double_time)
        }
    }));

    const [quoteVisits, setQuoteVisits] = useState<Array<EditQuoteVisits>>(props.quotedEquipment.data.visits.map(visit => {
        return {
            ...visit,
            visits: visit.visits.toString(),
            rate: getQuotedEquipmentLabourRate(props.quotedEquipment, visit.is_mate, visit.is_out_of_hours, visit.is_double_time)
        }
    }));

    const updateQuoteLabour = (quoteLabour: EditQuoteLabour | undefined, event: ChangeEvent<HTMLInputElement>) => {
        if (!quoteLabour) return;
        setQuoteLabour(prevState => 
            prevState.map(labour => {
                if (
                    labour.engineer_index === quoteLabour.engineer_index && 
                    labour.is_mate === quoteLabour.is_mate && 
                    labour.is_out_of_hours === quoteLabour.is_out_of_hours && 
                    labour.is_double_time === quoteLabour.is_double_time
                ) {
                    return {
                        ...labour,
                        hours: event.target.value
                    }
                }
                return labour
            })
        )
    }

    const updateQuoteVisits = (quoteVisits: EditQuoteVisits | undefined, event: ChangeEvent<HTMLInputElement>) => {
        if (!quoteVisits) return;
        setQuoteVisits(prevState => 
            prevState.map(visit => {
                if (
                    visit.is_mate === quoteVisits.is_mate && 
                    visit.is_out_of_hours === quoteVisits.is_out_of_hours && 
                    visit.is_double_time === quoteVisits.is_double_time
                ) {
                    return {
                        ...visit,
                        visits: event.target.value
                    }
                }
                return visit
            })
        )
    }

    // Engineer Visits 
    const engineerFullDays = Math.ceil(getEditLabourTypeMaxHours(quoteLabour, false, false, false) / props.departmentData.data.day_max_hours);

    useEffect(() => {
        setQuoteVisits(prevState => 
            prevState.map(visit => {
                if (
                    visit.is_mate === false && 
                    visit.is_out_of_hours === false && 
                    visit.is_double_time === false
                ) {
                    return {
                        ...visit,
                        visits: engineerFullDays.toString()
                    }
                }
                return visit
            })
        )
    }, [engineerFullDays]);

    
    // Engineer Out of Hours Visits 
    const engineerOutOfHoursFullDays = Math.ceil(getEditLabourTypeMaxHours(quoteLabour, false, true, false) / props.departmentData.data.day_max_hours);

    useEffect(() => {
        setQuoteVisits(prevState => 
            prevState.map(visit => {
                if (
                    visit.is_mate === false && 
                    visit.is_out_of_hours === true && 
                    visit.is_double_time === false
                ) {
                    return {
                        ...visit,
                        visits: engineerOutOfHoursFullDays.toString()
                    }
                }
                return visit
            })
        )
    }, [engineerOutOfHoursFullDays]);

    // Engineer Double Time Visits 
    const engineerDoubleTimeFullDays = Math.ceil(getEditLabourTypeMaxHours(quoteLabour, false, false, true) / props.departmentData.data.day_max_hours);

    useEffect(() => {
        setQuoteVisits(prevState => 
            prevState.map(visit => {
                if (
                    visit.is_mate === false && 
                    visit.is_out_of_hours === false && 
                    visit.is_double_time === true
                ) {
                    return {
                        ...visit,
                        visits: engineerDoubleTimeFullDays.toString()
                    }
                }
                return visit
            })
        )
    }, [engineerDoubleTimeFullDays]);

    // Mate Visits 
    const mateFullDays = Math.ceil(getEditLabourTypeMaxHours(quoteLabour, true, false, false) / props.departmentData.data.day_max_hours);

    useEffect(() => {
        setQuoteVisits(prevState => 
            prevState.map(visit => {
                if (
                    visit.is_mate === true && 
                    visit.is_out_of_hours === false && 
                    visit.is_double_time === false
                ) {
                    return {
                        ...visit,
                        visits: mateFullDays.toString()
                    }
                }
                return visit
            })
        )
    }, [mateFullDays]);

    
    // Mate Out of Hours Visits 
    const mateOutOfHoursFullDays = Math.ceil(getEditLabourTypeMaxHours(quoteLabour, true, true, false) / props.departmentData.data.day_max_hours);

    useEffect(() => {
        setQuoteVisits(prevState => 
            prevState.map(visit => {
                if (
                    visit.is_mate === true && 
                    visit.is_out_of_hours === true && 
                    visit.is_double_time === false
                ) {
                    return {
                        ...visit,
                        visits: mateOutOfHoursFullDays.toString()
                    }
                }
                return visit
            })
        )
    }, [mateOutOfHoursFullDays]);

    // Mate Double Time Visits 
    const mateDoubleTimeFullDays = Math.ceil(getEditLabourTypeMaxHours(quoteLabour, true, false, true) / props.departmentData.data.day_max_hours);

    useEffect(() => {
        setQuoteVisits(prevState => 
            prevState.map(visit => {
                if (
                    visit.is_mate === true && 
                    visit.is_out_of_hours === false && 
                    visit.is_double_time === true
                ) {
                    return {
                        ...visit,
                        visits: mateDoubleTimeFullDays.toString()
                    }
                }
                return visit
            })
        )
    }, [mateDoubleTimeFullDays]);

    useEffect(() => {
        if (props.distance) {
            setEquipmentQuoteDetails((prevState: any) => {
                return {
                    ...prevState, 
                    mileage: formatMiles((props.distance ? props.distance.rows[0].elements[0].distance.value / 1609.34 : 0) * 2),
                    travel_time: formatHours((props.distance ? props.distance.rows[0].elements[0].duration.value / (60 * 60) : 0) * 2),            
                }
            });
        }
            
    }, [JSON.stringify(props.distance)])

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setEquipmentQuoteDetails)
    }

    const updateCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setEquipmentQuoteDetails)
    }

    const updateQuotedEquipment = () => {
        putAPI(`quoted_equipment/${props.quotedEquipment.id}/update_costing`, {}, {
            ...equipmentQuoteDetails,
            labour: quoteLabour,
            visits: quoteVisits
        }, () => {
            props.getQuotedEquipment();
            props.setIsEditMode(false);
        }, setIsUpdating);
    }

    return (
        <>
            <EditEquipmentQuoteLabour
                equipmentQuoteDetails={equipmentQuoteDetails}
                quoteLabour={quoteLabour}            
                updateParams={updateParams}
                updateCheckboxParams={updateCheckboxParams}
                updateQuoteLabour={updateQuoteLabour}
            />
            <hr/>
            <EditEquipmentQuoteNumberOfVisits
                equipmentQuoteDetails={equipmentQuoteDetails}
                quoteLabour={quoteLabour}            
                quoteVisits={quoteVisits}
                dayMaxHours={props.departmentData.data.day_max_hours}            
                updateQuoteVisits={updateQuoteVisits}
            />
            <hr/>
            <EditEquipmentQuoteTravelAndMileage
                equipmentQuoteDetails={equipmentQuoteDetails}
                quoteVisits={quoteVisits}
                updateParams={updateParams}
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    clickFunc={updateQuotedEquipment}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    iconFont="save"
                />
            </ContainerFooter>
        </>
    )
} 

export default EditEquipmentQuoteLabourTravel