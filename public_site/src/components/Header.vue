<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/" active-class="active">ABOUT US</router-link>
        </li>
        <li>
          <router-link to="/menu" active-class="active">MENU</router-link>
        </li>
        <li>
          <router-link to="/reservation" active-class="active">RESERVATION</router-link>
        </li>
        <li>
          <router-link to="/contact" active-class="active">CONTACT</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
header {
  background-color: #ae9a64;
  padding: 15px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

nav ul {
  display: flex;
  justify-content: center;
  list-style: none;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

nav ul li {
  margin-left: 30px;
}

nav ul li a {
  color: #2a2a2a;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px; /* Thêm padding để khung nổi bật */
  border-radius: 5px; /* Bo góc cho khung */
  transition: all 0.3s ease; /* Hiệu ứng mượt mà */
}

nav ul li a:hover {
  color: #fff;
}

nav ul li a.active {
  background-color: #fff; /* Màu nền trắng khi active */
  color: #ae9a64; /* Màu chữ đổi thành màu nền header */
}
</style>