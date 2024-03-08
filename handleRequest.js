const express = require('express');
const router = new express.Router();
let axios = require('axios');

router.post('/', async function(req, res, next) {
    try {
        const developers = req.body.developers;
        const results = [];
        for (const developer of developers) {
            const response = await axios.get(`https://api.github.com/users/${developer}`);
            const { name, bio } = response.data;
            if (name) { results.push({ name, bio: bio || "N/A" }); }
        }
        return res.json(results);
    }
    catch (err) { return next(err); }
});
module.exports = router;