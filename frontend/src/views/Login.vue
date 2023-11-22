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
	<button className="login-42-button" onClick={handle42Login}>
        Login to 42
    </button>
    <br />
    <button className="login-guest-button" onClick={handleGuestLogin}>
        Login as guest
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>