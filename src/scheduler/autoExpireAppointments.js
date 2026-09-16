import Appointment from "../../DB/models/booking.model.js";
export const autoExpireAppointments = async () => {
  try {
    const now = new Date();

    const result = await Appointment.updateMany(
      {
        endTime: { $lte: now },
        status: 'pending'
      },
      {
        $set: { status: 'expired' },
        $push: {
          history: {
            action: 'auto-expired',
            by: 'system',
            at: now,
          }
        }
      }
    );

    console.log(`🕒 Auto-expired appointments: ${result.modifiedCount}`);
  } catch (error) {
    console.error('❌ Failed to auto-expire appointments:', error.message);
  }
};
