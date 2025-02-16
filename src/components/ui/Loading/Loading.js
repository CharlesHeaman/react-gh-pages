import styles from './Loading.module.css'

function Loading(props) {
  return (
    <div id={styles["container"]}>
      <div id={styles["ball-container"]}>
        <div id={styles["ball-1"]} className={styles['ball']}></div>
        <div id={styles["ball-2"]} className={styles['ball']}></div>
        <div id={styles["ball-3"]} className={styles['ball']}></div>
      </div>
      <span>{props.text}</span>
    </div>
  )
}

export default Loading