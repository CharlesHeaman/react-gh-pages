import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import SideNav from "../SideNav/SideNav";
import Header from "../Structure/Header/Header";
import styles from "./PageLayout.module.css";

const PageLayout = (props: {
    children: ReactNode,
}) => {
    const location = useLocation();
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        !(location.pathname === "/login" || location.pathname.endsWith("/generate")) ? <div className={styles['main-wrapper']}>
            <Header 
                toggleNav={() => setIsNavOpen(!isNavOpen)}
            >
                {/* <Routes>
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
                </Routes> */}
            </Header>
            <div className={`
                ${styles['body-wrapper']}
                ${isNavOpen ? styles['nav-open'] : ''}
            `}>
                <SideNav
                    isOpen={isNavOpen}
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