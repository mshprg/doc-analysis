import HeightWrapper from "@/components/HeightWrapper";
import styles from "@/styles/pages/login.module.css"
import Input from "@/components/Input";
import {useState} from "react";
import Button from "@/components/Button";

function Login() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const updateLogin = (value) => {
        setLogin(value)
    }

    const updatePassword = (value) => {
        setPassword(value)
    }

    return (
        <HeightWrapper dir="row">
            <div className={styles.wrap}>
                <h1 className={styles.welcome}>
                    Добро пожаловать!
                </h1>
                <Input
                    wrapStyle={styles.mb_input}
                    text={login}
                    setText={updateLogin}
                    placeholder={"Введите логин"}
                />
                <Input
                    text={password}
                    setText={updatePassword}
                    placeholder={"Введите пароль"}
                    changeVisibility={true}
                    defType="password"
                />
                <Button
                    text="Войти"
                    wrapStyle={styles.login_btn}
                />
            </div>
        </HeightWrapper>
    );
}

export default Login;