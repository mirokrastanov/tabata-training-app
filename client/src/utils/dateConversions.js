// let test = "2024-06-28T14:45:51.538Z";

export const getDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return formatter.format(dateObject);
}
// console.log(getDdMmYyyy(test));  // Aug 31, 2024


export const getTime = (dateString) => {
    const dateObject = new Date(dateString);
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return timeFormatter.format(dateObject).replace(' ', '');
};
// console.log(getHhMmSs(test));  // 2:41PM


export const getZone = (dateString) => {
    const dateObject = new Date(dateString);

    // GMT offset
    const offsetFormatter = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' });
    const offsetParts = offsetFormatter.formatToParts(dateObject);
    const gmtOffset = offsetParts.find(part => part.type === 'timeZoneName')?.value;

    // Timezone Abbreviation
    const nameFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'full' });
    const nameParts = nameFormatter.formatToParts(dateObject);
    const timezoneName = nameParts.find(part => part.type === 'timeZoneName')?.value;

    // Manually derive an abbreviation (if not directly available)
    const timezoneAbbreviation = timezoneName.split(' ').map(word => word[0]).join('').toUpperCase();

    return {
        offset: gmtOffset,
        abbr: timezoneAbbreviation,
        str: `${timezoneAbbreviation}/${gmtOffset}`,
    };
}