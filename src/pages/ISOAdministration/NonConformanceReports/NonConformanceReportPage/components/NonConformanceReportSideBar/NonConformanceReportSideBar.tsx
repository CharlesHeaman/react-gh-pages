import PermsProtectedComponent from "../../../../../../components/PermsProtectedComponent"
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import DeactivateModule from "../../../../../../components/ui/DeactivateModule/DeactivateModule"
import { NonConformanceReportResponseData } from "../../../../../../types/nonConformanceReport.types"
import ExportResource from "../../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"

const NonConformanceReportSideBar = (props: {
    nonConformanceReport: NonConformanceReportResponseData | undefined
}) => {
    return (
        props.nonConformanceReport ? <> 
            <PermsProtectedComponent requiredPerms={{ iso: 2 }}>
                <SideBarModule title="Actions">
                    <SideBarButton 
                        text="Review Report"
                        iconFont="verified"
                        color="dark-blue"
                        clickEvent={() => null}
                    />
                    <SideBarButton 
                        text="Edit Non-conformance Report"
                        iconFont="edit"
                        color="orange"
                        clickEvent={() => null}
                    />
                </SideBarModule>
                <SideBarModule title="Documents">
                    <SideBarButton
                        text="Upload Document"
                        iconFont="upload"
                        color="no-color"
                        clickEvent={() => null}
                    />
                </SideBarModule>
                <DeactivateModule
                    resourceName="Report"
                    reactivate={false}
                    showFunc={() => null}
                />
            </PermsProtectedComponent>

            <ExportResource resourceData={props.nonConformanceReport} resourceName={"Non-conformance Report"}/>
        </>
        : <></>
    )
}

export default NonConformanceReportSideBar