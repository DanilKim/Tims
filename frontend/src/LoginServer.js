//onLogin = (email, password) => {
//	const data = {
//		email,
//		password,
//	};
//	axios.post('/login', data).then(response => {
//		const { accessToken } = response.data;
//
//		// API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
//		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//
//		// accessToken을 localStorage, cookie 등에 저장하지 않는다!
//
//	}).catch(error => {
//		// ... 에러 처리
//	});
//}

// 개인적으로 사용했던 로그인 코드
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ClickSignIn = ({ loginHandler }) => {
	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const onSignIn = () => {
		axios
			.post(`http://localhost/users/signin`, loginInfo, {
				withCredentials: true,
			})
			.then((res) => loginHandler(res.data));
		if (!loginInfo.email || !loginInfo.password) {
			setErrorMessage("이메일과 비밀번호를 입력하세요");
			return;
		}
	};
	return (
		<>
			<div>
				<button className="btn" onClick={onSignIn}>
					LogIn
				</button>
				<button className="btn signup-btn">
					<Link to="/signup" className="signup-link">
						SignUp
					</Link>
				</button>
				<div className="alert-box">{errorMessage}</div>
			</div>
		</>
	);
};
export default ClickSignIn;