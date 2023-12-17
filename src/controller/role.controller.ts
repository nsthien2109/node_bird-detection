import { Request, Response } from 'express';
import { RoleService } from '../services/role.service';
import { Role } from '../entity/role';

export class RoleController {
	private roleService = new RoleService();

	async getAll(request: Request, response: Response) {
		try {
			const result = await this.roleService.findAll();
			return response.status(200).json({ data: result });
		} catch (error) {
			return response.status(500).json({ error: error });
		}
	}

	async findOne(request: Request, response: Response) {
		const id: number = parseInt(request.params.id);
		const role = await this.roleService.findOne(id);
		if (!role) {
			return response.status(404).json({ error: 'Role not found' });
		} else {
			return response.status(200).json(role);
		}
	}

	async save(request: Request, response: Response) {
		const role = new Role();
		role.roleName = request.body.roleName;
		const isExist = await this.roleService.findByName(request.body.roleName);
		if (isExist && role.roleName.toUpperCase() === isExist.roleName.toUpperCase()) {
			return response.status(409).json({ message: `${role.roleName} role is exist !` });
		}
		try {
			const result = await this.roleService.create(role);
			return response.status(200).json(result);
		} catch (error) {
			return response.status(500).json({ error: error });
		}
	}

	async update(request: Request, response: Response) {
		const id: number = parseInt(request.params.id);
		const role = new Role();
		role.roleName = request.body.roleName;
		const isExist = await this.roleService.findByName(request.body.roleName);
		if (isExist && role.roleName.toUpperCase() === isExist.roleName.toUpperCase()) {
			return response.status(409).json({ message: `${role.roleName} role is exist !` });
		}
		try {
			const result = await this.roleService.update(id, role);
			return response.status(200).json(result);
		} catch (error) {
			return response.status(500).json({ error: error });
		}
	}

	async remove(request: Request, response: Response) {
		const id: number = parseInt(request.params.id);
		const isExist = await this.roleService.findOne(id);
		if (!isExist) {
			return response.status(404).json({ message: 'Role does not exist' });
		}
		await this.roleService.remove(id);
		return response.status(200).json({ message: 'Delete successfully' });
	}
}
