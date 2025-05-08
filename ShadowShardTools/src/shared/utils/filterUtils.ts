// filterUtils.ts
/**
 * Extract all unique values from an array of objects for a specific key
 * @param items Array of items to extract values from
 * @param key The property key to extract values from (must be an array property)
 * @returns Array of unique values sorted alphabetically
 */
export function getAllUniqueValues<T extends { [key: string]: any }>(
  items: T[],
  key: string
): string[] {
  const uniqueValues = new Set<string>();
  
  items.forEach(item => {
    const values = item[key];
    if (Array.isArray(values)) {
      values.forEach(value => uniqueValues.add(value));
    }
  });
  
  return Array.from(uniqueValues).sort();
}

/**
 * Filter items based on a filter value and search term
 * @param items Array of items to filter
 * @param filter The current filter value (use 'all' for no filtering)
 * @param filterKey The property key to filter by
 * @param searchTerm Optional search term to further filter results
 * @param searchFields Array of item properties to search in
 * @returns Filtered array of items
 */
export function getFilteredItems<T extends { [key: string]: any }>(
  items: T[],
  filter: string,
  filterKey: string,
  searchTerm: string,
  searchFields: string[] = ['title', 'description']
): T[] {
  // First filter by category/tag
  const filteredByKey = filter === 'all'
    ? items
    : items.filter(item => {
        const values = item[filterKey];
        return Array.isArray(values) 
          ? values.includes(filter)
          : values === filter;
      });
  
  // Then filter by search term if provided
  if (!searchTerm) {
    return filteredByKey;
  }
  
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  return filteredByKey.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      
      // Handle array values (like features)
      if (Array.isArray(value)) {
        return value.some(v => 
          typeof v === 'string' && v.toLowerCase().includes(lowercaseSearchTerm)
        );
      }
      
      // Handle string values
      return typeof value === 'string' && value.toLowerCase().includes(lowercaseSearchTerm);
    });
  });
}