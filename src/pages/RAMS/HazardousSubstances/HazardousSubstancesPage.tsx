import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import Label from "../../../components/ui/General/Label/Label";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import Header from "../../../components/ui/Structure/Header/Header";
import { HazardousSubstanceResponseData } from "../../../types/hazardousSubstance.types";
import { UserResponseData } from "../../../types/user.types";
import formatDate from "../../../utils/formatDate";
import getAPI from "../../../utils/getAPI";
import getUserFullName from "../../../utils/getUserFullName";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import HazardousSubstanceSkeleton from "./components/HazardousSubstanceSkeleton";
import HazardousSubstanceSideBarSkeleton from "./components/HazardousSubstanceSideBarSkeleton";
import HazardousSubstanceActions from "./components/HazardousSubstanceActions";
import EditHazardousSubstances from "./components/EditHazardousSubstance";

const HazardousSubstancesPage = () => {
    const { hazardousSubstanceID } = useParams();

    const [isEditMode, setIsEditMode] = useState(false);

    const [isHazardousSubstanceLoading, setIsHazardousSubstanceLoading] = useState(true);
    const [hazardousSubstanceData, setHazardousSubstanceData] = useState<HazardousSubstanceResponseData>();
    const [isCreatedByUserLoading, setIsCreatedByUserLoading] = useState(false);
    const [createdByUserData, setCreatedByUserData] = useState<UserResponseData>();


    useEffect(() => {
        getHazardousSubstanceData();
    }, [hazardousSubstanceID])

    const getHazardousSubstanceData = () => {
        getAPI(`hazardous_substances/${hazardousSubstanceID}`, {}, (response: any) => {
            const hazardousSubstanceData: HazardousSubstanceResponseData = response.data;
            setHazardousSubstanceData(hazardousSubstanceData);
            getCreatedByUser(hazardousSubstanceData.data.created_by_id)
        }, setIsHazardousSubstanceLoading)
    }

    const getCreatedByUser = (userID: number) => {
        getAPI(`users/${userID}`, {}, (response: any) => {
            const userData: UserResponseData = response.data;
            setCreatedByUserData(userData);
        }, setIsCreatedByUserLoading)
    }

    const isLoading = () => {
        return (
            isHazardousSubstanceLoading
        )
    }

    const isHeaderLoading = () => {
        return (
            isHazardousSubstanceLoading || 
            isCreatedByUserLoading
        )
    }

    const isInactive = (hazardousSubstanceData && !hazardousSubstanceData.data.is_active) === true;

    const headerText = hazardousSubstanceData && createdByUserData && `Created by ${getUserFullName(createdByUserData)} on ${formatDate(hazardousSubstanceData.data.created_at)}`;

    
    return (
        <>
            <Header
                links={[
                    {
                        to: 'rams',
                        text: 'RAMS'
                    },
                    {
                        to: 'hazardous_substances',
                        text: 'Hazardous Substances'
                    },
                    {
                        to: hazardousSubstanceID as string,
                        text: `#${hazardousSubstanceID}`
                    }
                ]}
            />
            <OuterContainer
                title='Hazardous Substances'
                id={hazardousSubstanceID}
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
                        {!isLoading() && hazardousSubstanceData ? 
                            !isEditMode ? 
                                <>
                                    <section>
                                        <h2><span style={{ color: 'var(--grey-text-color)'}}>Name:</span> {hazardousSubstanceData.data.name}</h2>
                                        <InfoGrid>
                                            <GridItem title='Description'>
                                                <p>{hazardousSubstanceData.data.description.length > 0 ?
                                                    hazardousSubstanceData.data.description :
                                                    'None'
                                                }</p>
                                            </GridItem>
                                            <GridItem title='Image'>
                                                <img 
                                                    style={{
                                                        maxWidth: '200px'
                                                    }}
                                                    src={`${process.env.REACT_APP_API_URL}/${hazardousSubstanceData.data.image_url}?${Date.now()}`} 
                                                    alt="None"
                                                />
                                            </GridItem>
                                        </InfoGrid> 
                                    </section>
                                </> :
                                <EditHazardousSubstances
                                    name={hazardousSubstanceData.data.name}
                                    description={hazardousSubstanceData.data.description}
                                    hazardousSubstanceID={parseInt(hazardousSubstanceID as string)}
                                    setIsEditMode={setIsEditMode}
                                    setHazardousSubstanceData={setHazardousSubstanceData}
                                />
                            : 
                            <HazardousSubstanceSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        {!isLoading() && hazardousSubstanceData ?
                            <HazardousSubstanceActions
                                hazardousSubstanceID={parseInt(hazardousSubstanceID as string)}
                                setHazardousSubstanceData={setHazardousSubstanceData}
                                isInactive={isInactive} 
                                isEditMode={isEditMode} 
                                setIsEditMode={setIsEditMode} 
                            /> :
                            <HazardousSubstanceSideBarSkeleton/>
                        }
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default HazardousSubstancesPage