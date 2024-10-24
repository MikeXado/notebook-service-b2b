import React from 'react'
import { RowItem } from './notebook-row'

export default function NotebookRowDetails({
  battery,
  note
}: {
  battery: string
  note: string
}) {
  return (
    <>
      <div />
      <div />

      {battery && (
        <RowItem className="col-span-2" title="Батарея">
          <p>{battery}</p>
        </RowItem>
      )}

      {note && (
        <RowItem className="col-span-5" title="Прим:">
          <p>{note}</p>
        </RowItem>
      )}
    </>
  )
}
