export default function authHeader(token) {
    return {
        Authorization: 'Bearer ' + token
    }
}