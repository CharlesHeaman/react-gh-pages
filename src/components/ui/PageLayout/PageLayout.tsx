import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import { DepartmentResponseData } from "../../../types/department.types";
import getAPI from "../../../utils/getAPI";
import SideNav from "../SideNav/SideNav";
import Header from "../Structure/Header/Header";
import Breadcrumb from "./Breadcrumb";
import styles from "./PageLayout.module.css";

const PageLayout = (props: {
    children: ReactNode,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [department, setDepartment] = useState<DepartmentResponseData>();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const currentDepartmentID = Cookies.get("department_id");

    useEffect(() => {
        !(location.pathname === "/login") && currentDepartmentID && getDepartment(parseInt(currentDepartmentID));
    }, [currentDepartmentID]);

    useEffect(() => {
        if (location.pathname === "/" && department) {
            navigate(department.data.name);
        }
    }, [location.pathname]);

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartment(departmentData);
        }, setIsDepartmentLoading);
    }

    return (
        !(location.pathname === "/login" || location.pathname.endsWith("/generate")) ? <div className={styles['main-wrapper']}>
            <Header 
                toggleNav={() => setIsNavOpen(!isNavOpen)}
            >
                <Routes>
                    {routes.map((topRoute, topIndex) => (
                        <Route 
                            path={topRoute.path} 
                            element={<>
                                {routes.filter(checkingRoute => topRoute.path.includes(checkingRoute.path) && checkingRoute.name !== "Dashboard").map((currentRoute, currentIndex) => <>
                                    {currentIndex > 0 && <span className="material-icons">chevron_right</span>}
                                    <Breadcrumb
                                        route={currentRoute}
                                        department={department}
                                    />
                                </>)}
                            </>}
                            key={topIndex}
                        />
                    ))}
                </Routes>
            </Header>
            <div className={`
                ${styles['body-wrapper']}
                ${isNavOpen ? styles['nav-open'] : ''}
            `}>
                <SideNav
                    isOpen={isNavOpen}
                    department={department}
                    setDepartment={setDepartment}
                />
                <div className={styles['body-content']}>
                    {props.children}
                </div>
            </div>
        </div> 
        :
        <div>
            {props.children}
        </div>
    )
}

export default PageLayout