const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateSchedule = require('../utils/schedule.generate');

// seed data
const stations = [
  {
    location: 'ALLOGGIO',
    latitude: -6.267097741793193,
    longitude: 106.60494626525117,
    schedule: {
      createMany: {
        data: generateSchedule('06:00', '20:30', 30, [
          '12:00',
          '12:30',
          '18:00',
          '18:30',
        ]),
      },
    },
  },
  {
    location: 'PRADITA',
    latitude: -6.259443241853584,
    longitude: 106.61754281477016,
    schedule: {
      createMany: {
        data: generateSchedule('06:10', '20:40', 30, [
          '12:10',
          '12:40',
          '18:10',
          '18:40',
        ]),
      },
    },
  },
  {
    location: 'SDC_SQP_UMN',
    latitude: -6.257239671139333,
    longitude: 106.6170322374791,
    schedule: {
      createMany: {
        data: generateSchedule('06:15', '20:45', 30, [
          '12:15',
          '12:45',
          '18:15',
          '18:45',
        ]),
      },
    },
  },
];

async function main() {
  // hapus semua data terlebih dahulu
  await prisma.schedule.deleteMany();
  await prisma.station.deleteMany();
  await prisma.traka.deleteMany();

  // insert seed
  await prisma.traka.create({
    data: {
      name: 'driver-001',
      information: 'traka driver 001',
    },
  });

  // station
  for (const stationData of stations) {
    await prisma.station.create({
      data: stationData,
    });
  }

  // log if success
  console.log('Seed data berhasil di-generate');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
