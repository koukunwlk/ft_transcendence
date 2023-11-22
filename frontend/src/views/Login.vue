<template>
  <div class="main">
    <h1>Pong Login Page!</h1>
    <input
      type="text"
      name="username"
      id="username"
      placeholder="UserName"
    />
    <br />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password que nao vai precisar"
    />
    <br />
    <input
      type="button"
      value="Done!"
      class="button"
      id="done"
    />
    <br />
    <img alt="Login as Guest" />
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>