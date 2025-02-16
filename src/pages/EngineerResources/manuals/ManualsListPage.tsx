import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import getAPI from '../../../utils/getAPI';
import getManualsSearchParams from './getManualsSearchParams';
import { ManualResponseData, ManualCollectionResponse } from '../../../types/manuals.types';
import ManualsSearchHeader from './ManualsSearchHeader';
import ManualsList from './ManualsList';
import UploadManualsDocument from './UploadManualsDocument';
import RenameManualsDocument from './RenameManual';
import DeactivateManualsDocument from './DeactivateManualsDocument';

const ManualsListPage = () => {
    const [searchParams] = useSearchParams();
    
    // Form States
    const [showUpload, setShowUpload] = useState<boolean>(false);
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [currentDeactivateDocument, setCurrentDeactivateDocument] = useState<ManualResponseData>();
    const [currentRenameDocument, setCurrentRenameDocument] = useState<ManualResponseData>();


    // Data States
    const [isManualsLoading, setIsManualsLoading] = useState(true);
    const [manualsData, setManualsData] = useState<ManualCollectionResponse>();

    // Search Parameters 
    const manualsSearchParams = getManualsSearchParams(searchParams);

    useEffect(() => {
        getManuals();
    }, [JSON.stringify(manualsSearchParams)])

    const getManuals = () => {
        getAPI('manuals', manualsSearchParams, (response: any) => {
            const manualsData: ManualCollectionResponse = response.data;
            setManualsData(manualsData);
        }, setIsManualsLoading)
    }
    
    return (
        <>
            <OuterContainer
                title='Manuals of Works'
                description='Upload, rename and deactivate manuals documents.'
                maxWidth={1000}
                noBorder
            >
                <ManualsSearchHeader
                    showCreate={() => setShowUpload(true)}
                />
                <ManualsList 
                    isManualsLoading={isManualsLoading} 
                    manuals={manualsData} 
                    perPage={manualsSearchParams.perPage}     
                    showRename={(document: ManualResponseData) => {
                        setShowRename(true);
                        setCurrentRenameDocument(document);
                    }}  
                    showDeactivate={(document: ManualResponseData) => {
                        setShowDeactivate(true);
                        setCurrentDeactivateDocument(document);
                    }}           
                />
            </OuterContainer>

            <UploadManualsDocument
                show={showUpload}
                hideFunc={() => setShowUpload(false)}
                getDocuments={getManuals}
            />

            <RenameManualsDocument     
                document={currentRenameDocument} 
                getDocuments={getManuals}
                show={showRename}
                hideFunc={() => setShowRename(false)}
            />

            <DeactivateManualsDocument     
                document={currentDeactivateDocument} 
                getDocuments={getManuals}
                show={showDeactivate}
                hideFunc={() => setShowDeactivate(false)}
            />
        </>
    )
}

export default ManualsListPage