import { useEffect, useState } from "react";
import { useExport } from "../../../../../../../../auth/export";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import ExportPageData from "../../../../../../../../components/ui/PaginationNavigation/ExportPageData";
import { ResponseData } from "../../../../../../../../types/response.types";

const ExportResource = (props: {
    resourceData: ResponseData,
    resourceName: string
}) => {
    const exportFunc = useExport();
    
    const [showExport, setShowExport] = useState(false);
    const [queuedPDF, setQueuedPDF] = useState(false);

    useEffect(() => {
        if (!queuedPDF) return;
        if (exportFunc) {
            exportFunc.exportToPDF(props.resourceName);
        }
        setQueuedPDF(false);
    }, [showExport]);

    return (
        <>
            <SideBarModule
                title="Export"
            >
                <SideBarButton
                    text={`Export ${props.resourceName}`}
                    iconFont="file_download"
                    clickEvent={() => setShowExport(true)}
                />
            </SideBarModule>

            {exportFunc && (
                <ExportPageData 
                    show={showExport} 
                    hideFunc={() => setShowExport(false)}
                    exportToExcel={() => exportFunc.exportPageToExcel(props.resourceData, props.resourceName)}
                    exportToJSON={() => exportFunc.exportPageToJSON(props.resourceData, props.resourceName)}
                    exportToPDF={() => setQueuedPDF(true)}
                />            
            )}
        </>

    )
}

export default ExportResource