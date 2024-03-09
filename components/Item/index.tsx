'use client'

import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'


type Props = {
  id: string
}

const ItemComponent = ({ id }: Props) => {
  const [item, setItem] = useState<Item | null>(null)
  const [status, setStatus] = useState<Status[]>([])
  const router = useRouter()

  useEffect(() => {
    const status = localStorage.getItem('status')

    if (!status) return

    const parsedStatus: KanbanType = JSON.parse(status)
    let statusArray: Status[] = []

    parsedStatus.forEach((status) => {

      let statusObj: Status = {
        title: status.title,
        id: status.id,
        selected: false,
      }
      status.items.forEach((item) => {
        if (item.id === id) {
          setItem(item)
          statusObj.selected = true
        }
      })

      statusArray.push(statusObj)
    })

    setStatus(statusArray)

  }, [id])

  const selectedStatus = status.find((status) => status.selected)

  const handleSelectChange = (value: string) => {

    // Get the status from local storage
    const localStatus = localStorage.getItem('status')

    // If status is not found, return
    if (!localStatus) return

    // Parse the status
    const parsedStatus: KanbanType = JSON.parse(localStatus)

    // Find the from status
    const fromStatus = parsedStatus.find((status) => status.id === selectedStatus?.id)

    // Find the to status
    const toStatus = parsedStatus.find((status) => status.id === value)

    // If from or to status is not found, return
    if (!fromStatus || !toStatus) return

    // Find the item index
    const itemIndex = fromStatus.items.findIndex((item) => item.id === id)

    // If item is not found, return
    if (itemIndex === -1) return

    // Get the item
    const item = fromStatus.items[itemIndex]

    // Remove the item from from status
    fromStatus.items.splice(itemIndex, 1)

    // Add the item to to status
    toStatus.items.push(item)

    // Set the status to local storage
    localStorage.setItem('status', JSON.stringify(parsedStatus))

    // Update the status state
    setStatus((prevStatus) => {
      return prevStatus.map((status) => {
        if (status.id === fromStatus.id) {
          return {
            ...status,
            selected: false
          }
        }
        if (status.id === toStatus.id) {
          return {
            ...status,
            selected: true
          }
        }
        return status
      })
    })

    toast.success('Item moved successfully')
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    if (!item) return

    const localStatus = localStorage.getItem('status')

    if (!localStatus) return

    const parsedStatus: KanbanType = JSON.parse(localStatus)

    const itemStatus = parsedStatus.find((status) => status.id === selectedStatus?.id)

    if (!itemStatus) return

    const itemIndex = itemStatus.items.findIndex((item) => item.id === id)

    if (itemIndex === -1) return

    itemStatus.items[itemIndex] = item

    localStorage.setItem('status', JSON.stringify(parsedStatus))

    toast.success('Item updated successfully')

    router.push('/')
  }

  const handleDelete = () => {
    if (!item) return

    const localStatus = localStorage.getItem('status')

    if (!localStatus) return

    const parsedStatus: KanbanType = JSON.parse(localStatus)

    const itemStatus = parsedStatus.find((status) => status.id === selectedStatus?.id)

    if (!itemStatus) return

    const itemIndex = itemStatus.items.findIndex((item) => item.id === id)

    if (itemIndex === -1) return

    itemStatus.items.splice(itemIndex, 1)

    localStorage.setItem('status', JSON.stringify(parsedStatus))

    toast.success('Item deleted successfully')

    router.push('/')
  }

  return (
    <div className='w-full min-h-[100vh] flex flex-col gap-[1rem] items-center justify-center'>
      <h2 className='text-2xl font-medium text-black/70'>Item Detail</h2>
      {
        item ? (
          <form onSubmit={handleSave} className='w-[29vw] h-fit bg-white p-[1rem] rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
            <label
              htmlFor='title'
              className='text-black/70 font-medium'>Title</label>
            <input
              name='title'
              className='w-full border border-black/30 focus:outline-none rounded-md px-[1rem] py-[0.5rem]  mb-[1rem]'
              type='text'
              value={item.title}
              onChange={(e) => {
                setItem({ ...item, title: e.target.value })
              }}
            />
            <label
              htmlFor='description'
              className='text-black/70 font-medium'>Description</label>
            <textarea
              name='description'
              className='w-full min-h-[10rem] border border-black/30 focus:outline-none rounded-md px-[1rem] py-[0.5rem]  mb-[1rem]'
              value={item.description}
              onChange={(e) => {
                setItem({ ...item, description: e.target.value })
              }}
            />

            <label
              htmlFor='status'
              className='text-black/70 font-medium'>Status</label>
            <Select
              value={selectedStatus?.title}

              onValueChange={handleSelectChange}

            >
              <SelectTrigger >
                <SelectValue>
                  {
                    selectedStatus?.title
                  }
                </SelectValue>

              </SelectTrigger>
              <SelectContent>
                {
                  status.map((status) => (
                    <SelectItem
                      key={status.id}
                      value={status.id}
                    >
                      {status.title}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>

            <div className='w-full gap-[1rem] flex items-center justify-center'>
              <button
                type='submit'
                className='w-[50%] mt-[1rem] h-[3rem] bg-primary rounded-md text-white font-medium'
              >
                Save
              </button>
              <button
                onClick={handleDelete}
                type='button'
                className='w-[50%] mt-[1rem] h-[3rem] bg-red-500 rounded-md text-white font-medium'
              >
                Delete
              </button>
            </div>
          </form>
        ) : (
          <p>
            Item not found
          </p>
        )
      }
    </div>
  )
}

export default ItemComponent