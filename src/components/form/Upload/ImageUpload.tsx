import { Dispatch, SetStateAction, useState } from "react"
import styles from './ImageUpload.module.css'

const ImageUpload = (props: {
    setter: Dispatch<SetStateAction<FileList | undefined>>,
    is_multiple?: boolean
}) => {
    const [files, setFiles] = useState<FileList>();

    const fileName = files ? files[0].name : undefined;
    return (
        <div className={styles['dropzone-wrapper']}>
            <div className={styles['dropzone-content']}>
                {!fileName ? 
                    <div className={styles['placeholder-wrapper']}>
                        <button>
                            <span className="material-icons">upload</span>
                            Select File
                        </button>
                        <span className={styles['placeholder-text']}>Or drag and drop files here</span>
                    </div>
                        : 
                    <span>{fileName}</span>
                }
            </div>
            <input 
                type="file" 
                name="upload" 
                onChange={(e) => {
                    if (e.target.files) {
                        props.setter(e.target.files);
                        setFiles(e.target.files);
                    }
                }}
                multiple={props.is_multiple}
            />   
        </div>
    )
}

export default ImageUpload