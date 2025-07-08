import css from './SearchBar.module.css';
import toast from 'react-hot-toast';



const notify = () => toast('Please enter your search query.');


interface SearchBarProps{
    onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps ) {
    
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;

    if (query === "") {
      notify();
      return;
    }
    onSubmit(query);
  };
    return (
        <header className={css.header}>
  <div className={css.container}>
    <a
      className={css.link}
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by TMDB
    </a>
    <form action={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  </div>
</header>
    )
};