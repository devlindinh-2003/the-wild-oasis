import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filteredField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'with-discount', label: 'With discount' },
          { value: 'no-discount', label: 'Without discount' },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          {
            value: 'name-desc',
            label: 'Sort by name (Z-A)',
          },
          { value: 'regularPrice-asc', label: 'Sort by price (high first)' },
          {
            value: 'regularPrice-desc',
            label: 'Sort by price (low first)',
          },
          {
            value: 'maxCapacity-asc',
            label: 'Sort by capacity (high first)',
          },
          {
            value: 'maxCapacity-desc',
            label: 'Sort by capacity (low first)',
          },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
