import { initRequest } from "./request"
export const login = (data: object) => {
  return initRequest({
    url:"/load",
    method:"post",
    data:{
      ...data
    }
  })
}

export const signUp = (data: JSON) => {
  return initRequest({
    url:"/signup",
    method:"post",
    data:{
      ...data
    }
  })
}


