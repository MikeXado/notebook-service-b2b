// app essentials
export const NOT_ACTIVE_PHONE = '094-917-5358'

// local storage
export const LOTS_CART_KEY = 'lotsCart'
export const NOTEBOOKS_CART_KEY = 'notebookCart'
export const ORDERS_STORE_KEY = 'ordersStore'

export const AUTH_TOKEN_KEY = 'token'
export const TOKEN_EXP_TIME_KEY = 'tokenExpTime'

// sentry
export const SENTRY_DSN =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://9109d47a099f408da3b9429fc9c9dcc5@o1062531.ingest.sentry.io/6052948'

// api
export const API_ROOT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/service'
    : `${process.env['URL']}/service`
export const API_LOGIN = 'login.php'
export const API_LOTS = 'get-items-lot.php'
export const API_NOTEBOOKS = 'get-items-main.php'
export const API_NOTEBOOKS_UNFINISHED = 'get-items-unfinished.php'
export const API_NOTEBOOKS_BY_SERIAL = 'get-items-by-serial.php'
export const API_ORDERS = 'get-orders.php'
export const API_MANAGER = 'get-mngr-info.php'
export const API_GET_EXRATE = 'get-exrate.php'
export const API_REGISTER = 'do-register.php'
export const API_DO_ORDER = 'do-order-by-serial.php'
export const API_DO_ORDER_LOTS = 'do-order-lot.php'
export const API_FILTERS = 'get-filters.php'
export const API_FILTERS_UNFINISHED = 'get-filters-unfinished.php'
export const GET_ITEMS_MAIN_XLSX = 'get-items-main-xlsx.php'

// app routes
export const ROOT_ROUTE = '/'
export const REGISTRATION_ROUTE = '/sign-up'
export const LOGIN_ROUTE = '/sign-in'
export const SHOWCASE_ROUTE = '/showcase/finished'
export const SHOWCASE_UNFINISHED_ROUTE = '/showcase/unfinished'
export const LOTS_ROUTE = '/showcase/lots'
export const SHOPPING_CART_ROUTE = '/showcase/cart'
export const ORDERS_ROUTE = '/showcase/orders'

// enum constants
export const DisplayConditions = {
  Good: 'Хорошая',
  Defective: 'С дефектом',
  Questionable: 'Под вопросом',
  Bad: 'Плохая'
}

export const DisplayFiltersTypes = {
  mark: 'Производитель',
  proc: 'CPU',
  ram: 'RAM',
  hdd: 'Накопитель',
  display: 'Экран',
  lookout: 'Внешний вид',
  poweron: 'Включается'
}

export const filterKeys = [
  'mark',
  'proc',
  'ram',
  'hdd',
  'display',
  'lookout',
  'poweron'
]

export const displayOptions = [
  {
    label: 'от 10 до 12.5',
    value: '10-12.5'
  },
  {
    label: 'от 13 до 14',
    value: '13-14'
  },
  {
    label: '15.6',
    value: '15.6'
  },
  {
    label: '16',
    value: '16'
  },
  {
    label: 'от 17.3 до 20',
    value: '17-20'
  }
]
