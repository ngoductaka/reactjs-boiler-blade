const host = process.env.REACT_APP_ENV === 'dev' ? '_ip' : window.location.host.split(":")[0];

export const ENDPOINT = {
    BASE: `http://${host}:5010`,
    BASE_MQTT: `http://${host}:9001/mqtt`,
    REFRESH_TOKEN: `http://${host}:5010/refresh_token`,
    DOWNLOAD: `https://${host}/export/template`,
}