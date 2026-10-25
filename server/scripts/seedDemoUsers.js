import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

const demoUsers = [
  {
    name: 'AnnSetu Demo Donor',
    email: 'demo.donor@annsetu.local',
    password: 'DemoDonor123!',
    role: 'donor',
    phone: '9000000001',
    orgName: 'Demo Community Kitchen',
  },
  {
    name: 'AnnSetu Demo Recipient',
    email: 'demo.recipient@annsetu.local',
    password: 'DemoRecipient123!',
    role: 'recipient',
    phone: '9000000002',
  },
  {
    name: 'AnnSetu Demo Volunteer',
    email: 'demo.volunteer@annsetu.local',
    password: 'DemoVolunteer123!',
    role: 'volunteer',
    phone: '9000000003',
  },
];

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is required. Configure server/.env before seeding demo accounts.');
}

try {
  await mongoose.connect(process.env.MONGODB_URI);

  for (const demoUser of demoUsers) {
    const existingUser = await User.findOne({ email: demoUser.email });
    if (existingUser) {
      console.log(`Exists: ${demoUser.email} (${existingUser.role}); leaving it unchanged.`);
      continue;
    }

    await new User(demoUser).save();
    console.log(`Created: ${demoUser.email} (${demoUser.role})`);
  }
} finally {
  await mongoose.disconnect();
}
