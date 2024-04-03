import path from 'path';
import jsonfile from 'jsonfile';
import { ConfigData, FieldData, PageData } from '../types/fields.types';
// import {isInteger, isFloat} from '../helpers/validations'
import { isInteger, isNumber } from 'validate.js';

export const validateInputs = async (inputBody) => {
    try {
        let file = path.resolve(__dirname, 'config.json');
        let config: ConfigData = await jsonfile.readFile(file);
        let valid = true;

        config.pages.forEach((eachpage: PageData) => {
            eachpage.fields.forEach((eachfield: FieldData) => {

                let input = inputBody[eachfield.field_name];

                // If field is required, then input value can't be null or empty string
                if(!eachfield.field_optional) {
                    if(!input || input === '') {
                        valid = false;
                    }
                }


                // if input type is text input, then make sure the field validations are satisfied.
                if(eachfield.field_type === 'textinput') {
                    switch(eachfield.field_validation) {
                        case "string":
                            break;
            
                        case "integer":
                            if(isInteger(input)) {
                                //Do nothing since valid is true;
                            } else if(input === '') {
                                valid = false;
                            } else {
                                valid = false;
                            }
                            break;
                        
                        case "float":
                            if(isNumber(input)) {
                                //Do nothing;
                            } else if(input === '') {
                                valid = false;
                            } else {
                                valid = false;
                            }
                            break;
                    
                        default:
                            valid = false;
                            break;
                    }
                }


                // If type is select, make sure the values are in sync with validations,
                if(eachfield.field_type === 'select') {
                    if(input && input !== '') {

                        let inputComponents = input.split(",");

                        // if select is not multi select, then input shpuld only be 1 value.
                        if(eachfield.field_options_max && eachfield.field_options_max === 1) {
                            if(inputComponents.length > 1) {
                                valid = false;
                            }
                        }

                        //If not a creatable select, check if the string contains comma separated values are present in options. 
                        if(eachfield.field_options_createable) {
                            let options = eachfield.field_options;
                            inputComponents.forEach((inputStr: string) => {
                                if(options && options.indexOf(inputStr) === -1) {
                                    valid = false;
                                }
                            })
                        }

                    }
                }
            })
        })

        return valid;

    } catch (error) {
        return Promise.reject(error);
    }
}