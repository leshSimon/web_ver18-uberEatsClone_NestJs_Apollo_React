import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { Role } from "src/auth/role.decorator";
import {
  CreateAccountInput,
  CreateAccountOutput,
} from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
import { user } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => user)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => user)
  @Role(["any"])
  me(@AuthUser() authUser: user) {
    return authUser;
  }

  @Query(() => UserProfileOutput)
  @Role(["any"])
  userProfile(
    @Args() UserProfileInput: UserProfileInput
  ): Promise<UserProfileOutput> {
    return this.usersService.findById(UserProfileInput.userId);
  }

  @Mutation(() => CreateAccountOutput)
  createAccount(
    @Args("input") createAccountInput: CreateAccountInput
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation(() => LoginOutput)
  login(@Args("input") loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => EditProfileOutput)
  @Role(["any"])
  editProfile(
    @AuthUser() authUser: user,
    @Args("input") editProfileInput: EditProfileInput
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(authUser.id, editProfileInput);
  }

  @Mutation(() => VerifyEmailOutput)
  @Role(["any"])
  verifyEmail(
    @AuthUser() authUser: user,
    @Args("input") { code }: VerifyEmailInput
  ): Promise<VerifyEmailOutput> {
    return this.usersService.verifyEmail(authUser.id, code);
  }
}
