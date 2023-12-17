import { User } from "../entity/user";
import { RoleName } from "../shared/constants";
import { RoleService } from "./role.service";
import { UserService } from "./user.service";

export class AuthService {
  private userService = new UserService();
  private roleService = new RoleService();
  // Applicant register account
  async register(data: User) {
    return await this.userService.save(data);
  }

  // Login
  async login({ email, password }) {
    return await this.userService.findByEmailAndPassword(email, password);
  }

  // Logout
  async logout() {}
}
