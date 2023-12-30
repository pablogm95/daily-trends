import { z } from 'zod'
import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'
import { Source } from '@/Contexts/Shared/domain/FeedSource'
import { PropertyRequiredError } from '@/Contexts/Shared/domain/exceptions/PropertyRequiredError'

interface IFeedCreationDTOResult {
  source: Source;
}

interface IFeedCreationDTOParams {
  source: string;
}

const schema = z.object({
  source: z.enum([Source.EL_MUNDO, Source.EL_PAIS]),
})

export class FeedCreationDTO
implements DataTransferObject<IFeedCreationDTOResult>
{
  source: string

  constructor({ source }: IFeedCreationDTOParams) {
    this.source = source
  }

  sanitize() {
    const result = schema.safeParse({
      source: this.source,
    })

    if (!result.success) {
      throw new PropertyRequiredError(result.error.message)
    } else {
      return result.data
    }
  }
}
