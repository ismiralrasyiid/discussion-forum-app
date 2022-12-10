import React from 'react';
import PropTypes from 'prop-types';

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
      <button type="submit">Buat</button>
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
