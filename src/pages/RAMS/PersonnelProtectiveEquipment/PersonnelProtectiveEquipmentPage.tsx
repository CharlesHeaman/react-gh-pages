import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Label from "../../../components/ui/General/Label/Label";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import Header from "../../../components/ui/Structure/Header/Header";
import { PersonnelProtectiveEquipmentResponseData } from "../../../types/personnelProtectiveEquipment.types";
import { UserResponseData } from "../../../types/user.types";
import formatDate from "../../../utils/formatDate";
import getAPI from "../../../utils/getAPI";
import getUserFullName from "../../../utils/getUserFullName";
import PersonnelProtectiveEquipmentActions from "./components/PersonnelProtectiveEquipmentAction";
import PersonnelProtectiveEquipmentSideBarSkeleton from "./components/PersonnelProtectiveEquipmentSideBarSkeleton";
import PersonnelProtectiveEquipmentSkeleton from "./components/PersonnelProtectiveEquipmentSkeleton";
import EditPersonnelProtectiveEquipment from "./components/EditPersonnelProtectiveEquipment";

const PersonnelProtectiveEquipmentPage = () => {
    const { personnelProtectiveEquipmentID } = useParams();

    const [isEditMode, setIsEditMode] = useState(false);

    const [isPersonnelProtectiveEquipmentLoading, setIsPersonnelProtectiveEquipmentLoading] = useState(true);
    const [personnelProtectiveEquipmentData, setPersonnelProtectiveEquipmentData] = useState<PersonnelProtectiveEquipmentResponseData>();
    const [isCreatedByUserLoading, setIsCreatedByUserLoading] = useState(false);
    const [createdByUserData, setCreatedByUserData] = useState<UserResponseData>();


    useEffect(() => {
        getPersonnelProtectiveEquipmentData();
    }, [personnelProtectiveEquipmentID])

    const getPersonnelProtectiveEquipmentData = () => {
        getAPI(`personnel_protective_equipment/${personnelProtectiveEquipmentID}`, {}, (response: any) => {
            const personnelProtectiveEquipmentData: PersonnelProtectiveEquipmentResponseData = response.data;
            setPersonnelProtectiveEquipmentData(personnelProtectiveEquipmentData);
            getCreatedByUser(personnelProtectiveEquipmentData.data.created_by_id)
        }, setIsPersonnelProtectiveEquipmentLoading)
    }

    const getCreatedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setCreatedByUserData(userData);
        }, setIsCreatedByUserLoading)
    }

    const isLoading = () => {
        return (
            isPersonnelProtectiveEquipmentLoading
        )
    }

    const isHeaderLoading = () => {
        return (
            isPersonnelProtectiveEquipmentLoading || 
            isCreatedByUserLoading
        )
    }

    const isInactive = (personnelProtectiveEquipmentData && !personnelProtectiveEquipmentData.data.is_active) === true;

    const headerText = personnelProtectiveEquipmentData && createdByUserData && `Created by ${getUserFullName(createdByUserData)} on ${formatDate(personnelProtectiveEquipmentData.data.created_at)}`;

    
    return (
        <>
            <Header
                links={[
                    {
                        to: 'rams',
                        text: 'RAMS'
                    },
                    {
                        to: 'personnel_protective_equipment',
                        text: 'Personnel Protective Equipment'
                    },
                    {
                        to: personnelProtectiveEquipmentID as string,
                        text: `#${personnelProtectiveEquipmentID}`
                    }
                ]}
            />
            <OuterContainer
                title='Personnel Protective Equipment'
                id={personnelProtectiveEquipmentID}
                headerContent={!isHeaderLoading() ? 
                    <div className='flex'>
                        {isInactive && <Label
                            text='Inactive'
                            iconFont="highlight_off"
                            color="grey"
                        />}
                        <p>{headerText}</p>
                    </div> :
                    <Skeleton type="text" width={300}/>
                }
                stickyHeaderContent={<p style={{ fontSize: '0.85em' }}>{headerText}</p>}
                maxWidth={750}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading() && personnelProtectiveEquipmentData ? 
                            !isEditMode ? 
                                <>
                                    <section>
                                        <h2><span style={{ color: 'var(--grey-text-color)'}}>Name:</span> {personnelProtectiveEquipmentData.data.name}</h2>
                                        <InfoGrid>
                                            <GridItem title='Description'>
                                                <p>{personnelProtectiveEquipmentData.data.description.length > 0 ?
                                                    personnelProtectiveEquipmentData.data.description :
                                                    'None'
                                                }</p>
                                            </GridItem>
                                            <GridItem title='Image'>
                                                <img 
                                                    style={{
                                                        maxWidth: '200px'
                                                    }}
                                                    src={`${process.env.REACT_APP_API_URL}/${personnelProtectiveEquipmentData.data.image_url}?${Date.now()}`} 
                                                    alt="None"
                                                />
                                            </GridItem>
                                        </InfoGrid> 
                                    </section>
                                </> :
                                <EditPersonnelProtectiveEquipment
                                    name={personnelProtectiveEquipmentData.data.name}
                                    description={personnelProtectiveEquipmentData.data.description}
                                    personnelProtectiveEquipmentID={parseInt(personnelProtectiveEquipmentID as string)}
                                    setIsEditMode={setIsEditMode}
                                    setPersonnelProtectiveEquipmentData={setPersonnelProtectiveEquipmentData}
                                />
                            : 
                            <PersonnelProtectiveEquipmentSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        {!isLoading() && personnelProtectiveEquipmentData ?
                            <PersonnelProtectiveEquipmentActions
                                personnelProtectiveEquipmentID={parseInt(personnelProtectiveEquipmentID as string)}
                                setPersonnelProtectiveEquipmentData={setPersonnelProtectiveEquipmentData}
                                isInactive={isInactive} 
                                isEditMode={isEditMode} 
                                setIsEditMode={setIsEditMode} 
                            /> :
                            <PersonnelProtectiveEquipmentSideBarSkeleton/>
                        }
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default PersonnelProtectiveEquipmentPage