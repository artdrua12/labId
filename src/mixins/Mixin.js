
export default {
    methods: {
        checkRegular(field) {
            let normalize = this.schema?.[field]?.regExp.replace(/\\/g, "\\");
            return new RegExp(normalize).test(this.fields[field].value);
        },
        checkLength(field) {
            const strLen = String(this.fields[field].value).length || 0;
            const min = +this.schema[field]?.minLength;
            const max = +this.schema[field]?.maxLength;

            return { isError: strLen <= max && strLen >= min, min, max };
        },

        isErrorRegEx(field) {
            if (this.checkRegular(field)) {
                this.fields[field].error = "";
            } else {
                this.isValid = false;
                this.fields[field].error = "No valid";
            }
        },
        isErrorLenght(field) {
            const checkObj = this.checkLength(field);
            if (checkObj.isError) {
                this.fields[field].error = "";
            } else {
                this.isValid = false;
                this.fields[
                    field
                ].error = `"Length from  ${checkObj.min} to ${checkObj.max}"`;
            }
        },
        isErrorAge(field) {
            const checkObj = this.checkAge(field);
            if (checkObj.isError) {
                this.fields[field].error = "";
            } else if (checkObj.max > 0) {
                this.isValid = false;
                this.fields[
                    field
                ].error = `"Ange from  ${checkObj.min} to ${checkObj.max}"`;
            } else {
                this.isErrorRequired(field);
            }
        },
        isErrorRepeatField(field) {
            const shortField = (field.split("repeat")[1] || "").toLowerCase();
            if (this.fields[field].value === this.fields[shortField].value) {
                this.fields[field].error = "";
            } else {
                this.isValid = false;
                this.fields[
                    field
                ].error = `"This string does not match the ${shortField}"`;
            }
        },
        isErrorRequired(field) {
            const fieldValue = this.fields[field].value;
            if (
                (Array.isArray(fieldValue) && fieldValue.length == 0) ||
                !fieldValue
            ) {
                this.isValid = false;
                this.fields[field].error = "This field is required!";
                return;
            } else {
                this.fields[field].error = "";
            }
        },

        check() {
            let keys = Object.keys(this.fields);
            this.isValid = true;
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].match("repeat")) {
                    this.isErrorRepeatField(keys[i]);
                } else if (Object.prototype.hasOwnProperty.call(this.schema[keys[i]], 'regExp')) {
                    this.isErrorRegEx(keys[i]);
                } else if (Object.prototype.hasOwnProperty.call(this.schema[keys[i]], "maxAge")) {
                    this.isErrorAge(keys[i]);
                } else if (Object.prototype.hasOwnProperty.call(this.schema[keys[i]], "maxLength")) {
                    this.isErrorLenght(keys[i]);
                } else {
                    this.isErrorRequired(keys[i]);
                }
            }
        },
    },
}