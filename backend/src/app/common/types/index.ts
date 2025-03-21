export interface DateInterval {
  since?: string;
  until?: string;
}

export interface UserInterface {
  email: string;
}
export interface CommonPageCondition {
  offset?: number;
  pageSize?: number;
}

export enum RecipeSearchEventType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  REMOVE = "REMOVE"
}
