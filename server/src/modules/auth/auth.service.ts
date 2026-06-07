import bcrypt from "bcrypt";

import { prisma } from "../../config/prisma";

import { signToken } from "../../utils/jwt";

//
// REGISTER
//
export const register =
  async (data: any) => {
    //
    // CLEAN EMAIL
    //
    const cleanEmail =
      data.email
        .trim()
        .toLowerCase();

    //
    // CHECK EXISTING USER
    //
    const existingUser =
      await prisma.user.findFirst({
        where: {
          email:
            cleanEmail,
        },
      });

    //
    // USER EXISTS
    //
    if (existingUser) {
      throw new Error(
        "Email already exists"
      );
    }

    //
    // HASH PASSWORD
    //
    const hashed =
      await bcrypt.hash(
        data.password,
        10
      );

    //
    // CREATE USER
    //
    const user =
      await prisma.user.create({
        data: {
          name:
            data.name,

          email:
            cleanEmail,

          password:
            hashed,

          role:
            data.role ||
            "CANDIDATE",

          companyName:
            data.companyName ||
            null,

          hrPhone:
            data.hrPhone ||
            null,
        },
      });

    //
    // RETURN USER
    //
    return {
      id: user.id,

      name:
        user.name,

      email:
        user.email,

      role:
        user.role,
    };
  };

//
// LOGIN
//
export const login =
  async (
    email: string,
    password: string
  ) => {
    //
    // CLEAN EMAIL
    //
    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    console.log(
      "LOGIN EMAIL:",
      cleanEmail
    );

    //
    // FIND USER
    //
    const user =
      await prisma.user.findFirst({
        where: {
          email:
            cleanEmail,
        },
      });

    //
    // USER NOT FOUND
    //
    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    //
    // CHECK PASSWORD
    //
    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    //
    // INVALID PASSWORD
    //
    if (!valid) {
      throw new Error(
        "Invalid password"
      );
    }

    //
    // GENERATE TOKEN
    //
    const token =
      signToken({
        id: user.id,

        role:
          user.role,
      });

    //
    // RETURN
    //
    return {
      token,

      user: {
        id: user.id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,
      },
    };
  };