import isFunction from "lodash/isFunction";

export default class Validator {
    constructor() {
        this.validators = [];
    }

    register = (validator) => {

        if (!validator || !isFunction(validator.validate)) {
            throw new Error("Validator is not avalable.");
        }

        if (!this.validators.includes(validator)) {
            this.validators.push(validator);
        }
    }

    unregister = (validator) => {
        const index = this.validators.indexOf(validator);
        if (index > -1) {
            this.validators.splice(index, 1);
        }
    }

    validate = () => {
        return this.validators.reduce((verified, validator) => {
            try {
                return verified && validator.validate();
            } catch (error) {
                console.error(error);
                return false;
            }
        }, true);
    }
}