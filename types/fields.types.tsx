export interface FieldData {
    field_name: string,
    field_type: string,
    field_label: string,
    field_optional: boolean,
    field_options : null | string[],
    field_options_max: null | number,
    field_options_createable: boolean,
    field_validation: string | null
}

export interface PageData {
    pageName : string,
    fields: FieldData[]
}

export interface ConfigData {
    num_pages: number,
    pages: PageData[],
    timeout: number
}

export interface SelectItem {
    value: null | string | number,
    label: string
}

export interface FormData {
    [key: string]: null | string | SelectItem | SelectItem[]
}

export interface FormSubmitData {
    [key: string]: null | string | string[] | number
}

export interface ConfigFieldData {
    field_name: null | string,
    field_type: null | SelectItem,
    field_label: null | string,
    field_optional: boolean,
    field_options : null | string,
    field_options_max: null | SelectItem,
    field_options_createable: boolean,
    field_validation: null | SelectItem
}