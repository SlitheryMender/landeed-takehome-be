import path from 'path';
import jsonfile from 'jsonfile';
import { ConfigData, FieldData, PageData } from '../types/fields.types';
// import {isInteger, isFloat} from '../helpers/validations'
import { isInteger, isNumber } from 'validate.js';
import { CreateEntryData } from '../types/entry.types';

export const validateInputs = async (inputBody: any, config: ConfigData) => {
    try {
        let valid = true;

        config.pages.forEach((eachpage: PageData) => {
            eachpage.fields.forEach((eachfield: FieldData) => {

                let input = inputBody[eachfield.field_name];


                // If field is required, then input value can't be null or empty string
                if(!eachfield.field_optional) {
                    if(!input || input === '') {
                        console.log("Input is empty for field" + eachfield.field_name)
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
                                console.log("Not an integer, " + eachfield.field_name)
                                valid = false;
                            } else {
                                console.log("Integer check failed." + eachfield.field_name)
                                valid = false;
                            }
                            break;
                        
                        case "float":
                            if(isNumber(input)) {
                                //Do nothing;
                            } else if(input === '') {
                                console.log("Not an number, " + eachfield.field_name)
                                valid = false;
                            } else {
                                console.log("Float check failed." + eachfield.field_name)
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
                                console.log("Input components more. " + eachfield.field_name);
                                valid = false;
                            }
                        }

                        //If not a creatable select, check if the string contains comma separated values are present in options. 
                        if(!eachfield.field_options_createable) {
                            let options = eachfield.field_options;
                            inputComponents.forEach((inputStr: string) => {
                                if(options && options.indexOf(inputStr) === -1) {
                                    console.log("Custom value not allowed. " + eachfield.field_name);
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