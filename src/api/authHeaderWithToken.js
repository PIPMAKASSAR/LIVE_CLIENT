import tokenApi from "./tokenApi"
export default function authHeaderWithToken () {
    return {
        "token" : tokenApi(),
        "Access-Control-Allow-Origin": "*",
    }
}



