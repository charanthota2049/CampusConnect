import Notice from "../models/Notice.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import VolunteerApplication from "../models/VolunteerApplication.js";

export async function getStats(req, res) {
  try {
    const [
      noticeCount,
      eventCount,
      userCount,
      volunteerPending,
      volunteerApproved,
      recentEvents,
      recentNotices,
    ] = await Promise.all([
      Notice.countDocuments(),
      Event.countDocuments(),
      User.countDocuments(),
      VolunteerApplication.countDocuments({ status: "pending" }),
      VolunteerApplication.countDocuments({ status: "approved" }),
      Event.find().sort({ createdAt: -1 }).limit(4),
      Notice.find().sort({ createdAt: -1 }).limit(4),
    ]);

    res.status(200).json({
      notices: noticeCount,
      events: eventCount,
      users: userCount,
      volunteerPending,
      volunteerApproved,
      recentEvents,
      recentNotices,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
}
