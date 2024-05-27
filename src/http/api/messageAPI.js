import {$host} from "@/http";

export const askGPT = async (text, hid) => {
    const {data} = await $host.post('/message/ask-gpt', {text, hid})
    return data
}

export const getAllMessages = async (chat_id) => {
    const {data} = await $host.get(`/message/all/${chat_id}`)
    return data
}