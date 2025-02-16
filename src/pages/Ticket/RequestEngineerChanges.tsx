import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GridItem from "../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Skeleton from "../../components/ui/General/Skeleton/Skeleton";
import TicketLink from "../../components/ui/Links/TicketLink";
import Header from "../../components/ui/Structure/Header/Header";
import { DepartmentCollectionResponse } from "../../types/department.types";
import { TicketCollectionResponse, TicketResponseData } from "../../types/tickets.types";
import getAPI from "../../utils/getAPI";
import TextareaAutosize from 'react-textarea-autosize';
import ContainerFooter from "../../components/ui/Containers/ContainerFooter/ContainerFooter";
import SubmitButton from "../../components/form/SubmitButton/SubmitButton";
import postAPI from "../../utils/postAPI";

function RequestEngineerChanges() {
    const { departmentName, ticketNumber, ticketSuffix } = useParams();

    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [isTicketLoading, setIsTicketLoading] = useState(true);
    const [ticketData, setTicketData] = useState<TicketResponseData>();

    useEffect(() => {
        getDepartment();
    }, [departmentName, ticketNumber, ticketSuffix]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            getTicketData(currentDepartmentData.id);
        }, setIsDepartmentLoading)
    }

    const getTicketData = (departmentID: number) => {
        getAPI(`tickets`, {
            numbers: [ticketNumber],
            suffixes: [ticketSuffix],
            department_ids: [departmentID]
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            const currentTicketData = ticketData.data[0];
            setTicketData(currentTicketData);
        }, setIsTicketLoading);
    }

    const submitRequest = () => {
        ticketData && postAPI('engineer_change_requests/create', {}, {
            ticket_id: ticketData.id,
            ticket_type: ticketData.data.ticket_type,
            text: description
        }, () => window.close(), setSubmitting)
    }

    const headerText = ticketData && <>Submit an engineer change request for <TicketLink 
        id={ticketData.id} 
        ticketType={ticketData.data.ticket_type} 
        parentID={ticketData.data.parent_ticket_id} 
        deptID={ticketData.data.department_id} 
        number={ticketData.data.number} 
        suffix={ticketData.data.suffix}
    />.</>

    const isHeaderLoading = (
        isTicketLoading
    )

    const isLoading = (
        isTicketLoading
    )

    const canSubmit = description.length > 0;

    return (
        <>
            <Header
                links={[
                        {
                            to: departmentName as string,
                            text: (departmentName as string).charAt(0).toUpperCase() + (departmentName as string).slice(1)
                        },
                        {
                            to: 'tickets',
                            text: 'Tickets'
                        },
                        {
                            to: `${ticketNumber as string}/${ticketSuffix as string}`,
                            text: `#${ticketNumber as string}${parseInt(ticketSuffix as string) > 0 ? `/${ticketSuffix}` : ''}`
                        },
                        {
                            to: 'request_engineer_changes',
                            text: 'Request Engineer Changes'
                        }
                    ]}
            />
            <OuterContainer
                title='Request Engineer Changes'
                headerContent={
                    (!isHeaderLoading && ticketData) ? <p>{headerText}</p> : <Skeleton type='text' width={400}/>
                }
                stickyHeaderContent={(!isHeaderLoading && ticketData) && <p style={{ fontSize: '0.85em' }}>{headerText}</p>}
                maxWidth={500}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {!isLoading ? 
                            (ticketData && ticketData.data.is_invoice_requested) ?
                                <p style={{ color: 'rgb(var(--red-hl))'}} className='text-center'>Request locked as invoice has been requested.</p> :
                                <>
                                    <InfoGrid>
                                        <GridItem title='Request Description'>
                                            <TextareaAutosize
                                                autoFocus
                                                minRows={3}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder='Description of the request goes here...'
                                            />
                                        </GridItem>
                                    </InfoGrid>
                                    <ContainerFooter>
                                        <SubmitButton
                                            text='Submit Request'
                                            disabled={!canSubmit}
                                            submittingText='Submitting...'
                                            submitting={submitting}
                                            clickFunc={submitRequest}
                                        />
                                    </ContainerFooter>
                                </> 
                            :
                            <InfoGrid>
                                <GridItem>
                                    <Skeleton type="small-title"/>
                                    <Skeleton type='textarea-input'/>
                                </GridItem>
                            </InfoGrid>
                        }
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default RequestEngineerChanges