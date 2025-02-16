import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SubmitButton from "../../components/form/SubmitButton/SubmitButton"
import ContainerFooter from "../../components/ui/Containers/ContainerFooter/ContainerFooter"
import GridItem from "../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid"
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer"
import Header from "../../components/ui/Structure/Header/Header"
import { TrackerSiteCollectionResponse, TrackerSiteResponseData } from "../../types/trackerSites.types"
import handleError from "../../utils/handleError"
import { get, post, trackerGet } from "../../utils/Requests"

const LinkEngineerHome = () => {
    const { userID } = useParams();
    const [userData, setUserData] = useState<any>({})
    const [siteData, setSiteData] = useState<Array<TrackerSiteResponseData>>([])
    const [selectedSite, setSelectedSite] = useState<string>('')
    const [siteFilter, setSiteFilter] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false)

    useEffect(() => {
        getUserData();
        getSitesData();
    }, [userID])

    const getUserData = () => {
        get(`/api/oldUsers/${userID}`, {}, getUserDataResponse, (error : any) => handleError(error, props.addNotification));
    }

    const getUserDataResponse = (response: any) => {
        setUserData(response.data)
    }

    const getSitesData = () => {
        trackerGet(`/api/sites`, {}, getSitesDataResponse, (error : any) => handleError(error, props.addNotification));
    }

    const getSitesDataResponse = (response: any) => {
        const sitesData: TrackerSiteCollectionResponse = response.data;
        setSiteData(sitesData.data)
    }

    const updateHome = () => {
        post(`/api/oldUsers/${userID}/updateTrackerHome`, {}, { trackerSiteID: selectedSite}, updateHomeResponse, (error : any) => handleError(error, props.addNotification), setSubmitting)
    }

    const updateHomeResponse = () => {
        window.close();
    }

    return (
        <>
            <Header
                links={[
                        {
                            to: 'users',
                            text: 'Users'
                        },
                        {
                            to: userID as string,
                            text: `#${userID}`
                        },
                        {
                            to: 'link_engineer_home',
                            text: 'Link Engineer Home'
                        }
                    ]}
            />
            <OuterContainer
                title='Link Engineer Home'
                headerContent={`Link engineer home site.`}
                stickyHeaderContent={<p style={{ fontSize: '0.85em' }}>Link engineer home sit.</p>}
                maxWidth={500}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <InfoGrid>
                            <GridItem title='Engineer'>
                                <p>{userData.fullName}</p>
                            </GridItem>
                            <GridItem title='Tracker Sites'>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--small-gap)' }}>
                                        <input type='text' placeholder='Filter sites...' value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)}/>
                                        <select onChange={(e) => {
                                            setSelectedSite(e.target.value);
                                        }}>
                                            <option disabled selected={selectedSite === ''}>Select site</option>
                                            {siteData.filter((site) => site.data.name.toLowerCase().includes(siteFilter.toLowerCase())).map((site, index) => 
                                                <option 
                                                    value={site.id}
                                                    key={index}
                                                >
                                                    {site.data.name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                            </GridItem>
                        </InfoGrid>
                        <ContainerFooter>
                            <SubmitButton text='Link Engineer Home' clickFunc={updateHome} submitting={submitting} disabled={selectedSite.length === 0}/>
                        </ContainerFooter>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default LinkEngineerHome
