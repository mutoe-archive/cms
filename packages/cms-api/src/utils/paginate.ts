import { ApiProperty } from '@nestjs/swagger'
import { FindConditions, FindManyOptions, ObjectLiteral, Repository } from 'typeorm'

export class PaginationMeta {
  @ApiProperty({ example: 15, description: 'Total number of items' })
  total: number

  @ApiProperty({ example: 10, description: 'How many pieces of data are displayed per page' })
  limit: number

  @ApiProperty({ example: 2 })
  totalPages: number

  @ApiProperty({ example: 1 })
  currentPage: number
}

export interface PaginationRo<T> {
  readonly items: T[]
  readonly meta: PaginationMeta
}

type ClassType<T = any> = new (...args: any[]) => T

// istanbul ignore next
export function PaginationRo<T extends ClassType> (ResourceClass: T) {
  class Pagination implements PaginationRo<T> {
    @ApiProperty({ type: [ResourceClass] })
    readonly items: T[]

    @ApiProperty({ type: PaginationMeta, description: 'Paging data information' })
    readonly meta: PaginationMeta
  }

  return Pagination
}

export interface PaginationOptions {
  page?: number
  limit?: number
}

export async function paginate<T extends ObjectLiteral> (
  repository: Repository<T>,
  options: PaginationOptions = {},
  searchOptions: FindConditions<T> | FindManyOptions<T> = {},
): Promise<PaginationRo<T>> {
  const page = options.page || 1
  const limit = options.limit || 10

  const offset = (page - 1) * limit
  searchOptions = Object.assign({ skip: offset, take: limit }, searchOptions)
  const [items, total] = await repository.findAndCount(searchOptions)

  const totalPages = Math.ceil(total / limit)

  const meta: PaginationMeta = {
    total,
    limit,
    totalPages,
    currentPage: page,
  }

  return { items, meta }
}
