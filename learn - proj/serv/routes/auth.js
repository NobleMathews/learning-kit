const express = require('express')

const { signup, login } = require('../controllers/auth');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.put('/register', signup)
router.post('/login', login)
router.post('/secret', isAuth, (req, res) => {
    res.send("heyyy u paassed")
})



module.exports = router