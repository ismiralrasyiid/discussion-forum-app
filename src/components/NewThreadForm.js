import React from 'react';
import PropTypes from 'prop-types';
import { NewThreadButton } from './styled/buttons';

function NewThreadForm({
  title,
  category,
  body,
  onTitleChangeHandler,
  onCategoryChangeHandler,
  onBodyChangeHandler,
  onSubmitCreateHandler,
}) {
  return (
    <form onSubmit={onSubmitCreateHandler}>
      <input
        type="text"
        placeholder="Tulis judul di sini"
        value={title}
        onChange={onTitleChangeHandler}
      />
      <input
        type="text"
        placeholder="Tulis kategory di sini"
        value={category}
        onChange={onCategoryChangeHandler}
      />
      <textarea
        placeholder="Tulis konten di sini"
        value={body}
        onChange={onBodyChangeHandler}
      />
      <NewThreadButton type="submit">Buat</NewThreadButton>
    </form>
  );
}

NewThreadForm.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onTitleChangeHandler: PropTypes.func.isRequired,
  onCategoryChangeHandler: PropTypes.func.isRequired,
  onBodyChangeHandler: PropTypes.func.isRequired,
  onSubmitCreateHandler: PropTypes.func.isRequired,
};

export default NewThreadForm;
