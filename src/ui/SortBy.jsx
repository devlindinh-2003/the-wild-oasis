import { useSearchParams } from 'react-router-dom';
import Select from './Select';

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select options={options} onChange={handleChange}>
      Sort
    </Select>
  );
};

export default SortBy;
