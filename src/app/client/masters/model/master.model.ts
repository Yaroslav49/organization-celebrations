import { Service } from "./service.model";

export interface Master {
    id: number;
    fullName: string;
    description: string;
    onlineStatus: boolean;
    photos: string[]; //примеры работ
    personalPhoto: string; //аватарка исполниителя
    averageRating: number; //средняя оценка
    ratingCount: number;
    passportVerified: boolean;
    contractWork: boolean;
    services: Service[];
    districts: string[];
    //reports
}