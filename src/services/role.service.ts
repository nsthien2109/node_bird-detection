import { AppDataSource } from "../data-source";
import { Role } from "../entity/role";
import { RoleName } from "../shared/constants";

export class RoleService {
  constructor(private roleRepository = AppDataSource.getRepository(Role)) {}

  async create(data: Role) {
    return await this.roleRepository.save(data);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async findByName(roleName: RoleName) {
    return await this.roleRepository.findOne({ where: { roleName } });
  }

  async update(id: number, updateData: Role) {
    await this.roleRepository.update(id, updateData);
    return await this.roleRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.roleRepository.delete(id);
  }
}
