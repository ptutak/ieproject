
export default function requestJSON(route,method='GET',body=null,server='http://localhost:3001') {
    return fetch(server+route,{
        method:method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    })
}