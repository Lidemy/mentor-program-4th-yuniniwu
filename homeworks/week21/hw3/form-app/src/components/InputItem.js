import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormRow = styled.div`
  margin: 5vmin 0;

  span {
    color: #e74149;
    padding-left: 0.5rem;
  }

  & label,
  & legend {
    display: block;
  }

  & input {
    margin-top: 2vmin;
    height: 2.5rem;
    padding: 0 0.5rem;
    font-size: 1.2rem;
    border: none;
    border-bottom: 0.1vmin #c9c9c9 solid;

    &:focus {
      outline: 0;
      border-bottom: 0.4vmin #fad312 solid;
    }
  }

  input[type='radio'] {
    margin: 0 0.5rem 0.5rem 0;
    vertical-align: middle;
  }
`;

const Alert = styled.div`
  color: #e74149;
  font-size: 1rem;
  margin-top: 1vmin;
  margin-left: 2vmin;
`;

const InputItem = ({
  type,
  name,
  value,
  question,
  placeholder,
  required,
  hasError,
  errorMessage,
  handleInputChange,
}) => {
  return (
    <FormRow>
      <label htmlFor={name}>
        {question}
        {required && <span>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {required && hasError && !value && <Alert>{errorMessage}</Alert>}
    </FormRow>
  );
};

InputItem.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  question: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleInputChange: PropTypes.func,
};

const Radio = ({ name, value, checked, label, handleInputChange }) => {
  return (
    <div>
      <label htmlFor={value}>
        <input
          type='radio'
          id={value}
          name={name}
          value={value}
          checked={checked}
          onChange={handleInputChange}
        />
        {label}
      </label>
    </div>
  );
};

Radio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  handleInputChange: PropTypes.func,
};

const OptionItem = ({
  name,
  value,
  question,
  required,
  hasError,
  errorMessage,
  handleInputChange,
}) => {
  return (
    <FormRow>
      <legend>
        {question}
        {required && <span>*</span>}
      </legend>
      <Radio
        name={name}
        value='1'
        checked={value === '1'}
        label={'躺在床上用想像力實作'}
        handleInputChange={handleInputChange}
      />
      <Radio
        name={name}
        value='2'
        checked={value === '2'}
        label={'趴在地上滑手機找現成的'}
        handleInputChange={handleInputChange}
      />
      {required && hasError && !value && <Alert>{errorMessage}</Alert>}
    </FormRow>
  );
};

OptionItem.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  question: PropTypes.string,
  required: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleInputChange: PropTypes.func,
};

export { InputItem, OptionItem };
