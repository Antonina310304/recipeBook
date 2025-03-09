export interface BaseConditionList {
  // количество элементов для выборки
  take: number;
  // выбранная страница
  page: number;
}

export interface DateInterval {
  since?: string;
  until?: string;
}

export interface UserInterface {
  email: string;
}

export enum RecipeSearchEventType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  REMOVE = "REMOVE"
}
