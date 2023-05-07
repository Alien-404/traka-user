const { PrismaClient } = require('@prisma/client');
const moment = require('moment-timezone');
const prisma = new PrismaClient();

// cache
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 259200 });

module.exports = {
  index: async (req, res, next) => {
    try {
      // setting cache
      const cachedData = cache.get(req.url);

      if (cachedData) {
        return res.status(200).json({
          status: true,
          message: 'success',
          data: cachedData,
        });
      }

      // get all data
      const stationSchedule = await prisma.station.findMany({
        orderBy: { location: 'desc' },
        include: {
          schedule: {
            orderBy: { period: 'asc' },
            select: {
              period: true,
              notes: true,
            },
          },
        },
      });

      // set data to cache
      cache.set(req.url, stationSchedule);

      return res.status(200).json({
        status: true,
        message: 'success',
        data: stationSchedule,
      });
    } catch (error) {
      next(error);
    }
  },

  ongoing: async (req, res, next) => {
    try {
      // get query params
      let total = req.query.total;
      const now = moment().tz('Asia/Jakarta');

      // check query params
      if (total === undefined || Number(total) <= 0 || Number(total) >= 30) {
        total = 10;
      } else {
        total = Number(total);
      }

      // check traka is run
      const traka = await prisma.traka.findFirst({
        select: {
          status: true,
        },
      });

      if (!traka.status) {
        return res.status(202).json({
          status: true,
          message: 'traka is offline now!',
          data: null,
        });
      }

      const result = await prisma.schedule.findMany({
        take: total,
        where: {
          period: {
            gte: now.format('HH:mm'),
          },
        },
        orderBy: { period: 'asc' },
        select: {
          period: true,
          notes: true,
          station: {
            select: {
              location: true,
            },
          },
        },
      });

      return res.status(200).json({
        status: true,
        message: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
