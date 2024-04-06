import { initRequest } from "./request"

export const getUsers = (data: any) => {
    return initRequest({
        url: "/m_searchuser",
        method: "post",
        data: {
            ...data
        }
    })
}

export const getUserDetail = (data: any) => {
    return initRequest({
        url: "/m_detailuser",
        method: "post",
        data: {
            ...data
        }
    })
}

export const deleteUser = (data: any) => {
    return initRequest({
        url: "/m_deleteuser",
        method: "post",
        data: {
            ...data
        }
    })
}

// ----------------------------------------------------

export const getArticles = (data: any) => {
    return initRequest({
        url: "/m_searcharticle",
        method: "post",
        data: {
            ...data
        }
    })
}


export const deleteArticle = (data: any) => {
    return initRequest({
        url: "/m_deletearticle",
        method: "post",
        data: {
            ...data
        }
    })
}

// --------------------------------------------------

export const getComments = (data: any) => {
    return initRequest({
        url: "/m_searchcomment",
        method: "post",
        data: {
            ...data
        }
    })
}


export const deleteComment = (data: any) => {
    return initRequest({
        url: "/m_deletecomment",
        method: "post",
        data: {
            ...data
        }
    })
}