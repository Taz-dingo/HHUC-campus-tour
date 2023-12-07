import { initRequest } from "./request"
export const getDetailArticle = (data: any) => {
    return initRequest({
        url: "/detailarticle",
        method: "post",
        data: {
            ...data
        }
    })
}

export const getArticleComment = (data: any) => {
    return initRequest({
        url: "/showcomments",
        method: "post",
        data: {
            ...data
        }
    })
}

//api接口写成一个文件