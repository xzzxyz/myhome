// import axios from "axios";

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id) => {
    const res = await fetch(`${import.meta.env.VITE_SONG_API}/?server=${server}&type=${type}&id=${id}`);
    return await res.json();
}

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
    const cParams = ['c', 'd', 'e', 'h', 'i', 'j', 'k']
    const str = cParams.length ? '/?' + cParams.map(t => 'c=' + t).join('&') : ''
    const url1 = 'https://v1.hitokoto.cn' + str, url2 = 'https://international.v1.hitokoto.cn' + str
    try {
        return fetch(url1)
            .then(res => res.json())
    } catch (error) {
        return fetch(url2)
            .then(res => res.json())
    }
}
// export const getHitokoto = async () => {
//     const cParams = ['c', 'd', 'e', 'h', 'i', 'j', 'k']
//     const str = cParams.length ? '/?' + cParams.map(t => 'c=' + t).join('&') : ''
//     const res = await fetch('https://v1.hitokoto.cn' + str)
//     // const res = await fetch("https://v1.hitokoto.cn");
//     return await res.json();
// }

/**
 * 天气
 */


// 获取高德地理位置信息
export const getAdcode = async (key) => {
    const res = await fetch(`https://restapi.amap.com/v3/ip?key=ab4abf8c94666a7f74625623cd1202fb`);
    return await res.json();
}

// 获取高德地理天气信息
export const getWeather = async (key, city) => {
    const res = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=ab4abf8c94666a7f74625623cd1202fb&city=621222`);
    return await res.json();
}