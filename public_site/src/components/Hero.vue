<template>
    <section class="hero">
      <!-- Các div slide cho ảnh nền -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide"
        :style="{ backgroundImage: `url(${image})`, animationDelay: `${index * 5}s` }"
      ></div>
      <!-- Nội dung hero -->
      <div class="hero-content">
        <h1>Tinh Hoa Việt</h1>
        <h2>Dấu ấn Việt - Tròn vị quê hương</h2>
      </div>
    </section>
  </template>
  
  <script>
  import hero1 from '../assets/images/hero1.jpg';
  import hero2 from '../assets/images/hero2.jpg';
  import hero3 from '../assets/images/hero3.jpg';
  
  export default {
    name: 'Hero',
    data() {
      return {
        images: [
          hero1,
          hero2,
          hero3
        ]
      };
    }
    // Không cần mounted hoặc setInterval nữa vì animation được xử lý bằng CSS
  };
  </script>
  
  <style scoped>
    .hero {
      height: 100vh;
      position: relative;
      overflow: hidden; /* Ẩn phần thừa khi slide */
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .slide {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: no-repeat center center/cover;
      animation: slideLeft 15s infinite; /* 15s = 5s mỗi ảnh x 3 ảnh */
    }
  
    @keyframes slideLeft {
      0% {
        transform: translateX(100%); /* Ảnh chờ bên phải */
        opacity: 0;
      }
      6.67% {
        transform: translateX(0); /* Vào giữa */
        opacity: 1;
      }
      33.33% {
        transform: translateX(0); /* Giữ ở giữa */
        opacity: 1;
      }
      40% {
        transform: translateX(-100%); /* Rời sang trái */
        opacity: 0;
      }
      100% {
        transform: translateX(-100%); /* Giữ bên trái để lặp lại */
        opacity: 0;
      }
    }
  
  .hero-content {
    position: relative; /* Đặt nội dung lên trên ảnh nền */
    text-align: center;
    color: white;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1; 
    display: flex; /* Dùng Flexbox */
    flex-direction: column; /* Xếp các phần tử theo cột */
    justify-content: center; /* Căn giữa theo dọc */
    align-items: center; /* Căn giữa theo ngang */
  }
  
  .hero-content h1 {
    font-size: 10rem;
    font-weight: 1500px;
    margin-bottom: 1rem;
  }
  
  .hero-content h2 {
    font-size: 1.5rem;
    font-weight: 3500px;
    
  }
  </style>