import { Editor, Toolbar } from './components'

export default function App() {
  return (
    <div className='min-h-screen'>
      <main className='w-4/5 h-screen flex flex-col items-center justify-center mx-auto'>
        <Toolbar />
        <Editor />
      </main>
    </div>
  )
}
