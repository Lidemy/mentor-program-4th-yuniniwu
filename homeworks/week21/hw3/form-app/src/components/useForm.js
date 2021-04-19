import { useState } from 'react';

const useForm = () => {
  const [inputValue, setInputValue] = useState({
    nickname: '',
    email: '',
    phone_number: '',
    attending_types: '',
    other_info: '',
    suggestion: '',
  });

  const [hasError, setHasError] = useState(false);

  const {
    nickname,
    email,
    phone_number,
    attending_types,
    other_info,
    suggestion,
  } = inputValue;

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !nickname ||
      !email ||
      !phone_number ||
      !attending_types ||
      !other_info
    ) {
      return setHasError(true);
    }
    setHasError(false);
    alert(JSON.stringify(inputValue));
  };

  return {
    inputValue,
    hasError,
    nickname,
    email,
    phone_number,
    attending_types,
    other_info,
    suggestion,
    handleInputChange,
    handleSubmit,
  };
};

export default useForm;
