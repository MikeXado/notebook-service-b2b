export const USER_ACTION = {
  DO_ORDER: 'DO_ORDER'
}

const USER_ROLE = {
  NOT_ACTIVE: 'NOT_ACTIVE',
  ACTIVE: 'ACTIVE'
}

const ABILITIES_MAP = {
  [USER_ROLE.NOT_ACTIVE]: [],
  [USER_ROLE.ACTIVE]: [USER_ACTION.DO_ORDER]
}

const isUserAble = (toDo: string[], grantedAbilities: string[]) => {
  return toDo.some((userAction) => grantedAbilities.includes(userAction))
}

export function ifAble({
  toDo = [],
  isUserActive
}: {
  toDo: string[]
  isUserActive: boolean
}) {
  const role = isUserActive ? USER_ROLE.ACTIVE : USER_ROLE.NOT_ACTIVE
  const grantedAbilities = ABILITIES_MAP[role]

  return isUserAble(toDo, grantedAbilities)
}
