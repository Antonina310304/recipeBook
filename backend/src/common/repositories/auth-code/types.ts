import { AuthCodeEntity } from "../../entities/auth-code.entity";

export type ConditionRemoveInterface = Partial<Omit<AuthCodeEntity, "dateCreate">>;
