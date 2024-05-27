import styles from "@/styles/components/Button.module.css"
import global from "@/styles/global.module.css"
import classNames from "classnames";

const Button = (
    {
        loading = false,
        text = "Button",
        wrapStyle,
        btnStyle,
        onClick
    }) => {
    return (
        <div className={classNames(styles.wrapper, wrapStyle)}>
            {loading ?
                <svg
                    className={global.spinner}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path
                        d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/>
                </svg>
                :
                <button
                    className={classNames(styles.button, btnStyle)}
                    onClick={onClick}
                >
                    {text}
                </button>
            }
        </div>
    );
};

export default Button;
