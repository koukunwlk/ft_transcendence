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
	animation: moveImages 300s infinite linear;
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
	background-color: rgba(210, 210, 210, 0.05);
	backdrop-filter: blur(6px);
	border-radius: 24px;
	border: 1px solid rgba(255, 255, 255, 0.2);
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