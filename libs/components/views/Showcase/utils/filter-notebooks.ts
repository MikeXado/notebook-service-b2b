import { fetchWrapper } from '../../../../service/fetch-wrapper'
import type {
  Notebook,
  NotebookDto
} from '../../../../utils-schema/notebook.schema'
import NodeCache from 'node-cache'

const PAGE_DATA_LENGTH = 11

const filterToNotebookFieldMap: Record<string, keyof Notebook> = {
  mark: 'mark_name',
  proc: 'proc',
  ram: 'ram',
  hdd: 'hdd',
  display: 'display',
  lookout: 'lookout',
  poweron: 'poweron',
  new: 'is_new',
  serialNumber: 'serial_num',
  notebookName: 'item_name'
}

const cache = new NodeCache({ stdTTL: 1, checkperiod: 2 })

export async function getFilteredAndPaginatedNotebooksData(
  page: number,
  endpoint: string,
  category: string,
  objectSearchParams: { [key: string]: string | string[] | undefined }
): Promise<{ notebooks: Notebook[]; totalPages: number }> {
  const cacheKey = `notebooks_${category}_${page}`

  const cachedNotebooks = cache.get<Notebook[]>(cacheKey)
  const cachedTotalItems = cache.get<number>(category)
  if (cachedNotebooks) {
    const totalPages = Math.ceil((cachedTotalItems || 0) / PAGE_DATA_LENGTH)

    return {
      notebooks: cachedNotebooks,
      totalPages
    }
  }

  const notebooksToProcess = await getAllNotebooksData(endpoint)
  if (!notebooksToProcess || notebooksToProcess.length === 0) {
    return { notebooks: [], totalPages: 0 }
  }

  const searchParams = objectToSearchParams(objectSearchParams)
  const filteredNotebooks = filterNotebooks(notebooksToProcess, searchParams)
  const totalItems = filteredNotebooks.length
  const totalPages = Math.ceil(totalItems / PAGE_DATA_LENGTH)

  const paginatedNotebooks = paginateNotebooks(filteredNotebooks, page)
  return { notebooks: paginatedNotebooks, totalPages }
}

async function getAllNotebooksData(
  endpoint: string
): Promise<Notebook[] | null> {
  try {
    const response = await fetchWrapper<unknown, NotebookDto>({
      url: endpoint
    })
    if (response.result && response.result.items.length > 0) {
      return response.result.items
    }

    return null
  } catch (error) {
    return null
  }
}

function filterNotebooks(
  notebooks: Notebook[],
  searchParams: URLSearchParams
): Notebook[] {
  return notebooks.filter((notebook: Notebook) =>
    doesNotebookMatchFilters(notebook, searchParams)
  )
}

function doesNotebookMatchFilters(
  notebook: Notebook,
  searchParams: URLSearchParams
) {
  for (const paramKey of searchParams.keys()) {
    const notebookField = filterToNotebookFieldMap[paramKey]

    if (!notebookField) continue

    const paramValues = searchParams.getAll(paramKey)

    const notebookValue = String(notebook[notebookField]).toLowerCase()

    if (
      !paramValues.some((paramValue) => {
        if (paramKey === 'display') {
          const displaySize = extractDisplaySize(notebookValue)
          return displayMatches(displaySize, paramValue)
        } else {
          return notebookValue.includes(paramValue.toLowerCase())
        }
      })
    ) {
      return false
    }
  }

  return true
}

function extractDisplaySize(display: string): number | null {
  const match = display.match(/(\d{2}(\.\d+)?)/)
  return match ? parseFloat(match[0]) : null
}

function displayMatches(displaySize: number, filterValue: string): boolean {
  if (filterValue.includes('-')) {
    const [min, max] = filterValue.split('-').map(parseFloat)
    return displaySize >= min && displaySize <= max
  }
  return displaySize === parseFloat(filterValue)
}

function paginateNotebooks(
  filteredNotebooks: Notebook[],
  page: number
): Notebook[] {
  const startIndex = (page - 1) * PAGE_DATA_LENGTH
  const endIndex = startIndex + PAGE_DATA_LENGTH
  return filteredNotebooks.slice(startIndex, endIndex)
}

function objectToSearchParams(obj: {
  [key: string]: string | string[] | undefined
}): URLSearchParams {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v))
    } else {
      params.set(key, value)
    }
  }
  return params
}
