<!-- public_site/src/views/Menu.vue -->
<template>
  <div class="menu-page">
    <Header />
    <section class="menu">
      <h1>MENU TINH HOA VIỆT</h1>
      <p class="description">
        Menu nhà hàng mang đến hương vị đậm đà, hòa quyện giữa truyền thống và tinh tế. <br>Mỗi món ăn đều được chế biến tỉ mỉ, giữ trọn tinh hoa ẩm thực Việt.
      </p>

      <!-- Appetizers -->
      <h2>Khai vị / Appetizers</h2>
      <div class="menu-item" v-for="item in appetizerItems" :key="item.id">
        <img :src="getImageUrl(item.image)" :alt="item.name" class="menu-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <span class="price">{{ formatPrice(item.price) }} VND</span>
      </div>

      <!-- Main Dishes -->
      <h2>Món chính / Main Dishes</h2>
      <div class="menu-item" v-for="item in mainDishItems" :key="item.id">
        <img :src="getImageUrl(item.image)" :alt="item.name" class="menu-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <span class="price">{{ formatPrice(item.price) }} VND</span>
      </div>

      <!-- Side Dishes -->
      <h2>Món ăn kèm / Side Dishes</h2>
      <div class="menu-item" v-for="item in sideDishItems" :key="item.id">
        <img :src="getImageUrl(item.image)" :alt="item.name" class="menu-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <span class="price">{{ formatPrice(item.price) }} VND</span>
      </div>

      <!-- Regional Specialties -->
      <h2>Đặc sản vùng miền / Regional Specialties</h2>
      <div class="menu-item" v-for="item in regionalItems" :key="item.id">
        <img :src="getImageUrl(item.image)" :alt="item.name" class="menu-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <span class="price">{{ formatPrice(item.price) }} VND</span>
      </div>

      <!-- Vegetarian Dishes -->
      <h2>Món chay / Vegetarian Dishes</h2>
      <div class="menu-item" v-for="item in vegetarianItems" :key="item.id">
        <img :src="getImageUrl(item.image)" :alt="item.name" class="menu-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <span class="price">{{ formatPrice(item.price) }} VND</span>
      </div>

      <!-- Desserts -->
      <h2>Tráng miệng / Desserts</h2>
      <div class="menu-item" v-for="item in dessertItems" :key="item.id">
        <img :src="getImageUrl(item.image)" :alt="item.name" class="menu-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <span class="price">{{ formatPrice(item.price) }} VND</span>
      </div>

      <!-- Beverages -->
      <h2>Đồ uống / Beverages</h2>
      <div class="menu-item" v-for="item in beverageItems" :key="item.id">
        <img :src="getImageUrl(item.image)" :alt="item.name" class="menu-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <span class="price">{{ formatPrice(item.price) }} VND</span>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Menu',
  components: { Header, Footer },
  data() {
    return {
      menuItems: [],
    };
  },
  computed: {
    appetizerItems() {
      return this.menuItems.filter(item => item.category === 'appetizer');
    },
    mainDishItems() {
      return this.menuItems.filter(item => item.category === 'main_dish');
    },
    sideDishItems() {
      return this.menuItems.filter(item => item.category === 'side_dish');
    },
    regionalItems() {
      return this.menuItems.filter(item => item.category === 'regional_specialty');
    },
    vegetarianItems() {
      return this.menuItems.filter(item => item.category === 'vegetarian');
    },
    dessertItems() {
      return this.menuItems.filter(item => item.category === 'dessert');
    },
    beverageItems() {
      return this.menuItems.filter(item => item.category === 'beverage');
    },
  },
  methods: {
    getImageUrl(imageName) {
      return imageName ? `http://localhost:3000/uploads/${imageName}` : '';
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN').format(price);
    },
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/api/menu');
      this.menuItems = response.data;
    } catch (error) {
      console.error('Lỗi khi tải menu:', error);
    }
  },
};
</script>

<style scoped>
.menu-page {
  background-color: #dadad1;
  min-height: 100vh;
  color: #666;
}

.menu {
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 20px;
  text-align: center;
}

.menu h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.menu .description {
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
}

.menu h2 {
  font-size: 24px;
  color: #ae9a64;
  margin: 40px 0 20px;
  text-align: left;
}

.menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  text-align: left;
  gap: 20px; /* Khoảng cách giữa ảnh và nội dung */
}

.menu-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.item-details p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.price {
  font-size: 16px;
  color: #ae9a64;
}
</style>