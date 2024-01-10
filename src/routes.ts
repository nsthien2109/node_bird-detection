import { AuthRoute } from './routers/auth.routes';
import { BirdRoute } from './routers/bird.routes';
import { PredictionRoutes } from './routers/prediction.routes';
import { RoleRoutes } from './routers/role.routes';
import { UserRoutes } from './routers/user.routes';
import { StatsRoutes } from './routers/stats.routes';
import { HistoryRoute } from './routers/history.routes';
import { BirdOrderRoute } from './routers/bird-order.routes';
import { BirdFamilyRoute } from './routers/bird-family.routes';
import { BirdStatusRoute } from './routers/bird-status.routes';

export const Routes = [
  ...RoleRoutes,
  ...UserRoutes,
  ...AuthRoute,
  ...BirdRoute,
  ...BirdOrderRoute,
  ...BirdFamilyRoute,
  ...BirdStatusRoute,
  ...PredictionRoutes,
  ...HistoryRoute,
  ...StatsRoutes,
];
