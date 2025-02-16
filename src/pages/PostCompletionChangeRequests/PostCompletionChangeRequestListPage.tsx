import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import { PostCompletionChangeRequestCollectionResponse } from "../../types/postCompletionChangeRequets.types";
import getAPI from "../../utils/getAPI";
import PostCompletionChangeRequestList from "./components/PostCompletionChangeRequestList";
import PostCompletionChangeRequestsSearchHeader from "./components/PostCompletionChangeRequestSearchHeader";
import getPostCompletionChangeRequestSearchParams from "./utils/getPostCompletionChangerRequestsSearchParams";

const PostCompletionChangeRequestListPage = () => {
    const { departmentName } = useParams();
    const [searchParams] = useSearchParams();

    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isRequestsLoading, setIsRequestsLoading] = useState(true);
    const [postCompletionChangeRequestsData, setPostCompletionChangeRequestsData] = useState<PostCompletionChangeRequestCollectionResponse>();

    // Search Parameters 
    const postCompletionChangeRequestSearchParams = getPostCompletionChangeRequestSearchParams(searchParams);

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        getPostCompletionChangeRequests()
    }, [departmentData, JSON.stringify(postCompletionChangeRequestSearchParams)])


    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData)
        }, setIsDepartmentLoading)
    }

    const getPostCompletionChangeRequests = () => {
        if (departmentData === undefined) return;
        getAPI('post_completion_change_requests', {
            ...postCompletionChangeRequestSearchParams,
            department_ids: [departmentData.id]
        }, (response: any) => {
            const postCompletionChangeRequestsData: PostCompletionChangeRequestCollectionResponse = response.data;
            setPostCompletionChangeRequestsData(postCompletionChangeRequestsData);
        }, setIsRequestsLoading)
    }

    return (
        <>
            <OuterContainer
                title='Post-completion Change Requests'
                description="Accept or deny engineer post-completion change requests."
                maxWidth={1200}
                noBorder
            >
                <PostCompletionChangeRequestsSearchHeader/>
                <PostCompletionChangeRequestList 
                    isPostCompletionChangeRequestsLoading={isRequestsLoading} 
                    postCompletionChangeRequests={postCompletionChangeRequestsData} 
                    departmentName={departmentName} 
                    perPage={postCompletionChangeRequestSearchParams.perPage}
                />
            </OuterContainer>
        </>
    )
}

export default PostCompletionChangeRequestListPage