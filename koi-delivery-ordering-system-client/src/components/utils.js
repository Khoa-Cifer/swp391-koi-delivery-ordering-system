export default function dateTimeConvert(dateTimeString) {
    const date = new Date(dateTimeString);

    // Format the date part
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format the time part
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    let formattedDateTime;
    // Combine date and time
    if (hours !== "00") {
        formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    } else {
        formattedDateTime = `${year}-${month}-${day}`;
    }
    return formattedDateTime;
}

export function getToday() {
    return new Date();
}

export function getOneWeekFromToday() {
    return new Date(getToday().setDate(getToday().getDate() + 7));
}

export function getOneDayBeforeToday() {
    return new Date(getToday().setDate(getToday().getDate() - 1));
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371.0;

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    const dlat = lat2Rad - lat1Rad;
    const dlon = lon2Rad - lon1Rad;

    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dlon / 2) * Math.sin(dlon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const result = R * c;

    return result;
}
