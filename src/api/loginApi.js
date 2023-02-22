import instance from "./config";

export default async function login(payload) {
    const username = payload.username
    const password = payload.password
    try{
        const result = await instance({
            method: 'post',
            url:'/auth_login',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data:{
                username: username,
                password: password,
                passcode : "CyberCode"
            }
        })
        if(result.data.status) {
            const user = {
                uuid: result.data.uuid,
                username: result.data.username,
                groupId: result.data["group_id"],
                namaGroup: result.data["nama_group"]
            }
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('user', user)
        }
        return result.data
    }
    catch(error) {
        throw error
    }
}