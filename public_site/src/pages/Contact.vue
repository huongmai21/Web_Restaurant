<!-- Trang liên hệ -->
<template>
    <div class="contact-page">
      <Header />
      <main>
        <h1>Liên hệ</h1>
        <h3>Các chi nhánh</h3>
        <div class="branch">
          <p>Chi nhánh 1: 123 Đường ABC, TP.HCM - 0909 123 456</p>
          <div id="map1" class="map"></div>
        </div>
        <div class="branch">
          <p>Chi nhánh 2: 456 Đường XYZ, Hà Nội - 0909 654 321</p>
          <div id="map2" class="map"></div>
        </div>
        <p>Email: <a href="mailto:contact@xyzrestaurant.com">contact@xyzrestaurant.com</a></p>
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'Contact',
    components: { Header, Footer },
    mounted() {
      // Tải Google Maps API
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap'; // Thay YOUR_API_KEY
      script.async = true;
      document.head.appendChild(script);
  
      // Định nghĩa hàm initMap toàn cục
      window.initMap = this.initMap;
    },
    methods: {
      initMap() {
        // Chi nhánh 1: TP.HCM
        const branch1 = { lat: 10.7769, lng: 106.7009 }; // Tọa độ TP.HCM
        const map1 = new google.maps.Map(document.getElementById('map1'), {
          zoom: 15,
          center: branch1,
        });
        new google.maps.Marker({
          position: branch1,
          map: map1,
          title: 'Chi nhánh 1 - TP.HCM',
        });
  
        // Chi nhánh 2: Hà Nội
        const branch2 = { lat: 21.0278, lng: 105.8342 }; // Tọa độ Hà Nội
        const map2 = new google.maps.Map(document.getElementById('map2'), {
          zoom: 15,
          center: branch2,
        });
        new google.maps.Marker({
          position: branch2,
          map: map2,
          title: 'Chi nhánh 2 - Hà Nội',
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-page {
    background-color:  #dadad1;
    min-height: 100vh;
    color: #666;
  }
  
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 100px 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 24px;
    color: #ae9a64;
    margin-bottom: 20px;
  }
  
  .branch {
    margin-bottom: 40px;
  }
  
  p {
    font-size: 16px;
    color: #666;
    margin: 10px 0;
  }
  
  a {
    color: #299277;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  .map {
    width: 100%;
    height: 300px;
    margin-top: 20px;
    border-radius: 8px;
  }
  </style>