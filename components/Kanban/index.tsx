'use client'

import { MoreHorizontal, Plus } from 'lucide-react'
import React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult
} from '@hello-pangea/dnd'

type Props = {}

const KanbanItem = (props: { title: string }) => {
  return (
    <div className='h-[7vh] border w-full px-[5%] flex items-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md bg-white'>
      <p className='text-black/70 w-full text-start truncate font-medium'>{
        props.title
      }</p>
    </div>
  )
}

const NewItem = () => {
  return (
    <button className='w-full flex gap-[0.7vw] items-center'>
      <Plus className='text-black/30' />
      <p className='text-black/30'>New</p>
    </button>
  )
}

const Status = (props: {
  title: string, items: {
    title: string, description: string, id: string
  }[], color: string, id: string
}) => {
  return (
    <div className='md:w-[29vw] h-fit w-full'>
      <div className='w-full mb-[1rem] flex items-center justify-between'>
        <div className='flex gap-[0.7vw] items-center'>
          <p style={{
            backgroundColor: props.color
          }} className='font-medium rounded-md px-[0.5vw]'>
            {
              props.title
            }
          </p>
          <p className='font-medium text-black/30 px-[0.5vw]'>
            {
              props.items.length
            }
          </p>
        </div>
        <div className='flex gap-[0.7vw] items-center'>
          <MoreHorizontal className='text-black/30' />
          <Plus className='text-black/30' />
        </div>
      </div>
      <div className='w-full flex flex-col gap-[1rem]'>
        <Droppable droppableId={`${props.id}`}>
          {(provided: DroppableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='flex flex-col gap-[1rem]'>
              {
                props.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <KanbanItem title={item.title} />
                      </div>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <NewItem />
      </div>
    </div>
  )
}



const Kanban = (props: Props) => {
  const [status, setStatus] = React.useState([
    {
      title: 'To Do',
      items: [
        {
          title: 'Item 1',
          description: 'Description 1',
          id: 'item-1'
        },
        {
          title: 'Item 2',
          description: 'Description 2',
          id: 'item-2'
        }
      ],
      color: '#FFC107',
      id: 'to-do'
    },
    {
      title: 'In Progress',
      items: [
        {
          title: 'Item 3',
          description: 'Description 3',
          id: 'item-3'
        },
        {
          title: 'Item 4',
          description: 'Description 4',
          id: 'item-4'
        }
      ],
      color: '#007BFF',
      id: 'in-progress'
    }
  ])

  const handleDragEnd = (result: DropResult) => {

    if (!result.destination || !result.source) return

    const {
      droppableId: sourceId,
      index: sourceIndex
    } = result.source

    const {
      droppableId: destinationId,
      index: destinationIndex
    } = result.destination

    const draggedItem = status.find((item) => item.id === sourceId)?.items[sourceIndex]

    if (!draggedItem) return

    const newStatus = status.map((item) => {
      if (item.id === sourceId) {
        item.items.splice(sourceIndex, 1)
      }
      if (item.id === destinationId) {
        item.items.splice(destinationIndex, 0, draggedItem)
      }
      return item
    })

    setStatus(newStatus)
  }

  const handleAddItem = (statusId: string, title: string) => {
    const newStatus = status.map((item) => {
      if (item.id === statusId) {
        item.items.push({
          title,
          description: '',
          id: `${title.toLowerCase().split(' ').join('-')}-${new Date().getTime()}`
        })
      }
      return item
    })

    setStatus(newStatus)
  }

  return (
    <div className='w-full'>
      <DragDropContext
        onDragEnd={handleDragEnd}>
        <div className='flex w-full flex-wrap gap-[3vw]'>
          {
            status.map((item, index) => (
              <Status
                key={item.id}
                title={item.title}
                items={item.items}
                color={item.color}
                id={item.id} />
            ))
          }
        </div>
      </DragDropContext>

    </div>
  )
}

export default Kanban