import styled from "styled-components";
import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const API_URL = "https://api.chucknorris.io/jokes/random?category=dev";
const REFRESH_TIME = 1000 * 15; // seconds

const padNumber = (x: number) => {
	return String(x).padStart(2, "0");
};

const formatTimeout = (milliseconds: number) => {
	const durationObj = dayjs.duration(milliseconds);
	const hours = Math.floor(durationObj.asHours());
	const minutes = durationObj.minutes();
	const seconds = durationObj.seconds();

	return `${hours > 0 ? `${padNumber(hours)}:` : ""}${padNumber(minutes)}:${padNumber(seconds)}`;
};

const SecondPage = () => {
	const [ data, setData ] = React.useState<NSecondPage.IResp>();
	const [ error, setError ] = React.useState<string>();
	const [ loading, setLoading ] = React.useState(false);
	const [ nextDisplay, setNextDisplay ] = React.useState<number>(new Date().getTime() + REFRESH_TIME);
	const [ showTime, setShowTime ] = React.useState<string>("00:00");
	const [ showReceivedTime, setShowReceivedTime ] = React.useState<string>("---");

	const getJoke = () => {
		setLoading(true);
		setShowReceivedTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
		axios.get(API_URL)
			.then(res => setData(res.data))
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	};

	React.useEffect(() => {
		getJoke();
		setShowTime(`${formatTimeout(new Date().getTime() + REFRESH_TIME - 1000 - new Date().getTime())}`);

		let timer: NodeJS.Timer | null = null;

		timer = setInterval((nextDisplay) => {
			const now = new Date().getTime();
			if(now > nextDisplay) {
				setNextDisplay(new Date().getTime() + REFRESH_TIME);
			} else {
				setShowTime(`${formatTimeout(nextDisplay - now)}`);
			}
		}, 1000, nextDisplay);

		return () => {
			if(timer) clearInterval(timer);
		};
	}, [nextDisplay]);

	return <SecondPageStyle>
		<div className='content-box'>
			<div className='joke-box'>
				{loading ?
					<span>loading...</span>
					: error ?
						<><h3>ERROR</h3><span>We have an error, abort the ship!</span></>
						: <><h3>Here is a joke</h3><span>{data?.value}</span></>}
				<div className='joke-box-footer'>
					<span>Joke will refresh in <b>{showTime}</b></span>
					<span>Last received at <b>{showReceivedTime}</b></span>
				</div>
			</div>
		</div>
	</SecondPageStyle>;
};

export default SecondPage;

export namespace NSecondPage {
	export interface IResp {
		categories: string[];
		created_at: string;
		icon_url: string;
		id: string;
		updated_at: string;
		url: string;
		value: string;
	}
}

const SecondPageStyle = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: center;

	.content-box {
		background-color: white;
		box-shadow: 0 0 10px #eeeeee;
		padding: 25px 20px;
		border-radius: 10px;
		width: 100%;
		height: 100%;
		max-width: 400px;
		max-height: 200px;
	}

	.joke-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		> h3 {
			margin-bottom: 20px;
		}
		.joke-box-footer {
			display: flex;
			flex-direction: column;
			font-size: 14px;
			color: rgb(128, 128, 128);
			margin-top: auto;
		}
	}
`;