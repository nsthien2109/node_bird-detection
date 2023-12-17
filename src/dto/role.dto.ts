import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { RoleName } from '../shared/constants';

export class RoleDTO {
	@IsString()
	@IsNotEmpty()
	@MaxLength(10)
	roleName: RoleName;
}
