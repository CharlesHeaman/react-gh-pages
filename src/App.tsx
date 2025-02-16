import { Suspense } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import './assets/Global.css';
import AppProvider from "./auth/provider";
import PermsProtectedRoute from "./components/PermsProtectedRoute";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Loading from "./components/ui/Loading/Loading";
import PageLayout from "./components/ui/PageLayout/PageLayout";
import { nonProtectedRoutes, routes } from "./routes/routes";

const App = () => {
	return (
		<div className="App">
			<Suspense fallback={<Loading/>}>
				<Router>
					<AppProvider>				
						<PageLayout>
							<Routes>
								{/* Non-protected Routes */}
								{nonProtectedRoutes.map((route, index) => (
									<Route 
										path={route.path} 
										element={route.component}
										key={index}
									/>
								))}
								{/* Protected Routes */}
								<Route element={ <ProtectedRoutes /> }>
									{routes.map((route, index) => (
										<Route element={ <PermsProtectedRoute requiredPerms={route.permissions}/> }>
											<Route 
												path={route.path} 
												element={route.component}
												key={index}
											/>
										</Route>
									))}
								</Route>
							</Routes>						
						</PageLayout>
					</AppProvider>
				</Router>
			</Suspense>
		</div>
  	);
}

export default App