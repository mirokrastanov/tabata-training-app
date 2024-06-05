export const signup = (req, res) => {
    res.send('Signing up...');
    console.log('Signup user');
};

export const login = (req, res) => {
    res.send('Logging in...');
    console.log('Login user');
};

export const logout = (req, res) => {
    res.send('Logging out...');
    console.log('Logout user');
};
