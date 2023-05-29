export default async function request(url, options={}) {
    const baseURL = 'http://127.0.0.1:5500/src/data'

    try {
        const fullUrl = `${baseURL}${url}`;
        const res = await fetch(fullUrl, options);

        if(res.ok) {
            const json = await res.json();
            return json;
        }
        throw new Error('API 통신 실패');
    } catch(err) {
        alert(e.message);
    }
}