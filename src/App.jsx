import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './providers/ThemeProvider'
import { ToastProvider } from './providers/ToastProvider'
import { router } from './routes/Router'
import { ErrorBoundary } from './components/common'

const App = () => {
	return (
		<ErrorBoundary>
			<ThemeProvider>
				<ToastProvider>
					<RouterProvider router={router} />
				</ToastProvider>
			</ThemeProvider>
		</ErrorBoundary>
	)
}

export default App
