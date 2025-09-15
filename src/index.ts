import express from 'express';
import { json } from 'body-parser';
import { setUserRoutes } from './routes/user.routes';
import { setAdminRoutes } from './routes/admin.routes';
import { setAuthRoutes } from './routes/auth.routes';
import { setReservationRoutes } from './routes/reservation.routes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://teknolab-frontend.onrender.com'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(json());

setUserRoutes(app);
setAdminRoutes(app);
setAuthRoutes(app);
setReservationRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});