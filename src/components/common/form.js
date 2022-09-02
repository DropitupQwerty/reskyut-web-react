import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import { Button } from '@mui/material';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = { abortEarly: true };

    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const schema = { [name]: this.schema[name] };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) return;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.error };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = (label, style) => {
    return (
      <Button sx={style} disabled={this.validate()} className="btn btn-primary">
        {label}
      </Button>
    );
  };

  renderInput = (name, label, type = 'text', placeholder, style) => {
    const { data, errors } = this.state;
    return (
      <Input
        style={style}
        type={type}
        onChange={this.handleChange}
        placeholder={placeholder}
        label={label}
        name={name}
        value={data[name]}
        error={errors[name]}
      />
    );
  };
}

export default Form;
