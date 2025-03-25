<!-- Trang đặt bàn trước -->
<template>
  <div class="reservation-page">
    <Header />
    <section class="reservation">
      <div class="reservation-content">
        <h1>MAKE A RESERVATION</h1>
        <p class="description">
          To help us find the best table for you, please fill in your details below.
        </p>
        <form @submit.prevent="submitReservation">
          <div class="form-group form-group-contact">
            <div class="form-field">
              <label>Name</label>
              <input type="text" v-model="form.name" required placeholder="Enter your name" />
            </div>
            <div class="form-field">
              <label>Phone</label>
              <input type="tel" v-model="form.phone" required placeholder="Enter your phone number" />
            </div>
          </div>
          <div class="form-group">
            <div class="form-field">
              <label>Date</label>
              <input type="date" v-model="form.date" required />
            </div>
            <div class="form-field">
              <label>Time</label>
              <input type="time" v-model="form.time" required step="900" />
            </div>
            <div class="form-field">
              <label>Party Size</label>
              <input type="number" v-model.number="form.partySize" min="1" required placeholder="Number of guests" />
            </div>
          </div>
          <div class="time-slots">
            <button
              type="button"
              v-for="slot in quickTimeSlots"
              :key="slot"
              :class="{ active: form.time === slot }"
              @click="form.time = slot"
            >
              {{ slot }}
            </button>
          </div>
          <button type="submit" class="reserve-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'RESERVE NOW' }}
          </button>
        </form>
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
  name: 'Reservation',
  components: { Header, Footer },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        partySize: 2, // Giá trị mặc định là số
        date: new Date().toISOString().split('T')[0], // Ngày hiện tại
        time: '20:00', // 8:00 PM dạng 24h
      },
      quickTimeSlots: [
        '19:45', '20:00', '20:15', '20:30', '20:45', // 7:45 PM - 8:45 PM
        '21:00', '21:15', '21:30', '21:45', // 9:00 PM - 9:45 PM
      ],
      isSubmitting: false,
    };
  },
  methods: {
    async submitReservation() {
      this.isSubmitting = true;
      try {
        const response = await axios.post('http://localhost:3000/api/reservations', this.form);
        alert(response.data.message);
        this.resetForm();
      } catch (error) {
        alert('Đặt bàn thất bại. Vui lòng thử lại!');
        console.error('Lỗi khi gửi reservation:', error);
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.form.name = '';
      this.form.phone = '';
      this.form.partySize = 2;
      this.form.date = new Date().toISOString().split('T')[0];
      this.form.time = '20:00';
    },
  },
};
</script>

<style scoped>
.reservation-page {
  background-color: #dadad1;
  min-height: 100vh;
  color: #444;
}

.reservation {
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 20px;
  text-align: center;
}

.reservation-content h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.reservation-content .description {
  font-size: 16px;
  color: #444;
  margin-bottom: 40px;
}

.form-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.form-group-contact {
  justify-content: center; /* Căn giữa dòng chứa Name và Phone */
  gap: 20px; /* Giảm khoảng cách giữa Name và Phone */
}

.form-field {
  width: 30%;
  text-align: left;
}

.form-group-contact .form-field {
  width: 35%; /* Tăng chiều rộng để không quá sát nhau */
  max-width: 300px; /* Giới hạn chiều rộng tối đa */
}

.form-field label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #ae9a64;
  margin-bottom: 10px;
}

.form-field input {
  width: 100%;
  padding: 10px;
  background-color: #f6f6f3;
  border: 1px solid #444;
  color: #333;
  border-radius: 5px;
  font-size: 16px;
}

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 40px;
}

.time-slots button {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #444;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.time-slots button.active {
  background-color: #ae9a64;
  color: white;
  border-color: #ae9a64;
}

.time-slots button:hover {
  background-color: #ae9a64;
  color: white;
}

.reserve-button {
  background-color: #ae9a64;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.reserve-button:hover {
  background-color: #b8972f;
}

.reserve-button:disabled {
  background-color: #666;
  cursor: not-allowed;
}

/* Responsive design */
@media (max-width: 600px) {
  .form-group {
    flex-direction: column;
    gap: 20px;
  }
  .form-field {
    width: 100%;
  }
  .form-group-contact .form-field {
    width: 100%;
    max-width: none;
  }
}
</style>