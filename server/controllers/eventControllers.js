import User from "../models/User.js";
import Event from "../models/Events.js";
export const CreateEvent = async (req, res) => {
  try {
    const { userId } = req;
    const { title, description } = req.body;
    const user = await User.find(userId);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User Unautorized",
      });
    }
    if (!title || !description) {
      return res.status(404).json({
        success: false,
        message: "Title and Description is compulsory",
      });
    }
    await Event.create({ userId, title, description, ...req });
    res.status(200).json({
      success: true,
      message: "Event created Successfully",
    });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
