<script>
export default {
	name: "Login",
};
</script>

<template>
	<div class="main">
		<img class="background" src="../Assets/Images/viktor-forgacs.jpg" alt="background">
		<div class="login-box">
		</div>
	</div>
</template>

<style>

body {
	margin: 0;
	overflow: hidden;
}

.main {
	width: 100vw;
	height: 100vh;
}

.background {
	width: 100vw;
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
	background-color: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(6px);
	border-radius: 24px;
	border: 1px solid rgba(255, 255, 255, 0.2);
}

</style>