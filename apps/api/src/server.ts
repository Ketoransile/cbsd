import express from 'express';
import cors from 'cors';
import { User, InvestorProfile, Project } from '@repo/contracts';
import { calculateMatch } from '@repo/utils';

const app = express();
app.use(cors());
app.use(express.json());

// Example usage of the User type from contracts in a typed Health-Check route
app.get('/health', (req, res) => {
  const dummyUser: Partial<User> = {
    email: "sys-admin@platform.com",
    role: "admin",
    status: "verified"
  };

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'api',
    contractIntegrationTest: {
      dummyUser
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
