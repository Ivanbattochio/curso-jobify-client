import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Register, Landing, Error, ProtectedRoute } from "./pages"

import {
	AddJob,
	AllJobs,
	Profile,
	Stats,
	SharedLayout,
} from "./pages/dashboard"

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<SharedLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<Stats />}></Route>
						<Route path="all-jobs" element={<AllJobs />}></Route>
						<Route path="add-jobs" element={<AddJob />}></Route>
						<Route path="profile" element={<Profile />}></Route>
					</Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/landing" element={<Landing />}></Route>
					<Route path="*" element={<Error />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
