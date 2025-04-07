export default function getDateWithHour() {
    const timeZone = "Europe/Istanbul";
    const date = new Date();

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timeZone,
    }).format(date);

    return formattedDate;
}
