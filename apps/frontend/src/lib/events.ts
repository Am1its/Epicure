export const CUISINE_FILTER_EVENT = 'epicure:cuisine-filter';
export const CHEF_HIGHLIGHT_EVENT = 'epicure:chef-highlight';
export const PENDING_CUISINE_KEY = 'epicure_pending_cuisine_filter';
export const PENDING_CHEF_KEY = 'epicure_pending_chef_highlight';
export const PENDING_DISH_KEY = 'epicure_pending_dish_highlight';

export function dispatchCuisineFilter(labels: string[]): void {
  sessionStorage.setItem(PENDING_CUISINE_KEY, JSON.stringify(labels));
  window.dispatchEvent(new CustomEvent(CUISINE_FILTER_EVENT, { detail: labels }));
}

export function dispatchChefHighlight(id: number): void {
  sessionStorage.setItem(PENDING_CHEF_KEY, String(id));
  window.dispatchEvent(new CustomEvent(CHEF_HIGHLIGHT_EVENT, { detail: id }));
}
