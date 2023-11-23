<template>
  <div class="main">
    <h1>Pong Login Page!</h1>
    <input
      type="text"
      name="username"
      id="username"
      placeholder="username(talvez nao use)"
    />
    <br />
    <input
      type="button"
      value="Done!"
      class="button"
      id="done"
    />
	<br />
	<button class="login-42-button" @click=handle42Login>
        Login to 42
    </button>
    <br />
    <button class="login-guest-button" @click=handleGuestLogin>
        Login as guest
    </button>
  </div>
</template>

<script>

	export default {
		name: "Login",

		methods: {
		handle42Login() {
        const backUrl = import.meta.env.VITE_APP_BACKEND_URL;
		    const loginUrl = `${backUrl}/auth/login`;
        window.location.href = loginUrl;
    },
    }
};
</script>