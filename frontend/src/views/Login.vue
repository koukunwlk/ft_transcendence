<script>
export default {
	name: "Login",
};
</script>

<template>
	<div class="main">
		<div class="image-animation">
			<img class="background" src="../Assets/Images/kai-pilger.jpg" alt="background">
			<img class="background" src="../Assets/Images/kai-pilger.jpg" alt="background">
		</div>
		<div class="login-box">
			<h1 class="login-txt">Login</h1>
			<hr class="underline">
			<div class="box-buttons">
				<button class="login-buttons button-margin">Continue with 42 intra</button>
			</div>
			<div class="box-buttons">
				<button class="login-buttons">Continue as guest</button>
			</div>
		</div>
	</div>
</template>

<style>

body, html{
	margin: 0;
	overflow: hidden;
}

.main {
	width: 100vw;
	height: 100vh;
}

.image-animation {
	display: flex;
	width: 200%;
	animation: moveImages 200s infinite linear;
}

.background {
	flex: 1;
	width: 50%;
	height: 100vh;
	justify-content: center;
	align-items: center;
    object-fit: cover;
}

.login-box {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 500px;
	width: 350px;
	max-width: 80vw;
	max-height: 90vh;
	background-color: rgba(210, 210, 210, 0.05);
	backdrop-filter: blur(4px);
	border-radius: 24px;
	border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-txt {
	color: white;
	font-family:'Courier New', Courier, monospace;
	font-weight: 300;
	text-align: center;
	margin-top: 15%;
}

.underline {
	border: none;
	border-top: 0.5px solid white;
	width: 80%;
	margin-top: 5%;
	margin-bottom: 25%;
}

.box-buttons {
	display: flex;
	justify-content: center;
    align-items: center;
}

.button-margin {
	margin-bottom: 10%;
}

.login-buttons {
	width: 70%;
	color: rgb(255, 255, 255);
	font-family: monospace;
	font-size: medium;
	font-weight: 400;
	padding-top: 18px;
	padding-bottom: 18px;
	border-radius: 6vw;
	border: 1px solid rgba(255, 255, 255, 0.2);
	background-color: rgba(0, 0, 0, 0.3);
}

@keyframes moveImages {
	0% {
		transform: translate(0);
	}
	100% {
		transform: translate(-50%);
	}
}

</style>