export interface BaseConditionList {
    // количество элементов для выборки
    take: number;
    // выбранная страница
    page: number
}

export interface DateInterval {
    since?: string;
    until?: string;
}

export interface BaseErrorInterface {
    status: "ERROR";
    message: string
}