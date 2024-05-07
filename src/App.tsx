import { Editor, Panel, Toolbar, History } from './components'

export default function App() {
  return (
    <div className='min-h-screen'>
      <main className='w-4/5 h-screen flex flex-col justify-center mx-auto'>
        <Toolbar />
        <div className='flex gap-6'>
          <Editor />
          <Panel />
        </div>
        <div>
          <History />
        </div>
      </main>
    </div>
  )
}
