import styles from "./MainWrapper.module.css";
import Header from "../Header/Header"
import { Helmet } from "react-helmet";
import { ReactNode } from "react";

function MainWrapper(props: {
    title: string,
    saveFunc?: () => void,
    showLogout?: boolean,
    children: ReactNode,
}) {
    return (
        <div id={styles['main_wrapper']}>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
            <Header title={props.title} saveFunc={props.saveFunc} showLogout={props.showLogout}/>
            <div id={styles['main_content']}>
                {props.children}
            </div>
        </div>
    )
}

export default MainWrapper