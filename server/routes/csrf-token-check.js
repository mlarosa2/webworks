module.exports = (token, res) => {
    if (token !== global.csrfToken) {
        res.sendStatus(401);

        return false;
    }

    return true;
};