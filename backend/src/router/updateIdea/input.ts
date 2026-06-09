import { z } from 'zod'
import { zCreateIdeaTrpcInput } from '../createIdea/input'

export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput.extend({
  id: z.string().min(1),
})
