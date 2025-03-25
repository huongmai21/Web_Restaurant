<template>
  <section class="reservation-cta">
    <h2>MAKE A RESERVATION</h2>
    <p>Ready to find out what makes us the best steakhouse in town? Book your table now.</p>
    <form @submit.prevent="submitReservation">
      <input type="text" v-model="name" placeholder="Your Name" required />
      <input type="tel" v-model="phone" placeholder="Your Phone Number" required />
      <input type="date" v-model="date" required />
      <input type="time" v-model="time" required />
      <input type="number" v-model="guests" placeholder="Number of Guests" min="1" required />
      <button type="submit">RESERVE NOW</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'ReservationForm',
  data() {
    return {
      name: '',
      date: '',
      time: '',
      guests: ''
    };
  },
  methods: {
    submitReservation() {
      alert(`Reservation submitted for ${this.name} with phone number ${this.phone} on ${this.date} at ${this.time} for ${this.guests} guests.`);
      this.name = '';
      this.phone = '';
      this.date = '';
      this.time = '';
      this.guests = '';
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid white;
  border-radius: 5px;
  background: transparent;
  color: white;
}
.reservation-cta {
    background-color: #ae9a64;
    padding: 60px 20px;
    text-align: center;
    color: white;
}

.reservation-cta h2 {
    font-size: 48px;
    margin-bottom: 20px;
}

.reservation-cta p {
    font-size: 18px;
    margin-bottom: 30px;
}

.reservation-cta button {
    background-color: transparent;
    border: 2px solid white;
    color: white;
    padding: 15px 30px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.reservation-cta button:hover {
    background-color: white;
    color: #ae9a64;
}

</style>