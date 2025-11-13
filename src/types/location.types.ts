import { z } from 'zod';
export const locationSchema = z.object({
  coordinates: z.object({
    lon: z.number().min(-180, "Min -180").max(180, "Max 180"),
    lat: z.number().min(-90, "Min -90").max(90, "Max 90"),
  }),
  name: z
    .string()
    .min(2, "Min 2 characters")
    .max(60, "Max 60 characters"),
    category: z.string().refine(
      (val) => ['office', 'store', 'landmark'].includes(val),
      { message: 'Invalid category' }
    ),
  address: z.string().max(120).optional(),
  notes: z.string().max(500).optional(),
});
export type LocationFormData = z.infer<typeof locationSchema>;
export interface Location extends LocationFormData {
  _id: string;
}
