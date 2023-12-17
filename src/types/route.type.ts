export type RouteType = {
	method: string;
	route: string;
	controller: any;
	action: string;
	middleware?: Function[];
};
