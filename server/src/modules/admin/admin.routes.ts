import express from "express";

import { auth } from "../../middleware/auth";

import { adminOnly } from "../../middleware/admin";

import {
  getDashboardStats,

  getAllBookings,

  getAllUsers,

  createInterviewSlot,

  getAllSlots,

  generateWeeklySlots,
} from "./admin.service";

const router = express.Router();

//
// DASHBOARD STATS
//
router.get(
  "/stats",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const stats =
        await getDashboardStats();

      res.json(stats);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch stats",
      });
    }
  }
);

//
// GET BOOKINGS
//
router.get(
  "/bookings",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const bookings =
        await getAllBookings();

      res.json(bookings);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch bookings",
      });
    }
  }
);

//
// GET USERS
//
router.get(
  "/users",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const users =
        await getAllUsers();

      res.json(users);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch users",
      });
    }
  }
);

//
// CREATE SINGLE SLOT
//
router.post(
  "/slots",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const slot =
        await createInterviewSlot(
          req.body
        );

      res.json(slot);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to create slot",
      });
    }
  }
);

//
// AUTO GENERATE WEEKLY SLOTS
//
router.post(
  "/generate-slots",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const slots =
        await generateWeeklySlots(
          req.body
        );

      res.json({
        message:
          "Weekly slots generated successfully",

        slots,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to generate slots",
      });
    }
  }
);

//
// GET ALL SLOTS
//
router.get(
  "/slots",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const slots =
        await getAllSlots();

      res.json(slots);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch slots",
      });
    }
  }
);

export default router;