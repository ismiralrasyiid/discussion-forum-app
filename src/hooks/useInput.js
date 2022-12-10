import { useState } from 'react';

const useInput = (defaultValue = '') => {
  const [input, setInput] = useState(defaultValue);
  const onInputChangeHandler = (event) => {
    setInput(event.target.value);
  };
  return [input, onInputChangeHandler];
};

export default useInput;
