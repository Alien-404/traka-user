const { PrismaClient } = require('@prisma/client');
const moment = require('moment-timezone');
const prisma = new PrismaClient();

module.exports = {
  index: async (req, res, next) => {
    try {
      const todayStart = moment().tz('Asia/Jakarta').startOf('day').toDate();
      const todayEnd = moment().tz('Asia/Jakarta').endOf('day').toDate();

      const notifications = await prisma.notification.findMany({
        where: {
          created_at: {
            gte: todayStart,
            lte: todayEnd,
          },
        },
      });
      return res.status(200).json({
        status: true,
        message: 'success',
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { topic, message, good } = req.body;
      const user = req.user;

      if (!topic || !message) {
        return res.status(400).json({
          status: false,
          message: 'Bad request | please provide topic and message!',
          data: null,
        });
      }

      // check if not have good
      good ? good : false;

      // check user valid
      const isUser = await prisma.traka.findFirst({
        where: {
          uuid: user.uuid,
        },
      });

      if (!isUser) {
        return res.status(401).json({
          status: false,
          message:
            'Unauthorized | user does not have permission to create data!',
          data: null,
        });
      }

      const newNotif = await prisma.notification.create({
        data: {
          topic,
          message,
          created_by: isUser.name,
        },
      });

      return res.status(201).json({
        status: true,
        message: 'success',
        data: newNotif,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { uuid } = req.params;

      const hasNotif = await prisma.notification.findFirst({
        where: {
          uuid,
        },
      });

      // check if has not notification
      if (!hasNotif) {
        return res.status(404).json({
          status: false,
          message: 'not found!',
          data: null,
        });
      }

      const notification = await prisma.notification.delete({
        where: {
          uuid: uuid,
        },
      });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  truncate: async (req, res, next) => {
    try {
      await prisma.notification.deleteMany({});

      return res.status(200).json({
        status: true,
        message: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
