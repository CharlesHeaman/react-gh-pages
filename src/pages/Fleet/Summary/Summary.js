import { useEffect, useState } from "react";
import MainWrapper from "../../../components/ui/Structure/MainWrapper/MainWrapper";
import TableSkeleton from "../../../components/ui/General/TableSkeleton/TableSkeleton";
import handleError from "../../../utils/handleError";
import { get } from "../../../utils/Requests";
import Map from "./Map/Map";
import SnapShots from "./SnapShots/SnapShots";
import styles from './Summary.module.css'

function Summary(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [snapShotData, setSnapShotData] = useState([]);
    const [siteData, setSiteData] = useState([])
    const [currentVehicleID, setCurrentVehicleID] = useState(0)

    useEffect(() => {
        getVehicleSnapshot();
        getSites();
        const intervalID = setInterval(() => {
            getVehicleSnapshot();
        }, 60 * 1000);
        return(() => {
            clearInterval(intervalID)
        })
    }, [])

    function getVehicleSnapshot() {
        get(`/api/tracker/getSnapshots`, {}, getVehicleSnapshotResponse, (error) => handleError(error, props.addNotification));
    }

    function getVehicleSnapshotResponse(response) {
        setSnapShotData(response.data);
        setIsLoading(false);
    }

    function getSites() {
        get(`/api/tracker/getSites`, {}, getSitesResponse, (error) => handleError(error, props.addNotification));
    }

    function getSitesResponse(response) {
        setSiteData(response.data);
    }

    return (
        <MainWrapper title='Fleet Summary' hideNav>
            <div className={styles['page-wrapper']}>
                <div className={styles['snapshot-wrapper']}>
                    {!isLoading ?
                        <SnapShots
                            snapShotData={snapShotData}
                            siteData={siteData}
                            currentVehicleID={currentVehicleID}
                            setCurrentVehicleID={setCurrentVehicleID}
                        /> :
                        <TableSkeleton
                            rowCount={20}
                        />
                    }
                </div>
                <div className={styles['map-wrapper']}>
                    <Map
                        snapShotData={snapShotData}
                        siteData={siteData}
                        currentVehicleID={currentVehicleID}
                        setCurrentVehicleID={setCurrentVehicleID}
                    />
                </div>
            </div>
        </MainWrapper>
    )
}

export default Summary
