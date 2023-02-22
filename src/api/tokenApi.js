export default function tokenApi  () {
    const token = localStorage.getItem('token')
    return token
}