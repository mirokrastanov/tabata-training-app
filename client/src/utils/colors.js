export const bgColors = [
    "#0089DF", "#FF0055",
    "#ff4d4d", "#e60073", "#cc0077", "#99004d",
    "#800000", "#b30086", "#ff3399", "#990066",
    "#800080", "#cc00cc", "#003399", "#0040ff",
    "#3366ff", "#008080", "#00cccc", "#00b3b3",
    "#0b3d91", "#0d98ba", "#2e8b57", "#556b2f"
];

export const bgColorsAltered = [
    "#0089DF", // Bright blue
    "#FF0055", // Bright pinkish red
    "#003399", // Dark blue
    "#ff3399", // Bright pink
    "#0b3d91", // Navy blue
    "#cc00cc", // Bright magenta
    "#008080", // Teal
    "#ff4d4d", // Red
    "#00cccc", // Cyan
    "#990066", // Deep magenta
    "#00b3b3", // Aqua
    "#e60073", // Vivid pink
    "#3366ff", // Light blue
    "#800000", // Dark red
    "#0040ff", // Bright blue
    "#b30086", // Deep pink
    "#2e8b57", // Sea green
    "#800080", // Purple
    "#cc0077", // Dark pink
    "#556b2f", // Dark olive green
    "#0d98ba"  // Light teal
];


export const genColor = (i) => {
    const colors = bgColors;
    return colors[i % colors.length];
};

export const genAlteredColor = (i) => {
    const colors = bgColorsAltered;
    return colors[i % colors.length];
};

export const hexColorGenerator = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};