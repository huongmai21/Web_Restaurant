// internal_site/backend/controllers/menuController.js
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Thêm module fs để xóa file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

let menuItems = [
  { id: 1, name: 'Gỏi cuốn', price: 50000, description: 'Tôm, thịt, rau sống', category: 'appetizer', image: 'goi-cuon.jpg' },
  { id: 2, name: 'Phở bò', price: 80000, description: 'Phở bò truyền thống', category: 'main_dish', image: 'pho-bo.jpg' },
];

exports.getMenu = (req, res) => {
  res.json(menuItems);
};

exports.addMenuItem = [
  upload.single('image'),
  (req, res) => {
    const newItem = {
      id: menuItems.length + 1,
      name: req.body.name,
      price: parseInt(req.body.price),
      description: req.body.description,
      category: req.body.category,
      image: req.file ? req.file.filename : null,
    };
    menuItems.push(newItem);
    res.status(201).json(newItem);
  },
];

exports.updateMenuItem = [
  upload.single('image'),
  (req, res) => {
    const id = parseInt(req.params.id);
    const item = menuItems.find(i => i.id === id);
    if (!item) return res.status(404).json({ message: 'Không tìm thấy món ăn' });

    // Xóa ảnh cũ nếu có ảnh mới
    if (req.file && item.image) {
      const oldImagePath = path.join(__dirname, '../uploads', item.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error('Lỗi khi xóa ảnh cũ:', err);
      });
    }

    item.name = req.body.name || item.name;
    item.price = req.body.price ? parseInt(req.body.price) : item.price;
    item.description = req.body.description || item.description;
    item.category = req.body.category || item.category;
    if (req.file) item.image = req.file.filename; // Cập nhật ảnh mới
    res.json(item);
  },
];

exports.deleteMenuItem = (req, res) => {
  const id = parseInt(req.params.id);
  menuItems = menuItems.filter(i => i.id !== id);
  res.json({ message: 'Đã xóa món ăn' });
};