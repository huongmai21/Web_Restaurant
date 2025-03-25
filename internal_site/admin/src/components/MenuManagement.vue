<!-- internal_site/admin/src/components/MenuManagement.vue -->
<template>
  <div class="menu-management">
    <h1>Quản lý Menu</h1>
    <form @submit.prevent="addItem" enctype="multipart/form-data" class="add-form">
      <input v-model="newItem.name" placeholder="Tên món" required />
      <input v-model.number="newItem.price" type="number" placeholder="Giá (VND)" required />
      <input v-model="newItem.description" placeholder="Mô tả" required />
      <select v-model="newItem.category" required>
        <option value="appetizer">Khai vị</option>
        <option value="main_dish">Món chính</option>
        <option value="side_dish">Món ăn kèm</option>
        <option value="regional_specialty">Đặc sản vùng miền</option>
        <option value="vegetarian">Món chay</option>
        <option value="dessert">Tráng miệng</option>
        <option value="beverage">Đồ uống</option>
      </select>
      <input type="file" @change="handleFileUpload" accept="image/*" required />
      <img v-if="newItem.image" :src="previewNewImageUrl" class="preview-image" />
      <button type="submit">Thêm món</button>
    </form>

    <ul>
      <li v-for="item in menuItems" :key="item.id">
        <span>{{ item.name }} - {{ formatPrice(item.price) }} VND - {{ item.category }}</span>
        <img :src="getImageUrl(item.image)" :alt="item.name" class="preview-image" />
        <button @click="openEditPopup(item)">Sửa</button>
        <button @click="deleteItem(item.id)">Xóa</button>
      </li>
    </ul>

    <!-- Popup chỉnh sửa -->
    <div v-if="showEditPopup" class="popup-overlay">
      <div class="popup">
        <h2>Chỉnh sửa món ăn</h2>
        <form @submit.prevent="updateItem" enctype="multipart/form-data">
          <input v-model="editItem.name" placeholder="Tên món" required />
          <input v-model.number="editItem.price" type="number" placeholder="Giá (VND)" required />
          <input v-model="editItem.description" placeholder="Mô tả" required />
          <select v-model="editItem.category" required>
            <option value="appetizer">Khai vị</option>
            <option value="main_dish">Món chính</option>
            <option value="side_dish">Món ăn kèm</option>
            <option value="regional_specialty">Đặc sản vùng miền</option>
            <option value="vegetarian">Món chay</option>
            <option value="dessert">Tráng miệng</option>
            <option value="beverage">Đồ uống</option>
          </select>
          <img v-if="editItem.image" :src="getImageUrl(editItem.image)" class="preview-image" />
          <input type="file" @change="handleEditFileUpload" accept="image/*" />
          <img v-if="editItem.newImage" :src="previewImageUrl" class="preview-image" />
          <div class="popup-buttons">
            <button type="submit">Lưu</button>
            <button type="button" @click="closeEditPopup">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'; // Import sweetalert2

export default {
  data() {
    return {
      menuItems: [],
      newItem: {
        name: '',
        price: 0,
        description: '',
        category: 'appetizer',
        image: null,
      },
      editItem: null,
      showEditPopup: false,
      previewImageUrl: null,
      previewNewImageUrl: null,
    };
  },
  async created() {
    await this.fetchMenu();
  },
  methods: {
    async fetchMenu() {
      try {
        const response = await axios.get('http://localhost:3000/api/menu');
        this.menuItems = response.data;
      } catch (error) {
        console.error('Lỗi khi tải menu:', error);
        Swal.fire('Lỗi!', 'Không thể tải menu. Vui lòng thử lại.', 'error');
      }
    },
    async addItem() {
      Swal.fire({
        title: 'Đang xử lý...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const formData = new FormData();
      formData.append('name', this.newItem.name);
      formData.append('price', this.newItem.price);
      formData.append('description', this.newItem.description);
      formData.append('category', this.newItem.category);
      formData.append('image', this.newItem.image);

      try {
        const response = await axios.post('http://localhost:3000/api/menu', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.menuItems.push(response.data);
        this.resetForm();
        Swal.fire('Thành công!', 'Món ăn đã được thêm.', 'success');
      } catch (error) {
        console.error('Lỗi khi thêm món:', error);
        Swal.fire('Lỗi!', 'Không thể thêm món ăn. Vui lòng thử lại.', 'error');
      }
    },
    openEditPopup(item) {
      this.editItem = { ...item, newImage: null };
      this.previewImageUrl = null;
      this.showEditPopup = true;
    },
    async updateItem() {
      const formData = new FormData();
      formData.append('name', this.editItem.name);
      formData.append('price', this.editItem.price);
      formData.append('description', this.editItem.description);
      formData.append('category', this.editItem.category);
      if (this.editItem.newImage) formData.append('image', this.editItem.newImage);

      try {
        const response = await axios.put(`http://localhost:3000/api/menu/${this.editItem.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const index = this.menuItems.findIndex(i => i.id === this.editItem.id);
        this.menuItems[index] = response.data;
        this.closeEditPopup();
        Swal.fire({
          title: 'Thành công!',
          text: 'Món ăn đã được thêm.',
          icon: 'success',
          confirmButtonColor: '#ae9a64',
        });
      } catch (error) {
        console.error('Lỗi khi sửa món:', error);
        Swal.fire('Lỗi!', 'Không thể sửa món ăn. Vui lòng thử lại.', 'error');
      }
    },
    async deleteItem(id) {
      if (confirm('Bạn có chắc muốn xóa món này?')) {
        try {
          await axios.delete(`http://localhost:3000/api/menu/${id}`);
          this.menuItems = this.menuItems.filter(item => item.id !== id);
          Swal.fire('Thành công!', 'Món ăn đã được xóa.', 'success');
        } catch (error) {
          console.error('Lỗi khi xóa món:', error);
          Swal.fire('Lỗi!', 'Không thể xóa món ăn. Vui lòng thử lại.', 'error');
        }
      }
    },
    handleFileUpload(event) {
      this.newItem.image = event.target.files[0];
      this.previewNewImageUrl = this.newItem.image ? URL.createObjectURL(this.newItem.image) : null;
    },
    handleEditFileUpload(event) {
      this.editItem.newImage = event.target.files[0];
      this.previewImageUrl = this.editItem.newImage ? URL.createObjectURL(this.editItem.newImage) : null;
    },
    getImageUrl(imageName) {
      return imageName ? `http://localhost:3000/uploads/${imageName}` : '';
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN').format(price);
    },
    resetForm() {
      this.newItem = { name: '', price: 0, description: '', category: 'appetizer', image: null };
      this.previewNewImageUrl = null;
    },
    closeEditPopup() {
      this.showEditPopup = false;
      this.editItem = null;
      this.previewImageUrl = null;
    },
  },
};
</script>

<style scoped>
.menu-management {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input,
select {
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 8px;
  background-color: #ae9a64;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #b8972f;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.preview-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.popup h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.popup form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.popup-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>