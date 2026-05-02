import styles from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  onSubmit: (query: string) => void;
};

const SearchBar = ({ onSubmit }: Props) => {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query');

    if (typeof query !== 'string' || !query.trim()) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />

          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
        <Toaster position="top-center" />
      </div>
    </header>
  );
};

export default SearchBar;
