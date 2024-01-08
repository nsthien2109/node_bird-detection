import { BirdStatusController } from '../controller/bird-status.controller';
import { RouteType } from '../types/route.type';

export const BirdStatusRoute: RouteType[] = [
  {
    method: 'get',
    route: '/birds/status',
    controller: BirdStatusController,
    action: 'getAll',
  },
  {
    method: 'get',
    route: '/birds/status/fill',
    controller: BirdStatusController,
    action: 'fillData',
  },
];
