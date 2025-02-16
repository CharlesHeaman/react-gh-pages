import { useParams } from "react-router-dom";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import { useEffect, useState } from "react";
import { NonConformanceReportResponseData } from "../../../../types/nonConformanceReport.types";
import getAPI from "../../../../utils/getAPI";
import NonConformanceReportInformation from "./components/NonConformanceReportInformation";
import NonConformanceReportTypeLabel from "../components/NonConformanceReportTypeLabel";
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton";
import NonConformanceReportSideBar from "./components/NonConformanceReportSideBar/NonConformanceReportSideBar";

const NonConformanceReportPage = () => {
    const { nonConformanceReportID } = useParams();

    // Data States
    const [isNonConformanceReportLoading, setIsNonConformanceReportLoading] = useState(true);
    const [nonConformanceReportData, setNonConformanceReportData] = useState<NonConformanceReportResponseData>();

    useEffect(() => {
        getNonConformanceReportData();
    }, [nonConformanceReportID]);

    const getNonConformanceReportData = () => {
        getAPI(`non_conformance_reports/${nonConformanceReportID}`, {}, (response: any) => {
            const nonConformanceReportData: NonConformanceReportResponseData = response.data;
            setNonConformanceReportData(nonConformanceReportData);
        }, setIsNonConformanceReportLoading);
    }

    const isHeaderLoading = ( 
        isNonConformanceReportLoading
    )
    
    const isLoading = (
        isNonConformanceReportLoading 
    )

    return (
        <OuterContainer 
            title='Non-conformance Report' 
            id={nonConformanceReportID as string}
            headerContent={!isHeaderLoading && nonConformanceReportData ? 
                <NonConformanceReportTypeLabel type={nonConformanceReportData.data.type}/> :
                <Skeleton type="label" width={90}/>
            }
            bigID
            maxWidth={1200}
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && nonConformanceReportData ?
                        // !isEditMode ?
                            <NonConformanceReportInformation
                                nonConformanceReport={nonConformanceReportData}
                            /> 
                            // : 
                            // <EditContactForm
                            //     contact={contactData}
                            //     setContactData={setContactData}
                            //     disabledEdit={() => setIsEditMode(false)}
                            // />
                        :
                        <></>
                        // <ContactInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <NonConformanceReportSideBar 
                        nonConformanceReport={nonConformanceReportData}
                    />                    
                </div>
            </div> 
        </OuterContainer> 
    )
}

export default NonConformanceReportPage