var security = {};

module.exports = security;

var api_key = "davvicfra";

security.checkApiKeyFunction = function(req, res) {

    if (!req.query.apikey) {
        console.error("WARNING: No apikey");
        res.sendStatus(401);
        return false;
    }
    if (req.query.apikey !== api_key) {
        console.error("WARNING: Incorrect apikey was used, churrita!");
        res.sendStatus(403);
        return false;
    }
    return true;
};

