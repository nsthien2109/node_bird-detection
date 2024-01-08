import { BirdFamilyController } from '../controller/bird-family.controller';
import { RouteType } from '../types/route.type';

export const BirdFamilyRoute: RouteType[] = [
  {
    method: 'get',
    route: '/birds/family',
    controller: BirdFamilyController,
    action: 'getAll',
  },
  {
    method: 'get',
    route: '/birds/family/fill',
    controller: BirdFamilyController,
    action: 'fillData',
  },
];
