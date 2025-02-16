import { Link, useParams } from "react-router-dom";
import { DepartmentResponseData } from "../../../types/department.types";
import { PageRoute } from "../../../types/pageRoute.types";

const Breadcrumb = (props: {
    route: PageRoute,
    department: DepartmentResponseData | undefined,
}) => {
    const params = useParams();

    const replacePathParamsWithValues = (): string => {
        const splitParams = props.route.path.split('/');
        var newPath = '';
        for (var paramIndex = 0; paramIndex < splitParams.length; paramIndex++) {
            const currentParam = splitParams[paramIndex];
            if (currentParam.length > 0) {
                newPath += `/${replaceParamWithValue(currentParam)}`
            }
        }
        return newPath;
    }

    const replaceParamWithValue = (key: string) => {
        if (key.includes(':')) {
            const splitKeys = key.split('/');
            let newValue = key;
            for (let keyIndex = 0; keyIndex < splitKeys.length; keyIndex++) {
                const currentKey = splitKeys[keyIndex];
                const paramName = currentKey.replace(':', '');
                const paramValue = params[paramName];
                if (paramValue) {
                    newValue = newValue.replace(currentKey, paramValue);
                }
            }
            if (newValue.endsWith('/0')) {
                newValue = newValue.substring(0, newValue.length - 2);
            }
            return newValue;
        } 
        return key;
    }

    const isDepartment = props.route.name === ":departmentName";

    return (
        <li>
            {isDepartment ?
                props.department ? <Link 
                    style={{ 
                        "--hex-label-color": `${props.department.data.label_color ? `#${props.department.data.label_color}` : ''}`,
                        "--hex-label-color-bg": `${props.department.data.label_color ? `#${props.department.data.label_color}40` : ''}`,
                        margin: '0 8px'
                    } as React.CSSProperties}
                    to={replacePathParamsWithValues()}
                >
                    {props.department.data.name}
                </Link> : null
                
                :
                <Link 
                    to={replacePathParamsWithValues()}
                >
                    {replaceParamWithValue(props.route.name)}
                </Link>
            }
        </li> 
    )
}

export default Breadcrumb