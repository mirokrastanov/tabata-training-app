export function genAvatar(fullName) {
    const parsedName = fullName.split(' ').join('+');

    const avatar = `https://ui-avatars.com/api/?name=${parsedName}&bold=true&background=random`;

    return avatar;
};
