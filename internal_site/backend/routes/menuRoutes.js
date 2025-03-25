const express = require('express');
const { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const router = express.Router();

router.get('/', getMenu);
router.post('/', addMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;