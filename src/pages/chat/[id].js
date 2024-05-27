import styles from "@/styles/pages/chat.module.css"
import HeightWrapper from "@/components/HeightWrapper";
import Button from "@/components/Button";
import {useEffect, useRef, useState} from "react";
import {askGPT, getAllMessages} from "@/http/api/messageAPI";
import {useRouter} from "next/router";
import {getChatById} from "@/http/api/chatAPI";

function Chat() {

    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState(null)
    const [loadingButton, setLoadingButton] = useState(false)

    const router = useRouter()

    const textarea = useRef(null)
    const messageArea = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {id} = router.query;
                console.log(id)
                const chat_t = await getChatById(id)
                const data = await getAllMessages(Number(chat_t.id))
                setChat(chat_t)
                setMessages(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData().then()
    }, []);

    useEffect(() => {
        if (messages.length !== 0) {
            scrollToBottom()
        }
    }, [messages])

    const onChange = (e) => {
        setText(e.target.value)
        if (textarea) {
            textarea.current.style.height = 'auto';
            textarea.current.style.height = textarea.current.scrollHeight + 'px';
        }
    }

    const goBack = async () => {
        if (chat.type === 'default') {
            await router.push('/chats')
        } else {
            await router.push('/documents')
        }
    }

    const sendMessage = () => {
        setText("")
        if (text) {
            const {id} = router.query;
            setMessages([...messages, {text, role: 'user', id: -1}])
            setLoadingButton(true)
            askGPT(text, id).then(data => {
                let _tmp = messages.filter(el => el.id !== -1)
                _tmp.push(data.question)
                _tmp.push(data.answer)
                setMessages(_tmp)
                setLoadingButton(false)
                scrollToBottom()
            })
        }
    }

    const scrollToBottom = () => {
        const bottom = messageArea.current.scrollHeight - messageArea.current.clientHeight;
        messageArea.current.scrollTo({
            top: bottom,
            behavior: 'smooth'
        })
    }

    const onKeyDownTextarea = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage()
        }
    }

    return (
        <HeightWrapper dir="row">
            <div className={styles.wrap}>
                <div className={styles.chat}>
                    <div className={styles.up_line}>
                        <button
                            onClick={goBack}
                            className={styles.back_btn}
                        >
                            <svg
                                className={styles.back_svg}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                            >
                                <path d="m313-440 196 196q12 12 11.5 28T508-188q-12 11-28 11.5T452-188L188-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l264-264q11-11 27.5-11t28.5 11q12 12 12 28.5T508-715L313-520h447q17 0 28.5 11.5T800-480q0 17-11.5 28.5T760-440H313Z"/>
                            </svg>
                        </button>
                        <span className={styles.filename}>
                            {chat ? chat.name : "Loading..."}
                        </span>
                        {
                            // <Button
                            //     wrapStyle={styles.wrap_analysis}
                            //     btnStyle={styles.btn_analysis}
                            //     text="Анализ судебной практики"
                            // />
                        }
                    </div>
                    <div
                        ref={messageArea}
                        className={styles.messages_area}
                    >
                        <div className={styles.ribbon}>
                            {messages.map(message =>
                                <div className={styles.message}>
                                    <span className={styles.author}>{message.role === 'user' ? 'Вы' : 'GigaChat'}</span>
                                    <span className={styles.message_text}>{message.text}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.input_line}>
                        <div className={styles.textarea_wrapper}>
                            <textarea
                                ref={textarea}
                                className={styles.input_message}
                                placeholder="Введите текст"
                                onChange={(e) => onChange(e)}
                                value={text}
                                rows="1"
                                onKeyDown={(e) => onKeyDownTextarea(e)}
                            >
                            </textarea>
                        </div>
                        <Button
                            text="Отправить"
                            wrapStyle={styles.send_wrap}
                            btnStyle={styles.send_btn}
                            loading={loadingButton}
                            onClick={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </HeightWrapper>
    )
}

export default Chat
