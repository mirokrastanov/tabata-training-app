export const bgColors = [
    "#0089DF", "#FF0055",
    "#ff4d4d", "#e60073", "#cc0077", "#99004d",
    "#800000", "#b30086", "#ff3399", "#990066",
    "#800080", "#cc00cc", "#003399", "#0040ff",
    "#3366ff", "#008080", "#00cccc", "#00b3b3",
    "#0b3d91", "#0d98ba", "#2e8b57", "#556b2f"
];

export const genColor = (i) => {
    const colors = bgColors;
    return colors[i % colors.length];
};