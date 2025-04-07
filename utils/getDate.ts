export default function getDate() {
    const timeZone = "Europe/Istanbul";
    const date = new Date();

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: timeZone,
    }).format(date);

    return formattedDate;
}
