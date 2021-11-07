import React from 'react'
import { ReactComponent as Cross } from '../../../../assets/icons/cross.svg'
import { ReactComponent as Check } from '../../../../assets/icons/check-mark.svg'
import styled from 'styled-components'
import { flexAlign, smallGap } from '../../../shared/styled/css'
import { SpacerH5 } from '../../../shared/styled/Spacers'

export const NotebookPowerOn = ({ powerOn, big = false }) => {
  const isPowerOn = powerOn === 'Да'
  return (
    <>
      {isPowerOn
        ? <StyledWrapper big={big}> <StyledCheck /> Рабочий </StyledWrapper>
        : <StyledWrapper big={big}> <StyledCross /> Не вкл-ся </StyledWrapper>}
      <SpacerH5 />
    </>
  )
}

const StyledWrapper = styled.div`
  color: ${({ theme, big }) => big ? theme.typography.main : theme.typography.light};
  font-size: ${({ big }) => big ? '1' : '.8'}rem;
  ${flexAlign}
  ${smallGap}
`

const StyledCheck = styled(Check)`
  stroke: ${({ theme }) => theme.status.success};
  height: 10px;
`

const StyledCross = styled(Cross)`
  stroke: ${({ theme }) => theme.status.error};
  height: 10px;
`