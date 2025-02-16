import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { QuoteCollectionResponse, QuoteResponseData } from "../../../types/quote.types";

const JobSelect = (props: {
    selectedJob: QuoteResponseData | undefined,
    setSelectedJob: Dispatch<SetStateAction<QuoteResponseData | undefined>>,
    departmentID?: number,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isJobsLoading, setIsJobsLoading] = useState(false);
    const [jobsData, setJobsData] = useState<QuoteCollectionResponse>();

    useEffect(() => {
        getJobs();
    }, [searchTerm])

    const getJobs = () => {
        getAPI('quotes', {
            number_like: searchTerm,
            department_id: props.departmentID ? props.departmentID : undefined,
            is_job: true,
            is_active: true,
        }, (response: any) => {
            const costCentreData: QuoteCollectionResponse = response.data;
            setJobsData(costCentreData);
        }, setIsJobsLoading);
    }

    const showRequired = props.selectedJob === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="dataset_linked"
                resourceName="job"
                resourceNamePlural="jobs"
                selectedText={props.selectedJob ? props.selectedJob.data.number.toString() : undefined}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={jobsData ? jobsData.data.map(job => {
                    return {
                        text: job.data.number.toString(),
                        clickFunc: () => props.setSelectedJob(job),
                        selected: props.selectedJob?.id === job.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Job is required`}
                show={showRequired}
            />}
        </>
    )
}

export default JobSelect