function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude
	latitude = latitude

	return {
		longitude: longitude.toString(),
		latitude: latitude.toString()
	}
}
function getImgUrl(url){
	if(url.search('http')==-1){url="https://xin.yiyunoto.com"+url}
	return url
}
function convertTimeToFormat(timeStamp) {
	
        var curTime =Math.ceil((new Date()).getTime() /1000);
        var time = curTime - timeStamp;


        if (time < 60 && time >= 0) {
            return "刚刚";
        } else if (time >= 60 && time < 3600) {
            return Math.ceil(time / 60) + "分钟前";
        } else if (time >= 3600 && time < 3600 * 24) {
            return Math.ceil(time / 3600) + "小时前";
        } else if (time >= 3600 * 24 && time < 3600 * 24 * 30) {
            return Math.ceil(time / 3600 / 24) + "天前";
        } else if (time >= 3600 * 24 * 30 && time < 3600 * 24 * 30 * 12) {
            return Math.ceil(time / 3600 / 24 / 30) + "个月前";
        } else if (time >= 3600 * 24 * 30 * 12) {
            return Math.ceil(time / 3600 / 24 / 30 / 12) + "年前";
        } else {
            return "刚刚";
        }
    }

module.exports = {
	getImgUrl:getImgUrl,
	formatLocation: formatLocation,
	convertTimeToFormat:convertTimeToFormat
}