import {useRouter} from "next/router";
import Cookies from "universal-cookie";
import {createChat, createDefaultChat, getAllChats, getAllDocuments} from "@/http/api/chatAPI";
import Popup from "@/components/Popup";
import HeightWrapper from "@/components/HeightWrapper";
import styles from "@/styles/pages/documents.module.css";
import global from "@/styles/global.module.css";
import Button from "@/components/Button";
import classNames from "classnames";
import {useEffect, useRef, useState} from "react";

function Chats() {
    const router = useRouter()

    const cookies = new Cookies()

    const [loading, setLoading] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)

    const [chats, setChats] = useState([])
    const initHeight = '60vh'
    const [listHeight, setListHeight] = useState(initHeight)

    const listRef = useRef(null)
    const itemRef = useRef(null)

    useEffect(() => {
        if (listRef && itemRef && chats.length !== 0 && listHeight === initHeight) {
            const listHeight = listRef.current.getBoundingClientRect().height;
            const itemHeight = itemRef.current.getBoundingClientRect().height;
            let count = Math.trunc(listHeight / itemHeight)
            if (count < 1) count = 1
            setListHeight(count * itemHeight + 5)
        }
    }, [listRef, itemRef, chats]);

    useEffect(() => {
        const user_id = Number(cookies.get('user_id'))
        setChats([])
        setLoading(false)
        getAllChats(user_id).then(data => {
            data.sort((a, b) => b.last_message.created_at - a.last_message.created_at);
            setChats(data)
            setLoading(false)
        }).catch(error => console.log(error))
    }, []);

    const handleButtonClick = async () => {
        setLoadingButton(true)
        const user_id = cookies.get('user_id')

        const res = await createDefaultChat(user_id)

        const data = res.response

        data.sort((a, b) => b.last_message.created_at - a.last_message.created_at);

        setChats(data)
        setLoadingButton(false)

        toChat(res.chat).then()
    };

    const toChat = async (chat) => {
        await router.push(`/chat/${chat.hid}`)
    }

    const toDocuments = async () => {
        await router.push(`/documents`)
    }

    return (
        <>
            <HeightWrapper dir="row">
                <div className={styles.wrap}>
                    <h2 className={styles.h2_t}>Ваши чаты</h2>
                    <div className={styles.list_wrap}>
                        <div
                            className={styles.list}
                            ref={listRef}
                            style={loading || chats.length === 0 ?
                                {alignItems: 'center', justifyContent: 'center', display: 'flex'}
                                :
                                {height: listHeight}
                            }
                        >
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
                                <>
                                    {chats.length === 0 ?
                                        <>
                                            <span className={styles.empty}>У вас пока нет загруженных документов</span>
                                        </>
                                        :
                                        <>
                                            {chats.map(obj =>
                                                <div ref={itemRef}>
                                                    <div
                                                        className={styles.item + ' ' + (obj.chat.id === chats.at(-1).chat.id && styles.lst_item)}
                                                        onClick={() => toChat(obj.chat)}
                                                    >
                                                        <h3 className={styles.head_item}>
                                                            {obj.chat.name}
                                                        </h3>
                                                        <p className={styles.last_message}>
                                                            {obj.last_message.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className={styles.btn_line}>
                        <Button
                            text="Новый чат"
                            wrapStyle={styles.new_doc_btn}
                            btnStyle={styles.btn_font}
                            onClick={handleButtonClick}
                            loading={loadingButton}
                        />
                        <Button
                            text="Анализ документов"
                            wrapStyle={classNames(styles.new_doc_btn, styles.ml)}
                            btnStyle={styles.btn_font}
                            onClick={toDocuments}
                        />
                    </div>
                </div>
            </HeightWrapper>
        </>
    )
}

export default Chats