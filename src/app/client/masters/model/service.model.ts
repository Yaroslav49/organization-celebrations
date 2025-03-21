export interface Service{
    serviceName: ServiceName;
    cost: number;

    
}

export const enum ServiceName {
    DECORATOR, SOUND_ENGINEER, LIGHT_ENGINEER, PHOTOGRAPHER, VIDEOGRAPHER, CHEF, WAITER, HOST
}

export const ServiceNameDisplay: { [key in ServiceName]: string } = {
    [ServiceName.DECORATOR]: 'Декоратор',
    [ServiceName.SOUND_ENGINEER]: 'Звукорежиссёр',
    [ServiceName.LIGHT_ENGINEER]: 'Светорежиссёр',
    [ServiceName.PHOTOGRAPHER]: 'Фотограф',
    [ServiceName.VIDEOGRAPHER]: 'Видеограф',
    [ServiceName.CHEF]: 'Повар',
    [ServiceName.WAITER]: 'Официант',
    [ServiceName.HOST]: 'Ведущий',
};