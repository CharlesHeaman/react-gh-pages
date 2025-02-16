import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { ScheduleOfWorksCollectionResponse, ScheduleOfWorksResponseData } from "../../../types/scheduleOfWorks.types";
import getAPI from "../../../utils/getAPI";
import DeactivateScheduleOfWorksDocument from './DeactivateScheduleOfWorksDocument';
import RenameScheduleOfWorksDocument from './RenameScheduleOfWorksDocument';
import ScheduleOfWorksList from './ScheduleOfWorksList';
import ScheduleOfWorksSearchHeader from './ScheduleOfWorksSearchHeader';
import UploadScheduleOfWorksDocument from './UploadScheduleOfWorksDocument';
import getScheduleOfWorksSearchParams from './utils/getScheduleOfWorksSearchParams';

const ScheduleOfWorksListPage = () => {
    const [searchParams] = useSearchParams();
    
    // Form States
    const [showUpload, setShowUpload] = useState<boolean>(false);
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [currentDeactivateDocument, setCurrentDeactivateDocument] = useState<ScheduleOfWorksResponseData>();
    const [currentRenameDocument, setCurrentRenameDocument] = useState<ScheduleOfWorksResponseData>();


    // Data States
    const [isScheduleOfWorksLoading, setIsScheduleOfWorksLoading] = useState(true);
    const [scheduleOfWorksData, setScheduleOfWorksData] = useState<ScheduleOfWorksCollectionResponse>();

    // Search Parameters 
    const scheduleOfWorksSearchParams = getScheduleOfWorksSearchParams(searchParams);

    useEffect(() => {
        getScheduleOfWorks();
    }, [JSON.stringify(scheduleOfWorksSearchParams)])

    const getScheduleOfWorks = () => {
        getAPI('schedule_of_works', scheduleOfWorksSearchParams, (response: any) => {
            const scheduleOfWorksData: ScheduleOfWorksCollectionResponse = response.data;
            setScheduleOfWorksData(scheduleOfWorksData);
        }, setIsScheduleOfWorksLoading)
    }
    
    return (
        <>
            <OuterContainer
                title='Schedule of Works'
                description='Upload, rename and deactivate schedule or works documents.'
                maxWidth={1000}
                noBorder
            >
                <ScheduleOfWorksSearchHeader
                    showCreate={() => setShowUpload(true)}
                />
                <ScheduleOfWorksList 
                    isScheduleOfWorksLoading={isScheduleOfWorksLoading} 
                    scheduleOfWorks={scheduleOfWorksData} 
                    perPage={scheduleOfWorksSearchParams.perPage}     
                    showRename={(document: ScheduleOfWorksResponseData) => {
                        setShowRename(true);
                        setCurrentRenameDocument(document);
                    }}  
                    showDeactivate={(document: ScheduleOfWorksResponseData) => {
                        setShowDeactivate(true);
                        setCurrentDeactivateDocument(document);
                    }}           
                />
            </OuterContainer>

            <UploadScheduleOfWorksDocument
                show={showUpload}
                hideFunc={() => setShowUpload(false)}
                getDocuments={getScheduleOfWorks}
            />

            <RenameScheduleOfWorksDocument     
                document={currentRenameDocument} 
                getDocuments={getScheduleOfWorks}
                show={showRename}
                hideFunc={() => setShowRename(false)}
            />

            <DeactivateScheduleOfWorksDocument     
                document={currentDeactivateDocument} 
                getDocuments={getScheduleOfWorks}
                show={showDeactivate}
                hideFunc={() => setShowDeactivate(false)}
            />
        </>
    )
}

export default ScheduleOfWorksListPage