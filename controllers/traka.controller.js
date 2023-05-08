const { PrismaClient } = require('@prisma/client');
const moment = require('moment-timezone');
const prisma = new PrismaClient();

module.exports = {
  trakaStatus: async (req, res, next) => {
    try {
      const user = req.user;

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
            'Unauthorized | user does not have permission to modified data!',
          data: null,
        });
      }

      const trakaInfo = await prisma.traka.update({
        where: {
          uuid: user.uuid,
        },
        data: {
          status: !isUser.status,
        },
      });

      // check current traka status
      return res.status(202).json({
        status: true,
        message: 'Accepted | updated traka status',
        data: trakaInfo,
      });
    } catch (error) {
      next(error);
    }
  },

  info: async (req, res, next) => {
    try {
      const trakaInfo = await prisma.traka.findFirst({
        orderBy: {
          name: 'asc',
        },
      });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: trakaInfo,
      });
    } catch (error) {
      next(error);
    }
  },
};
