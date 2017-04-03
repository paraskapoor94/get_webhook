exports.getWebhook = getWebhook;

function getWebhook(req, res) {
    console.log(res.body);
    res.send(req.body);
}