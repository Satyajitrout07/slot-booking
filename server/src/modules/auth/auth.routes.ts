import express from "express";

import * as service from "./auth.service";

import { auth } from "../../middleware/auth";

import { prisma } from "../../config/prisma";

const router =
  express.Router();

//
// REGISTER
//
router.post(
  "/register",
  async (req, res) => {
    try {
      //
      // CREATE USER
      //
      const user =
        await service.register(
          req.body
        );

      //
      // SUCCESS
      //
      return res.status(201).json({
        success: true,

        message:
          "Registration successful",

        user,
      });
    } catch (error: any) {
      console.log(error);

      //
      // ERROR
      //
      return res.status(400).json({
        success: false,

        message:
          error.message ||
          "Registration failed",
      });
    }
  }
);

//
// LOGIN
//
router.post(
  "/login",
  async (req, res) => {
    try {
      //
      // LOGIN
      //
      const result =
        await service.login(
          req.body.email,

          req.body.password
        );

      //
      // SUCCESS
      //
      return res.status(200).json({
        success: true,

        message:
          "Login successful",

        ...result,
      });
    } catch (error: any) {
      console.log(error);

      //
      // ERROR
      //
      return res.status(400).json({
        success: false,

        message:
          error.message ||
          "Login failed",
      });
    }
  }
);

//
// CURRENT USER
//
router.get(
  "/me",
  auth,
  async (req: any, res) => {
    try {
      const user =
        await prisma.user.findUnique({
          where: {
            id: req.user.id,
          },
        });

      //
      // RESPONSE
      //
      return res.json({
        success: true,

        user,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,

        message:
          "Failed to fetch user",
      });
    }
  }
);

export default router;