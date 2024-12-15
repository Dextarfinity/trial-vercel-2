<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar app color="#176B87" elevate-on-scroll sticky>
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-icon size="24" color="#053b50">mdi-shoe-sneaker</v-icon>
          <span class="font-weight-bold" style="color: #64ccc5; margin-left: 8px">
            SoleScore
          </span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Signup</v-btn>
      </div>
      <v-btn icon class="d-md-none" @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary color="#176B87">
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-list-item to="/login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item to="/register">
          <v-list-item-title>Signup</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Hero Section -->
    <v-main>
      <v-container>
        <v-row class="align-center hero-section">
          <v-col cols="12" md="6">
            <h1
              class="display-1 font-weight-bold mb-6"
              style="color: #64ccc5; font-size: 3.5rem"
            >
              <v-icon size="50" color="#176B87" style="margin-right: 8px"
                >mdi-shoe-sneaker</v-icon
              >
              SoleScore
            </h1>
            <h1 class="display-2 font-weight-bold" style="color: #64ccc5">
              Discover and Rate Your Favorite Shoes
            </h1>
            <p class="subtitle-1" style="color: white">
              Join a community of shoe enthusiasts. Share your reviews and find the
              best-rated footwear for every occasion.
            </p>
            <v-btn large color="#176B87" dark to="/reviews">Explore Reviews</v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-img src="/hero-shoe-image.png" alt="Shoes" class="hero-image"></v-img>
          </v-col>
        </v-row>

        <!-- Features Section -->
        <v-row class="my-10 text-center">
          <v-col cols="12" md="4">
            <v-icon size="48" color="#64ccc5">mdi-star-outline</v-icon>
            <h3 class="my-3">Top Ratings</h3>
            <p>Browse shoes rated by enthusiasts like you.</p>
          </v-col>
          <v-col cols="12" md="4">
            <v-icon size="48" color="#64ccc5">mdi-comment-outline</v-icon>
            <h3 class="my-3">Authentic Reviews</h3>
            <p>Read genuine reviews from real users.</p>
          </v-col>
          <v-col cols="12" md="4">
            <v-icon size="48" color="#64ccc5">mdi-account-group</v-icon>
            <h3 class="my-3">Community Insights</h3>
            <p>Engage with a passionate community of shoe lovers.</p>
          </v-col>
        </v-row>

        <!-- Call-to-Action Section -->
        <v-row justify="center" align="center" class="cta-section my-10">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="cta-heading">Ready to Share Your Thoughts?</h2>
            <p>Sign up today and start rating your favorite shoes!</p>
            <v-btn large color="#176B87" dark to="/register">Join Now</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="#176B87" app>
      <v-container>
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="4" class="text-white text-center text-md-left">
            <p>
              &copy; {{ new Date().getFullYear() }} Shoenthusiast. All Rights Reserved.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon color="white">mdi-facebook</v-icon>
            <v-icon color="white" class="mx-3">mdi-twitter</v-icon>
            <v-icon color="white">mdi-instagram</v-icon>
          </v-col>
          <v-col cols="12" md="4" class="text-white text-center text-md-right">
            <p>Privacy Policy | Terms of Service</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>
.hero-section {
  background-color: #053b50;
  padding: 40px 0;
  color: white;
}

.hero-image {
  border-radius: 8px;
}

.cta-section {
  background-color: #053b50;
  color: white;
  padding: 40px;
  border-radius: 8px;
}

.cta-heading {
  font-size: 1.8rem;
  margin-bottom: 16px;
}

.v-footer {
  padding: 16px 0;
}
</style>
