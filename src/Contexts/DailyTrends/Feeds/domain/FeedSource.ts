import { EnumValueObject } from '@/Contexts/Shared/domain/value-object/EnumValueObject'
import { InvalidArgumentError } from '@/Contexts/Shared/domain/exceptions/InvalidArgumentError'

export enum Source {
  CUSTOM = 'custom',
  EL_PAIS = 'el-pais',
  EL_MUNDO = 'el-mundo',
}

export class FeedSource extends EnumValueObject<Source> {
  constructor(value: Source) {
    super(value, Object.values(Source))
  }

  protected throwErrorForInvalidValue(value: Source): void {
    throw new InvalidArgumentError(`The feed source ${value} is invalid. Must be one of ${FeedSource.getValidValues().join(', ')}`)
  }

  public static getValidValues(): Source[] {
    return Object.values(Source)
  }
}
