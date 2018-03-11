module.exports = (token, res) => {
    if (token !== global.csrfToken) {
        res.sendStatus(301);

        return false;
    }

    return true;
};