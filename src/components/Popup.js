import styles from "@/styles/components/Popup.module.css"
import {CSSTransition} from "react-transition-group";
import classNames from "classnames";

const Popup = ({ visible, setVisible, setIsPractice, clickFileRef }) => {

    const closePopup = () => {
        setVisible(false)
    }

    const clickYes = () => {
        setIsPractice(true)
        closePopup()
        clickFileRef()
    }

    const clickNo = () => {
        setIsPractice(false)
        closePopup()
        clickFileRef()
    }

    return (
        <CSSTransition
            in={visible}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.background}>
                <div className={styles.popup}>
                    <div className={styles.line}>
                        <span className={styles.question}>
                            Вы хотите загрузить судебную практику?
                        </span>
                        <svg
                            onClick={closePopup}
                            className={styles.svg}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                        >
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </div>
                    <div className={styles.under}>
                        <button
                            onClick={clickYes}
                            className={styles.button}
                        >
                            Да
                        </button>
                        <button
                            onClick={clickNo}
                            className={classNames(styles.button, styles.ml)}
                        >
                            Нет
                        </button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Popup;