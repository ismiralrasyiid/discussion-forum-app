import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Contents from '../components/Contents';
import NewThreadForm from '../components/NewThreadForm';
import useInput from '../hooks/useInput';
import { fetchCreateThread } from '../states/threads/action';

function Create() {
  const defaultInput = '';
  const [title, onTitleChangeHandler] = useInput(defaultInput);
  const [category, onCategoryChangeHandler] = useInput(defaultInput);
  const [body, onBodyChangeHandler] = useInput(defaultInput);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitCreateHandler = (event) => {
    event.preventDefault();

    if (!title || !body) return toast.error('Judul dan konten tidak boleh kosong');
    const action = fetchCreateThread({ title, category, body });

    dispatch(action);
    return navigate('/');
  };

  return (
    <Contents>
      <main className="create">
        <h2>Bahas tema baru</h2>
        <NewThreadForm
          title={title}
          category={category}
          body={body}
          onTitleChangeHandler={onTitleChangeHandler}
          onCategoryChangeHandler={onCategoryChangeHandler}
          onBodyChangeHandler={onBodyChangeHandler}
          onSubmitCreateHandler={onSubmitCreateHandler}
        />
      </main>
    </Contents>
  );
}

export default Create;
