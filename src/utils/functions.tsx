import {ItemProps} from '../components/common/Item';

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function filterByCategory(
  items: ItemProps[],
  filterBy: string,
): ItemProps[] {
  return items.filter(item => item.category === filterBy);
}
export function sortByCategory(
  items: ItemProps[],
  sortBy: string,
): ItemProps[] {
  switch (sortBy) {
    case 'Low Price': {
      return [...items].sort((a, z) => a.price - z.price);
    }
    case 'High Price': {
      return [...items].sort((a, z) => z.price - a.price);
    }
    case 'Low Rating': {
      return [...items].sort((a, z) => a.rating.rate - z.rating.rate);
    }
    case 'High Rating': {
      return [...items].sort((a, z) => z.rating.rate - a.rating.rate);
    }
    default: {
      return [...items];
    }
  }
}
