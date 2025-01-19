export interface PageMetaDtoParameters {
    pageOptionsDto: PageOptionsDto;
    itemCount: number;
}
export interface PageOptionsDto {
    page: number;
    take: number;
}
