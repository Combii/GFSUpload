const schema = {
  name: value => {
    const errors = [];

    if (value.charAt(0) === "J") {
      errors.push("Name can't start with J");
    }

    if (value.charAt(value.length - 1) === "e")
      errors.push("Name can't end with e");

    return errors;
  },
  age: value => {
    if (value < 18) return ["age must be 18 or above"];
    if (value > 100) return ["age must be below 100"];

    return [];
  }
};

let info = {
  name: "John b0ss :0)e",
  age: 1000
};

const errors = {};

//Object.keys(schema) ['name','age']


Object.keys(schema).forEach(key => (errors[key] = schema[key](info[key])));

console.log(errors);

/* errors['name'] = ['test'];

 */

/* const validate = (object, schema) =>
  Object.keys(schema)
    .filter(key => !schema[key](object[key]))
    .map(key => new Error(`${key} is invalid.`));

const errors = validate(info, schema);

if (errors.length > 0) {
  for (const { message } of errors) {
    console.log(message);
  }
} else {
  console.log("info is valid");
} */
