import express from "express";

import { prisma } from "../../config/prisma";

import { auth } from "../../middleware/auth";

import { redis } from "../../config/redis";

import {
  generateSlots,
} from "./slot.service";

const router =
  express.Router();

//
// GENERATE SLOTS
//
router.post(
  "/generate",
  auth,
  async (req, res) => {
    try {
      const result =
        await generateSlots();

      return res.json(
        result
      );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Failed to generate slots",
        });
    }
  }
);

//
// CREATE SLOT
//
router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const slot =
        await prisma.slot.create({
          data: req.body,
        });

      return res.json(
        slot
      );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Failed to create slot",
        });
    }
  }
);

//
// ALL SLOTS
//
router.get(
  "/",
  auth,
  async (req, res) => {
    try {
      const slots =
        await prisma.slot.findMany({
          orderBy: {
            startTime:
              "asc",
          },
        });

      return res.json(
        slots
      );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Failed to fetch slots",
        });
    }
  }
);

//
// 30 MINUTE SLOTS
//
router.get(
  "/30",
  auth,
  async (req, res) => {
    try {
      const slots =
        await prisma.slot.findMany({
          where: {
            duration:
              30,
            isBooked:
              false,
          },

          orderBy: {
            startTime:
              "asc",
          },
        });

      return res.json(
        slots
      );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Failed to fetch 30 minute slots",
        });
    }
  }
);

//
// 45 MINUTE SLOTS
//
router.get(
  "/45",
  auth,
  async (req, res) => {
    try {
      const slots =
        await prisma.slot.findMany({
          where: {
            duration:
              45,
            isBooked:
              false,
          },

          orderBy: {
            startTime:
              "asc",
          },
        });

      return res.json(
        slots
      );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Failed to fetch 45 minute slots",
        });
    }
  }
);

//
// 60 MINUTE SLOTS
//
router.get(
  "/60",
  auth,
  async (req, res) => {
    try {
      const slots =
        await prisma.slot.findMany({
          where: {
            duration:
              60,
            isBooked:
              false,
          },

          orderBy: {
            startTime:
              "asc",
          },
        });

      return res.json(
        slots
      );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Failed to fetch 60 minute slots",
        });
    }
  }
);

//
// LOCK SLOT
//
router.post(
  "/:id/lock",
  auth,
  async (
    req: any,
    res
  ) => {
    try {
      const key =
        `slot_lock:${req.params.id}`;

      const locked =
        await redis.get(
          key
        );

      if (locked) {
        return res.json({
          message:
            "Locked",
        });
      }

      await redis.set(
        key,
        req.user.id,
        "EX",
        120
      );

      (global as any).io.emit(
        "slot_locked",
        {
          id:
            req.params.id,
        }
      );

      return res.json({
        message:
          "Locked",
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Failed to lock slot",
        });
    }
  }
);

export default router;