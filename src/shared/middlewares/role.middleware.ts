import { NextFunction, Request, Response } from 'express';
import { RoleDTO } from '../../dto/role.dto';
import { validateOrReject } from 'class-validator';

export const validateRole = async (req: Request, res: Response, next: NextFunction) => {
	const { roleName } = req.body;
	try {
		const role = new RoleDTO();
		role.roleName = roleName;
		await validateOrReject(role);
		next();
	} catch (error) {
		const message = Object.values(error[0].constraints)[0];
		res.status(400).send({ message });
	}
};
