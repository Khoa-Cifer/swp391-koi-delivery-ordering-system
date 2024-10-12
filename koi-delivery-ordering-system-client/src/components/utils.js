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