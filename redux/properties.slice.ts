import { createSlice } from '@reduxjs/toolkit';
import Property from '../types/Property';

const initialState: { value: Property[] } = {
  value: [
    {
      id: 'berliner_str',
      name: 'Berliner Str.',
      sort_number: 0,
      available_categories: [
        { val: 'praxis', label: 'Praxis' },
        { val: 'general', label: 'General' },
        { val: 'carl_private', label: 'Carl' },
      ],
    },
    {
      id: 'gaisberg_str',
      name: 'Gaisbergstr.',
      sort_number: 1,
      sub_property: [
        {
          id: 'gaisberg_str_gb',
          name: 'Gaisbergstr. Gebäude',
          sort_number: 0,
          available_categories: [
            { val: 'side_cost', label: 'Side Costs' },
            { val: 'renovation', label: 'Renovation Costs' },
            { val: 'Costs', label: 'Costs' },
          ],
        },
        {
          id: 'gaisberg_str_eg',
          name: 'Gaisbergstr. EG',
          sort_number: 1,
          available_categories: [
            { val: 'side_cost', label: 'Side Costs' },
            { val: 'renovation', label: 'Renovation Costs' },
            { val: 'Costs', label: 'Costs' },
          ],
        },
        {
          id: 'gaisberg_str_first',
          name: 'Gaisbergstr. 1. Fl.',
          sort_number: 2,
          available_categories: [
            { val: 'side_cost', label: 'Side Costs' },
            { val: 'renovation', label: 'Renovation Costs' },
            { val: 'Costs', label: 'Costs' },
          ],
        },
        {
          id: 'gaisberg_str_dg',
          name: 'Gaisbergstr. DG',
          sort_number: 3,
          available_categories: [
            { val: 'side_cost', label: 'Side Costs' },
            { val: 'renovation', label: 'Renovation Costs' },
            { val: 'Costs', label: 'Costs' },
          ],
        },
      ],
    },
    {
      id: 'oftersheim',
      name: 'Oftersheim',
      sort_number: 2,
      sub_property: [
        {
          id: 'oftersheim_gb',
          name: 'Oftersheim Gebäude',
          sort_number: 0,
          available_categories: [
            { val: 'side_cost', label: 'Side Costs' },
            { val: 'renovation', label: 'Renovation Costs' },
            { val: 'Costs', label: 'Costs' },
          ],
        },
        {
          id: 'oftersheim_eg',
          name: 'Oftersheim EG',
          sort_number: 1,
          available_categories: [
            { val: 'side_cost', label: 'Side Costs' },
            { val: 'renovation', label: 'Renovation Costs' },
            { val: 'Costs', label: 'Costs' },
          ],
        },
        {
          id: 'oftersheim_first',
          name: 'Oftersheim 1. Fl.',
          sort_number: 2,
          available_categories: [
            { val: 'side_cost', label: 'Side Costs' },
            { val: 'renovation', label: 'Renovation Costs' },
            { val: 'Costs', label: 'Costs' },
          ],
        },
        {
          id: 'oftersheim_dg',
          name: 'Oftersheim DG',
          sort_number: 3,
          available_categories: [
            { val: 'side_cost', label: 'Side Costs' },
            { val: 'renovation', label: 'Renovation Costs' },
            { val: 'Costs', label: 'Costs' },
          ],
        },
      ],
    },
    {
      id: 'zehn_str_32',
      name: 'Zehnstr. 32',
      sort_number: 3,
      available_categories: [
        { val: 'side_cost', label: 'Side Costs' },
        { val: 'renovation', label: 'Renovation Costs' },
        { val: 'Costs', label: 'Costs' },
      ],
    },
    {
      id: 'hurkan_expenses',
      name: "Hurkas's Expenses",
      sort_number: 4,
      available_categories: [{ val: 'expenses', label: 'Expenses' }],
    },
  ],
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
});

export default propertiesSlice.reducer;
