import React, { useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from './AnimatedSection';
import TabButton from './TabButton';
import LoadingSpinner from './LoadingSpinner';
import { useItemsInView } from '../utils/useItemInView';
import { getFilteredItems, getAllUniqueValues } from '../utils/filterUtils';

interface FilterableListProps<T extends { [key: string]: any }> {
  items: T[];
  filterKey: string;
  searchFields?: string[];
  renderItem: (item: T, isVisible: boolean, index: number) => React.ReactNode;
  title: string;
  subtitle: string;
  emptyMessage?: string;
  loading?: boolean;
  showSearchInput?: boolean;
  filterLabelFn?: (value: string) => string;
  showDeprecated?: boolean;
  toggleShowDeprecated?: () => void;
}

function FilterableList<T extends { [key: string]: any }>({
  items,
  filterKey,
  searchFields = ['title', 'description'],
  renderItem,
  title,
  subtitle,
  emptyMessage = 'No items match your current filters.',
  loading = false,
  showSearchInput = true,
  filterLabelFn = (val) => val.charAt(0).toUpperCase() + val.slice(1)
}: FilterableListProps<T>) {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDeprecated, setShowDeprecated] = useState<boolean>(true);

  const toggleShowDeprecated = () => setShowDeprecated((prev) => !prev);

  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });
  const { ref: filtersRef, inView: filtersInView } = useInView({ triggerOnce: true });

  const maxItems = Math.max(12, items.length);
  const itemRefs = useItemsInView(maxItems);

  const filterValues = useMemo(() => getAllUniqueValues(items, filterKey), [items, filterKey]);

  const filteredItems = useMemo(() => {
    let filtered = getFilteredItems(items, filter, filterKey, searchTerm, searchFields);
    if (!showDeprecated) {
      filtered = filtered.filter((item) => String(item.deprecated).toLowerCase() !== 'true');
    }
    return filtered;
  }, [items, filter, filterKey, searchTerm, searchFields, showDeprecated]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearFilters = () => {
    setFilter('all');
    setSearchTerm('');
    setShowDeprecated(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen py-12">
      <AnimatedSection inView={headerInView} className="text-center mb-12">
        <div ref={headerRef}>
          <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">{title}</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            {subtitle}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection inView={filtersInView} delay={200}>
        <div ref={filtersRef} className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2 items-center">
            <TabButton active={filter === 'all'} onClick={() => setFilter('all')}>
              All {title}
            </TabButton>

            {filterValues.map((value) => (
              <TabButton
                key={value}
                active={filter === value}
                onClick={() => setFilter(value)}
              >
                {filterLabelFn(value)}
              </TabButton>
            ))}

            {typeof showDeprecated === 'boolean' && toggleShowDeprecated && (
              <div className="flex items-center justify-end">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showDeprecated}
                    onChange={toggleShowDeprecated}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-300">Show Deprecated</span>
                </label>
              </div>
            )}
          </div>

          {showSearchInput && (
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          )}
        </div>
      </AnimatedSection>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredItems.map((item, index) => {
            const { ref, inView } = itemRefs[index % itemRefs.length];
            return (
              <div key={item.id} ref={ref}>
                {renderItem(item, inView, index)}
              </div>
            );
          })}
        </div>
      ) : (
        <AnimatedSection inView={true} delay={300}>
          <div className="text-center py-12">
            <p className="text-gray-300 text-xl">{emptyMessage}</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-6 py-2 bg-slate-700 rounded-xl shadow-lg text-white hover:bg-slate-600 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}

export default FilterableList;
