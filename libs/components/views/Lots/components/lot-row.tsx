import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../shared/ui/table'
import { Lot } from '../../../../utils-schema/lots.schema'
import { Minus } from 'lucide-react'

export default function LotRow({ lots }: { lots: Lot[] }) {
  return (
    <Table className="overscroll-contain">
      <TableHeader>
        <TableRow className="text-xs font-normal text-secondary-foreground">
          <TableHead>№</TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Состояние</TableHead>
          <TableHead>Экран</TableHead>
          <TableHead>CPU</TableHead>
          <TableHead>GPU</TableHead>
          <TableHead>RAM</TableHead>
          <TableHead>HDD/SSD</TableHead>
          <TableHead>Батарея</TableHead>
          <TableHead>Прим.:</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lots.map((lot, index) => (
          <TableRow
            className="whitespace-nowrap text-base"
            key={lot.serial_num}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{lot.item_name}</TableCell>
            <TableCell>{lot.poweron}</TableCell>
            <TableCell>{lot.display}</TableCell>
            <TableCell>{lot.proc || <Minus />}</TableCell>
            <TableCell>{lot.video || lot.integ_video || <Minus />}</TableCell>
            <TableCell>{lot.ram}</TableCell>
            <TableCell>{lot.hdd}</TableCell>
            <TableCell>{lot.battery}</TableCell>
            <TableCell>{lot.note || <Minus />}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
