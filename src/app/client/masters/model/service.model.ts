export interface Service{
    serviceName: ServiceName;
    cost: number;
}

export enum ServiceName {
    DECORATOR = "DECORATOR",
    SOUND_ENGINEER = "SOUND_ENGINEER",
    LIGHT_ENGINEER = "LIGHT_ENGINEER",
    PHOTOGRAPHER = "PHOTOGRAPHER",
    VIDEOGRAPHER = "VIDEOGRAPHER",
    CHEF = "CHEF",
    WAITER = "WAITER",
    HOST = "HOST"
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