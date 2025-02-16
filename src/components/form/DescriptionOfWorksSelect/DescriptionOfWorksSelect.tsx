import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import { DescriptionOfWorksCollectionResponse, DescriptionOfWorksResponseData } from "../../../types/descriptionOfWorks.types";

const DescriptionOfWorksSelect = (props: {
    selectedDescriptionOfWork: DescriptionOfWorksResponseData | undefined,
    setSelectedDescriptionOfWork: Dispatch<SetStateAction<DescriptionOfWorksResponseData | undefined>>,
    required?: boolean,
    departmentID?: number,
    hasSubmitted: boolean
}) => {
    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isDescriptionOfWorksLoading, setIsDescriptionOfWorksLoading] = useState(false);
    const [descriptionOfWorksData, setDescriptionOfWorksData] = useState<DescriptionOfWorksCollectionResponse>();

    useEffect(() => {
        getDescriptionOfWorks();
    }, [searchTerm, props.departmentID])

    const getDescriptionOfWorks = () => {
        getAPI('description_of_works', {
            name_like: searchTerm,
            department_id: props.departmentID ? props.departmentID : undefined,
            is_active: true,
        }, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksCollectionResponse = response.data;
            setDescriptionOfWorksData(descriptionOfWorksData);
        }, setIsDescriptionOfWorksLoading);
    }

    const showRequired = props.selectedDescriptionOfWork === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="subject"
                resourceName="description of works"
                resourceNamePlural="description of works"
                selectedText={props.selectedDescriptionOfWork?.data.name}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={descriptionOfWorksData ? descriptionOfWorksData.data.map(descriptionOfWork => {
                    return {
                        text: descriptionOfWork.data.name,
                        clickFunc: () => props.setSelectedDescriptionOfWork(descriptionOfWork),
                        selected: props.selectedDescriptionOfWork?.id === descriptionOfWork.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Description of works is required`}
                show={showRequired}
            />}
        </>
    )
}

export default DescriptionOfWorksSelect