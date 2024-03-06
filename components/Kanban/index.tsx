import { MoreHorizontal, Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const KanbanItem = (props: { title: string }) => {
  return (
    <button className='h-[7vh] border w-full px-[5%] flex items-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md bg-white'>
      <p className='text-black/70 w-full text-start truncate font-medium'>{
        props.title
      }</p>
    </button>
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

const Status = (props: { title: string, items: string[], color: string }) => {
  return (
    <div className='md:w-[29vw] w-full'>
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
        {
          props.items.map((item, index) => (
            <KanbanItem key={index} title={item} />
          ))
        }
        <NewItem />
      </div>
    </div>
  )
}

const Kanban = (props: Props) => {
  return (
    <div className='w-full'>
      <div className='w-full flex-wrap flex gap-[3vw]'>
        <Status title='To Do' items={['Item 1', 'Item 2', 'Item 3']} color='#FFC107' />
        <Status title='In Progress' items={['Item 1', 'Item 2', 'Item 3']} color='#4CAF50' />
        <Status title='Done' items={['Item 1', 'Item 2', 'Item 3']} color='#9E9E9E' />
        <Status title='Review' items={['Item 1', 'Item 2', 'Item 3']} color='#2196F3' />
        <Status title='Deploy' items={['Item 1', 'Item 2', 'Item 3']} color='#FF5722' />
      </div>
    </div>
  )
}

export default Kanban