import {$host} from "@/http";

export const createDocumentChat = async (formData) => {
    const {data} = await $host.post('/chat/create/document', formData)
    return data
}

export const createDefaultChat = async (client_id) => {
    const {data} = await $host.post('/chat/create/default', {client_id})
    return data
}

export const getAllDocuments = async (user_id) => {
    const {data} = await $host.get(`/chat/documents/${user_id}`)
    return data
}

export const getAllChats = async (user_id) => {
    const {data} = await $host.get(`/chat/chats/${user_id}`)
    return data
}

export const getChatById = async (hid) => {
    const {data} = await $host.get(`/chat/get/${hid}`)
    return data
}