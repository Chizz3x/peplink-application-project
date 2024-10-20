import React from "react";
import {
	Route,
	RouteProps,
	Routes,
} from "react-router-dom";
import { Layout } from "../components/layout";
import { ROUTES } from "../routes";
import { PageHome } from "./Home";
import FirstPage from "./first-page";
import SecondPage from "./second-page";
import { Page404 } from "./404";

const PAGES: RouteProps[] = [
	{
		path: ROUTES.home,
		element: <Layout>
			<PageHome />
		</Layout>
	},
	{
		path: ROUTES["first-page"],
		element: <Layout>
			<FirstPage />
		</Layout>
	},
	{
		path: ROUTES["second-page"],
		element: <Layout>
			<SecondPage />
		</Layout>
	},
];

const Index = () => {
	return <Routes>
		{PAGES.map((page, index) => <Route key={index} {...page} path={`${page.path?.slice(1)}`} />)}
		<Route path="/*" element={<Layout><Page404 /></Layout>}></Route>
	</Routes>;
};

export default Index;