interface Data {
    title: string;
    description: string;
    url: string;
    tags: string[];
}

type PartialData = Partial<Data>;

export const validateData = (data: PartialData): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    if (data.title === undefined || data.title === '') {
        errors.titleRequired = 'Este campo es obligatorio';
    } 
    else if (data.title && (data.title.length > 50 || data.title.length < 10)) {
        errors.titleLength = 'El título debe tener entre 10 y 50 caracteres';
    }

    if (data.description === undefined || data.description === '') {
        errors.descriptionRequired = 'Este campo es obligatorio';
    } 
    else if (data.description && (data.description.length > 400 || data.description.length < 50)) {
        errors.descriptionLength = 'La descripción debe tener entre 50 y 400 caracteres';
    }


    if (data.url === undefined || data.url === '') {
        errors.url = 'Este campo es obligatorio';
    } 
    else if (data.url && !isValidUrl(data.url)) {
        errors.url = 'La URL no es válida';
    }

    if (data.tags && data.tags.length === 0) {
        errors.tags = 'Debe seleccionar al menos un tag';
    }

    return errors;
};

const isValidUrl = (url: string): boolean => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
};
