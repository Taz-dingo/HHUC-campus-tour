import request from "@/axios";
import type { AxiosRequestConfig } from "axios";
let myRequest = (function () {
    let mem = {};//Map对象更合适
    let hasRequest: any[] = [];
    return function (config: AxiosRequestConfig<any>) {
        let url = config.url
        if (mem[url]) {
            return Promise.resolve(mem[url]);
        } else {
            if (hasRequest.indexOf(url) !== -1) {
                return Promise.reject({ mes: "请求已经提交" })
            }
            hasRequest.push(url);
            return request({
                ...config
            }).then((res) => {

                hasRequest = hasRequest.filter((item) => {
                    if (item !== url) {
                        return item;
                    }
                })
                mem[url] = res;
                return res
            })
        }

    }
})()
export {
    myRequest as request,
    request as initRequest
}
