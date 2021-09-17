import React from 'react';
import SearchIcon from 'assets/icons/search-icon';
import { useSearch } from 'contexts/search/use-search';
import {
  SearchBase,
  SearchIconWrapper,
  SearchInput,
} from 'components/utils/theme';

type SearchProps = { className?: string; id?: string };

const Search: React.FC<SearchProps> = ({ className, ...props }) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const onSearch = (e) => {
    // e.preventDefault();
    const { value } = e.currentTarget;
    setSearchTerm(value);
  };
  const onSubmit = (e) => e.preventDefault();

  const classNames = SearchBase + ' ' + className;
  return (
    <form noValidate role="search" className={classNames} onSubmit={onSubmit}>
      <span className={SearchIconWrapper}>
        <SearchIcon color="#999999" />
      </span>
      {/* <label htmlFor={props.id || 'search-normal'} className="sr-only">
        {props.id || 'search-normal'}
      </label> */}
      <input
        type="search"
        placeholder="Search your medicine here"
        className={SearchInput}
        value={searchTerm}
        onChange={onSearch}
        // id={props.id || 'search-normal'}
        autoComplete="off"
        {...props}
      />
    </form>
  );
};

export default Search;
