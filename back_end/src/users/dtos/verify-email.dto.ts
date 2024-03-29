import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/globalLib/common/dtos/output.dto";
import { verification } from "../entities/verification.entity";

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}

@InputType()
export class VerifyEmailInput extends PickType(verification, ["code"]) {}
