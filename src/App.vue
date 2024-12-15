<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script></script>
<style scoped>
* {
  background-color: #053b50; /* Set default background color */
  margin: 0;
  overflow-x: hidden;
  color: white;
}

/* Webkit Browsers */
::-webkit-scrollbar {
  width: 12px;
  height: 12px; /* for horizontal scrollbars */
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 50px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 50px; /* Circular border */
  border: 3px solid #f1f1f1; /* Adds space around thumb */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
