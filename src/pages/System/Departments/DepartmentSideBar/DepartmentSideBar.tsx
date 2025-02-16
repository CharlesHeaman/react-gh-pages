import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { DepartmentResponseData } from "../../../../types/department.types"
import DepartmentDeactivate from "./components/DepartmentDeactivate"
import DepartmentSideBarSkeleton from "./components/DepartmentSideBarSkeleton"
import EditDepartmentLabourRates from "./components/EditDepartmentLabourRates"
import SelectDepartmentModules from "./components/SelectDepartmentModules"
import getAPI from "../../../../utils/getAPI"
import { DepartmentActivityCollectionResponse } from "../../../../types/departmentActivity.types"
import DepartmentAssociatedResources from "./components/DepartmentAssociatedResources/DepartmentAssociatedResources"
import UpdateTicketSeed from "./components/UpdateTicketSeed"
import UpdateQuoteSeed from "./components/UpdateQuoteSeed"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"

const DepartmentSideBar = (props: {
    department: DepartmentResponseData | undefined,
    setDepartmentData: Dispatch<SetStateAction<DepartmentResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {
    const [showEditRates, setShowEditRates] = useState(false);
    const [showSelectModules, setShowSelectModules] = useState(false);
    const [showTicketSeed, setShowTicketSeed] = useState(false);
    const [showQuoteSeed, setShowQuoteSeed] = useState(false);

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<DepartmentActivityCollectionResponse>();

    useEffect(() => {
        if (props.department?.id === undefined) return;
        getActivity(props.department.id);
    }, [JSON.stringify(props.department)]);

    const getActivity = (departmentID: number) => {
        getAPI(`department_activity`, {
            department_id: departmentID,
            perPage: 1
        }, (response: any) => {
            const departmentActivityData: DepartmentActivityCollectionResponse = response.data;
            setActivityData(departmentActivityData);
        }, setIsActivityLoading)    
    } 

    const isLoading = (
        isActivityLoading
    )
    
    return (
        <>
            {!isLoading && props.department && activityData ? 
                !props.isEditMode ? <>
                    <PermsProtectedComponent requiredPerms={{ system: 2 }}>

                        <SideBarModule title="Actions">
                            <SideBarButton
                                text='Edit Department'
                                iconFont="edit"
                                color="orange"
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                        </SideBarModule>
                        <SideBarModule title="Labour Rates">
                            <SideBarButton
                                text='Update Rates'
                                iconFont="currency_pound"
                                clickEvent={() => setShowEditRates(true)}
                            />
                        </SideBarModule>
                        <SideBarModule title="Modules">
                            <SideBarButton
                                text='Select Department Modules'
                                iconFont="checklist_rtl"
                                clickEvent={() => setShowSelectModules(true)}
                            />
                        </SideBarModule>
                        <SideBarModule title="Seeds">
                            <SideBarButton
                                text='Update Ticket Seed'
                                iconFont="confirmation_number"
                                clickEvent={() => setShowTicketSeed(true)}
                            />
                            <SideBarButton
                                text='Update Quote Seed'
                                iconFont="request_quote"
                                clickEvent={() => setShowQuoteSeed(true)}
                            />
                        </SideBarModule>
                    </PermsProtectedComponent>

                    <DepartmentAssociatedResources
                        departmentID={props.department.id}
                        activityCount={activityData.total_count}
                    />
                    <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                        <DepartmentDeactivate 
                            departmentID={props.department.id} 
                            reactivate={!props.department.data.is_active}
                            setDepartmentData={props.setDepartmentData}
                        />
                    </PermsProtectedComponent>

                    <ExportResource
                        resourceData={props.department}
                        resourceName='Department'
                    />
                </>
                :
                // Edit Mode
                <SideBarModule title='Actions'>
                    <SideBarButton 
                        text='Abandon Edit'
                        color="grey"
                        iconFont='cancel'
                        clickEvent={() => props.setIsEditMode(false)}
                    />
                </SideBarModule>
                :
                <DepartmentSideBarSkeleton/>
            }

            {props.department ? <EditDepartmentLabourRates
                department={props.department}
                setDepartmentData={props.setDepartmentData}
                show={showEditRates}
                hideFunc={() => setShowEditRates(false)}
            /> : null}

            {props.department ? <SelectDepartmentModules
                department={props.department}
                setDepartmentData={props.setDepartmentData}
                show={showSelectModules}
                hideFunc={() => setShowSelectModules(false)}            
            /> : null}

            {props.department ? <UpdateTicketSeed
                department={props.department}
                setDepartmentData={props.setDepartmentData}
                show={showTicketSeed}
                hideFunc={() => setShowTicketSeed(false)}            
            /> : null}

            {props.department ? <UpdateQuoteSeed
                department={props.department}
                setDepartmentData={props.setDepartmentData}
                show={showQuoteSeed}
                hideFunc={() => setShowQuoteSeed(false)}            
            /> : null}

            
        </>
    )
}

export default DepartmentSideBar