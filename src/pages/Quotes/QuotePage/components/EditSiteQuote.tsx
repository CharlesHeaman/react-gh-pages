import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter"
import { DepartmentResponseData } from "../../../../types/department.types"
import { EditEquipmentQuoteDetails, EditQuoteLabour, EditQuoteVisits } from "../../../../types/quotedEquipment.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import formatHours from "../../../../utils/formatHours"
import formatMiles from "../../../../utils/formatMiles"
import putAPI from "../../../../utils/putAPI"
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import getQuotedEquipmentLabourRate from "../utils/getDepartmentLabourRate"
import getEditLabourTypeMaxHours from "../utils/getEditLabourTypeMaxHours"
import EditEquipmentQuoteLabour from "./EditEquipmentQuoteLabour"
import EditEquipmentQuoteNumberOfVisits from "./EditEquipmentQuoteNumberOfVisits"
import EditEquipmentQuoteTravelAndMileage from "./EditEquipmentQuoteTravelAndMileage"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import { EditQuoteLineData } from "./EditEquipmentQuoteMaterials"
import EditSiteQuoteEquipment from "./EditSiteQuoteEquipment"
import { EquipmentTypeResponseData } from "../../../../types/equipmentType.types"
import reduceEditQuoteEquipmentTotal from "../utils/reduceEditQuoteEquipmentTotal"

const EditSiteQuoteLabourTravel = (props: {
    quotedSite: QuotedSiteResponseData,
    departmentData: DepartmentResponseData,
    getQuotedSites: () => void,
    getQuoteLines: () => void,
    distance: google.maps.DistanceMatrixResponse | null | undefined,
    autoAddedQuoteLines: Array<EditQuoteLineData>,
    setAutoAddedQuoteLines: Dispatch<SetStateAction<Array<EditQuoteLineData>>>,
    quoteLines: Array<QuoteLineResponseData>,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    
    const [quoteLinesEditData, setQuoteLinesEditData] = useState<Array<EditQuoteLineData>>([]);

    const [siteQuoteDetails, setSiteQuoteDetails] = useState<EditEquipmentQuoteDetails>({
        number_of_engineers: props.quotedSite.data.number_of_engineers.toString(),
        number_of_mates: props.quotedSite.data.number_of_mates.toString(),
        number_of_vans: props.quotedSite.data.number_of_vans.toString(),
        is_out_of_hours: props.quotedSite.data.is_out_of_hours,
        is_double_time: props.quotedSite.data.is_double_time,
        mileage: props.quotedSite.data.mileage.toString(),
        travel_time: props.quotedSite.data.travel_time.toString(),
        mileage_rate: props.quotedSite.data.mileage_rate
    });

    const [quoteLabour, setQuoteLabour] = useState<Array<EditQuoteLabour>>(props.quotedSite.data.labour.map(labour => {
        return {
            ...labour,
            hours: labour.hours.toString(),
            rate: getQuotedEquipmentLabourRate(props.quotedSite, labour.is_mate, labour.is_out_of_hours, labour.is_double_time)
        }
    }));

    const [quoteVisits, setQuoteVisits] = useState<Array<EditQuoteVisits>>(props.quotedSite.data.visits.map(visit => {
        return {
            ...visit,
            visits: visit.visits.toString(),
            rate: getQuotedEquipmentLabourRate(props.quotedSite, visit.is_mate, visit.is_out_of_hours, visit.is_double_time)
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
        );
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

    useEffect(() => {
        setQuoteLinesEditData(props.quoteLines.map(line => {
            return {
                line_id: line.id,
                quote_id: line.data.quote_id,
                site_id: line.data.site_id,
                equipment_id: line.data.equipment_id,
                is_equipment: line.data.is_equipment,
                quantity: line.data.quantity.toString(),
                category: line.data.category,
                description: line.data.description,
                supplier: line.data.supplier,
                price: line.data.price.toString(),
                markup: line.data.markup.toString(),
            }
        }));
    }, []);

    useEffect(() => {
        if (props.autoAddedQuoteLines.length > 0) {
            setQuoteLinesEditData(props.autoAddedQuoteLines);
            props.setAutoAddedQuoteLines([]);
        }
    }, [props.autoAddedQuoteLines]);

    const addQuoteLine = (equipmentType: EquipmentTypeResponseData) => {
        // Add New Line 
        setQuoteLinesEditData(prevState => [
            ...prevState,
            {
                line_id: new Date().getTime() * -1,
                quote_id: props.quotedSite.data.quote_id,
                site_id: props.quotedSite.data.site_id,
                equipment_id: null,
                is_equipment: true,
                quantity: '1',
                category: 0,
                description: equipmentType.data.name,
                supplier: '',
                price: equipmentType.data.service_duration.toString(),
                markup: '0',
            }
        ]);
    }

    const updateQuoteLine = (lineID: number, name: string, value: string) => {
        setQuoteLinesEditData(prevState => {
            return prevState.map(currentLine => {
                return (lineID === currentLine.line_id ? 
                        {
                            ...currentLine,
                            [name]: value
                        } :
                        currentLine
                    )
            })
        })
    }

    const removeQuoteLine = (lineID: number) => {
        setQuoteLinesEditData(prevState => prevState.filter(line => line.line_id !== lineID));
    }

    // Engineer Hours 
    const equipmentServiceTotal = reduceEditQuoteEquipmentTotal(quoteLinesEditData);
    useEffect(() => {
        setQuoteLabour(prevState => 
            prevState.map(labour => {    
                return {
                    ...labour,
                    hours: formatHours(equipmentServiceTotal).toString()
                }
            })
        );
    }, [equipmentServiceTotal])

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
            setSiteQuoteDetails((prevState: any) => {
                return {
                    ...prevState, 
                    mileage: formatMiles((props.distance ? props.distance.rows[0].elements[0].distance.value / 1609.34 : 0) * 2),
                    travel_time: formatHours((props.distance ? props.distance.rows[0].elements[0].duration.value / (60 * 60) : 0) * 2),            
                }
            });
        }
            
    }, [JSON.stringify(props.distance)])

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setSiteQuoteDetails)
    }

    const updateCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setSiteQuoteDetails)
    }

    const isLineUpdated = (originalLine: QuoteLineResponseData | undefined, currentLine: EditQuoteLineData): boolean => {
        return (
            originalLine?.data.quantity !== parseInt(currentLine.quantity) ||
            originalLine?.data.price !== parseFloat(currentLine.price) ||
            originalLine?.data.description !== currentLine.description
        )
    }

    const updateQuotedSite = () => {
        // Sanitize Lines
        const sanitizedLines = quoteLinesEditData.map(editLine => {
            return {
                ...editLine,
                quantity: isNaN(parseInt(editLine.quantity)) ? '1' : editLine.quantity
            }
        })
        const startLineIDs = props.quoteLines.map(startLine => startLine.id);
        const editLineIDs = sanitizedLines.map(editLine => editLine.line_id);
        // Lines with IDs that don't exist within the original array
        const addedLines = sanitizedLines.filter(editLine => !(startLineIDs.includes(editLine.line_id)));
        // Lines with IDs in both arrays 
        const commonLines = sanitizedLines.filter(editLine => startLineIDs.includes(editLine.line_id));
        // Remove lines that are same as original 
        const updatedLines = commonLines.filter(editLine => isLineUpdated(props.quoteLines.find(startLine => startLine.id === editLine.line_id), editLine));
        // Lines with IDs that don't exist within the current array
        const removedLineIDs = startLineIDs.filter(startLineID => !(editLineIDs.includes(startLineID)));
        putAPI(`quoted_sites/${props.quotedSite.id}/update_costing`, {}, {
            ...siteQuoteDetails,
            labour: quoteLabour,
            visits: quoteVisits,
            insertLines: addedLines,
            updateLines: updatedLines,
            removeLineIDs: removedLineIDs
        }, () => {
            props.getQuotedSites();
            props.getQuoteLines();
            props.setIsEditMode(false);
        }, setIsUpdating);
    }

    return (
        <>
            <EditSiteQuoteEquipment
                quotedSite={props.quotedSite}
                quoteLinesEditData={quoteLinesEditData}
                addQuoteLine={addQuoteLine}
                updateQuoteLine={updateQuoteLine}
                removeQuoteLine={removeQuoteLine}
                departmentID={props.departmentData.id}
            />
            <hr/>
            <EditEquipmentQuoteLabour
                equipmentQuoteDetails={siteQuoteDetails}
                quoteLabour={quoteLabour}            
                updateParams={updateParams}
                updateCheckboxParams={updateCheckboxParams}
                updateQuoteLabour={updateQuoteLabour}
            />
            <hr/>
            <EditEquipmentQuoteNumberOfVisits
                equipmentQuoteDetails={siteQuoteDetails}
                quoteLabour={quoteLabour}            
                quoteVisits={quoteVisits}
                dayMaxHours={props.departmentData.data.day_max_hours}            
                updateQuoteVisits={updateQuoteVisits}
            />
            <hr/>
            <EditEquipmentQuoteTravelAndMileage
                equipmentQuoteDetails={siteQuoteDetails}
                quoteVisits={quoteVisits}
                updateParams={updateParams}
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    clickFunc={updateQuotedSite}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    iconFont="save"
                />
            </ContainerFooter>
        </>
    )
} 

export default EditSiteQuoteLabourTravel