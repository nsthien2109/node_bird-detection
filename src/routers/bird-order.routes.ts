import { BirdOrderController } from '../controller/bird-order.controller';
import { RouteType } from '../types/route.type';

export const BirdOrderRoute: RouteType[] = [
  {
    method: 'get',
    route: '/birds/orders',
    controller: BirdOrderController,
    action: 'getAll',
  },
  {
    method: 'get',
    route: '/birds/orders/fill',
    controller: BirdOrderController,
    action: 'fillData',
  },
];
