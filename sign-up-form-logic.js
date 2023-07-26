class FormValidate {
    constructor(form) {
        this.form = form;
        // to disable default validation and error messages
        this.noValidate = true;

        this.customFuncs = []; // array of arrays, customFuncs -> [fields], field -> [vfuncs]
        
        // field input event
        this.form.addEventListener("input", e => this.changeHandler(e));

        // form submit event
        this.form.addEventListener('submit', e => this.submitHandler(e));
    }

    // add a custom validation function
    // it's passed the field and must return true (valid) or false (invalid)
    addCustom(field, vfunc) {

        // get index of array of vfuncs for the specific field
        let c = field.CustomValidator;
        if (typeof c === 'undefined') {
            c = this.customFuncs.length;
            field.CustomValidator = c;
        }

        // store function reference
        this.customFuncs[c] = (this.customFuncs[c] || []).concat(vfunc);
    }

    // validate a field when input changes
    changeHandler(e) {
        const t = e.target;
        // if t is not null or undefined and constraints are valid -> execute custom validation functions
        if (t && t.checkValidity) {
            this.validateField(t);
        }
    }
  
    // validate all fields on submit
    submitHandler(e) {
        // validate all fields, keep track of total number of invalid fields
        let invCount = 0;
        Array.from(this.form.elements).forEach(f => {

            if (!this.validateField(f)) {
                invCount++;
            }
        });

        // at least one field is invalid
        if (invCount) {
            // stop submission
            e.stopImmediatePropagation();
            e.preventDefault();
            alert("There are some invalid fields!")
        }
        // form is valid - usually submit, however for our case we don't submit
        else {
            e.stopImmediatePropagation();
            e.preventDefault();
            alert("Successfully submitted form!");
            this.form.reset();
        }
    }

    // validate a field
    validateField(field) {
        const parent = field.parentElement;
        const c = field.CustomValidator;
        const inv = 'invalid';
        
        field.setCustomValidity('');
        // default validation
        let valid = field.checkValidity();

        // custom validation
        if (valid && typeof c !== 'undefined') {
            valid = !this.customFuncs[c].some(fn => !fn(field));
        }

        if (valid) {
            // field is valid
            parent.classList.remove(inv);
            return true;
        } else {
            // field is not valid
            field.setCustomValidity(inv);
            parent.classList.add(inv);
            return false;
        }
    }
}

function changeSunColour(colourString) {
    const sunSVG = document.querySelector("label svg.sun");
    for (let child of sunSVG.children) {
        if (child.getAttribute("stroke") !== null) {
            child.setAttribute("stroke", colourString);
        }
        if (child.getAttribute("fill") !== null) {
            child.setAttribute("fill", colourString);
        }
    }
}

function changeMoonColour(colourString) {
    const moonSVG = document.querySelector("label svg.moon");
    for (let child of moonSVG.children) {
        if (child.getAttribute("stroke") !== null) {
            child.setAttribute("stroke", colourString);
        }
        if (child.getAttribute("fill") !== null) {
            child.setAttribute("fill", colourString);
        }
    }
}

function setTheme() {
    const root = document.documentElement;
    const newTheme = root.className === "light" ? "dark" : "light";
    root.className = newTheme;
}

function run() {
    changeSunColour("white");
    changeMoonColour("black");
    const toggle = document.querySelector("#theme-toggle");
    toggle.addEventListener("change", setTheme);

    // validate sign up form
    const signUpForm = new FormValidate(document.getElementById("sign-up-details"));

    const allInputs = Array.from(document.querySelectorAll(".form-input"));
    const [firstName, lastName, email, phoneNumber, password, confirmPassword] = [...Array.from(allInputs)];

    signUpForm.addCustom(firstName, field => field.value);
    signUpForm.addCustom(lastName, field => field.value);
}

run();

/*
TEMPLATE FOR validateForm(e) FUNCTION
// validate form on submission
function validateForm(e) {
  const form = e.target;
  if (form.checkValidity()) {
    // form is valid - make further checks
  }
  else {
    // form is invalid - cancel submit
    e.preventDefault(); (might add form.reset())
    // apply invalid class
    Array.from(form.elements).forEach(i => {
      if (i.checkValidity()) {
        // field is valid - remove class
        i.parentElement.classList.remove('invalid');
      }
      else {
        // field is invalid - add class
        i.parentElement.classList.add('invalid');
      }
    });
  }
};

*/