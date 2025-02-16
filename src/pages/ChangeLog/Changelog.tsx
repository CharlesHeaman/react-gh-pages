import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer"
import NoneFound from "../../components/ui/General/NoneFound/NoneFound"
import PaginationNavigation from "../../components/ui/PaginationNavigation/PaginationNavigation"
import { ChangelogCollectionResponse } from "../../types/changelog.types"
import getAPI from "../../utils/getAPI"
import Change from "./Change/Change"
import ChangelogSearchHeader from "./ChangelogSearchHeader"
import ChangelogSkeleton from "./ChangelogSkeleton/ChangelogSkeleton"
import getChangeSearchParams from "./utils/getChangeSearchParams"

const Changelog = () => {
    const [searchParams] = useSearchParams();
    const [isLoadingChangelogs, setIsLoadingChangelogs] = useState(true);
    const [changelogData, setChangelogData] = useState<ChangelogCollectionResponse>();

    const changeSearchParams = getChangeSearchParams(searchParams);

    useEffect(() => {
        getChangelogs();
    }, [JSON.stringify(changeSearchParams)])

    const getChangelogs = () => {
        getAPI('changelogs', changeSearchParams, (response: any) => {
            const changelogData: ChangelogCollectionResponse = response.data;
            setChangelogData(changelogData)
        }, setIsLoadingChangelogs)
    }

    return (
        <OuterContainer
            title='Changelog'
            description="View changes made to the system."
            maxWidth={700}
            noBorder
        >
            <div className="page-grid no-side">
                <div className="page-main">
                    <ChangelogSearchHeader/>
                    {(!isLoadingChangelogs && changelogData && changelogData.data) ? 
                        changelogData.total_count > 0 ?
                            changelogData.data.map((changelog, index) => 
                                <Change 
                                    date={changelog.data.date}
                                    type={changelog.data.type} 
                                    title={changelog.data.title}
                                    text={changelog.data.text}
                                    system={changelog.data.system}
                                    key={index}
                                />
                            ) :
                            <NoneFound
                                iconFont="list"
                                text="No changelogs found."
                                noPadding
                            />
                        : 
                        <ChangelogSkeleton perPage={changeSearchParams.perPage}/>
                    }
                </div>
            </div>
            {(!isLoadingChangelogs && changelogData && changelogData.data) && <PaginationNavigation
                data={changelogData.data}
                totalCount={changelogData.total_count}
                perPage={changelogData.pages.per_page}
                resourceName="changes"
                prefix="change"
            />}
        </OuterContainer>
    )
}

export default Changelog