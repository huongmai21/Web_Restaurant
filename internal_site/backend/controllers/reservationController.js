let reservations = [];

exports.createReservation = (req, res) => {
  const reservation = req.body;
  reservations.push(reservation);
  res.status(201).json({ message: 'Đặt bàn thành công!', reservation });
};