'use client'
import React, { useState } from 'react'
import { RowItem } from '../../../Showcase/components/notebook-row'
import { OrderStatus } from './order-status'
import { ChevronDown } from 'lucide-react'
import { Order, OrderItem } from '../../../../../utils-schema/order.schema'
import { cn } from '../../../../../utils/cn'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../../shared/ui/table'

const formatPrice = (price: number) => {
  if (!price) return 0

  return price?.toFixed(2) || 0
}

export function OrderRow({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'bg-white p-3 rounded-lg shadow relative',
        isExpanded && 'flex flex-col gap-3 w-full'
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-5">
        <RowItem className="lg:col-span-2" title="Номер заказа">
          <p className="text-primary">№ {order.order_id}</p>
        </RowItem>

        <RowItem className="lg:col-span-2" title="Статус заказа">
          <OrderStatus status={order.status} />
        </RowItem>

        <RowItem className="lg:col-span-2" title="Дата заказа">
          <p>{order.order_date}</p>
        </RowItem>

        <RowItem title="Кол-во">
          <p>{order.items.length}</p>
        </RowItem>

        <RowItem title="Сумма">
          <p>{formatPrice(order.order_sum)}</p>
        </RowItem>
      </div>

      {isExpanded && (
        <>
          <div className="h-1 w-full bg-gray-200"></div>
          <OrderItemsTable orderItems={order.items} />
        </>
      )}
      <button className="absolute bottom-1 right-1 border rounded-lg hover:bg-gray-200">
        <ChevronDown
          className={cn(
            'text-primary w-5 h-5 transition-all duration-300',
            isExpanded && 'rotate-180'
          )}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      </button>
    </div>
  )
}

function OrderItemsTable({ orderItems }: { orderItems: OrderItem[] }) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="text-xs whitespace-nowrap text-secondary-foreground">
          <TableHead className="font-normal">Артикул</TableHead>
          <TableHead className="font-normal">Наименование</TableHead>
          <TableHead className="font-normal">Кол-во</TableHead>
          <TableHead className="font-normal">Цена</TableHead>
          <TableHead className="font-normal">Сумма</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderItems.map((item, index) => (
          <TableRow
            className="whitespace-nowrap text-base"
            key={item.serial_num + '_' + index}
          >
            <TableCell>{item.serial_num}</TableCell>
            <TableCell>{item.item_name}</TableCell>
            <TableCell>{item.num}</TableCell>
            <TableCell>{formatPrice(item.item_price)}</TableCell>
            <TableCell>{formatPrice(item.item_sum)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
