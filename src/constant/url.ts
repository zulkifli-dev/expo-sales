// export const BASE_URL = 'http://dev-api-siwa.rsudsiwa-kabwajo.com/api'
// export const BASE_URL = 'https://siprocantik.jne-online.my.id/api'
// export const BASE_URL = 'https://rsudsiwa.simkeskhanza.com/sipro-cantik/api'

// const IP_HOSTPOT = 'http://172.20.10.3:1337/api'
const IP_HOSTPOT = 'http://172.20.10.3:1337/api'
const IP_WARKOP_OGI = 'http://10.153.50.185:1337/api'


export function BASE_URL(url: string) {
    return `${IP_HOSTPOT}${url}`
}