import { Editor, Panel, Toolbar, History } from './components'

export default function App() {
  return (
    <div className='absolute inset-0'>
      <main className='h-full flex flex-col justify-center px-12'>
        <Toolbar />
        <div className='flex gap-6'>
          <Editor />
          <Panel />
        </div>
        <History />
      </main>
    </div>
  )
}
