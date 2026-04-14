// import axios from "axios";

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id) => {
    const baseUrl = import.meta.env.VITE_SONG_API.replace(/\/+$/, '');
    const res = await fetch(`${baseUrl}/?server=${server}&type=${type}&id=${id}`);
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
        ...item,
        url: normalizeMetingAssetUrl(item.url),
        pic: normalizeMetingAssetUrl(item.pic),
        lrc: normalizeMetingAssetUrl(item.lrc),
    }));
}

function normalizeMetingAssetUrl(url) {
    if (!url || typeof url !== 'string') return url;
    return url.replace('https://api.injahow.cn/meting//?', 'https://api.injahow.cn/meting/?');
}

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
    const cParams = ['c', 'd', 'e', 'h', 'i', 'j', 'k']
    const str = cParams.length ? '/?' + cParams.map(t => 'c=' + t).join('&') : ''
    const url1 = 'https://v1.hitokoto.cn' + str, url2 = 'https://international.v1.hitokoto.cn' + str
    let res;
    try {
        res = await fetch(url1)
    } catch (error) {
        res = await fetch(url2)
    }
    return await res.json();
}

/**
 * 天气
 */


// 获取地理位置信息
export const getAdcode = async (key) => {
    try {
        // 尝试多个IP定位API
        // 保留多个 HTTPS 回退源以提高可用性。
        // 旧的 http://ip-api.com/json/?lang=zh-CN 为 HTTP-only，
        // 在 HTTPS 页面中会有 mixed-content 风险，因此不在浏览器端恢复。
        const apis = [
            'https://ipwho.is/',
            'https://ipapi.co/json/',
            'https://api.vore.top/api/IPdata',
        ];

        for (const api of apis) {
            try {
                const response = await fetch(api);
                if (response.ok) {
                    const data = await response.json();
                    // 转换数据格式以兼容旧代码
                    return convertIpData(data);
                }
            } catch (error) {
                console.log(`API ${api} 失败，尝试下一个...`);
                continue;
            }
        }

        // 如果所有API都失败，返回默认数据
        return {
            code: 200,
            ipdata: {
                info1: '未知',
                info2: '未知',
                info3: '未知',
            },
            adcode: {
                a: '101010100', // 北京默认编码
            },
            ipinfo: {
                text: '127.0.0.1',
            },
        };
    } catch (error) {
        console.error('获取地理位置失败:', error);
        return {
            code: 500,
            ipdata: {
                info1: '未知',
                info2: '未知',
                info3: '未知',
            },
            adcode: {
                a: '101010100',
            },
            ipinfo: {
                text: '127.0.0.1',
            },
        };
    }
}

// 转换IP定位数据格式以兼容旧代码
function convertIpData(data) {
    // ipwho.is 格式
    if (data.success && data.city) {
        const cityName = normalizeCityName(data.city, data.region, data.capital);
        return {
            code: 200,
            ipdata: {
                info1: data.country,
                info2: data.region,
                info3: cityName,
            },
            adcode: {
                a: getAdcodeFromCity(cityName) || '101010100',
            },
            ipinfo: {
                text: data.ip || 'unknown',
            },
        };
    }

    // ip-api.com 格式
    if (data.status === 'success' && data.city) {
        return {
            code: 200,
            ipdata: {
                info1: data.country,
                info2: data.regionName,
                info3: data.city,
            },
            adcode: {
                a: getAdcodeFromCity(data.city) || '101010100',
            },
            ipinfo: {
                text: data.query || data.ip || 'unknown',
            },
        };
    }

    // ipapi.co 格式
    if (data.city && data.country_code) {
        const cityName = normalizeCityName(data.city, data.region, data.country_capital);
        return {
            code: 200,
            ipdata: {
                info1: data.country_name,
                info2: data.region,
                info3: cityName,
            },
            adcode: {
                a: getAdcodeFromCity(cityName) || '101010100',
            },
            ipinfo: {
                text: data.ip || 'unknown',
            },
        };
    }

    // 默认格式
    return {
        code: 200,
        ipdata: {
            info1: '中国',
            info2: data.region || '北京',
            info3: data.city || '北京',
        },
        adcode: {
            a: getAdcodeFromCity(data.city) || '101010100',
        },
        ipinfo: {
            text: data.ip || 'unknown',
        },
    };
}

// 简单的城市编码映射（常用城市）
function getAdcodeFromCity(city) {
    const cityMap = {
        '北京': '101010100',
        '上海': '101020100',
        '广州': '101280101',
        '深圳': '101280601',
        '杭州': '101210101',
        '南京': '101190101',
        '成都': '101270101',
        '重庆': '101040100',
        '武汉': '101200101',
        '西安': '101110101',
        '天津': '101030100',
        '苏州': '101190401',
        'Beijing': '101010100',
        'Shanghai': '101020100',
        'Guangzhou': '101280101',
        'Shenzhen': '101280601',
        'Hangzhou': '101210101',
        'Nanjing': '101190101',
        'Chengdu': '101270101',
        'Chongqing': '101040100',
        'Wuhan': '101200101',
        "Xi'an": '101110101',
        'Tianjin': '101030100',
        'Suzhou': '101190401',
    };
    return cityMap[city];
}

// 将心知天气编码转换为高德编码
function convertToGaodeCity(cityCode) {
    const gaodeCityMap = {
        '101010100': '110000', // 北京
        '101020100': '310000', // 上海
        '101280101': '440100', // 广州
        '101280601': '440300', // 深圳
        '101210101': '330100', // 杭州
        '101190101': '320100', // 南京
        '101270101': '510100', // 成都
        '101040100': '500000', // 重庆
        '101200101': '420100', // 武汉
        '101110101': '610100', // 西安
        '101030100': '120000', // 天津
        '101190401': '320500', // 苏州
    };
    return gaodeCityMap[cityCode] || '110000'; // 默认北京
}

// 获取天气信息
export const getWeather = async (key, city) => {
    try {
        // 将心知天气编码转换为高德编码
        const gaodeCity = convertToGaodeCity(city);
        const response = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${gaodeCity}`);
        if (response.ok) {
            const data = await response.json();
            return convertWeatherData(data);
        }

        // 如果所有API都失败，返回默认数据
        return {
            status: false,
            lives: [{
                weather: '未知',
                temperature: '0',
                winddirection: '未知',
                windpower: '0',
            }],
        };
    } catch (error) {
        console.error('获取天气失败:', error);
        return {
            status: false,
            lives: [{
                weather: '未知',
                temperature: '0',
                winddirection: '未知',
                windpower: '0',
            }],
        };
    }
}

// 转换天气数据格式以兼容旧代码
function convertWeatherData(data) {
    // 高德API格式
    if (data.status === '1' && Array.isArray(data.lives) && data.lives.length > 0) {
        return {
            status: true,
            lives: data.lives,
        };
    }

    // 默认格式
    return {
        status: false,
        lives: [{
            weather: '未知',
            temperature: '0',
            winddirection: '未知',
            windpower: '0',
        }],
    };
}

function normalizeCityName(city, region, capital) {
    const candidates = [city, region, capital].filter(Boolean);
    return candidates.find((name) => getAdcodeFromCity(name)) || city || region || capital || 'Beijing';
}
