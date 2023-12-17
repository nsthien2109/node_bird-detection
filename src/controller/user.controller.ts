import { Request, Response } from 'express';
import { User } from '../entity/user';
import { UserService } from '../services/user.service';

export class UserController {
	private userService = new UserService();

	async getAll(request: Request, response: Response) {
		try {
			const result = await this.userService.findAll();
			result.map((e) => (e.password = undefined));

			return response.status(200).json(result);
		} catch (error) {
			return response.status(500).json({ error: error });
		}
	}

	async findOne(request: Request, response: Response) {
		const id: number = parseInt(request.params.id);
		const user = await this.userService.findById(id);
		if (!user) {
			return response.status(404).json({ error: 'User not found' });
		} else {
			return response.status(200).json(user);
		}
	}

	async update(request: Request, response: Response) {
		const id: number = parseInt(request.params.id);
		const user = new User();
		user.username = request.body.username;
		user.role = request.body.role;

		const isExistEmail = await this.userService.findByEmail(user.email);
		const isExistUsername = await this.userService.findByUsername(user.username);

		if (isExistEmail && isExistEmail.id === id) {
			return response.status(409).json({ error: 'Email already exist !' });
		}
		if (isExistUsername && isExistUsername.id === id) {
			return response.status(409).json({ error: 'Username already exist !' });
		}

		try {
			const result = await this.userService.update(id, user);
			return response.status(200).json(result);
		} catch (error) {
			return response.status(500).json({ error: error });
		}
	}

	async remove(request: Request, response: Response) {
		const id: number = parseInt(request.params.id);
		const isExist = await this.userService.findById(id);
		if (!isExist) {
			return response.status(404).json({ message: 'User does not exist' });
		}
		await this.userService.remove(id);
		return response.status(200).json({ message: 'Delete successfully' });
	}
}
