export type FilterAction =
    | { type: 'SET_FILTER', name: string, value: string | number }
    | { type: 'SET_SHINY', value: boolean }
    | { type: 'CLEAR_FILTERS' }
    | { type: 'SLIDER_CONTROL', name: string, value: number }
